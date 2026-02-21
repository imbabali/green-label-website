'use client'

import { useState, useCallback } from 'react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
}

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
}

export default function StarRating({
  rating,
  size = 'md',
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = useCallback(
    (value: number) => {
      if (interactive && onChange) {
        onChange(value)
      }
    },
    [interactive, onChange]
  )

  const handleMouseEnter = useCallback(
    (value: number) => {
      if (interactive) {
        setHoverRating(value)
      }
    },
    [interactive]
  )

  const handleMouseLeave = useCallback(() => {
    if (interactive) {
      setHoverRating(0)
    }
  }, [interactive])

  const displayRating = hoverRating || rating

  const renderStar = (index: number) => {
    const starValue = index + 1
    const fillLevel = displayRating - index

    let iconClass: string
    if (fillLevel >= 1) {
      iconClass = 'fa-solid fa-star'
    } else if (fillLevel >= 0.5) {
      iconClass = 'fa-solid fa-star-half-stroke'
    } else {
      iconClass = 'fa-regular fa-star'
    }

    if (interactive) {
      return (
        <button
          key={index}
          type="button"
          role="radio"
          aria-checked={rating === starValue}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
          aria-label={`${starValue} of 5 stars`}
          className="star cursor-pointer text-brand-orange transition-transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:ring-offset-1 rounded-sm"
        >
          <i className={iconClass} aria-hidden="true" />
        </button>
      )
    }

    return (
      <span key={index} className="star text-brand-orange">
        <i className={iconClass} aria-hidden="true" />
      </span>
    )
  }

  return (
    <div
      className={`star-rating inline-flex items-center gap-0.5 ${sizeClasses[size]}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={
        interactive
          ? 'Star rating selector'
          : `Rating: ${rating} out of 5 stars`
      }
    >
      {Array.from({ length: 5 }, (_, i) => renderStar(i))}
    </div>
  )
}
