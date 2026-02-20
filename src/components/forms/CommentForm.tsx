'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/validators/email'
import { submitComment } from '@/lib/actions/comment'

const SPAM_PATTERNS = /viagra|cialis|casino|get rich/i

const commentSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: emailSchema,
  website: z
    .string()
    .default('')
    .refine((val) => !val || /^https?:\/\//.test(val), {
      message: 'Must be a valid URL starting with http:// or https://',
    }),
  content: z
    .string()
    .min(3, 'Comment must be at least 3 characters')
    .max(5000, 'Comment must be less than 5000 characters')
    .refine((val) => !SPAM_PATTERNS.test(val), {
      message: 'Your comment was flagged as potential spam. Please revise and try again.',
    }),
  honeypot: z.string().default(''),
  post_slug: z.string(),
  parent_id: z.string().default(''),
})

type CommentFormData = z.infer<typeof commentSchema>

interface CommentFormProps {
  postSlug: string
  parentId?: string
  onCancel?: () => void
}

export default function CommentForm({
  postSlug,
  parentId,
  onCancel,
}: CommentFormProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(commentSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      website: '',
      content: '',
      honeypot: '',
      post_slug: postSlug,
      parent_id: parentId ?? '',
    },
  })

  const onSubmit = async (data: CommentFormData) => {
    setSubmitStatus(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, value))
      const result = await submitComment({ success: false, message: '' }, formData)
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Hidden fields */}
      <input type="hidden" {...register('post_slug')} />
      <input type="hidden" {...register('parent_id')} />

      {/* Reply banner */}
      {parentId && (
        <div className="flex items-center justify-between rounded-lg border border-brand-green/20 bg-green-50 px-4 py-3">
          <p className="text-sm font-medium text-brand-green">
            Replying to comment
          </p>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-medium text-gray-600 underline hover:text-gray-800"
            >
              Cancel reply
            </button>
          )}
        </div>
      )}

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

      {/* Name and Email Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="comment-name" className="mb-1 block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="comment-name"
            {...register('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'comment-name-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="comment-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="comment-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="comment-email"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'comment-email-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p id="comment-email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Website */}
      <div>
        <label htmlFor="comment-website" className="mb-1 block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="url"
          id="comment-website"
          {...register('website')}
          aria-invalid={!!errors.website}
          aria-describedby={errors.website ? 'comment-website-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.website
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="https://yourwebsite.com"
        />
        {errors.website && (
          <p id="comment-website-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.website.message}
          </p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="comment-content" className="mb-1 block text-sm font-medium text-gray-700">
          Comment <span className="text-red-500">*</span>
        </label>
        <textarea
          id="comment-content"
          {...register('content')}
          rows={4}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'comment-content-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.content
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="Share your thoughts..."
        />
        {errors.content && (
          <p id="comment-content-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Honeypot - hidden from real users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="comment-honeypot">Leave this field empty</label>
        <input
          type="text"
          id="comment-honeypot"
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <svg
              className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
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
            Posting...
          </>
        ) : (
          'Post Comment'
        )}
      </button>
    </form>
  )
}
