'use client'

import { useState, useEffect, useCallback } from 'react'
import StarRating from '@/components/shared/StarRating'
import { truncate } from '@/lib/utils/format'
import { formatDateShort } from '@/lib/utils/format'

interface ReviewProfile {
  first_name: string | null
  last_name: string | null
}

interface Review {
  id: string
  title: string
  comment: string
  overall_rating: number
  service_type: string
  created_at: string
  profiles?: ReviewProfile
}

interface ReviewCarouselProps {
  reviews: Review[]
}

function getAuthorName(profiles?: ReviewProfile): string {
  if (!profiles) return 'Anonymous'
  const first = profiles.first_name || ''
  const last = profiles.last_name || ''
  const name = `${first} ${last}`.trim()
  return name || 'Anonymous'
}

function formatServiceType(type: string): string {
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(1)

  // Responsive visible count
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3)
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2)
      } else {
        setVisibleCount(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, reviews.length - visibleCount)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Auto-rotate
  useEffect(() => {
    if (isPaused || reviews.length <= visibleCount) return

    const interval = setInterval(goToNext, 6000)
    return () => clearInterval(interval)
  }, [isPaused, goToNext, reviews.length, visibleCount])

  if (reviews.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No reviews available yet.
      </p>
    )
  }

  const totalDots = maxIndex + 1

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
    >
      {/* Navigation Arrows */}
      {reviews.length > visibleCount && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous review"
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            <i className="fa-solid fa-chevron-left text-sm text-gray-700" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next review"
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            <i className="fa-solid fa-chevron-right text-sm text-gray-700" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Cards Container */}
      <div className="overflow-hidden px-2">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleCount}%` }}
              role="group"
              aria-roledescription="slide"
            >
              <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
                {/* Star Rating */}
                <StarRating rating={review.overall_rating} size="sm" />

                {/* Title */}
                <h3 className="mt-3 font-heading text-base font-bold text-gray-900">
                  {review.title}
                </h3>

                {/* Comment */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {truncate(review.comment, 150)}
                </p>

                {/* Footer */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getAuthorName(review.profiles)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatServiceType(review.service_type)}
                      </p>
                    </div>
                    <time
                      dateTime={review.created_at}
                      className="text-xs text-gray-400"
                    >
                      {formatDateShort(review.created_at)}
                    </time>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      {reviews.length > visibleCount && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalDots }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to review set ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ${
                i === currentIndex
                  ? 'w-6 bg-brand-green'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
