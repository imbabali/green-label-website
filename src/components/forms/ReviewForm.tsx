'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SERVICE_TYPES } from '@/lib/data/service-types'
import StarRating from '@/components/shared/StarRating'
import { createReview, updateReview } from '@/lib/actions/review'

const ratingSchema = z
  .number({ message: 'Rating is required' })
  .min(1, 'Please select a rating')
  .max(5, 'Rating must be between 1 and 5')

const reviewSchema = z.object({
  service_type: z.enum(
    SERVICE_TYPES.map((s) => s.value) as [string, ...string[]],
    { message: 'Please select a service type' }
  ),
  service_name: z
    .string()
    .min(1, 'Service name is required')
    .max(200, 'Service name must be less than 200 characters')
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
    ),
  title: z
    .string()
    .min(1, 'Review title is required')
    .max(200, 'Title must be less than 200 characters'),
  overall_rating: ratingSchema,
  quality_rating: ratingSchema,
  value_rating: ratingSchema,
  customer_service_rating: ratingSchema,
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(5000, 'Review must be less than 5000 characters'),
  would_recommend: z.boolean().default(false),
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  initialData?: Partial<ReviewFormData>
  reviewId?: string
}

export default function ReviewForm({ initialData, reviewId }: ReviewFormProps) {
  const isEditMode = !!reviewId
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
  } = useForm<ReviewFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(reviewSchema) as any,
    defaultValues: {
      service_type: initialData?.service_type ?? undefined,
      service_name: initialData?.service_name ?? '',
      title: initialData?.title ?? '',
      overall_rating: initialData?.overall_rating ?? 0,
      quality_rating: initialData?.quality_rating ?? 0,
      value_rating: initialData?.value_rating ?? 0,
      customer_service_rating: initialData?.customer_service_rating ?? 0,
      comment: initialData?.comment ?? '',
      would_recommend: initialData?.would_recommend ?? false,
    },
  })

  const onSubmit = async (data: ReviewFormData) => {
    setSubmitStatus(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, String(value ?? '')))
      if (isEditMode && reviewId) {
        formData.append('review_id', reviewId)
      }
      const result = isEditMode
        ? await updateReview({ success: false, message: '' }, formData)
        : await createReview({ success: false, message: '' }, formData)
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        if (!isEditMode) {
          reset()
        }
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

  const ratingFields = [
    { name: 'overall_rating' as const, label: 'Overall Rating' },
    { name: 'quality_rating' as const, label: 'Quality' },
    { name: 'value_rating' as const, label: 'Value for Money' },
    { name: 'customer_service_rating' as const, label: 'Customer Service' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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

      {/* Service Type and Name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Service Type */}
        <div>
          <label htmlFor="review-service_type" className="mb-1 block text-sm font-medium text-gray-700">
            Service Type <span className="text-red-500">*</span>
          </label>
          <select
            id="review-service_type"
            {...register('service_type')}
            aria-invalid={!!errors.service_type}
            aria-describedby={errors.service_type ? 'review-service_type-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.service_type
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
          >
            <option value="">Select service type</option>
            {SERVICE_TYPES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service_type && (
            <p id="review-service_type-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.service_type.message}
            </p>
          )}
        </div>

        {/* Service Name */}
        <div>
          <label htmlFor="review-service_name" className="mb-1 block text-sm font-medium text-gray-700">
            Service Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="review-service_name"
            {...register('service_name')}
            aria-invalid={!!errors.service_name}
            aria-describedby={errors.service_name ? 'review-service_name-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
              errors.service_name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-brand-green'
            }`}
            placeholder="Name of the specific service"
          />
          {errors.service_name && (
            <p id="review-service_name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.service_name.message}
            </p>
          )}
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Ratings</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ratingFields.map((field) => (
            <div key={field.name}>
              <label
                id={`${field.name}-label`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {field.label} <span className="text-red-500">*</span>
              </label>
              <Controller
                name={field.name}
                control={control}
                render={({ field: controllerField }) => (
                  <StarRating
                    rating={controllerField.value}
                    onChange={controllerField.onChange}
                    interactive
                  />
                )}
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="review-title" className="mb-1 block text-sm font-medium text-gray-700">
          Review Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="review-title"
          {...register('title')}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'review-title-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.title
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="Summarize your experience"
        />
        {errors.title && (
          <p id="review-title-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Review Comment */}
      <div>
        <label htmlFor="review-comment" className="mb-1 block text-sm font-medium text-gray-700">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-comment"
          {...register('comment')}
          rows={5}
          aria-invalid={!!errors.comment}
          aria-describedby={errors.comment ? 'review-comment-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.comment
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="Share the details of your experience with this service..."
        />
        {errors.comment && (
          <p id="review-comment-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.comment.message}
          </p>
        )}
      </div>

      {/* Would Recommend */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          {...register('would_recommend')}
          className="h-5 w-5 rounded border-gray-300 text-brand-green accent-brand-green"
        />
        <span className="text-sm font-medium text-gray-700">
          I would recommend Green Label Services to others
        </span>
      </label>

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
            {isEditMode ? 'Updating...' : 'Submitting...'}
          </>
        ) : isEditMode ? (
          'Update Review'
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  )
}
