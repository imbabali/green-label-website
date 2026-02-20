'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/validators/email'
import { phoneSchema } from '@/lib/validators/phone'
import {
  SERVICE_TYPES,
  FREQUENCY_OPTIONS,
  TIMELINE_OPTIONS,
} from '@/lib/data/service-types'
import { ALL_DISTRICTS } from '@/lib/data/uganda-districts'
import UgandaDistrictSelect from '@/components/forms/UgandaDistrictSelect'
import { submitQuoteRequest } from '@/lib/actions/quote'

const validLocations = [...ALL_DISTRICTS, 'other'] as const

const quoteRequestSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  company: z.string().optional().default(''),
  service_type: z.enum(
    SERVICE_TYPES.map((s) => s.value) as [string, ...string[]],
    { error: 'Please select a service type' }
  ),
  location: z
    .string()
    .min(1, 'Location is required')
    .refine((val) => validLocations.includes(val as (typeof validLocations)[number]), {
      message: 'Please select a valid district',
    }),
  frequency: z.string().optional().default(''),
  estimated_volume: z.string().optional().default(''),
  message: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your needs')
    .max(5000, 'Message must be less than 5000 characters'),
  timeline: z.string().optional().default(''),
  budget_range: z.string().optional().default(''),
  marketing_consent: z.boolean().default(false),
})

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>

export default function QuoteRequestForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(quoteRequestSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service_type: undefined,
      location: '',
      frequency: '',
      estimated_volume: '',
      message: '',
      timeline: '',
      budget_range: '',
      marketing_consent: false,
    },
  })

  const onSubmit = async (data: QuoteRequestFormData) => {
    setSubmitStatus(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value != null ? String(value) : '')
      })

      const result = await submitQuoteRequest({ success: false, message: '' }, formData)
      if (result.success) {
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

      {/* Section 1: Contact */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">
          Contact Information
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="quote-email" className="mb-1 block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="quote-email"
              {...register('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'quote-email-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p id="quote-email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="quote-phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="quote-phone"
              {...register('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.phone
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="+256 772 423 092"
            />
            {errors.phone && (
              <p id="quote-phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="quote-company" className="mb-1 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              id="quote-company"
              {...register('company')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="Your company name"
            />
          </div>
        </div>
      </fieldset>

      {/* Section 2: Service */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">
          Service Details
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Service Type */}
          <div>
            <label htmlFor="service_type" className="mb-1 block text-sm font-medium text-gray-700">
              Service Type <span className="text-red-500">*</span>
            </label>
            <select
              id="service_type"
              {...register('service_type')}
              aria-invalid={!!errors.service_type}
              aria-describedby={errors.service_type ? 'service_type-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.service_type
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
            >
              <option value="">Select a service</option>
              {SERVICE_TYPES.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            {errors.service_type && (
              <p id="service_type-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.service_type.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
              Location / District <span className="text-red-500">*</span>
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <UgandaDistrictSelect
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.location?.message}
                  name="location"
                  required
                />
              )}
            />
          </div>

          {/* Frequency */}
          <div>
            <label htmlFor="frequency" className="mb-1 block text-sm font-medium text-gray-700">
              Service Frequency
            </label>
            <select
              id="frequency"
              {...register('frequency')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="">Select frequency</option>
              {FREQUENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Estimated Volume */}
          <div>
            <label htmlFor="estimated_volume" className="mb-1 block text-sm font-medium text-gray-700">
              Estimated Volume
            </label>
            <input
              type="text"
              id="estimated_volume"
              {...register('estimated_volume')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="e.g., 500kg per month"
            />
          </div>
        </div>
      </fieldset>

      {/* Section 3: Details */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">
          Additional Details
        </legend>
        <div className="space-y-4">
          {/* Message */}
          <div>
            <label htmlFor="quote-message" className="mb-1 block text-sm font-medium text-gray-700">
              Describe Your Needs <span className="text-red-500">*</span>
            </label>
            <textarea
              id="quote-message"
              {...register('message')}
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'quote-message-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.message
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="Tell us about your waste management needs, quantities, special requirements..."
            />
            {errors.message && (
              <p id="quote-message-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Timeline */}
            <div>
              <label htmlFor="timeline" className="mb-1 block text-sm font-medium text-gray-700">
                Timeline
              </label>
              <select
                id="timeline"
                {...register('timeline')}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="">Select timeline</option>
                {TIMELINE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budget_range" className="mb-1 block text-sm font-medium text-gray-700">
                Budget Range
              </label>
              <input
                type="text"
                id="budget_range"
                {...register('budget_range')}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="e.g., UGX 500,000 - 1,000,000"
              />
            </div>
          </div>

          {/* Marketing Consent */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('marketing_consent')}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-green accent-brand-green"
            />
            <span className="text-sm text-gray-700">
              I would like to receive marketing communications and service updates from
              Green Label Services.
            </span>
          </label>
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-orange px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
            Submitting...
          </>
        ) : (
          'Request Quote'
        )}
      </button>
    </form>
  )
}
