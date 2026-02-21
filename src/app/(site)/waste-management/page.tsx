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
    title: 'Waste Management',
    description: 'Comprehensive waste management solutions — solid, hazardous, medical, and industrial waste collection, treatment, and disposal across Uganda.',
    path: '/waste-management',
  })
}

const services = [
  {
    icon: 'fa-solid fa-dumpster',
    title: 'Solid Waste Collection',
    description: 'Scheduled and on-demand collection of general, commercial, and institutional solid waste with GPS-tracked vehicles and optimised routing.',
  },
  {
    icon: 'fa-solid fa-biohazard',
    title: 'Hazardous Waste Management',
    description: 'Licensed handling, transport, and disposal of chemicals, solvents, pesticides, and other hazardous materials under strict NEMA protocols.',
  },
  {
    icon: 'fa-solid fa-syringe',
    title: 'Medical Waste Treatment',
    description: 'Specialised collection and treatment of sharps, pathological, pharmaceutical, and infectious waste from hospitals, clinics, and laboratories.',
  },
  {
    icon: 'fa-solid fa-industry',
    title: 'Industrial Waste Handling',
    description: 'Tailored waste stream management for manufacturers, processors, and construction sites — including waste auditing and minimisation advisory.',
  },
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Waste Auditing & Consulting',
    description: 'On-site waste characterisation, regulatory compliance assessments, and cost-optimisation strategies to reduce waste volumes and disposal spend.',
  },
  {
    icon: 'fa-solid fa-recycle',
    title: 'Recycling & Resource Recovery',
    description: 'Sorting, processing, and marketing of recyclable materials — plastics, metals, paper, glass, and organic waste — to maximise diversion from landfill.',
  },
]

const process = [
  { num: '01', title: 'Waste Assessment', desc: 'We audit your waste streams to understand volume, composition, and compliance requirements.' },
  { num: '02', title: 'Custom Plan', desc: 'A tailored collection schedule, treatment method, and reporting framework designed for your operation.' },
  { num: '03', title: 'Safe Collection', desc: 'Trained crews arrive on schedule with the right equipment — every time, on time.' },
  { num: '04', title: 'Treatment & Reporting', desc: 'Waste is treated at licensed facilities and you receive full chain-of-custody documentation.' },
]

export default function WasteManagementPage() {
  return (
    <>
      <Hero
        heading="Waste Management"
        subheading="End-to-End Solutions for Every Waste Stream"
        backgroundImage="/images/vehicles/harzard_vehicle3.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Waste Management' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Uganda&apos;s Most Trusted Waste Partner
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                From a single office bin to multi-site hazardous waste programmes, Green Label Services delivers safe, compliant, and cost-effective waste management. We handle the full lifecycle — collection, transport, treatment, disposal, and reporting — so you can focus on your core business.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building-user' },
          { value: 76000, label: 'Tonnes Processed', icon: 'fa-solid fa-weight-hanging' },
          { value: 50, suffix: '+', label: 'Collection Vehicles', icon: 'fa-solid fa-truck' },
          { value: 99, suffix: '%', label: 'On-Time Collection', icon: 'fa-solid fa-clock' },
        ]}
        darkBackground
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Waste Management Services
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Six core capabilities covering every waste type your organisation produces.
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

      {/* How It Works */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">How It Works</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-green via-brand-orange to-brand-green lg:block" aria-hidden="true" />
              {process.map((s, index) => (
                <div key={s.num} className={`reveal reveal-up stagger-${index + 1} relative text-center`}>
                  <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-green text-xl font-bold text-white shadow-lg shadow-brand-green/25">
                    {s.num}
                  </div>
                  <h3 className="mb-2 font-heading font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-16">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Ready to Simplify Your Waste Management?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Get a tailored waste management plan and competitive quote within 24 hours.
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
