'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@/lib/validators/email'
import { phoneSchema } from '@/lib/validators/phone'
import { honeypotSchema } from '@/lib/validators/honeypot'
import { SERVICE_TYPES, FREQUENCY_OPTIONS, TIMELINE_OPTIONS } from '@/lib/data/service-types'
import { UGANDA_DISTRICTS } from '@/lib/data/uganda-districts'

const BUDGET_RANGES = [
  { value: 'under_500k', label: 'Under UGX 500,000' },
  { value: '500k_1m', label: 'UGX 500,000 - 1,000,000' },
  { value: '1m_5m', label: 'UGX 1,000,000 - 5,000,000' },
  { value: '5m_10m', label: 'UGX 5,000,000 - 10,000,000' },
  { value: 'over_10m', label: 'Over UGX 10,000,000' },
  { value: 'negotiable', label: 'Negotiable' },
]

const quoteSchema = z.object({
  // Section 1 - Contact
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(200).optional().default(''),
  // Section 2 - Service
  service_type: z.string().min(1, 'Please select a service type'),
  location: z.string().min(1, 'Please select a location'),
  frequency: z.string().optional().default(''),
  estimated_volume: z.string().max(200).optional().default(''),
  // Section 3 - Details
  message: z.string().min(10, 'Please provide at least 10 characters of detail').max(2000),
  timeline: z.string().optional().default(''),
  budget_range: z.string().optional().default(''),
  marketing_consent: z.boolean().optional().default(false),
  // Honeypot
  website: honeypotSchema,
})

