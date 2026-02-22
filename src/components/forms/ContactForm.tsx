'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/validators/email'
import { phoneSchema } from '@/lib/validators/phone'
import { honeypotSchema } from '@/lib/validators/honeypot'
import { SUBJECT_OPTIONS, CONTACT_METHODS } from '@/lib/data/service-types'
import { submitContactForm } from '@/lib/actions/contact'
import { track } from '@vercel/analytics'

const contactFormSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  company: z.string().optional().default(''),
  subject: z.enum(SUBJECT_OPTIONS.map((o) => o.value) as [string, ...string[]], {
    error: 'Please select a subject',
  }),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  location: z.string().optional().default(''),
  preferred_contact: z
    .enum(CONTACT_METHODS.map((o) => o.value) as [string, ...string[]])
    .default('email'),
  marketing_consent: z.boolean().default(false),
  privacy_agreement: z.literal(true, {
    error: 'You must agree to the privacy policy',
  }),
  honeypot: honeypotSchema,
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactFormSchema) as any,
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      company: '',
      subject: undefined,
      message: '',
      location: '',
      preferred_contact: 'email',
      marketing_consent: false,
      privacy_agreement: undefined as unknown as true,
      honeypot: '',
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const messageValue = watch('message', '')

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus(null)
    try {
      const formData = new FormData()
      formData.append('full_name', data.full_name)
      formData.append('email', data.email)
      formData.append('phone', data.phone ?? '')
      formData.append('company', data.company ?? '')
      formData.append('subject', data.subject)
      formData.append('message', data.message)
      formData.append('location', data.location ?? '')
      formData.append('preferred_contact', data.preferred_contact)
      formData.append('marketing_consent', String(data.marketing_consent))
      formData.append('privacy_agreement', String(data.privacy_agreement))
      formData.append('website', data.honeypot ?? '')

      const result = await submitContactForm({ success: false, message: '' }, formData)
      if (result.success) {
        track('contact_form_submitted')
        setSubmitStatus({ type: 'success', message: result.message })
        reset()
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Status Message */}
      {submitStatus && (
        <div
          role="alert"
          className={`rounded-lg p-4 ${
            submitStatus.type === 'success'
              ? 'border border-green-200 bg-green-50 text-green-800'
              : 'border border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Section 1: Contact Information */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">Contact Information</legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="mb-1 block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              autoComplete="name"
              {...register('full_name')}
              aria-invalid={!!errors.full_name}
              aria-describedby={errors.full_name ? 'full_name-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.full_name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="John Doe"
            />
            {errors.full_name && (
              <p id="full_name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              inputMode="email"
              autoComplete="email"
              {...register('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              inputMode="tel"
              autoComplete="tel"
              {...register('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.phone
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="+256 772 423 092"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              id="company"
              autoComplete="organization"
              {...register('company')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="Your company name"
            />
          </div>
        </div>
      </fieldset>

      {/* Section 2: Inquiry Details */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">Inquiry Details</legend>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                {...register('subject')}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                  errors.subject
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-brand-green'
                }`}
              >
                <option value="">Select a subject</option>
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register('location')}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Your city or district"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : 'message-count'}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.message
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="Tell us about your inquiry..."
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.message ? (
                <p id="message-error" className="text-sm text-red-600" role="alert">
                  {errors.message.message}
                </p>
              ) : (
                <span />
              )}
              <p
                id="message-count"
                className={`text-sm ${
                  messageValue.length > 2000 ? 'text-red-600' : 'text-gray-500'
                }`}
                aria-live="polite"
              >
                {messageValue.length}/2000
              </p>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Section 3: Contact Preferences */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">Contact Preferences</legend>
        <div
          className="flex flex-wrap gap-4"
          role="radiogroup"
          aria-label="Preferred contact method"
        >
          {CONTACT_METHODS.map((method) => (
            <label
              key={method.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 transition-colors has-[:checked]:border-brand-green has-[:checked]:bg-green-50"
            >
              <input
                type="radio"
                value={method.value}
                {...register('preferred_contact')}
                className="relative h-4 w-4 text-brand-green accent-brand-green after:absolute after:-inset-3 after:content-['']"
              />
              <span className="text-sm font-medium text-gray-700">{method.label}</span>
            </label>
          ))}
        </div>
        {errors.preferred_contact && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.preferred_contact.message}
          </p>
        )}
      </fieldset>

      {/* Section 4: Agreements */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">Agreements</legend>
        <div className="space-y-3">
          {/* Marketing Consent */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('marketing_consent')}
              className="relative mt-1 h-5 w-5 rounded border-gray-300 text-brand-green accent-brand-green after:absolute after:-inset-3 after:content-['']"
            />
            <span className="text-sm text-gray-700">
              I would like to receive marketing communications, newsletters, and updates from Green
              Label Services. You can unsubscribe at any time.
            </span>
          </label>

          {/* Privacy Agreement */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('privacy_agreement')}
              aria-invalid={!!errors.privacy_agreement}
              aria-describedby={errors.privacy_agreement ? 'privacy-error' : undefined}
              className="relative mt-1 h-5 w-5 rounded border-gray-300 text-brand-green accent-brand-green after:absolute after:-inset-3 after:content-['']"
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/privacy" className="text-brand-green underline hover:text-brand-green-dark">
                Privacy Policy
              </a>{' '}
              and consent to the processing of my personal data.{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.privacy_agreement && (
            <p id="privacy-error" className="text-sm text-red-600" role="alert">
              {errors.privacy_agreement.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Honeypot - hidden from real users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          type="text"
          id="honeypot"
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-green px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <svg
              className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
