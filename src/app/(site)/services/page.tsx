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

export const revalidate = 300

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Services',
    description: 'Comprehensive waste management services including medical waste, hazardous waste, oil & gas waste, recycling, and environmental consulting across Uganda.',
    path: '/services',
  })
}

// ---------------------------------------------------------------------------
// Fallback data — shown when Sanity CMS is not configured
// ---------------------------------------------------------------------------

const fallbackCategories = [
  { name: 'Hazardous Waste', slug: 'hazardous', icon: 'fa-solid fa-biohazard' },
  { name: 'Non-Hazardous Waste', slug: 'non-hazardous', icon: 'fa-solid fa-recycle' },
  { name: 'Oil & Gas Solutions', slug: 'oil-gas', icon: 'fa-solid fa-oil-well' },
  { name: 'Training & Development', slug: 'training', icon: 'fa-solid fa-graduation-cap' },
  { name: 'Logistics & Transport', slug: 'logistics', icon: 'fa-solid fa-truck-fast' },
]

const fallbackServices = [
  {
    title: 'Medical Waste Management',
    slug: 'medical-waste',
    href: '/public-health',
    shortDescription: 'Safe collection, segregation, transport, and treatment of healthcare waste from hospitals, clinics, laboratories, and pharmacies — fully WHO and NEMA compliant.',
    icon: 'fa-solid fa-syringe',
    category: { name: 'Hazardous Waste', slug: 'hazardous' },
    isFeatured: true,
  },
  {
    title: 'Oil & Gas Waste Management',
    slug: 'oil-gas-waste',
    href: '/oil-and-gas',
    shortDescription: 'Specialist waste handling for the petroleum sector — drill cuttings, produced water, chemical waste, and 24/7 spill response across the Albertine Graben.',
    icon: 'fa-solid fa-oil-well',
    category: { name: 'Oil & Gas Solutions', slug: 'oil-gas' },
    isFeatured: true,
  },
  {
    title: 'Domestic & Retail Waste Collection',
    slug: 'domestic-retail',
    href: '/waste-management',
    shortDescription: 'Scheduled collection of general, organic, and recyclable waste from residential estates, shopping centres, markets, and commercial premises.',
    icon: 'fa-solid fa-store',
    category: { name: 'Non-Hazardous Waste', slug: 'non-hazardous' },
    isFeatured: true,
  },
  {
    title: 'Hazardous Waste Disposal',
    slug: 'hazardous-waste',
    href: '/waste-management',
    shortDescription: 'Licensed handling, transport, and disposal of hazardous industrial waste including chemicals, solvents, and contaminated materials under NEMA protocols.',
    icon: 'fa-solid fa-skull-crossbones',
    category: { name: 'Hazardous Waste', slug: 'hazardous' },
    isFeatured: false,
  },
  {
    title: 'Transportation & Logistics',
    slug: 'transport-logistics',
    href: '/transport',
    shortDescription: 'GPS-tracked fleet of 50+ specialist vehicles — compactors, vacuum tankers, medical vans, skip loaders, and HAZMAT emergency units.',
    icon: 'fa-solid fa-truck-fast',
    category: { name: 'Logistics & Transport', slug: 'logistics' },
    isFeatured: true,
  },
  {
    title: 'Industrial Waste Management',
    slug: 'industrial-waste',
    href: '/waste-management',
    shortDescription: 'Tailored waste management for manufacturers, factories, and processing plants — on-site audits, custom collection schedules, and regulatory compliance.',
    icon: 'fa-solid fa-industry',
    category: { name: 'Non-Hazardous Waste', slug: 'non-hazardous' },
    isFeatured: false,
  },
  {
    title: 'Mining Waste Solutions',
    slug: 'mining-waste',
    href: '/mining',
    shortDescription: 'Waste characterisation, tailings management, chemical disposal, and site remediation for mining operations — ISO 14001 and IFC compliant.',
    icon: 'fa-solid fa-mountain',
    category: { name: 'Hazardous Waste', slug: 'hazardous' },
    isFeatured: false,
  },
  {
    title: 'Waste Management Training',
    slug: 'training-academy',
    href: '/training',
    shortDescription: 'Accredited courses in hazardous waste handling, medical waste segregation, occupational safety, and environmental compliance — 2,000+ graduates.',
    icon: 'fa-solid fa-graduation-cap',
    category: { name: 'Training & Development', slug: 'training' },
    isFeatured: false,
  },
  {
    title: 'Sharps & Pharmaceutical Waste',
    slug: 'sharps-pharma',
    href: '/public-health',
    shortDescription: 'Specialised disposal of needles, syringes, expired medicines, and cytotoxic drugs using UN-approved containers and high-temperature incineration.',
    icon: 'fa-solid fa-pills',
    category: { name: 'Hazardous Waste', slug: 'hazardous' },
    isFeatured: false,
  },
  {
    title: 'Construction & Demolition Waste',
    slug: 'construction-waste',
    href: '/waste-management',
    shortDescription: 'Efficient removal and recycling of construction debris, rubble, timber, and scrap — skip hire and roll-on/roll-off container services.',
    icon: 'fa-solid fa-helmet-safety',
    category: { name: 'Non-Hazardous Waste', slug: 'non-hazardous' },
    isFeatured: false,
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

interface ServiceItem {
  title: string
  slug: string
  shortDescription: string
  featuredImage?: string
  icon?: string
  category?: { name: string; slug: string }
  isFeatured?: boolean
  href?: string
}

interface CategoryItem {
  name: string
  slug: string
  icon?: string
}

export default async function ServicesPage() {
  let services: ServiceItem[] = []
  let categories: CategoryItem[] = []

  try {
    const [servicesData, catsData] = await Promise.all([
      sanityFetch<any[]>({ query: serviceListQuery }),
      sanityFetch<any[]>({ query: serviceCategoriesQuery }),
    ])

    if (servicesData && servicesData.length > 0) {
      services = servicesData.map((s: any) => ({
        title: s.title,
        slug: s.slug?.current || s.slug,
        shortDescription: s.shortDescription || '',
        featuredImage: s.featuredImage ? urlFor(s.featuredImage).width(600).url() : undefined,
        icon: s.icon,
        category: s.category ? { name: s.category.name, slug: s.category.slug?.current || s.category.slug } : undefined,
        isFeatured: s.isFeatured,
      }))
    }

    if (catsData && catsData.length > 0) {
      categories = catsData.map((c: any) => ({
        name: c.name,
        slug: c.slug?.current || c.slug,
        icon: c.icon,
      }))
    }
  } catch {
    // Sanity not configured — use fallbacks
  }

  // Use fallbacks when CMS has no data
  const displayServices = services.length > 0 ? services : fallbackServices
  const displayCategories = categories.length > 0 ? categories : fallbackCategories

  return (
    <>
      {/* Centered Hero with inline stats */}
      <Hero
        heading="Our Services"
        subheading="Comprehensive Waste Management Solutions"
        description="From medical waste to oil & gas operations, we provide safe, compliant, and environmentally responsible waste management across Uganda."
        variant="centered"
        badge="Full-Service Provider"
        stats={[
          { value: '25+', label: 'Years Experience' },
          { value: '2,194+', label: 'Clients Served' },
          { value: '76,000', label: 'Tonnes Processed' },
          { value: '99%', label: 'Satisfaction' },
        ]}
      />

      {/* Category filters — glass pills */}
      <section className="border-b border-gray-200 bg-white/80 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-4">
          {displayCategories.map((cat) => (
            <span
              key={cat.slug}
              className="glass rounded-full px-4 py-2 text-sm font-medium text-gray-700"
            >
              {cat.icon && <i className={`${cat.icon} mr-1.5`} aria-hidden="true" />}
              {cat.name}
            </span>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-gradient-subtle py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-right-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayServices.map((service, index) => (
                <div key={service.slug} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats — Dark */}
      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building' },
          { value: 76000, label: 'Tonnes Processed', icon: 'fa-solid fa-recycle' },
          { value: 99, suffix: '%', label: 'Satisfaction', icon: 'fa-solid fa-star' },
        ]}
        darkBackground
      />

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
            <i className="fa-solid fa-headset mr-2" aria-hidden="true" />Need a Custom Waste Management Solution?
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Get A Quote
            </Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
