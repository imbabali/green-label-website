'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GradientOrb, WaveDivider } from '@/components/shared/DecorativeElements'

interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}

interface Slide {
  heading: string
  description: string
  backgroundImage: string
  ctaButtons: CTAButton[]
}

interface HeroCarouselProps {
  slides: Slide[]
}

const variantClasses: Record<CTAButton['variant'], string> = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange shadow-lg shadow-brand-orange/25',
  secondary:
    'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green shadow-lg shadow-brand-green/25',
  outline:
    'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (isPaused || slides.length <= 1) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide, slides.length])

  if (slides.length === 0) return null

  return (
    <div
      className="relative min-h-[400px] overflow-hidden md:min-h-[500px] lg:min-h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero slideshow"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
          aria-hidden={index !== currentSlide}
          className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
            index === currentSlide
              ? 'z-10 opacity-100'
              : 'z-0 opacity-0'
          }`}
        >
          {/* Background image with Ken Burns */}
          <div className="absolute inset-0">
            {slide.backgroundImage && (
              <Image
                src={slide.backgroundImage}
                alt=""
                role="presentation"
                fill
                sizes="100vw"
                className={`object-cover ${index === currentSlide ? 'ken-burns' : ''}`}
                priority={index === 0}
              />
            )}
            {/* Premium brand-tinted overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/80 via-black/50 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Decorative orb */}
          <GradientOrb color="green" size="lg" className="bottom-0 right-0 opacity-20" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[400px] items-center md:min-h-[500px] lg:min-h-[600px]">
            <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <h2
                className={`font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl ${
                  index === currentSlide ? 'animate-slide-up' : ''
                }`}
              >
                {slide.heading}
              </h2>
              <p
                className={`mx-auto mt-4 max-w-3xl text-base text-gray-200 md:text-lg lg:text-xl ${
                  index === currentSlide ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: '0.15s' }}
              >
                {slide.description}
              </p>
              {slide.ctaButtons.length > 0 && (
                <div
                  className={`mt-8 flex flex-wrap justify-center gap-4 ${
                    index === currentSlide ? 'animate-slide-up' : ''
                  }`}
                  style={{ animationDelay: '0.3s' }}
                >
                  {slide.ctaButtons.map((btn, btnIndex) => (
                    <Link
                      key={btnIndex}
                      href={btn.href}
                      className={`inline-flex items-center rounded-lg px-6 py-3 font-heading text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[btn.variant]}`}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Wave divider at bottom */}
      <WaveDivider className="z-20" />

      {/* Dot navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : undefined}
              className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 ${
                index === currentSlide
                  ? 'w-8 bg-brand-orange shadow-lg shadow-brand-orange/40'
                  : 'w-3 bg-white/30 backdrop-blur-sm hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
