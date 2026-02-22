'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email/resend'
import { contactConfirmationHtml } from '@/lib/email/templates/contact-confirmation'
import { contactAdminHtml } from '@/lib/email/templates/contact-admin'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/utils/rate-limit'

const SPAM_PATTERNS = /viagra|cialis|casino|get rich|buy now|free money|lottery|guaranteed income/i

const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254)
    .transform((v) => v.toLowerCase().trim()),
  phone: z.string().optional().default(''),
  company: z.string().optional().default(''),
  subject: z.string().min(1, 'Subject is required'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine((v) => !SPAM_PATTERNS.test(v), 'Message contains prohibited content'),
  location: z.string().optional().default(''),
  preferred_contact: z.string().default('email'),
  marketing_consent: z.coerce.boolean().default(false),
  privacy_agreement: z.coerce.boolean().refine((v) => v === true, 'You must agree to the privacy policy'),
  website: z.string().max(0, 'Spam detected').optional().default(''),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = contactSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  const rateLimit = await checkRateLimit('contact')
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Too many submissions. Please try again in ${Math.ceil((rateLimit.retryAfter || 60) / 60)} minutes.`,
    }
  }

  const headersList = await headers()
  const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || ''
  const userAgent = headersList.get('user-agent') || ''

  try {
    const supabase = await createClient()
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      subject: data.subject,
      message: data.message,
      location: data.location || null,
      preferred_contact: data.preferred_contact,
      marketing_consent: data.marketing_consent,
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (dbError) {
      console.error('Contact submission DB error:', dbError)
      return {
        success: false,
        message: 'Something went wrong. Please try again or call us at +256 772 423 092.',
      }
    }

    await Promise.allSettled([
      sendUserConfirmation(
        data.email,
        'Thank You for Contacting Green Label Services',
        contactConfirmationHtml({
          fullName: data.full_name,
          subject: data.subject,
          message: data.message,
        })
      ),
      sendAdminNotification(
        `New Contact: ${data.subject}`,
        contactAdminHtml({
          fullName: data.full_name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          subject: data.subject,
          message: data.message,
          location: data.location,
          preferredContact: data.preferred_contact,
          marketingConsent: data.marketing_consent,
          ipAddress,
          userAgent,
          submittedAt: new Date().toISOString(),
        }),
        data.email
      ),
    ])

    return {
      success: true,
      message: `Thank you, ${data.full_name}! Your message has been sent successfully. We'll get back to you within 24 hours.`,
    }
  } catch (error) {
    console.error('Contact submission error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again or call us at +256 772 423 092.',
    }
  }
}
