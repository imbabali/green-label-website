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
    title: 'Sustainability',
    description: 'Green Label Services\' commitment to environmental sustainability — recycling, resource recovery, and eco-friendly waste management across Uganda.',
    path: '/eco',
  })
}

const pillars = [
  { icon: 'fa-solid fa-arrows-rotate', title: 'Circular Economy', description: 'Transforming waste into reusable materials, reducing landfill dependency and creating value from discarded resources.' },
  { icon: 'fa-solid fa-wind', title: 'Clean Operations', description: 'Continuously upgrading facilities and fleet to minimise carbon emissions and energy consumption.' },
  { icon: 'fa-solid fa-shield-halved', title: 'Ecosystem Protection', description: 'Environmental monitoring and remediation to safeguard Uganda\'s soil, water, and air quality.' },
]

const programmes = [
  { icon: 'fa-solid fa-recycle', title: 'Industrial Recycling', desc: 'Plastics, metals, paper, and glass diverted from landfill through dedicated sorting facilities.' },
  { icon: 'fa-solid fa-flask-vial', title: 'Chemical Recovery', desc: 'Safe extraction and reuse of solvents, oils, and chemicals from industrial waste streams.' },
  { icon: 'fa-solid fa-wheat-awn', title: 'Organic Composting', desc: 'Converting organic waste into nutrient-rich compost for agriculture.' },
  { icon: 'fa-solid fa-filter', title: 'Wastewater Treatment', desc: 'Treating and recycling process water to reduce freshwater consumption.' },
  { icon: 'fa-solid fa-broom', title: 'Community Clean-Ups', desc: 'Neighbourhood waste drives and environmental awareness campaigns.' },
  { icon: 'fa-solid fa-chart-line', title: 'Carbon Tracking', desc: 'Measuring and reporting greenhouse gas reductions from our programmes.' },
]

const goals = [
  { target: 'Zero Waste to Landfill', year: '2030', icon: 'fa-solid fa-dumpster' },
  { target: '100% Fleet Electrification', year: '2035', icon: 'fa-solid fa-charging-station' },
  { target: 'Carbon Neutral Ops', year: '2035', icon: 'fa-solid fa-scale-balanced' },
  { target: 'ISO 14001 All Sites', year: '2027', icon: 'fa-solid fa-certificate' },
]

