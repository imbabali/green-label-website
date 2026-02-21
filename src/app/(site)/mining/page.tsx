import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardGrid from '@/components/shared/CardGrid'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Mining Services',
    description: 'Environmental waste management for Uganda\'s mining sector — tailings, chemical waste, site remediation, and regulatory compliance.',
    path: '/mining',
  })
}

const services = [
  {
    icon: 'fa-solid fa-mountain',
    title: 'Mine Waste Characterisation',
    description: 'Sampling, laboratory analysis, and classification of mine waste to determine hazard levels, treatment requirements, and disposal options.',
  },
  {
    icon: 'fa-solid fa-hill-rockslide',
    title: 'Tailings & Slag Disposal',
    description: 'Engineered containment, transport, and disposal of mineral processing residues in NEMA-approved facilities with long-term monitoring.',
  },
  {
    icon: 'fa-solid fa-atom',
    title: 'Chemical Waste Management',
    description: 'Licensed handling of cyanide, mercury, acids, and flotation reagents from gold, tin, and other mineral processing operations.',
  },
  {
    icon: 'fa-solid fa-land-mine-on',
    title: 'Site Remediation',
    description: 'Environmental clean-up of legacy mining sites — soil decontamination, revegetation, and groundwater rehabilitation to restore affected ecosystems.',
  },
  {
    icon: 'fa-solid fa-vial-circle-check',
    title: 'Environmental Monitoring',
    description: 'Ongoing soil, water, and air quality monitoring around active and decommissioned mine sites to ensure compliance with EIA conditions.',
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Regulatory Advisory',
    description: 'Guidance on NEMA, Ministry of Energy, and international mining waste standards to keep your operations fully licenced and audit-ready.',
  },
]

export default function MiningPage() {
  return (
    <>
      <Hero
        heading="Mining Services"
        subheading="Responsible Waste Management for the Mining Sector"
        backgroundImage="/images/gallery/img4.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Mining' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Mining Waste, Managed Responsibly
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Mining generates complex waste streams that demand specialised knowledge and strict regulatory compliance. Green Label Services provides the expertise and licensed infrastructure to manage tailings, chemical residues, and contaminated materials safely — protecting both the environment and your operating licence.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 8, suffix: '+', label: 'Mining Clients', icon: 'fa-solid fa-gem' },
          { value: 3, label: 'Sites Remediated', icon: 'fa-solid fa-seedling' },
          { value: 100, suffix: '%', label: 'NEMA Compliance', icon: 'fa-solid fa-file-circle-check' },
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
        ]}
        darkBackground
      />

      {/* Services */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Mining Capabilities
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              End-to-end waste solutions for exploration, extraction, processing, and mine closure.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {services.map((s) => (
              <div key={s.title} className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${s.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{s.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-16">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Need Waste Management for Your Mine?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            From active operations to legacy site remediation, we have the expertise and licences you need.
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
