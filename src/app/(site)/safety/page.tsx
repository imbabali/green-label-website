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
    title: 'Safety Standards',
    description: 'Green Label Services safety standards — OSHA and NEMA compliant protocols protecting employees, clients, and communities across Uganda.',
    path: '/safety',
  })
}

const protocols = [
  {
    icon: 'fa-solid fa-helmet-safety',
    title: 'Personal Protective Equipment',
    description: 'Full PPE requirements enforced for all field operations — gloves, respirators, coveralls, eye protection, and steel-toe boots issued and inspected daily.',
  },
  {
    icon: 'fa-solid fa-clipboard-list',
    title: 'Incident Reporting',
    description: 'Real-time digital incident reporting system with mandatory root-cause analysis and corrective actions tracked to closure within 48 hours.',
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Safety Training & Drills',
    description: 'Monthly safety toolbox talks, quarterly emergency drills, and annual recertification for all waste handlers, drivers, and site supervisors.',
  },
  {
    icon: 'fa-solid fa-fire-extinguisher',
    title: 'Emergency Response',
    description: 'Dedicated spill response teams on 24/7 standby with containment kits, fire suppression equipment, and HAZMAT decontamination units at every depot.',
  },
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Audits & Inspections',
    description: 'Monthly internal safety audits and quarterly third-party inspections to ensure continuous compliance with OSHA, NEMA, and ISO 45001 standards.',
  },
  {
    icon: 'fa-solid fa-truck-medical',
    title: 'Vehicle Safety Systems',
    description: 'GPS tracking, speed limiters, reverse cameras, and fire suppression on all waste transport vehicles. Pre-trip and post-trip inspections mandatory.',
  },
]

const certifications = [
  { icon: 'fa-solid fa-shield-halved', label: 'OSHA Compliant' },
  { icon: 'fa-solid fa-file-circle-check', label: 'NEMA Licenced' },
  { icon: 'fa-solid fa-award', label: 'ISO 45001 Aligned' },
  { icon: 'fa-solid fa-user-shield', label: 'Zero Harm Policy' },
]

export default function SafetyStandardsPage() {
  return (
    <>
      <Hero
        heading="Safety Standards"
        subheading="Zero Harm. Zero Compromise."
        backgroundImage="/images/hero/waste.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Safety Standards' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Safety Is Non-Negotiable
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Waste management carries inherent risks — biological, chemical, and physical. At Green Label Services, we mitigate every risk through rigorous protocols, continuous training, and a culture where every team member is empowered to stop work if conditions are unsafe.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Safety badges */}
          <ScrollRevealSection>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {certifications.map((c, index) => (
                <div key={c.label} className={`reveal reveal-up stagger-${index + 1} card-premium flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${c.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-sm font-bold text-gray-900">{c.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 100, suffix: '%', label: 'OSHA Compliance', icon: 'fa-solid fa-shield-halved' },
          { value: 0, label: 'Major Incidents (2024)', icon: 'fa-solid fa-triangle-exclamation' },
          { value: 12, label: 'Safety Drills / Year', icon: 'fa-solid fa-person-running' },
          { value: 300, suffix: '+', label: 'Trained Personnel', icon: 'fa-solid fa-users-gear' },
        ]}
        darkBackground
      />

      {/* Protocols */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Safety Protocols
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Six layers of protection that keep our people, clients, and communities safe every day.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {protocols.map((p) => (
              <div key={p.title} className="card-premium rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                  <i className={`${p.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{p.description}</p>
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
            Safety You Can Count On
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Work with a team that puts safety first — for your people, your facility, and your community.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Contact Us
            </Link>
            <Link href="#quote" data-quote-trigger="" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Request A Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
