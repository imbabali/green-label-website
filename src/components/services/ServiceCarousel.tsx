'use client'

import Link from 'next/link'

interface Service {
  title: string
  slug: string
  shortDescription: string
  featuredImage?: string
  icon?: string
  category?: { name: string; slug: string }
  isFeatured?: boolean
  href?: string
}

export default function ServiceCarousel({ services }: { services: Service[] }) {
  // Double for seamless infinite loop
  const items = [...services, ...services]

  return (
    <div className="group/carousel relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f9fafb] to-transparent sm:w-16" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f9fafb] to-transparent sm:w-16" aria-hidden="true" />

      <div className="flex w-max animate-marquee-slow gap-5 group-hover/carousel:[animation-play-state:paused]">
        {items.map((service, i) => {
          const serviceHref = service.href || `/services/${service.slug}`

          return (
            <div
              key={`${service.slug}-${i}`}
              className="card-premium group relative flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md sm:w-72 md:w-80"
            >
              {/* Icon area */}
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-brand-green/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <i className={`${service.icon || 'fa-solid fa-recycle'} text-2xl text-brand-green transition-colors group-hover:text-white`} aria-hidden="true" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-brand-green-dark/80 via-brand-green-dark/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link
                    href={serviceHref}
                    className="translate-y-3 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View Details
                  </Link>
                </div>
                {service.isFeatured && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-2.5 py-0.5 text-xs font-semibold text-white shadow-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Content area — flex-1 for uniform height */}
              <div className="flex flex-1 flex-col p-4 md:p-5">
                {service.category && (
                  <span className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-brand-green">
                    {service.category.name}
                  </span>
                )}
                <h3 className="font-heading text-base font-bold text-gray-900">
                  <Link href={serviceHref} className="transition-colors hover:text-brand-green">
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-600">
                  {service.shortDescription}
                </p>
                <Link
                  href={serviceHref}
                  className="mt-3 inline-flex items-center text-xs font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
                >
                  Learn More
                  <i className="fa-solid fa-arrow-right ml-1.5 text-[10px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
