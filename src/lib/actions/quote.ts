'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { sendAdminNotification } from '@/lib/email/resend'
import { quoteAdminHtml } from '@/lib/email/templates/quote-admin'
import { SERVICE_TYPE_MAP } from '@/lib/data/service-types'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/utils/rate-limit'

const quoteSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((v) => v.toLowerCase().trim()),
  phone: z.string().optional().default(''),
  company: z.string().optional().default(''),
  service_type: z.string().min(1, 'Service type is required'),
  location: z.string().min(1, 'Location is required'),
  frequency: z.string().optional().default(''),
  estimated_volume: z.string().optional().default(''),
  message: z.string().min(10, 'Please provide more details about your requirements'),
  timeline: z.string().optional().default(''),
  budget_range: z.string().optional().default(''),
  marketing_consent: z.coerce.boolean().default(false),
})

export type QuoteFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = quoteSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  const rateLimit = await checkRateLimit('quote')
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
    const { error: dbError } = await supabase.from('quote_requests').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      service_type: data.service_type,
      location: data.location,
      frequency: data.frequency || null,
      estimated_volume: data.estimated_volume || null,
      message: data.message,
      timeline: data.timeline || null,
      budget_range: data.budget_range || null,
      marketing_consent: data.marketing_consent,
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (dbError) {
      console.error('Quote request DB error:', dbError)
    }

    const serviceLabel = SERVICE_TYPE_MAP[data.service_type as keyof typeof SERVICE_TYPE_MAP] || data.service_type

    await sendAdminNotification(
      `New Quote Request: ${serviceLabel}`,
      quoteAdminHtml({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        serviceType: serviceLabel,
        location: data.location,
        frequency: data.frequency,
        estimatedVolume: data.estimated_volume,
        message: data.message,
        timeline: data.timeline,
        budgetRange: data.budget_range,
        marketingConsent: data.marketing_consent ?? false,
      }),
      data.email
    )

    return {
      success: true,
      message: `Thank you ${data.name}! Your quote request has been submitted successfully. We will review your requirements and get back to you within 24 hours.`,
    }
  } catch (error) {
    console.error('Quote submission error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again or call us at +256 772 423 092.',
    }
  }
}
