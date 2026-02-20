import Link from 'next/link'
import type { ReactNode } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

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
  breadcrumbs?: BreadcrumbItem[]
  variant?: 'fullWidth' | 'split' | 'centered' | 'carousel'
  ctaButtons?: CTAButton[]
  badge?: string
  stats?: StatItem[]
  children?: ReactNode
}

function HeroBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-white/80 transition-colors hover:text-white"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <i
              className="fa-solid fa-chevron-right mx-2 text-xs text-white/50"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-white" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function CenteredBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center justify-center gap-1 text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-500 transition-colors hover:text-brand-green"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <i
              className="fa-solid fa-chevron-right mx-2 text-xs text-gray-400"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-500 transition-colors hover:text-brand-green"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-brand-green" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function CTAButtonGroup({ buttons, centered = true }: { buttons: CTAButton[]; centered?: boolean }) {
  const variantClasses: Record<CTAButton['variant'], string> = {
    primary:
      'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange',
    secondary:
      'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green',
    outline:
      'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
  }

  return (
    <div
      className={`mt-6 flex flex-wrap gap-4 ${centered ? 'justify-center' : 'justify-start'}`}
    >
      {buttons.map((btn, index) => (
        <Link
          key={index}
          href={btn.href}
          className={`inline-flex items-center rounded-lg px-6 py-3 font-heading text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[btn.variant]}`}
        >
          {btn.label}
        </Link>
      ))}
    </div>
  )
}

function StatsRow({ stats, light = false }: { stats: StatItem[]; light?: boolean }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 text-center ${
            light
              ? 'bg-white/10 backdrop-blur-sm'
              : 'bg-brand-green/10'
          }`}
        >
          <div
            className={`font-heading text-2xl font-bold md:text-3xl ${
              light ? 'text-white' : 'text-brand-green'
            }`}
          >
            {stat.value}
          </div>
          <div
            className={`mt-1 text-sm ${
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
  breadcrumbs,
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
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {breadcrumbs && <CenteredBreadcrumbs items={breadcrumbs} />}
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
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
              {description}
            </p>
          )}
          {ctaButtons && ctaButtons.length > 0 && (
            <CTAButtonGroup buttons={ctaButtons} centered />
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
            {breadcrumbs && (
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-1 text-sm">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="text-gray-500 transition-colors hover:text-brand-green"
                    >
                      Home
                    </Link>
                  </li>
                  {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i
                        className="fa-solid fa-chevron-right mx-2 text-xs text-gray-400"
                        aria-hidden="true"
                      />
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-gray-500 transition-colors hover:text-brand-green"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          className="font-medium text-brand-green"
                          aria-current="page"
                        >
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
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
              <CTAButtonGroup buttons={ctaButtons} centered={false} />
            )}
            {stats && <StatsRow stats={stats} light={false} />}
            {children}
          </div>
          {backgroundImage && (
            <div className="relative hidden overflow-hidden rounded-xl md:block">
              <img
                src={backgroundImage}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  // fullWidth (default)
  return (
    <section
      className="relative flex min-h-[400px] items-center md:min-h-[500px]"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-brand-orange/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
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
