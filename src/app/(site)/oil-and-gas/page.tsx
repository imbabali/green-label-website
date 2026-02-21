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
    title: 'Oil & Gas Services',
    description: 'Specialised waste management for Uganda\'s oil & gas sector — drill cuttings, produced water, chemical waste, spill response, and environmental monitoring.',
    path: '/oil-and-gas',
  })
}

const capabilities = [
  {
    icon: 'fa-solid fa-oil-well',
    title: 'Drill Cuttings & Mud Management',
    description: 'Collection, transport, and treatment of drilling fluids and cuttings from exploration and production wells using thermal desorption and stabilisation techniques.',
  },
  {
    icon: 'fa-solid fa-droplet',
    title: 'Produced Water Treatment',
    description: 'On-site and off-site treatment of oily produced water to meet NEMA discharge standards, including oil-water separation, filtration, and biological treatment.',
  },
  {
    icon: 'fa-solid fa-flask-vial',
    title: 'Chemical Waste Handling',
    description: 'Licensed collection and disposal of drilling chemicals, solvents, lubricants, and laboratory reagents with full chain-of-custody documentation.',
  },
  {
    icon: 'fa-solid fa-burst',
    title: 'Spill Response & Remediation',
    description: '24/7 emergency spill containment and clean-up capability with pre-positioned equipment and trained HAZMAT response teams across the Albertine Graben.',
  },
  {
    icon: 'fa-solid fa-satellite-dish',
    title: 'Environmental Monitoring',
    description: 'Baseline and operational environmental monitoring — soil, water, air quality — to ensure compliance with Environmental and Social Impact Assessment conditions.',
  },
  {
    icon: 'fa-solid fa-file-shield',
    title: 'Regulatory Compliance',
    description: 'End-to-end compliance management with NEMA, Petroleum Authority of Uganda (PAU), and international standards including IFC Performance Standards.',
  },
]

const whyUs = [
  { icon: 'fa-solid fa-certificate', label: 'PAU & NEMA Licenced' },
  { icon: 'fa-solid fa-clock-rotate-left', label: '24/7 Emergency Response' },
  { icon: 'fa-solid fa-location-dot', label: 'Albertine Graben Presence' },
  { icon: 'fa-solid fa-file-contract', label: 'IFC Standards Aligned' },
]

export default function OilAndGasPage() {
  return (
    <>
      <Hero
        heading="Oil & Gas Services"
        subheading="Specialist Waste Solutions for the Petroleum Sector"
        backgroundImage="/images/gallery/img3.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Oil & Gas' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Trusted by Uganda&apos;s Petroleum Industry
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                As Uganda&apos;s oil and gas sector matures, the demand for world-class waste management grows with it. Green Label Services is the certified partner operators trust for compliant, efficient, and environmentally sound handling of every waste stream — from drill site to final disposal.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Credential badges */}
          <ScrollRevealSection>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {whyUs.map((item, index) => (
                <div key={item.label} className={`reveal reveal-up stagger-${index + 1} card-premium flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${item.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-sm font-bold text-gray-900">{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 10, suffix: '+', label: 'Oil & Gas Clients', icon: 'fa-solid fa-oil-well' },
          { value: 5, label: 'Field Bases', icon: 'fa-solid fa-location-crosshairs' },
          { value: 100, suffix: '%', label: 'PAU Compliance', icon: 'fa-solid fa-shield-halved' },
          { value: 24, suffix: '/7', label: 'Spill Response', icon: 'fa-solid fa-phone-volume' },
        ]}
        darkBackground
      />

      {/* Capabilities */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Oil &amp; Gas Capabilities
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Full-spectrum waste management for exploration, production, and decommissioning phases.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {capabilities.map((c) => (
              <div key={c.title} className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${c.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{c.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{c.description}</p>
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
            Need a Waste Partner for Your Oil &amp; Gas Operations?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            From exploration to production, we deliver compliant waste management that meets PAU and NEMA requirements.
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
