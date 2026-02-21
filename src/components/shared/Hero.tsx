import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { GradientOrb, WaveDivider } from '@/components/shared/DecorativeElements'

export interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}

export interface StatItem {
  value: string
  label: string
}

interface HeroProps {
  heading: string
  subheading?: string
  description?: string
  backgroundImage?: string
  variant?: 'fullWidth' | 'split' | 'centered' | 'carousel'
  ctaButtons?: CTAButton[]
  badge?: string
  stats?: StatItem[]
  children?: ReactNode
}

function CTAButtonGroup({ buttons, centered = true, light = false }: { buttons: CTAButton[]; centered?: boolean; light?: boolean }) {
  const variantClasses: Record<CTAButton['variant'], string> = {
    primary:
      'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange shadow-lg shadow-brand-orange/25',
    secondary:
      'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green shadow-lg shadow-brand-green/25',
    outline: light
      ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-brand-green'
      : 'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
  }

  return (
    <div
      className={`mt-6 flex flex-wrap gap-4 ${centered ? 'justify-center' : 'justify-start'}`}
    >
      {buttons.map((btn, index) => (
        <Link
          key={index}
          href={btn.href}
          {...(btn.href === '#quote' ? { 'data-quote-trigger': '' } : {})}
          className={`inline-flex items-center rounded-lg px-6 py-3 font-heading text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[btn.variant]}`}
        >
          {btn.label}
        </Link>
      ))}
    </div>
  )
}

function StatsRow({ stats, light = false, compact = false }: { stats: StatItem[]; light?: boolean; compact?: boolean }) {
  return (
    <div className={`mt-8 grid grid-cols-2 gap-3 ${compact ? 'lg:grid-cols-4' : 'md:grid-cols-4'}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`min-w-0 rounded-xl p-3 text-center ${
            light
              ? 'bg-white/10 backdrop-blur-sm'
              : 'bg-brand-green/10'
          }`}
        >
          <div
            className={`font-heading font-bold ${
              compact ? 'text-xl lg:text-2xl' : 'text-2xl md:text-3xl'
            } ${light ? 'text-white' : 'text-brand-green'}`}
          >
            {stat.value}
          </div>
          <div
            className={`mt-1 ${compact ? 'text-xs' : 'text-sm'} ${
              light ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Hero({
  heading,
  subheading,
  description,
  backgroundImage,
  variant = 'fullWidth',
  ctaButtons,
  badge,
  stats,
  children,
}: HeroProps) {
  if (variant === 'carousel') {
    return (
      <section className="relative min-h-[400px] md:min-h-[500px]">
        {children}
      </section>
    )
  }

  if (variant === 'centered') {
    return (
      <section className="relative overflow-hidden bg-gradient-subtle py-16 md:py-20">
        {/* Decorative */}
        <GradientOrb color="green" size="lg" className="-left-32 -top-32 opacity-50" />
        <GradientOrb color="orange" size="md" className="-bottom-16 -right-16 opacity-40" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-dots opacity-40" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {badge && (
            <span className="mb-4 inline-block rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green backdrop-blur-sm">
              {badge}
            </span>
          )}
          <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-3 font-display text-lg text-brand-orange md:text-xl">
              {subheading}
            </p>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
              {description}
            </p>
          )}
          {ctaButtons && ctaButtons.length > 0 && (
            <CTAButtonGroup buttons={ctaButtons} centered light />
          )}
          {stats && <StatsRow stats={stats} light={false} />}
          {children}
        </div>
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section className="bg-white">
        <div className="mx-auto grid min-h-[400px] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:min-h-[500px] md:grid-cols-2 lg:px-8">
          <div>
            {badge && (
              <span className="mb-4 inline-block rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green">
                {badge}
              </span>
            )}
            <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-3 font-display text-lg text-brand-orange md:text-xl">
                {subheading}
              </p>
            )}
            {description && (
              <p className="mt-4 text-base text-gray-600 md:text-lg">
                {description}
              </p>
            )}
            {ctaButtons && ctaButtons.length > 0 && (
              <CTAButtonGroup buttons={ctaButtons} centered={false} light />
            )}
            {stats && <StatsRow stats={stats} light={false} compact />}
            {children}
          </div>
          {backgroundImage && (
            <div className="relative hidden min-h-[400px] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white md:block">
              <Image
                src={backgroundImage}
                alt={heading}
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  // fullWidth (default)
  return (
    <section className="relative flex min-h-[400px] items-center overflow-hidden md:min-h-[500px]">
      {/* Background image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          role="presentation"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      )}

      {/* Premium overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/90 via-black/60 to-black/40"
        aria-hidden="true"
      />

      {/* Bottom gradient orb */}
      <GradientOrb color="green" size="lg" className="bottom-0 left-1/4 opacity-30" />

      {/* Wave divider */}
      <WaveDivider />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-brand-orange/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {badge}
          </span>
        )}
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-3 font-display text-lg text-brand-orange-light md:text-xl lg:text-2xl">
            {subheading}
          </p>
        )}
        {description && (
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-200 md:text-lg">
            {description}
          </p>
        )}
        {ctaButtons && ctaButtons.length > 0 && (
          <CTAButtonGroup buttons={ctaButtons} centered />
        )}
        {stats && <StatsRow stats={stats} light />}
        {children}
      </div>
    </section>
  )
}
