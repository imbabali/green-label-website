'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/validators/email'
import { phoneRequiredSchema } from '@/lib/validators/phone'
import { CONTACT_METHODS } from '@/lib/data/service-types'
import { submitInquiry } from '@/lib/actions/inquiry'
import { track } from '@vercel/analytics'

const serviceInquirySchema = z.object({
  service_slug: z.string(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: emailSchema,
  phone: phoneRequiredSchema,
  company: z.string().optional().default(''),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  location: z.string().min(1, 'Location is required'),
  preferred_contact: z
    .enum(CONTACT_METHODS.map((o) => o.value) as [string, ...string[]])
    .default('email'),
})

type ServiceInquiryFormData = z.infer<typeof serviceInquirySchema>

interface ServiceInquiryFormProps {
  serviceSlug: string
  serviceTitle: string
}

export default function ServiceInquiryForm({ serviceSlug, serviceTitle }: ServiceInquiryFormProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceInquiryFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(serviceInquirySchema) as any,
    defaultValues: {
      service_slug: serviceSlug,
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      location: '',
      preferred_contact: 'email',
    },
  })

  const onSubmit = async (data: ServiceInquiryFormData) => {
    setSubmitStatus(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, String(value ?? '')))
      formData.append('service_slug', serviceSlug)
      const result = await submitInquiry({ success: false, message: '' }, formData)
      if (result.success) {
        track('service_inquiry_submitted')
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Hidden service slug */}
      <input type="hidden" {...register('service_slug')} />

      <h3 className="text-xl font-semibold text-gray-900">Inquire about {serviceTitle}</h3>

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

      {/* Name, Email, Phone Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Name */}
        <div>
          <label htmlFor="inquiry-name" className="mb-1 block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="inquiry-name"
            {...register('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p id="inquiry-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="inquiry-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="inquiry-email"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p id="inquiry-email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="inquiry-phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="inquiry-phone"
            {...register('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.phone
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="+256 772 423 092"
          />
          {errors.phone && (
            <p id="inquiry-phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Company, Location Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Company */}
        <div>
          <label htmlFor="inquiry-company" className="mb-1 block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="inquiry-company"
            {...register('company')}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
            placeholder="Your company name"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="inquiry-location"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="inquiry-location"
            {...register('location')}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? 'inquiry-location-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.location
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="Your city or district"
          />
          {errors.location && (
            <p id="inquiry-location-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="inquiry-message" className="mb-1 block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="inquiry-message"
          {...register('message')}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="Describe your requirements, timeline, and any specific questions..."
        />
        {errors.message && (
          <p id="inquiry-message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Preferred Contact Method
        </label>
        <div
          className="flex flex-wrap gap-3"
          role="radiogroup"
          aria-label="Preferred contact method"
        >
          {CONTACT_METHODS.map((method) => (
            <label
              key={method.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors has-[:checked]:border-brand-green has-[:checked]:bg-green-50"
            >
              <input
                type="radio"
                value={method.value}
                {...register('preferred_contact')}
                className="h-4 w-4 text-brand-green accent-brand-green"
              />
              <span className="font-medium text-gray-700">{method.label}</span>
            </label>
          ))}
        </div>
        {errors.preferred_contact && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.preferred_contact.message}
          </p>
        )}
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
          'Send Inquiry'
        )}
      </button>
    </form>
  )
}
