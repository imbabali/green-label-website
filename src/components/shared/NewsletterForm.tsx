'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@/lib/validators/email'
import { honeypotSchema } from '@/lib/validators/honeypot'
import HoneypotField from '@/components/shared/HoneypotField'
import { subscribeNewsletter } from '@/lib/actions/newsletter'

const newsletterSchema = z.object({
  email: emailSchema,
  name: z.string().max(100).optional().default(''),
  frequency: z.string().default('W'),
  website: honeypotSchema,
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterFormProps {
  variant?: 'footer' | 'inline' | 'section'
}

export default function NewsletterForm({
  variant = 'footer',
}: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(newsletterSchema) as any,
    defaultValues: {
      email: '',
      name: '',
      frequency: 'W',
      website: '',
    },
  })

  const onSubmit = useCallback(
    async (data: NewsletterFormData) => {
      // Honeypot check
      if (data.website) return

      setStatus('loading')

      try {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value))
          }
        })

        const result = await subscribeNewsletter({ success: false, message: '' }, formData)

        if (result.success) {
          setStatus('success')
          reset()
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    },
    [reset]
  )

  // Success message
  if (status === 'success') {
    const successMessage = (
      <div className="flex items-center gap-2 text-sm">
        <i
          className="fa-solid fa-circle-check text-green-400"
          aria-hidden="true"
        />
        <span
          className={
            variant === 'footer' ? 'text-green-300' : 'text-green-700'
          }
        >
          Thank you! You have been subscribed successfully.
        </span>
      </div>
    )

    if (variant === 'section') {
      return (
        <section className="cv-auto relative overflow-hidden bg-gradient-green py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-dots" />
          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              {successMessage}
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm text-white/80 underline hover:text-white"
              >
                Subscribe another email
              </button>
            </div>
          </div>
        </section>
      )
    }

    return (
      <div className="py-2">
        {successMessage}
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={`mt-2 text-xs underline ${
            variant === 'footer'
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-500 hover:text-brand-green'
          }`}
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  // Section variant - full layout
  if (variant === 'section') {
    return (
      <section className="cv-auto relative overflow-hidden bg-gradient-green py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-dots" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <i
            className="fa-solid fa-envelope-open-text mb-4 text-4xl text-brand-orange-light"
            aria-hidden="true"
          />
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Stay Updated
          </h2>
          <p className="mt-3 text-gray-200">
            Get the latest news on waste management, sustainability tips,
            and Green Label updates delivered to your inbox.
          </p>

          {/* Benefits */}
          <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-left text-sm text-gray-200">
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-check text-brand-orange-light" aria-hidden="true" />
              Industry news and sustainability tips
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-check text-brand-orange-light" aria-hidden="true" />
              Service updates and new offerings
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-check text-brand-orange-light" aria-hidden="true" />
              Exclusive promotions and events
            </li>
          </ul>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative mt-8"
          >
            <HoneypotField register={register as unknown as (name: string) => Record<string, unknown>} />
            <input type="hidden" {...register('frequency')} />

            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="newsletter-section-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="newsletter-section-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name (optional)"
                  className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  {...register('name')}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="newsletter-section-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-section-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Your email address *"
                  className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  {...register('email')}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-green disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {errors.email && (
              <p className="mt-2 text-left text-xs font-medium text-yellow-200" role="alert">
                {errors.email.message}
              </p>
            )}

            {status === 'error' && (
              <p className="mt-2 text-xs font-medium text-yellow-200" role="alert">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-3 text-xs text-gray-300">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>
    )
  }

  // Inline variant - single row
  if (variant === 'inline') {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="relative"
      >
        <HoneypotField register={register as unknown as (name: string) => Record<string, unknown>} />
        <input type="hidden" {...register('frequency')} />

        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="newsletter-inline-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-inline-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              {...register('email')}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex-shrink-0 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' ? (
              <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}

        {status === 'error' && (
          <p className="mt-1 text-xs text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    )
  }

  // Footer variant (default) - compact
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
      <HoneypotField register={register as unknown as (name: string) => Record<string, unknown>} />
      <input type="hidden" {...register('frequency')} />

      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="newsletter-footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-footer-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            {...register('email')}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex-shrink-0 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? (
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {errors.email && (
        <p className="mt-1 text-xs text-red-300" role="alert">{errors.email.message}</p>
      )}

      {status === 'error' && (
        <p className="mt-1 text-xs text-red-300" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
