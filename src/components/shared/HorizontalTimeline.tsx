'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Milestone {
  year: number
  icon: string
  title: string
  description: string
  image: string
}

interface HorizontalTimelineProps {
  milestones: Milestone[]
}

export default function HorizontalTimeline({ milestones }: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  // IntersectionObserver to track which card is most visible
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('[data-milestone-index]')
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry
            }
          }
        }
        if (bestEntry) {
          const idx = Number((bestEntry.target as HTMLElement).dataset.milestoneIndex)
          if (!isNaN(idx)) setActiveIndex(idx)
        }
      },
      { root: el, threshold: [0.5, 0.75, 1] },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [milestones])

  // Update arrow visibility on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  // Auto-advance to next card every 5s
  useEffect(() => {
    if (isPaused || milestones.length <= 1) return

    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return

      // If at end, wrap to start; otherwise scroll to next card
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        const first = el.querySelector<HTMLElement>('[data-milestone-index="0"]')
        if (first) first.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      } else {
        const cardWidth = el.querySelector<HTMLElement>('[data-milestone-index]')?.offsetWidth ?? 520
        el.scrollBy({ left: cardWidth + 24, behavior: 'smooth' })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, milestones.length])

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(`[data-milestone-index="${index}"]`)
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector<HTMLElement>('[data-milestone-index]')?.offsetWidth ?? 520
    el.scrollBy({ left: direction === 'left' ? -cardWidth - 24 : cardWidth + 24, behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByDirection('left')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByDirection('right')
    }
  }

  // Progress percentage for the bar fill
  const progressPercent = milestones.length > 1 ? (activeIndex / (milestones.length - 1)) * 100 : 0

  return (
    <div className="mt-12">
      {/* Year Navigation Bar */}
      <div className="mb-8 px-2">
        <div className="relative mx-auto max-w-4xl">
          {/* Track background */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-200" aria-hidden="true" />
          {/* Filled track */}
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(to right, #2c632c, #F7941D)',
            }}
            aria-hidden="true"
          />
          {/* Year dots */}
          <div className="relative flex justify-between">
            {milestones.map((milestone, index) => {
              const isActive = index === activeIndex
              const isPast = index <= activeIndex
              return (
                <button
                  key={milestone.year}
                  onClick={() => scrollToIndex(index)}
                  className="group flex flex-col items-center gap-2"
                  aria-label={`Go to ${milestone.year}: ${milestone.title}`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'scale-125 border-brand-orange bg-brand-orange shadow-lg shadow-brand-orange/30'
                        : isPast
                          ? 'border-brand-green bg-brand-green'
                          : 'border-gray-300 bg-white group-hover:border-brand-green'
                    }`}
                  >
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span
                    className={`hidden text-xs font-bold transition-colors sm:block ${
                      isActive ? 'text-brand-orange' : isPast ? 'text-brand-green' : 'text-gray-400'
                    }`}
                  >
                    {milestone.year}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        className="group/timeline relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={() => scrollByDirection('left')}
          className={`absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:flex ${
            canScrollLeft ? 'opacity-0 group-hover/timeline:opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-label="Scroll left"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollByDirection('right')}
          className={`absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:flex ${
            canScrollRight ? 'opacity-0 group-hover/timeline:opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-label="Scroll right"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards Row */}
        <div
          ref={scrollRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Timeline milestones"
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc(50%-min(42.5vw,260px))] pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          {milestones.map((milestone, index) => (
            <article
              key={milestone.year}
              data-milestone-index={index}
              className={`card-premium w-[85vw] max-w-[520px] shrink-0 snap-center overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 ${
                index === activeIndex ? 'border-brand-green/30 shadow-lg' : 'border-gray-100'
              }`}
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden sm:h-64">
                <Image
                  src={milestone.image}
                  alt={milestone.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 520px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Year badge overlay */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold shadow-lg backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-brand-green" />
                    {milestone.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10">
                    <i className={`${milestone.icon} text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900">{milestone.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{milestone.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <p className="mt-3 text-center text-xs text-gray-400 md:hidden">
          Swipe to explore our journey
        </p>
      </div>
    </div>
  )
}
