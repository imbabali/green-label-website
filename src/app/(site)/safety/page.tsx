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

const certifications = [
  { icon: 'fa-solid fa-shield-halved', label: 'OSHA Compliant' },
  { icon: 'fa-solid fa-file-circle-check', label: 'NEMA Licenced' },
  { icon: 'fa-solid fa-award', label: 'ISO 45001 Aligned' },
  { icon: 'fa-solid fa-user-shield', label: 'Zero Harm Policy' },
]

const protocols = [
  { icon: 'fa-solid fa-helmet-safety', title: 'PPE Requirements', description: 'Full PPE enforced for all field operations — gloves, respirators, coveralls, eye protection, steel-toe boots.' },
  { icon: 'fa-solid fa-clipboard-list', title: 'Incident Reporting', description: 'Real-time digital reporting with mandatory root-cause analysis and corrective actions within 48 hours.' },
  { icon: 'fa-solid fa-chalkboard-user', title: 'Safety Training', description: 'Monthly toolbox talks, quarterly drills, annual recertification for all handlers and supervisors.' },
  { icon: 'fa-solid fa-fire-extinguisher', title: 'Emergency Response', description: '24/7 spill response teams with containment kits, fire suppression, and HAZMAT decontamination units.' },
  { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Audits & Inspections', description: 'Monthly internal audits and quarterly third-party inspections for OSHA, NEMA, and ISO 45001 compliance.' },
  { icon: 'fa-solid fa-truck-medical', title: 'Vehicle Safety', description: 'GPS tracking, speed limiters, reverse cameras, fire suppression. Pre-trip and post-trip inspections mandatory.' },
]

export default function SafetyStandardsPage() {
  return (
    <>
      {/* fullWidth Hero with badge */}
      <Hero
        heading="Safety Standards"
        subheading="Zero Harm. Zero Compromise."
        description="We mitigate every risk through rigorous protocols, continuous training, and a culture where every team member can stop work if conditions are unsafe."
        backgroundImage="/images/hero/waste.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Safety Standards' }]}
        variant="fullWidth"
        badge="Zero Harm Policy"
      />

      {/* Certification badges — glass on warm bg */}
      <section className="bg-gradient-warm py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {certifications.map((c, i) => (
                <div key={c.label} className={`reveal reveal-scale stagger-${i + 1} glass flex items-center gap-2.5 rounded-xl p-3`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <i className={`${c.icon} text-base text-red-600`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-xs font-bold text-gray-900">{c.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Protocols — 3-col grid with left-red border */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-shield-halved mr-2 text-brand-green" aria-hidden="true" />Our Safety Protocols</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Six layers of protection keeping our people, clients, and communities safe.</p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {protocols.map((p) => (
              <div key={p.title} className="card-premium h-full rounded-2xl border-l-4 border-l-red-400 bg-white p-5 shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                  <i className={`${p.icon} text-lg text-red-600`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{p.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{p.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Stats — Dark, after protocols */}
      <StatsCounter
        stats={[
          { value: 100, suffix: '%', label: 'OSHA Compliance', icon: 'fa-solid fa-shield-halved' },
          { value: 0, label: 'Major Incidents (2024)', icon: 'fa-solid fa-triangle-exclamation' },
          { value: 12, label: 'Safety Drills / Year', icon: 'fa-solid fa-person-running' },
          { value: 300, suffix: '+', label: 'Trained Personnel', icon: 'fa-solid fa-users-gear' },
        ]}
        darkBackground
      />

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-helmet-safety mr-2" aria-hidden="true" />Safety You Can Count On</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Contact Us</Link>
            <Link href="#quote" data-quote-trigger="" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Request A Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
