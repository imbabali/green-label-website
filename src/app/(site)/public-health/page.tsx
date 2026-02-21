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
    title: 'Public Health Services',
    description: 'Medical and healthcare waste management — sharps, pharmaceutical, pathological, and infectious waste across Uganda.',
    path: '/public-health',
  })
}

const clientTypes = [
  { icon: 'fa-solid fa-hospital', label: 'Hospitals & Clinics' },
  { icon: 'fa-solid fa-flask', label: 'Laboratories' },
  { icon: 'fa-solid fa-house-medical', label: 'Health Centres' },
  { icon: 'fa-solid fa-prescription-bottle-medical', label: 'Pharmacies' },
]

const services = [
  { icon: 'fa-solid fa-syringe', title: 'Sharps Disposal', description: 'UN-approved containers, autoclave treatment, licensed final disposal.' },
  { icon: 'fa-solid fa-pills', title: 'Pharmaceutical Waste', description: 'High-temperature incineration of expired and contaminated medicines per NDA/WHO.' },
  { icon: 'fa-solid fa-vial-virus', title: 'Infectious Waste', description: 'Cultures, blood products, isolation waste — autoclave sterilisation and controlled incineration.' },
  { icon: 'fa-solid fa-microscope', title: 'Laboratory Waste', description: 'Chemical reagents, specimens, contaminated equipment from hospitals and research centres.' },
  { icon: 'fa-solid fa-hospital-user', title: 'Facility Audits', description: 'On-site segregation assessments and improvement plans for WHO compliance.' },
  { icon: 'fa-solid fa-person-chalkboard', title: 'Staff Training', description: 'Colour-coded segregation, safe handling, spill management, infection prevention.' },
]

export default function PublicHealthPage() {
  return (
    <>
      {/* Centered Hero — light, clinical */}
      <Hero
        heading="Public Health Services"
        subheading="Safe Healthcare Waste, Healthy Communities"
        description="End-to-end healthcare waste management — from colour-coded segregation at the ward level to final treatment and disposal."
        backgroundImage="/images/training/training1.jpg"
        variant="split"
        badge="WHO & NEMA Compliant"
        ctaButtons={[
          { label: 'Request Audit', href: '#quote', variant: 'secondary' },
          { label: 'Learn More', href: '/contact', variant: 'outline' },
        ]}
      />

      {/* Client Types */}
      <section className="relative overflow-hidden bg-white py-8 md:py-10">
        <GradientOrb color="green" size="lg" className="-right-20 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {clientTypes.map((c, i) => (
                <div key={c.label} className={`reveal reveal-up stagger-${i + 1} card-premium flex items-center gap-2.5 rounded-xl bg-white p-3 shadow-sm`}>
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

      {/* Stats — Light Mode */}
      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Facilities Served', icon: 'fa-solid fa-hospital' },
          { value: 100, suffix: '%', label: 'WHO Compliant', icon: 'fa-solid fa-circle-check' },
          { value: 365, label: 'Days Coverage', icon: 'fa-solid fa-calendar-days' },
          { value: 0, label: 'Infection Incidents', icon: 'fa-solid fa-shield-virus' },
        ]}
      />

      {/* Services — 3-col with left-green border + check icons */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-syringe mr-2 text-brand-green" aria-hidden="true" />Healthcare Waste Services</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Covering every category of medical waste your facility generates.</p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {services.map((s) => (
              <div key={s.title} className="card-premium h-full rounded-2xl border-l-4 border-l-brand-green bg-white p-5 shadow-md">
                <h3 className="mb-1 flex items-center gap-2 font-heading text-sm font-bold text-gray-900">
                  <i className="fa-solid fa-circle-check text-brand-green" aria-hidden="true" />
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">{s.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-headset mr-2" aria-hidden="true" />Ensure Your Facility Is Compliant</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Request An Audit</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
