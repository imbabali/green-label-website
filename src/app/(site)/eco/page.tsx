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
    title: 'Sustainability',
    description: 'Green Label Services\' commitment to environmental sustainability — recycling, resource recovery, and eco-friendly waste management across Uganda.',
    path: '/eco',
  })
}

const pillars = [
  { icon: 'fa-solid fa-arrows-rotate', title: 'Circular Economy', description: 'Transforming waste into reusable materials, reducing landfill dependency and creating value from discarded resources.' },
  { icon: 'fa-solid fa-solar-panel', title: 'Clean Operations', description: 'Continuously upgrading facilities and fleet to minimise carbon emissions and energy consumption.' },
  { icon: 'fa-solid fa-seedling', title: 'Ecosystem Protection', description: 'Environmental monitoring and remediation to safeguard Uganda\'s soil, water, and air quality.' },
]

const programmes = [
  { icon: 'fa-solid fa-recycle', title: 'Industrial Recycling', desc: 'Plastics, metals, paper, and glass diverted from landfill through dedicated sorting facilities.' },
  { icon: 'fa-solid fa-flask-vial', title: 'Chemical Recovery', desc: 'Safe extraction and reuse of solvents, oils, and chemicals from industrial waste streams.' },
  { icon: 'fa-solid fa-leaf', title: 'Organic Composting', desc: 'Converting organic waste into nutrient-rich compost for agriculture.' },
  { icon: 'fa-solid fa-droplet', title: 'Wastewater Treatment', desc: 'Treating and recycling process water to reduce freshwater consumption.' },
  { icon: 'fa-solid fa-tree-city', title: 'Community Clean-Ups', desc: 'Neighbourhood waste drives and environmental awareness campaigns.' },
  { icon: 'fa-solid fa-chart-line', title: 'Carbon Tracking', desc: 'Measuring and reporting greenhouse gas reductions from our programmes.' },
]

const goals = [
  { target: 'Zero Waste to Landfill', year: '2030', icon: 'fa-solid fa-bullseye' },
  { target: '100% Fleet Electrification', year: '2035', icon: 'fa-solid fa-bolt' },
  { target: 'Carbon Neutral Ops', year: '2035', icon: 'fa-solid fa-cloud' },
  { target: 'ISO 14001 All Sites', year: '2027', icon: 'fa-solid fa-certificate' },
]

export default function SustainabilityPage() {
  return (
    <>
      <Hero
        heading="Sustainability"
        subheading="Building a Greener Future for Uganda"
        description="Sustainability is our business model. Every tonne we manage is an opportunity to recover resources and reduce Uganda's environmental footprint."
        backgroundImage="/images/gallery/img6.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Sustainability' }]}
        variant="fullWidth"
      />

      {/* Pillars — compact 3-col */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((p, i) => (
                <div key={p.title} className={`reveal reveal-up stagger-${i + 1} card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 text-center shadow-md`}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${p.icon} text-xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-base font-bold text-gray-900">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{p.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 76000, label: 'Tonnes Recycled', icon: 'fa-solid fa-recycle' },
          { value: 40, suffix: '%', label: 'Waste Diverted', icon: 'fa-solid fa-arrow-up-right-dots' },
          { value: 12, label: 'Recovery Programmes', icon: 'fa-solid fa-gears' },
          { value: 3, label: 'Treatment Facilities', icon: 'fa-solid fa-warehouse' },
        ]}
        darkBackground
      />

      {/* Programmes — Carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Our Programmes</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Practical initiatives turning environmental ambition into measurable results.</p>
          </ScrollRevealSection>

          <CardCarousel>
            {programmes.map((prog) => (
              <div key={prog.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl bg-white p-5 shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10">
                    <i className={`${prog.icon} text-lg text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{prog.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{prog.desc}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Goals — inline row */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-8 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Sustainability Goals</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {goals.map((g, i) => (
                <div key={g.target} className={`reveal reveal-up stagger-${i + 1} card-premium flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm`}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${g.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold text-brand-green">Target {g.year}</span>
                  <h3 className="mt-1.5 font-heading text-xs font-bold text-gray-900">{g.target}</h3>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Join Us in Building a Sustainable Future</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
