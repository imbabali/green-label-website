import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardCarousel from '@/components/shared/CardCarousel'
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
  { icon: 'fa-solid fa-mountain', title: 'Waste Characterisation', description: 'Sampling, lab analysis, and classification to determine hazard levels and disposal options.' },
  { icon: 'fa-solid fa-hill-rockslide', title: 'Tailings & Slag', description: 'Engineered containment, transport, and NEMA-approved disposal with long-term monitoring.' },
  { icon: 'fa-solid fa-atom', title: 'Chemical Waste', description: 'Licensed handling of cyanide, mercury, acids, and flotation reagents from mineral processing.' },
  { icon: 'fa-solid fa-land-mine-on', title: 'Site Remediation', description: 'Soil decontamination, revegetation, and groundwater rehabilitation of legacy sites.' },
  { icon: 'fa-solid fa-vial-circle-check', title: 'Environmental Monitoring', description: 'Ongoing soil, water, air quality monitoring for active and decommissioned sites.' },
  { icon: 'fa-solid fa-scale-balanced', title: 'Regulatory Advisory', description: 'NEMA, Ministry of Energy, and international mining waste standards guidance.' },
]

export default function MiningPage() {
  return (
    <>
      <Hero
        heading="Mining Services"
        subheading="Responsible Waste Management for Mining"
        description="Specialised knowledge and licensed infrastructure for tailings, chemical residues, and contaminated materials — protecting both environment and licence."
        backgroundImage="/images/gallery/img4.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Mining' }]}
        variant="fullWidth"
      />

      <StatsCounter
        stats={[
          { value: 8, suffix: '+', label: 'Mining Clients', icon: 'fa-solid fa-gem' },
          { value: 3, label: 'Sites Remediated', icon: 'fa-solid fa-seedling' },
          { value: 100, suffix: '%', label: 'NEMA Compliance', icon: 'fa-solid fa-file-circle-check' },
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
        ]}
        darkBackground
      />

      {/* Capabilities — Carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Our Mining Capabilities</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">End-to-end solutions for exploration, extraction, processing, and mine closure.</p>
          </ScrollRevealSection>
          <CardCarousel>
            {services.map((s) => (
              <div key={s.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl border-t-4 border-t-brand-green bg-white p-5 shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${s.icon} text-lg text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{s.description}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Need Waste Management for Your Mine?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
