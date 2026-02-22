'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/utils/rate-limit'

const inquirySchema = z.object({
  service_slug: z.string().min(1),
  name: z.string().min(1, 'Name is required').max(100),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((v) => v.toLowerCase().trim()),
  phone: z.string().min(1, 'Phone is required'),
  company: z.string().optional().default(''),
  message: z.string().min(20, 'Please provide more details (at least 20 characters)').max(2000),
  location: z.string().min(1, 'Location is required'),
  preferred_contact: z.string().default('email'),
})

const quickInquirySchema = z.object({
  service_slug: z.string().min(1),
  name: z.string().min(1, 'Name is required').max(100),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((v) => v.toLowerCase().trim()),
  phone: z.string().optional().default(''),
  message: z.string().optional().default(''),
})

export type InquiryFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = inquirySchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  const rateLimit = await checkRateLimit('inquiry')
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${Math.ceil((rateLimit.retryAfter || 60) / 60)} minutes.`,
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('service_inquiries').insert({
      service_slug: data.service_slug,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      message: data.message,
      location: data.location,
      preferred_contact: data.preferred_contact,
    })

    if (error) throw error

    return {
      success: true,
      message: 'Your inquiry has been submitted successfully! We will contact you soon.',
    }
  } catch (error) {
    console.error('Inquiry submission error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function submitQuickInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = quickInquirySchema.safeParse(raw)

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
    return { success: false, message: firstError || 'Invalid input' }
  }

  const data = parsed.data

  const rateLimit = await checkRateLimit('inquiry')
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${Math.ceil((rateLimit.retryAfter || 60) / 60)} minutes.`,
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('service_inquiries').insert({
      service_slug: data.service_slug,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message || 'Quick inquiry - no message provided',
      location: '',
    })

    if (error) throw error

    return { success: true, message: 'Your inquiry has been submitted! We will contact you soon.' }
  } catch (error) {
    console.error('Quick inquiry error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
