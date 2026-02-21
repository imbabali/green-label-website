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
    title: 'Infrastructure',
    description: 'Green Label Services infrastructure — waste treatment facilities, regional depots, laboratories, and operational bases across Uganda.',
    path: '/infrastructure',
  })
}

const facilities = [
  { icon: 'fa-solid fa-building', title: 'Kampala HQ', location: 'Industrial Area', description: 'Admin offices, dispatch centre, vehicle workshop, Training Academy campus.' },
  { icon: 'fa-solid fa-industry', title: 'Iganga Treatment Plant', location: 'Iganga District', description: 'Autoclave, incinerator, and chemical treatment serving Eastern Uganda.' },
  { icon: 'fa-solid fa-warehouse', title: 'Mbarara Depot', location: 'Mbarara City', description: 'Regional collection and transfer station for Western Uganda and oil & gas.' },
  { icon: 'fa-solid fa-microscope', title: 'Waste Analysis Lab', location: 'Kampala HQ', description: 'In-house waste characterisation, hazard classification, and environmental analysis.' },
  { icon: 'fa-solid fa-screwdriver-wrench', title: 'Vehicle Workshop', location: 'Kampala HQ', description: 'Full-service maintenance with certified mechanics and parts inventory.' },
  { icon: 'fa-solid fa-box-archive', title: 'Hazardous Storage', location: 'Kampala & Iganga', description: 'NEMA-licenced bunded containment with ventilation and fire suppression.' },
]

const capabilities = [
  { icon: 'fa-solid fa-temperature-high', title: 'Incineration', desc: 'High-temp destruction for medical and hazardous waste.' },
  { icon: 'fa-solid fa-virus-slash', title: 'Autoclave', desc: 'Steam sterilisation for infectious waste before safe disposal.' },
  { icon: 'fa-solid fa-vial', title: 'Chemical Treatment', desc: 'Neutralisation, stabilisation, detoxification.' },
  { icon: 'fa-solid fa-arrows-rotate', title: 'Recycling Lines', desc: 'Sorting and processing plastics, metals, paper, glass.' },
]

export default function InfrastructurePage() {
  return (
    <>
      <Hero
        heading="Infrastructure"
        subheading="Built for Scale and Safety"
        description="Strategically located treatment facilities, modern laboratories, and well-equipped depots — serving clients from Kampala to the Albertine Graben."
        backgroundImage="/images/offices/office1.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Infrastructure' }]}
        variant="fullWidth"
      />

      <StatsCounter
        stats={[
          { value: 3, label: 'Operational Bases', icon: 'fa-solid fa-location-dot' },
          { value: 2, label: 'Treatment Plants', icon: 'fa-solid fa-industry' },
          { value: 1, label: 'In-House Lab', icon: 'fa-solid fa-flask-vial' },
          { value: 4, label: 'Treatment Methods', icon: 'fa-solid fa-gears' },
        ]}
        darkBackground
      />

      {/* Facilities — Carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Our Facilities</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Licensed, inspected, and strategically positioned across Uganda.</p>
          </ScrollRevealSection>
          <CardCarousel>
            {facilities.map((f) => (
              <div key={f.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl border-t-4 border-t-brand-green bg-white p-5 shadow-md">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                      <i className={`${f.icon} text-lg text-brand-green`} aria-hidden="true" />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
                      <i className="fa-solid fa-map-pin text-brand-orange" aria-hidden="true" />{f.location}
                    </span>
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{f.description}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Treatment Capabilities — compact */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Treatment Capabilities</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {capabilities.map((c, i) => (
                <div key={c.title} className={`reveal reveal-up stagger-${i + 1} card-premium flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm`}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${c.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xs font-bold text-gray-900">{c.title}</h3>
                  <p className="mt-1 text-[10px] text-gray-600">{c.desc}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Visit Our Facilities</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-200">We welcome site visits from prospective clients and regulatory bodies.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Arrange a Visit</Link>
            <Link href="#quote" data-quote-trigger="" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Request A Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