type QuoteFormData = z.infer<typeof quoteSchema>

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(quoteSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service_type: '',
      location: '',
      frequency: '',
      estimated_volume: '',
      message: '',
      timeline: '',
      budget_range: '',
      marketing_consent: false,
      website: '',
    },
  })

  const openModal = useCallback(() => {
    setIsOpen(true)
    setCurrentStep(1)
    setSubmitStatus('idle')
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setCurrentStep(1)
    setSubmitStatus('idle')
    reset()
  }, [reset])

  // Listen for quote trigger events
  useEffect(() => {
    function handleQuoteTrigger() {
      openModal()
    }

    // Listen for custom event
    window.addEventListener('open-quote-modal', handleQuoteTrigger)

    // Listen for click on elements with data-quote-trigger
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.closest('[data-quote-trigger]')) {
        e.preventDefault()
        openModal()
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('open-quote-modal', handleQuoteTrigger)
      document.removeEventListener('click', handleClick)
    }
  }, [openModal])

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  const nextStep = async () => {
    let fieldsToValidate: (keyof QuoteFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email']
    } else if (currentStep === 2) {
      fieldsToValidate = ['service_type', 'location']
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: QuoteFormData) => {
    // Honeypot check
    if (data.website) return

    setSubmitStatus('loading')

    try {
      // TODO: Replace with actual server action
      console.log('Quote request submitted:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  if (!isOpen) return null

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20'
  const labelClass = 'mb-1 block text-sm font-medium text-gray-700'
  const errorClass = 'mt-1 text-xs text-red-600'

  return (
    <div
      className="modal-overlay open fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="font-heading text-xl font-bold text-gray-900">
              Request A Quote
            </h2>
            <p className="text-sm text-gray-500">
              Step {currentStep} of 3
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close quote form"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-green"
          >
            <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-1 px-6 pt-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                step <= currentStep ? 'bg-brand-green' : 'bg-gray-200'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Success State */}
        {submitStatus === 'success' && (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <i
                className="fa-solid fa-check text-3xl text-brand-green"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-heading text-xl font-bold text-gray-900">
              Quote Request Sent!
            </h3>
            <p className="mt-2 max-w-sm text-gray-600">
              Thank you for your interest. Our team will review your request
              and get back to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-6 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        )}

        {/* Error State */}
        {submitStatus === 'error' && (
          <div className="px-6 py-4">
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <i className="fa-solid fa-circle-exclamation mr-2" aria-hidden="true" />
              Something went wrong. Please try again or contact us directly.
            </div>
          </div>
        )}

        {/* Form */}
        {submitStatus !== 'success' && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="px-6 py-4">
              {/* Honeypot */}
              <div
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="quote-website">Website</label>
                <input
                  id="quote-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <fieldset>
                  <legend className="mb-4 font-heading text-lg font-semibold text-gray-900">
                    <i className="fa-solid fa-user mr-2 text-brand-green" aria-hidden="true" />
                    Contact Information
                  </legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="quote-name" className={labelClass}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="quote-name"
                        type="text"
                        className={inputClass}
                        placeholder="John Doe"
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className={errorClass}>{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quote-email" className={labelClass}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        className={inputClass}
                        placeholder="john@example.com"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className={errorClass}>{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quote-phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        className={inputClass}
                        placeholder="+256 7XX XXX XXX"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className={errorClass}>{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quote-company" className={labelClass}>
                        Company / Organization
                      </label>
                      <input
                        id="quote-company"
                        type="text"
                        className={inputClass}
                        placeholder="Company name"
                        {...register('company')}
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {/* Step 2: Service Details */}
              {currentStep === 2 && (
                <fieldset>
                  <legend className="mb-4 font-heading text-lg font-semibold text-gray-900">
                    <i className="fa-solid fa-clipboard-list mr-2 text-brand-green" aria-hidden="true" />
                    Service Details
                  </legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="quote-service" className={labelClass}>
                        Service Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="quote-service"
                        className={inputClass}
                        {...register('service_type')}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_TYPES.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                      {errors.service_type && (
                        <p className={errorClass}>{errors.service_type.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quote-location" className={labelClass}>
                        Location / District <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="quote-location"
                        className={inputClass}
                        {...register('location')}
                      >
                        <option value="">Select a district</option>
                        {UGANDA_DISTRICTS.map((group) => (
                          <optgroup key={group.region} label={group.region}>
                            {group.districts.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="other">Other (specify in message)</option>
                      </select>
                      {errors.location && (
                        <p className={errorClass}>{errors.location.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quote-frequency" className={labelClass}>
                        Service Frequency
                      </label>
                      <select
                        id="quote-frequency"
                        className={inputClass}
                        {...register('frequency')}
                      >
                        <option value="">Select frequency</option>
                        {FREQUENCY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quote-volume" className={labelClass}>
                        Estimated Volume
                      </label>
                      <input
                        id="quote-volume"
                        type="text"
                        className={inputClass}
                        placeholder="e.g., 500kg/week, 3 skips"
                        {...register('estimated_volume')}
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {/* Step 3: Additional Details */}
              {currentStep === 3 && (
                <fieldset>
                  <legend className="mb-4 font-heading text-lg font-semibold text-gray-900">
                    <i className="fa-solid fa-message mr-2 text-brand-green" aria-hidden="true" />
                    Additional Details
                  </legend>
                  <div className="grid gap-4">
                    <div>
                      <label htmlFor="quote-message" className={labelClass}>
                        Describe Your Needs <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="quote-message"
                        rows={4}
                        className={inputClass}
                        placeholder="Please describe your waste management needs, any special requirements, or questions you may have..."
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className={errorClass}>{errors.message.message}</p>
                      )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="quote-timeline" className={labelClass}>
                          Timeline
                        </label>
                        <select
                          id="quote-timeline"
                          className={inputClass}
                          {...register('timeline')}
                        >
                          <option value="">Select timeline</option>
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="quote-budget" className={labelClass}>
                          Budget Range
                        </label>
                        <select
                          id="quote-budget"
                          className={inputClass}
                          {...register('budget_range')}
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_RANGES.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        id="quote-consent"
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                        {...register('marketing_consent')}
                      />
                      <label
                        htmlFor="quote-consent"
                        className="text-sm text-gray-600"
                      >
                        I consent to receiving promotional emails and updates
                        about Green Label Services. You can unsubscribe at any
                        time.
                      </label>
                    </div>
                  </div>
                </fieldset>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
                >
                  <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
                >
                  Next
                  <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                      Submit Request
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