export default function SustainabilityPage() {
  return (
    <>
      {/* Centered Hero — eco feel */}
      <Hero
        heading="Sustainability"
        subheading="Building a Greener Future for Uganda"
        description="Sustainability is our business model. Every tonne we manage is an opportunity to recover resources and reduce Uganda's environmental footprint."
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Sustainability' }]}
        variant="centered"
        badge="Eco Commitment"
      />

      {/* Pillars — 3-col glass cards */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-left-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CardGrid columns={3}>
            {pillars.map((p) => (
              <div key={p.title} className="glass h-full rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-green/20 via-brand-green/10 to-transparent shadow-md shadow-brand-green/10 ring-2 ring-brand-green/20">
                  <i className={`${p.icon} text-2xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{p.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{p.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Stats — Light */}
      <StatsCounter
        stats={[
          { value: 76000, label: 'Tonnes Recycled', icon: 'fa-solid fa-recycle' },
          { value: 40, suffix: '%', label: 'Waste Diverted', icon: 'fa-solid fa-arrow-up-right-dots' },
          { value: 12, label: 'Recovery Programmes', icon: 'fa-solid fa-gears' },
          { value: 3, label: 'Treatment Facilities', icon: 'fa-solid fa-warehouse' },
        ]}
      />

      {/* Programmes — dark glass section */}
      <section className="relative overflow-hidden bg-gradient-green py-12 md:py-16">
        <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden="true" />
        <GradientOrb color="orange" size="lg" className="-right-32 top-10 opacity-25" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-white md:text-3xl"><i className="fa-solid fa-rocket mr-2 text-brand-orange-light" aria-hidden="true" />Our Programmes</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-300">Practical initiatives turning environmental ambition into measurable results.</p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {programmes.map((prog) => (
              <div key={prog.title} className="glass-dark h-full rounded-2xl p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/20 via-brand-orange/10 to-transparent shadow-md shadow-brand-orange/10 ring-2 ring-brand-orange/20">
                  <i className={`${prog.icon} text-xl text-brand-orange`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-heading text-sm font-bold text-white">{prog.title}</h3>
                <p className="text-xs leading-relaxed text-gray-300">{prog.desc}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Goals — unique alternating zigzag roadmap */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-bullseye mr-2 text-brand-green" aria-hidden="true" />Sustainability Goals</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-10 max-w-xl text-center text-sm text-gray-600">Our roadmap to a cleaner, greener future.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            {/* Desktop: Alternating zigzag roadmap */}
            <div className="hidden lg:block">
              <div className="relative mx-auto max-w-4xl" style={{ minHeight: '280px' }}>
                {/* Gradient track line — centered vertically */}
                <div
                  className="pointer-events-none absolute inset-x-[10%] top-1/2 h-1 -translate-y-1/2 rounded-full"
                  style={{ background: 'linear-gradient(to right, #2c632c, #3a8a3a, #F7941D)' }}
                  aria-hidden="true"
                />
                {/* Small directional chevrons on the track */}
                <div className="pointer-events-none absolute inset-x-[10%] top-1/2 flex -translate-y-1/2 items-center justify-around px-[15%]" aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <i key={n} className="fa-solid fa-chevron-right text-[8px] text-white/60" />
                  ))}
                </div>

                <div className="grid h-full grid-cols-4">
                  {goals.map((g, i) => {
                    const isAbove = i % 2 === 0
                    return (
                      <div key={g.target} className={`reveal reveal-up stagger-${i + 1} flex flex-col items-center`}>
                        {/* Upper half */}
                        <div className={`flex flex-1 flex-col items-center justify-end pb-3 ${isAbove ? '' : 'pointer-events-none opacity-0'}`}>
                          <div className="rounded-xl bg-white p-3 text-center shadow-md ring-1 ring-gray-100">
                            <span className="inline-block rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-orange">Target {g.year}</span>
                            <h3 className="mt-1.5 font-heading text-xs font-bold text-gray-900">{g.target}</h3>
                          </div>
                        </div>

                        {/* Stem + Node + Stem */}
                        <div className="flex flex-col items-center">
                          <div className={`h-4 w-px ${isAbove ? 'bg-brand-green/40' : ''}`} aria-hidden="true" />
                          <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-emerald-700 text-white shadow-xl shadow-brand-green/30 ring-4 ring-white">
                            <i className={`${g.icon} text-lg`} aria-hidden="true" />
                          </div>
                          <div className={`h-4 w-px ${!isAbove ? 'bg-brand-green/40' : ''}`} aria-hidden="true" />
                        </div>

                        {/* Lower half */}
                        <div className={`flex flex-1 flex-col items-center justify-start pt-3 ${!isAbove ? '' : 'pointer-events-none opacity-0'}`}>
                          <div className="rounded-xl bg-white p-3 text-center shadow-md ring-1 ring-gray-100">
                            <span className="inline-block rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-orange">Target {g.year}</span>
                            <h3 className="mt-1.5 font-heading text-xs font-bold text-gray-900">{g.target}</h3>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet: Vertical roadmap with nodes and connecting line */}
            <div className="lg:hidden">
              <div className="space-y-0">
                {goals.map((g, i) => (
                  <div key={g.target} className={`reveal reveal-up stagger-${i + 1} flex gap-4`}>
                    {/* Left column: node + connector */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-emerald-700 text-white shadow-lg shadow-brand-green/25 ring-4 ring-white">
                        <i className={`${g.icon} text-base`} aria-hidden="true" />
                      </div>
                      {i < goals.length - 1 && (
                        <div className="w-0.5 flex-1 bg-brand-green/20" aria-hidden="true" />
                      )}
                    </div>
                    {/* Right column: content card */}
                    <div className="flex-1 pb-6">
                      <div className="card-premium rounded-xl bg-white p-4 shadow-sm">
                        <span className="inline-block rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">Target {g.year}</span>
                        <h3 className="mt-1 font-heading text-sm font-bold text-gray-900">{g.target}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-seedling mr-2" aria-hidden="true" />Join Us in Building a Sustainable Future</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
