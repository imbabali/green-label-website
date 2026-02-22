'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/utils/rate-limit'

const SPAM_PATTERNS = /viagra|cialis|casino|get rich|buy now|free money|lottery|guaranteed income/i

const commentSchema = z.object({
  post_slug: z.string().min(1),
  parent_id: z.string().optional().default(''),
  name: z.string().min(1, 'Name is required').max(100),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((v) => v.toLowerCase().trim()),
  website: z.string().url().optional().or(z.literal('')).default(''),
  content: z
    .string()
    .min(3, 'Comment must be at least 3 characters')
    .max(1000, 'Comment must be less than 1000 characters')
    .refine((v) => !SPAM_PATTERNS.test(v), 'Comment contains prohibited content'),
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
})

export type CommentFormState = {
  success: boolean
  message: string
}

export async function submitComment(
  _prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = commentSchema.safeParse(raw)

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
    return { success: false, message: firstError || 'Invalid input' }
  }

  const data = parsed.data

  const rateLimit = await checkRateLimit('comment')
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${Math.ceil((rateLimit.retryAfter || 60) / 60)} minutes.`,
    }
  }

  const headersList = await headers()
  const ipAddress = headersList.get('x-forwarded-for') || ''
  const userAgent = headersList.get('user-agent') || ''

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('comments').insert({
      post_slug: data.post_slug,
      parent_id: data.parent_id || null,
      name: data.name,
      email: data.email,
      website: data.website || null,
      content: data.content,
      status: 'pending',
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (error) throw error

    return {
      success: true,
      message: 'Your comment has been submitted and is awaiting moderation.',
    }
  } catch (error) {
    console.error('Comment submission error:', error)
    return { success: false, message: 'Failed to submit comment. Please try again.' }
  }
}
