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
    description: 'Medical and healthcare waste management services — sharps, pharmaceutical, pathological, and infectious waste collection and treatment across Uganda.',
    path: '/public-health',
  })
}

const services = [
  {
    icon: 'fa-solid fa-syringe',
    title: 'Sharps Collection & Disposal',
    description: 'Safe collection of needles, blades, and other sharps in UN-approved containers, with autoclave treatment and final disposal at licensed facilities.',
  },
  {
    icon: 'fa-solid fa-pills',
    title: 'Pharmaceutical Waste',
    description: 'Segregation, collection, and high-temperature incineration of expired, contaminated, or unused medicines in compliance with NDA and WHO guidelines.',
  },
  {
    icon: 'fa-solid fa-vial-virus',
    title: 'Infectious Waste Treatment',
    description: 'Handling of cultures, specimens, blood products, and isolation ward waste using autoclave sterilisation and controlled incineration.',
  },
  {
    icon: 'fa-solid fa-microscope',
    title: 'Laboratory Waste',
    description: 'Management of chemical reagents, biological specimens, and contaminated lab equipment from hospitals, research centres, and diagnostic facilities.',
  },
  {
    icon: 'fa-solid fa-hospital-user',
    title: 'Healthcare Facility Audits',
    description: 'On-site waste segregation assessments, infrastructure reviews, and improvement plans to bring your facility into full WHO compliance.',
  },
  {
    icon: 'fa-solid fa-person-chalkboard',
    title: 'Staff Training Programmes',
    description: 'Practical workshops for healthcare workers on colour-coded segregation, safe handling, spill management, and infection prevention.',
  },
]

const clientTypes = [
  { icon: 'fa-solid fa-hospital', label: 'Hospitals & Clinics' },
  { icon: 'fa-solid fa-flask', label: 'Laboratories' },
  { icon: 'fa-solid fa-house-medical', label: 'Health Centres' },
  { icon: 'fa-solid fa-prescription-bottle-medical', label: 'Pharmacies' },
]

export default function PublicHealthPage() {
  return (
    <>
      <Hero
        heading="Public Health Services"
        subheading="Safe Healthcare Waste, Healthy Communities"
        backgroundImage="/images/training/training5.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Public Health' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Protecting Health Workers &amp; Patients
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Improperly managed medical waste puts healthcare workers, patients, and surrounding communities at serious risk. Green Label Services provides end-to-end healthcare waste management — from colour-coded segregation at the ward level to final treatment and disposal — ensuring every facility meets WHO and NEMA standards.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Client types */}
          <ScrollRevealSection>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {clientTypes.map((c, index) => (
                <div key={c.label} className={`reveal reveal-up stagger-${index + 1} card-premium flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${c.icon} text-lg text-brand-green`} aria-hidden="true" />
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
          { value: 50, suffix: '+', label: 'Facilities Served', icon: 'fa-solid fa-hospital' },
          { value: 100, suffix: '%', label: 'WHO Compliant', icon: 'fa-solid fa-circle-check' },
          { value: 365, label: 'Days Coverage', icon: 'fa-solid fa-calendar-days' },
          { value: 0, label: 'Infection Incidents', icon: 'fa-solid fa-shield-virus' },
        ]}
        darkBackground
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Healthcare Waste Services
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Comprehensive capabilities covering every category of medical waste your facility generates.
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
            Ensure Your Facility Is Fully Compliant
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Book a free healthcare waste audit and get a tailored management plan for your facility.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Request An Audit
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
