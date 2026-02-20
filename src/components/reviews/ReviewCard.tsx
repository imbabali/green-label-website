import Link from 'next/link'
import StarRating from '@/components/shared/StarRating'
import { formatDateShort } from '@/lib/utils/format'
import { SERVICE_TYPE_MAP } from '@/lib/data/service-types'

interface ReviewCardProps {
  review: {
    id: string
    title: string
    comment: string
    overall_rating: number
    service_type: string
    service_name: string
    would_recommend: boolean
    created_at: string
    profiles?: { first_name: string | null; last_name: string | null }
  }
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const authorName = review.profiles
    ? `${review.profiles.first_name || ''} ${review.profiles.last_name || ''}`.trim() || 'Anonymous'
    : 'Anonymous'

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <StarRating rating={review.overall_rating} size="md" />
        {review.would_recommend && (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            <i className="fa-solid fa-thumbs-up mr-1" /> Recommends
          </span>
        )}
      </div>

      <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
        <Link href={`/reviews/${review.id}`} className="hover:text-brand-green">
          {review.title}
        </Link>
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {review.comment.length > 200 ? review.comment.slice(0, 200) + '...' : review.comment}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
            {authorName.charAt(0)}
          </div>
          <span className="font-medium text-gray-700">{authorName}</span>
        </div>
        <div className="text-right">
          <span className="block text-xs text-brand-green">
            {SERVICE_TYPE_MAP[review.service_type as keyof typeof SERVICE_TYPE_MAP] || review.service_type}
          </span>
          <span className="text-xs text-gray-400">{formatDateShort(review.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
