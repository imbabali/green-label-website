'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface StatItem {
  value: number
  suffix?: string
  label: string
  icon?: string
  iconNode?: React.ReactNode
}

interface StatsCounterProps {
  stats: StatItem[]
  darkBackground?: boolean
}

function useCountAnimation(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(easedProgress * target)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return count
}

function StatCard({
  stat,
  isVisible,
  darkBackground,
  index,
}: {
  stat: StatItem
  isVisible: boolean
  darkBackground: boolean
  index: number
}) {
  const count = useCountAnimation(stat.value, isVisible)

  return (
    <div
      className={`reveal reveal-up stagger-${index + 1} flex flex-col items-center rounded-2xl p-4 text-center transition-all duration-500 md:p-6 ${
        isVisible ? 'visible' : ''
      } ${
        darkBackground
          ? 'glass-dark'
          : 'card-premium bg-white shadow-lg'
      }`}
    >
      {stat.iconNode ? (
        <div className={`mb-3 ${darkBackground ? 'text-brand-orange-light' : 'text-brand-orange'}`}>
          {stat.iconNode}
        </div>
      ) : stat.icon ? (
        <i
          className={`${stat.icon} mb-3 text-2xl md:text-3xl ${
            darkBackground ? 'text-brand-orange-light' : 'text-brand-orange'
          }`}
          aria-hidden="true"
        />
      ) : null}
      <div
        className={`font-heading text-2xl font-bold md:text-3xl lg:text-4xl ${
          darkBackground ? 'text-white' : 'text-brand-green'
        }`}
      >
        {count.toLocaleString()}
        {stat.suffix && (
          <span className="text-brand-orange">{stat.suffix}</span>
        )}
      </div>
      <p
        className={`mt-2 text-sm font-medium md:text-base ${
          darkBackground ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {stat.label}
      </p>
    </div>
  )
}

export default function StatsCounter({
  stats,
  darkBackground = false,
}: StatsCounterProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    },
    []
  )

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [handleIntersection])

  return (
    <section
      ref={sectionRef}
      className={`cv-auto relative overflow-hidden py-12 md:py-16 ${
        darkBackground ? 'bg-gradient-green pattern-dots' : 'bg-gradient-subtle'
      }`}
      aria-label="Company statistics"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              darkBackground={darkBackground}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
