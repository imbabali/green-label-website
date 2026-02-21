import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ServiceCard from '@/components/services/ServiceCard'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { serviceListQuery, serviceCategoriesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import EmptyState from '@/components/shared/EmptyState'

export const revalidate = 300

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Services',
    description: 'Comprehensive waste management services including medical waste, hazardous waste, oil & gas waste, recycling, and environmental consulting across Uganda.',
    path: '/services',
  })
}

export default async function ServicesPage() {
  let services: any[] = []
  let categories: any[] = []

  try {
    const [servicesData, catsData] = await Promise.all([
      sanityFetch<any[]>({ query: serviceListQuery }),
      sanityFetch<any[]>({ query: serviceCategoriesQuery }),
    ])
    services = servicesData || []
    categories = catsData || []
  } catch {
    // fallback
  }

  const transformedServices = services.map((s: any) => ({
    title: s.title,
    slug: s.slug?.current || s.slug,
    shortDescription: s.shortDescription || '',
    featuredImage: s.featuredImage ? urlFor(s.featuredImage).width(600).url() : undefined,
    icon: s.icon,
    category: s.category ? { name: s.category.name, slug: s.category.slug?.current || s.category.slug } : undefined,
    isFeatured: s.isFeatured,
  }))

  return (
    <>
      <Hero backgroundImage="/images/vehicles/harzard_vehicle3.jpg"
        heading="Our Services"
        subheading="Comprehensive Waste Management Solutions"
        variant="fullWidth"
        description="From medical waste to oil & gas operations, we provide safe, compliant, and environmentally responsible waste management across Uganda."
      />

      {/* Category filters — glass style */}
      {categories.length > 0 && (
        <section className="border-b border-gray-200 bg-white/80 py-6 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-4">
            {categories.map((cat: any) => (
              <Link
                key={cat.slug?.current || cat.slug}
                href={`/services/category/${cat.slug?.current || cat.slug}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-brand-green hover:text-white hover:shadow-md"
              >
                {cat.icon && <i className={`${cat.icon} mr-1`} />}
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {transformedServices.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {transformedServices.map((service: any, index: number) => (
                  <div key={service.slug} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-recycle"
              title="Services coming soon"
              description="Contact us for more information."
              actionLabel="Contact Us"
              actionHref="/contact"
            />
          )}
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building' },
          { value: 76000, label: 'Tonnes Recycled', icon: 'fa-solid fa-recycle' },
          { value: 99, suffix: '%', label: 'Satisfaction', icon: 'fa-solid fa-star' },
        ]}
        darkBackground
      />

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-16">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Need a Custom Waste Management Solution?
          </h2>
          <p className="mt-4 text-gray-200">
            Contact us for a tailored quote based on your specific requirements.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Get A Quote
            </Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
