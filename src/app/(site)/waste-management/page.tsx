import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardGrid from '@/components/shared/CardGrid'
import { GradientOrb, WaveDivider, DotPattern } from '@/components/shared/DecorativeElements'
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
  { icon: 'fa-solid fa-dumpster', title: 'Solid Waste Collection', description: 'Scheduled and on-demand collection with GPS-tracked vehicles and optimised routing.' },
  { icon: 'fa-solid fa-biohazard', title: 'Hazardous Waste', description: 'Licensed handling, transport, and disposal of chemicals and hazardous materials under NEMA protocols.' },
  { icon: 'fa-solid fa-syringe', title: 'Medical Waste', description: 'Specialised collection and treatment of sharps, pathological, pharmaceutical, and infectious waste.' },
  { icon: 'fa-solid fa-industry', title: 'Industrial Waste', description: 'Tailored waste stream management for manufacturers, processors, and construction sites.' },
  { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Waste Auditing', description: 'On-site characterisation, compliance assessments, and cost-optimisation strategies.' },
  { icon: 'fa-solid fa-recycle', title: 'Recycling & Recovery', description: 'Sorting and processing of plastics, metals, paper, glass, and organics.' },
]

const process = [
  { num: '01', icon: 'fa-solid fa-clipboard-check', title: 'Assessment', desc: 'We audit your waste streams — volume, composition, compliance.' },
  { num: '02', icon: 'fa-solid fa-pen-ruler', title: 'Custom Plan', desc: 'Tailored schedule, treatment method, and reporting framework.' },
  { num: '03', icon: 'fa-solid fa-truck-fast', title: 'Collection', desc: 'Trained crews arrive on schedule with the right equipment.' },
  { num: '04', icon: 'fa-solid fa-flask-vial', title: 'Treatment', desc: 'Licensed facility processing with full chain-of-custody docs.' },
]

export default function WasteManagementPage() {
  return (
    <>
      <Hero
        heading="Waste Management"
        subheading="End-to-End Solutions for Every Waste Stream"
        description="From a single office bin to multi-site hazardous waste programmes — safe, compliant, cost-effective waste management across Uganda."
        backgroundImage="/images/vehicles/harzard_vehicle3.jpg"
        variant="fullWidth"
      />

      {/* How It Works — Pipeline Flow Cards */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-10 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-diagram-project mr-2 text-brand-green" aria-hidden="true" />How It Works</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            {/* Desktop: cards in a row with dashed connector + chevron nodes */}
            <div className="relative hidden md:block">
              {/* Dashed connector line behind the icons */}
              <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[52px] z-0 border-t-2 border-dashed border-brand-green/25" aria-hidden="true" />
              {/* Chevron nodes between columns */}
              <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[52px] z-[5] flex -translate-y-1/2 justify-around" aria-hidden="true">
                {[0, 1, 2].map((n) => (
                  <div key={n} className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange shadow-md shadow-brand-orange/25">
                    <i className="fa-solid fa-chevron-right text-[10px] text-white" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-6">
                {process.map((s, i) => (
                  <div key={s.num} className={`reveal reveal-up stagger-${i + 1} relative`}>
                    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100 transition-shadow hover:shadow-xl">
                      {/* Watermark number */}
                      <span className="pointer-events-none absolute -right-1 -top-3 select-none font-heading text-[72px] font-black leading-none text-brand-green/[0.06]" aria-hidden="true">{s.num}</span>
                      {/* Icon in rounded square */}
                      <div className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-emerald-600 text-white shadow-md shadow-brand-green/25">
                        <i className={`${s.icon} text-lg`} aria-hidden="true" />
                      </div>
                      <h3 className="mb-1.5 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                      <p className="text-xs leading-relaxed text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical stack with down-arrow connectors */}
            <div className="space-y-0 md:hidden">
              {process.map((s, i) => (
                <div key={s.num}>
                  <div className={`reveal reveal-up stagger-${Math.min(i + 1, 6)} relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100`}>
                    <span className="pointer-events-none absolute -right-1 -top-3 select-none font-heading text-[72px] font-black leading-none text-brand-green/[0.06]" aria-hidden="true">{s.num}</span>
                    <div className="flex items-start gap-4">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-emerald-600 text-white shadow-md shadow-brand-green/25">
                        <i className={`${s.icon} text-lg`} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                        <p className="text-xs leading-relaxed text-gray-600">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                  {i < process.length - 1 && (
                    <div className="flex justify-center py-2" aria-hidden="true">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange shadow-md shadow-brand-orange/25">
                        <i className="fa-solid fa-chevron-down text-[10px] text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats — Light Mode */}
      <StatsCounter
        stats={[
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building-user' },
          { value: 76000, label: 'Tonnes Processed', icon: 'fa-solid fa-weight-hanging' },
          { value: 50, suffix: '+', label: 'Collection Vehicles', icon: 'fa-solid fa-truck' },
          { value: 99, suffix: '%', label: 'On-Time Collection', icon: 'fa-solid fa-clock' },
        ]}
      />

      {/* Services — 3-col Grid on warm bg */}
      <section className="relative overflow-hidden bg-gradient-warm py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-layer-group mr-2 text-brand-green" aria-hidden="true" />Our Services</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Six core capabilities covering every waste type.</p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {services.map((s) => (
              <div key={s.title} className="card-premium h-full rounded-2xl border-t-4 border-t-brand-orange bg-white p-5 shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                  <i className={`${s.icon} text-lg text-brand-orange`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{s.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <WaveDivider flip color="#fef7ed" />
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-headset mr-2" aria-hidden="true" />Ready to Simplify Your Waste Management?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
