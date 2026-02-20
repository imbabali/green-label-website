'use client'

import StarRating from '@/components/shared/StarRating'
import { formatDate } from '@/lib/utils/format'
import { SERVICE_TYPE_MAP } from '@/lib/data/service-types'
import { deleteReview } from '@/lib/actions/review'
import Link from 'next/link'
import { useState } from 'react'

interface ReviewDetailProps {
  review: {
    id: string
    title: string
    comment: string
    overall_rating: number
    quality_rating: number | null
    value_rating: number | null
    customer_service_rating: number | null
    service_type: string
    service_name: string
    would_recommend: boolean
    created_at: string
    profiles?: { first_name: string | null; last_name: string | null }
  }
  isOwner?: boolean
}

export default function ReviewDetail({ review, isOwner }: ReviewDetailProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const authorName = review.profiles
    ? `${review.profiles.first_name || ''} ${review.profiles.last_name || ''}`.trim() || 'Anonymous'
    : 'Anonymous'

  const ratings = [
    { label: 'Overall', value: review.overall_rating },
    { label: 'Quality', value: review.quality_rating },
    { label: 'Value for Money', value: review.value_rating },
    { label: 'Customer Service', value: review.customer_service_rating },
  ]

  async function handleDelete() {
    await deleteReview(review.id)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">{review.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            By {authorName} on {formatDate(review.created_at)}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/reviews/${review.id}/edit`}
              className="rounded-md border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green hover:bg-brand-green hover:text-white"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center gap-4 text-sm">
          <span className="rounded-full bg-brand-green/10 px-3 py-1 font-medium text-brand-green">
            {SERVICE_TYPE_MAP[review.service_type as keyof typeof SERVICE_TYPE_MAP] || review.service_type}
          </span>
          <span className="text-gray-600">{review.service_name}</span>
          {review.would_recommend && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <i className="fa-solid fa-thumbs-up mr-1" /> Would Recommend
            </span>
          )}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {ratings.map(
          (r) =>
            r.value && (
              <div key={r.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="mb-2 text-sm font-medium text-gray-500">{r.label}</p>
                <StarRating rating={r.value} size="sm" />
                <p className="mt-1 text-lg font-bold text-gray-900">{r.value}/5</p>
              </div>
            )
        )}
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-bold">Delete Review?</h3>
            <p className="mb-4 text-gray-600">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
