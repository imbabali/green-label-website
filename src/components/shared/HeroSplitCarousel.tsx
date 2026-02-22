'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}

interface Slide {
  heading: string
  description: string
  backgroundImage: string
  badge?: string
  ctaButtons: CTAButton[]
}

const btnClasses: Record<CTAButton['variant'], string> = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange shadow-lg shadow-brand-orange/25',
  secondary:
    'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green shadow-lg shadow-brand-green/25',
  outline:
    'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-brand-green',
}

export default function HeroSplitCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (isPaused || slides.length <= 1) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isPaused, next, slides.length])

  if (slides.length === 0) return null

  return (
    <section
      className="bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero slideshow"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 sm:px-6 md:min-h-[500px] md:grid-cols-2 md:gap-8 md:py-12 lg:px-8">
        {/* Text side */}
        <div className="relative min-h-[220px] md:min-h-[320px]">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${slides.length}`}
              aria-hidden={i !== current}
              className={`transition-all duration-500 ${
                i === current
                  ? 'relative opacity-100'
                  : 'pointer-events-none absolute inset-0 opacity-0'
              }`}
            >
              {slide.badge && (
                <span className="mb-4 inline-block rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green">
                  {slide.badge}
                </span>
              )}
              <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                {slide.heading}
              </h1>
              <p className="mt-4 text-base text-gray-600 md:text-lg">
                {slide.description}
              </p>
              {slide.ctaButtons.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {slide.ctaButtons.map((btn, bi) => (
                    <Link
                      key={bi}
                      href={btn.href}
                      {...(btn.href === '#quote' ? { 'data-quote-trigger': '' } : {})}
                      className={`inline-flex items-center rounded-lg px-6 py-3 font-heading text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${btnClasses[btn.variant]}`}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Image side — mobile: single rounded image, desktop: cycling images */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl ring-2 ring-white md:hidden">
          <Image
            src={slides[current].backgroundImage}
            alt={slides[current].heading}
            fill
            sizes="100vw"
            className="object-cover transition-opacity duration-500"
            priority
          />
        </div>
        <div className="relative hidden min-h-[400px] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white md:block">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <Image
                src={slide.backgroundImage}
                alt={slide.heading}
                fill
                sizes="50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 pb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ${
                i === current
                  ? 'w-8 bg-brand-green shadow-md shadow-brand-green/30'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
