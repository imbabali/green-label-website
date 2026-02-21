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
    title: 'Infrastructure',
    description: 'Green Label Services infrastructure — waste treatment facilities, regional depots, laboratories, and operational bases across Uganda.',
    path: '/infrastructure',
  })
}

const facilities = [
  {
    icon: 'fa-solid fa-building',
    title: 'Kampala Headquarters',
    location: 'Industrial Area, Kampala',
    description: 'Main operational base housing administrative offices, dispatch centre, vehicle workshop, and the Green Label Training Academy campus.',
  },
  {
    icon: 'fa-solid fa-industry',
    title: 'Iganga Treatment Facility',
    location: 'Iganga District',
    description: 'Licensed waste treatment plant with autoclave, incinerator, and chemical treatment capacity — serving Eastern Uganda and overflow from Kampala.',
  },
  {
    icon: 'fa-solid fa-warehouse',
    title: 'Mbarara Regional Depot',
    location: 'Mbarara City',
    description: 'Regional collection and transfer station serving Western Uganda, including oil & gas operations in the Albertine Graben region.',
  },
  {
    icon: 'fa-solid fa-microscope',
    title: 'Waste Analysis Laboratory',
    location: 'Kampala HQ',
    description: 'In-house laboratory for waste characterisation, hazard classification, and environmental sample analysis — supporting compliance documentation.',
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Vehicle Maintenance Workshop',
    location: 'Kampala HQ',
    description: 'Full-service maintenance facility with certified mechanics, parts inventory, and a preventive maintenance programme for the entire 50+ vehicle fleet.',
  },
  {
    icon: 'fa-solid fa-box-archive',
    title: 'Hazardous Waste Storage',
    location: 'Kampala & Iganga',
    description: 'NEMA-licenced temporary storage facilities for hazardous and special waste, with bunded containment, ventilation, and fire suppression systems.',
  },
]

const capabilities = [
  { icon: 'fa-solid fa-temperature-high', title: 'Incineration', desc: 'High-temperature incineration for medical and hazardous waste destruction.' },
  { icon: 'fa-solid fa-virus-slash', title: 'Autoclave Treatment', desc: 'Steam sterilisation for infectious waste before safe landfill disposal.' },
  { icon: 'fa-solid fa-vial', title: 'Chemical Treatment', desc: 'Neutralisation, stabilisation, and detoxification of chemical waste streams.' },
  { icon: 'fa-solid fa-arrows-rotate', title: 'Recycling Lines', desc: 'Sorting and processing of plastics, metals, paper, and glass.' },
]

export default function InfrastructurePage() {
  return (
    <>
      <Hero
        heading="Infrastructure"
        subheading="Facilities Built for Scale and Safety"
        backgroundImage="/images/offices/office1.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Infrastructure' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                World-Class Facilities Across Uganda
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Our infrastructure is the backbone of reliable, compliant waste management. Strategically located treatment facilities, modern laboratories, and well-equipped depots enable us to serve clients from Kampala to the Albertine Graben with consistent quality and rapid response times.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 3, label: 'Operational Bases', icon: 'fa-solid fa-location-dot' },
          { value: 2, label: 'Treatment Plants', icon: 'fa-solid fa-industry' },
          { value: 1, label: 'In-House Laboratory', icon: 'fa-solid fa-flask-vial' },
          { value: 4, label: 'Treatment Methods', icon: 'fa-solid fa-gears' },
        ]}
        darkBackground
      />

      {/* Facilities */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Facilities
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Licensed, inspected, and strategically positioned to serve every region of Uganda.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {facilities.map((f) => (
              <div key={f.title} className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${f.icon} text-xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                    <i className="fa-solid fa-map-pin text-brand-orange" aria-hidden="true" />
                    {f.location}
                  </span>
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{f.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Treatment Capabilities */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Treatment Capabilities
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c, index) => (
                <div key={c.title} className={`reveal reveal-up stagger-${index + 1} card-premium flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${c.icon} text-xl text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{c.desc}</p>
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
            Visit Our Facilities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            We welcome site visits from prospective clients and regulatory bodies. See our infrastructure first-hand.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Arrange a Visit
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
