import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
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

const credentials = [
  { icon: 'fa-solid fa-certificate', label: 'NEMA Licensed' },
  { icon: 'fa-solid fa-shield-halved', label: 'ISO 14001 Certified' },
  { icon: 'fa-solid fa-helmet-safety', label: 'OSHA Compliant' },
  { icon: 'fa-solid fa-globe', label: 'IFC Standards' },
]

export default function MiningPage() {
  return (
    <>
      {/* Split Hero — text left, image right */}
      <Hero
        heading="Mining Services"
        subheading="Responsible Waste Management for Mining"
        description="Specialised knowledge and licensed infrastructure for tailings, chemical residues, and contaminated materials — protecting both environment and licence."
        backgroundImage="/images/gallery/img4.jpg"
        variant="split"
        badge="NEMA Licensed"
        ctaButtons={[
          { label: 'Get Assessment', href: '#quote', variant: 'secondary' },
          { label: 'View Credentials', href: '/about', variant: 'outline' },
        ]}
        flipped
      />

      {/* Stats — Dark */}
      <StatsCounter
        stats={[
          { value: 8, suffix: '+', label: 'Mining Clients', icon: 'fa-solid fa-gem' },
          { value: 3, label: 'Sites Remediated', icon: 'fa-solid fa-seedling' },
          { value: 100, suffix: '%', label: 'NEMA Compliance', icon: 'fa-solid fa-file-circle-check' },
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
        ]}
        darkBackground
      />

      {/* Capabilities — 2-col paired rows with alternating reveals */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-mountain mr-2 text-brand-green" aria-hidden="true" />Our Mining Capabilities</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">End-to-end solutions for exploration, extraction, processing, and mine closure.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-4">
              {services.map((s, i) => (
                <div key={s.title} className={`reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${Math.min(i + 1, 6)} card-premium flex items-start gap-4 rounded-2xl border-l-4 border-l-brand-orange bg-white p-5 shadow-md`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${s.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-600">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Credentials — glass badge cards */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-ribbon mr-2 text-brand-green" aria-hidden="true" />Credentials</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {credentials.map((c, i) => (
                <div key={c.label} className={`reveal reveal-up stagger-${i + 1} glass flex items-center gap-2.5 rounded-xl p-3`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${c.icon} text-base text-brand-green`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-xs font-bold text-gray-900">{c.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-24 top-1/2 -translate-y-1/2 opacity-30" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-headset mr-2" aria-hidden="true" />Need Waste Management for Your Mine?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
