'use client'

import { useRef, useState, useEffect } from 'react'

interface Release {
  date: string
  title: string
  summary: string
  tag: string
}

interface PressTimelineProps {
  releases: Release[]
  tagColors: Record<string, string>
}

const tagNodeColors: Record<string, string> = {
  Expansion: 'bg-blue-500 shadow-blue-300/50',
  Partnership: 'bg-purple-500 shadow-purple-300/50',
  Certification: 'bg-green-500 shadow-green-300/50',
  Community: 'bg-amber-500 shadow-amber-300/50',
  Training: 'bg-teal-500 shadow-teal-300/50',
  Investment: 'bg-rose-500 shadow-rose-300/50',
}

export default function PressTimeline({ releases, tagColors }: PressTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-advance to next card every 4s
  useEffect(() => {
    if (isPaused || releases.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= releases.length - 1 ? 0 : prev + 1
        const el = scrollRef.current
        if (el) {
          const card = el.querySelector<HTMLElement>(`[data-release-index="${next}"]`)
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
          }
        }
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, releases.length])

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className="relative"
      role="region"
      aria-roledescription="timeline"
      aria-label="Press releases timeline"
    >
      <div
        ref={scrollRef}
        className="hide-scrollbar overflow-x-auto scroll-smooth pb-2"
      >
        <div className="relative flex min-w-max">
          {/* Gradient track line — positioned at node centre */}
          <div
            className="pointer-events-none absolute inset-x-8 top-[34px] h-[3px] rounded-full"
            style={{ background: 'linear-gradient(to right, #2c632c, #3a8a3a, #F7941D)' }}
            aria-hidden="true"
          />

          {/* Directional chevrons on track */}
          {releases.length > 1 && (
            <>
              <i className="fa-solid fa-chevron-right pointer-events-none absolute left-3 top-[30px] text-[10px] text-brand-green/50" aria-hidden="true" />
              <i className="fa-solid fa-chevron-right pointer-events-none absolute right-3 top-[30px] text-[10px] text-brand-orange/50" aria-hidden="true" />
            </>
          )}

          {/* Release items */}
          {releases.map((r, i) => {
            const isActive = i === activeIndex
            const nodeColor = tagNodeColors[r.tag] || 'bg-gray-400 shadow-gray-300/50'

            return (
              <div
                key={r.title}
                data-release-index={i}
                className="relative flex w-56 shrink-0 cursor-pointer snap-center flex-col items-center px-3 sm:w-64"
                onClick={() => {
                  setActiveIndex(i)
                  setIsPaused(true)
                }}
              >
                {/* Date label */}
                <p className={`mb-2 text-xs font-bold transition-colors duration-300 ${isActive ? 'text-brand-green' : 'text-gray-400'}`}>
                  <i className="fa-regular fa-calendar mr-1" aria-hidden="true" />
                  {r.date}
                </p>

                {/* Node on track */}
                <div className={`relative z-10 mb-2 h-4 w-4 rounded-full shadow-md ring-[3px] ring-white transition-transform duration-300 ${nodeColor} ${isActive ? 'scale-150' : ''}`} />

                {/* Connector line */}
                <div className={`mb-2 h-5 w-px transition-colors duration-300 ${isActive ? 'bg-brand-green/40' : 'bg-gray-200'}`} aria-hidden="true" />

                {/* Card */}
                <div className={`card-premium w-full rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 ${isActive ? 'border-brand-green/30 shadow-lg -translate-y-1' : 'border-gray-100'}`}>
                  <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${tagColors[r.tag]}`}>
                    {r.tag}
                  </span>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{r.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{r.summary}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="mt-4 flex justify-center gap-1.5">
        {releases.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActiveIndex(i)
              const el = scrollRef.current
              if (el) {
                const card = el.querySelector<HTMLElement>(`[data-release-index="${i}"]`)
                if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
              }
            }}
            aria-label={`Go to release ${i + 1}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-5 bg-brand-green' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-xs text-gray-400 md:hidden">
        Swipe to explore timeline
      </p>
    </div>
  )
}
