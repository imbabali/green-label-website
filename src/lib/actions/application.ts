'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email/resend'
import { applicationConfirmationHtml } from '@/lib/email/templates/application-confirmation'
import { applicationAdminHtml } from '@/lib/email/templates/application-admin'
import { SITE_URL } from '@/lib/data/constants'
import { headers } from 'next/headers'

const applicationSchema = z.object({
  job_slug: z.string().min(1),
  job_title: z.string().min(1),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((v) => v.toLowerCase().trim()),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  current_company: z.string().optional().default(''),
  current_position: z.string().optional().default(''),
  linkedin_profile: z
    .string()
    .optional()
    .default('')
    .refine(
      (v) => !v || /^https?:\/\/(www\.)?linkedin\.com\//.test(v),
      'Please enter a valid LinkedIn URL'
    ),
  portfolio_url: z
    .string()
    .optional()
    .default('')
    .refine((v) => !v || /^https?:\/\//.test(v), 'Please enter a valid URL'),
  cover_letter: z.string().optional().default(''),
})

export type ApplicationFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  const raw = Object.fromEntries(formData.entries())
  const resumeFile = formData.get('resume') as File | null
  const parsed = applicationSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  if (!resumeFile || resumeFile.size === 0) {
    return {
      success: false,
      message: 'Resume is required.',
      errors: { resume: ['Please upload your resume'] },
    }
  }

  if (resumeFile.size > 5 * 1024 * 1024) {
    return {
      success: false,
      message: 'Resume must be less than 5MB.',
      errors: { resume: ['Resume file must be less than 5MB'] },
    }
  }

  const ext = resumeFile.name.split('.').pop()?.toLowerCase()
  if (!['pdf', 'doc', 'docx'].includes(ext || '')) {
    return {
      success: false,
      message: 'Invalid file type.',
      errors: { resume: ['Resume must be a PDF, DOC, or DOCX file'] },
    }
  }

  const data = parsed.data
  const headersList = await headers()
  const ipAddress = headersList.get('x-forwarded-for') || ''
  const userAgent = headersList.get('user-agent') || ''

  try {
    const supabase = await createClient()

    const fileName = `${data.job_slug}/${Date.now()}-${resumeFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, resumeFile, {
        contentType: resumeFile.type,
        upsert: false,
      })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(uploadData.path)
    const resumeUrl = urlData.publicUrl

    const { error: dbError } = await supabase.from('job_applications').insert({
      job_slug: data.job_slug,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      resume_url: resumeUrl,
      cover_letter: data.cover_letter || null,
      current_company: data.current_company || null,
      current_position: data.current_position || null,
      linkedin_profile: data.linkedin_profile || null,
      portfolio_url: data.portfolio_url || null,
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (dbError) throw dbError

    await Promise.allSettled([
      sendUserConfirmation(
        data.email,
        `Application Received: ${data.job_title}`,
        applicationConfirmationHtml({
          firstName: data.first_name,
          jobTitle: data.job_title,
        })
      ),
      sendAdminNotification(
        `New Application: ${data.job_title}`,
        applicationAdminHtml({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          jobTitle: data.job_title,
          jobSlug: data.job_slug,
          currentCompany: data.current_company,
          currentPosition: data.current_position,
          linkedinProfile: data.linkedin_profile,
          portfolioUrl: data.portfolio_url,
          resumeUrl,
          coverLetter: data.cover_letter,
          siteUrl: SITE_URL,
        }),
        data.email
      ),
    ])

    return {
      success: true,
      message: `Your application for ${data.job_title} has been submitted successfully! We will review your application and contact you soon.`,
    }
  } catch (error) {
    console.error('Application submission error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
