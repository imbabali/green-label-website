'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email/resend'
import { newsletterWelcomeHtml } from '@/lib/email/templates/newsletter-welcome'
import { SITE_URL } from '@/lib/data/constants'

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'temp-mail.org', 'throwaway.email',
  'fakeinbox.com', 'yopmail.com', 'maildrop.cc', '10minutemail.com',
]

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .max(254)
    .transform((v) => v.toLowerCase().trim())
    .refine((v) => !DISPOSABLE_DOMAINS.includes(v.split('@')[1]), {
      message: 'Please use a permanent email address',
    }),
  name: z
    .string()
    .max(100)
    .optional()
    .default('')
    .refine((v) => !v || (v.length >= 2 && /^[a-zA-Z\s\-']+$/.test(v)), {
      message: 'Name must be at least 2 characters and contain only letters',
    }),
  frequency: z.enum(['D', 'W', 'M']).default('W'),
  website: z.string().max(0, 'Spam detected').optional().default(''),
})

export type NewsletterFormState = {
  success: boolean
  message: string
  errorType?: string
}

export async function subscribeNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = newsletterSchema.safeParse(raw)

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
    return { success: false, message: firstError || 'Invalid input' }
  }

  const data = parsed.data

  try {
    const supabase = await createClient()

    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active, unsubscribe_token')
      .eq('email', data.email)
      .single()

    if (existing?.is_active) {
      return {
        success: false,
        message: "You're already subscribed to our newsletter!",
        errorType: 'already_subscribed',
      }
    }

    let unsubscribeToken: string

    if (existing && !existing.is_active) {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: true,
          name: data.name || null,
          frequency: data.frequency,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (error) throw error
      unsubscribeToken = existing.unsubscribe_token
    } else {
      const { data: newSub, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: data.email,
          name: data.name || null,
          frequency: data.frequency,
        })
        .select('unsubscribe_token')
        .single()

      if (error) throw error
      unsubscribeToken = newSub.unsubscribe_token
    }

    await Promise.allSettled([
      sendUserConfirmation(
        data.email,
        'Welcome to Green Label Services Newsletter',
        newsletterWelcomeHtml({
          name: data.name,
          email: data.email,
          frequency: data.frequency,
          unsubscribeToken,
          siteUrl: SITE_URL,
        })
      ),
      sendAdminNotification(
        'New Newsletter Subscriber',
        `<p>New subscriber: <strong>${data.email}</strong></p><p>Name: ${data.name || 'Not provided'}</p><p>Frequency: ${data.frequency}</p>`
      ),
    ])

    return {
      success: true,
      message: 'Thank you for subscribing! You should receive a confirmation email shortly.',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
