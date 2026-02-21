'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

interface CardCarouselProps {
  children: ReactNode
  className?: string
  /** Hint text shown on mobile */
  hint?: string
}

export default function CardCarousel({
  children,
  className = '',
  hint = 'Swipe to explore',
}: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(':scope > *')
    const cardWidth = card ? card.offsetWidth + 24 : 340
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scroll('left') }
    if (e.key === 'ArrowRight') { e.preventDefault(); scroll('right') }
  }

  return (
    <div className={`group/carousel relative ${className}`}>
      <button
        onClick={() => scroll('left')}
        className={`absolute -left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:flex ${
          canScrollLeft ? 'opacity-0 group-hover/carousel:opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label="Scroll left"
      >
        <i className="fa-solid fa-chevron-left text-sm text-gray-700" aria-hidden="true" />
      </button>
      <button
        onClick={() => scroll('right')}
        className={`absolute -right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:flex ${
          canScrollRight ? 'opacity-0 group-hover/carousel:opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label="Scroll right"
      >
        <i className="fa-solid fa-chevron-right text-sm text-gray-700" aria-hidden="true" />
      </button>

      <div
        ref={scrollRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Scrollable cards"
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        {children}
      </div>

      {hint && (
        <p className="mt-2 text-center text-xs text-gray-400 md:hidden">{hint}</p>
      )}
    </div>
  )
}
