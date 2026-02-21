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
    title: 'Oil & Gas Services',
    description: 'Specialised waste management for Uganda\'s oil & gas sector — drill cuttings, produced water, chemical waste, spill response, and environmental monitoring.',
    path: '/oil-and-gas',
  })
}

const credentials = [
  { icon: 'fa-solid fa-certificate', label: 'PAU & NEMA Licenced' },
  { icon: 'fa-solid fa-clock-rotate-left', label: '24/7 Emergency Response' },
  { icon: 'fa-solid fa-location-dot', label: 'Albertine Graben Presence' },
  { icon: 'fa-solid fa-file-contract', label: 'IFC Standards Aligned' },
]

const capabilities = [
  { icon: 'fa-solid fa-oil-well', title: 'Drill Cuttings & Mud', description: 'Collection, transport, and treatment using thermal desorption and stabilisation techniques.' },
  { icon: 'fa-solid fa-droplet', title: 'Produced Water', description: 'On-site and off-site treatment meeting NEMA discharge standards — separation, filtration, biological.' },
  { icon: 'fa-solid fa-flask-vial', title: 'Chemical Waste', description: 'Licensed disposal of drilling chemicals, solvents, lubricants with full chain-of-custody docs.' },
  { icon: 'fa-solid fa-burst', title: 'Spill Response', description: '24/7 containment and clean-up with pre-positioned equipment and trained HAZMAT teams.' },
  { icon: 'fa-solid fa-satellite-dish', title: 'Environmental Monitoring', description: 'Baseline and operational soil, water, air quality monitoring for ESIA compliance.' },
  { icon: 'fa-solid fa-file-shield', title: 'Regulatory Compliance', description: 'End-to-end NEMA, PAU, and IFC Performance Standards compliance management.' },
]

export default function OilAndGasPage() {
  return (
    <>
      <Hero
        heading="Oil & Gas Services"
        subheading="Specialist Waste Solutions for Petroleum"
        description="The certified partner operators trust for compliant, efficient handling of every waste stream — from drill site to final disposal."
        backgroundImage="/images/gallery/img3.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Oil & Gas' }]}
        variant="fullWidth"
        badge="PAU & NEMA Licenced"
      />

      {/* Credentials — glass frosted cards */}
      <section className="bg-gradient-subtle py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {credentials.map((c, i) => (
                <div key={c.label} className={`reveal reveal-up stagger-${i + 1} glass flex items-center gap-2.5 rounded-xl p-3`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${c.icon} text-base text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-xs font-bold text-gray-900">{c.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 10, suffix: '+', label: 'Oil & Gas Clients', icon: 'fa-solid fa-oil-well' },
          { value: 5, label: 'Field Bases', icon: 'fa-solid fa-location-crosshairs' },
          { value: 100, suffix: '%', label: 'PAU Compliance', icon: 'fa-solid fa-shield-halved' },
          { value: 24, suffix: '/7', label: 'Spill Response', icon: 'fa-solid fa-phone-volume' },
        ]}
        darkBackground
      />

      {/* Capabilities — Dark glass section */}
      <section className="relative overflow-hidden bg-gradient-green py-12 md:py-16">
        <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden="true" />
        <GradientOrb color="orange" size="lg" className="-left-32 top-10 opacity-30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-white md:text-3xl">Our Capabilities</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-300">Full-spectrum waste management for exploration, production, and decommissioning.</p>
          </ScrollRevealSection>
          <CardCarousel>
            {capabilities.map((c) => (
              <div key={c.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="glass-dark h-full rounded-2xl p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${c.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-white">{c.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-300">{c.description}</p>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Need a Waste Partner for Oil &amp; Gas?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
