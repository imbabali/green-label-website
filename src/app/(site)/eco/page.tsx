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
  {
    icon: 'fa-solid fa-arrows-rotate',
    title: 'Circular Economy',
    description: 'We maximise resource recovery by transforming waste streams into reusable materials, reducing landfill dependency and creating economic value from discarded resources.',
  },
  {
    icon: 'fa-solid fa-solar-panel',
    title: 'Clean Operations',
    description: 'Our facilities and fleet are continuously upgraded to minimise carbon emissions, energy consumption, and environmental footprint across every stage of waste processing.',
  },
  {
    icon: 'fa-solid fa-seedling',
    title: 'Ecosystem Protection',
    description: 'Every operation is designed to protect soil, water, and air quality. We conduct environmental monitoring and remediation to safeguard Uganda\'s natural habitats.',
  },
]

const programmes = [
  { icon: 'fa-solid fa-recycle', title: 'Industrial Recycling', desc: 'Diverting plastics, metals, paper, and glass from landfill through dedicated sorting and processing facilities.' },
  { icon: 'fa-solid fa-flask-vial', title: 'Chemical Recovery', desc: 'Safe extraction and reuse of solvents, oils, and chemicals from industrial waste streams.' },
  { icon: 'fa-solid fa-leaf', title: 'Organic Composting', desc: 'Converting organic waste from markets and food processors into nutrient-rich compost for agriculture.' },
  { icon: 'fa-solid fa-droplet', title: 'Wastewater Treatment', desc: 'Treating and recycling process water from industrial clients to reduce freshwater consumption.' },
  { icon: 'fa-solid fa-tree-city', title: 'Community Clean-Ups', desc: 'Organising and funding neighbourhood waste collection drives and environmental awareness campaigns.' },
  { icon: 'fa-solid fa-chart-line', title: 'Carbon Tracking', desc: 'Measuring and reporting greenhouse gas reductions achieved through our recycling and recovery programmes.' },
]

const goals = [
  { target: 'Zero Waste to Landfill', year: '2030', icon: 'fa-solid fa-bullseye' },
  { target: '100% Fleet Electrification', year: '2035', icon: 'fa-solid fa-bolt' },
  { target: 'Carbon Neutral Operations', year: '2035', icon: 'fa-solid fa-cloud' },
  { target: 'ISO 14001 All Facilities', year: '2027', icon: 'fa-solid fa-certificate' },
]

export default function SustainabilityPage() {
  return (
    <>
      <Hero
        heading="Sustainability"
        subheading="Building a Greener Future for Uganda"
        backgroundImage="/images/gallery/img6.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Sustainability' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Sustainability at Our Core
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                At Green Label Services, sustainability is not a department — it is our business model. Every tonne of waste we manage is an opportunity to recover resources, protect ecosystems, and reduce Uganda&apos;s environmental footprint. Our approach is guided by three pillars.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Pillars */}
          <ScrollRevealSection>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {pillars.map((p, index) => (
                <div key={p.title} className={`reveal reveal-up stagger-${index + 1} card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-8 text-center shadow-md`}>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${p.icon} text-2xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{p.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 76000, label: 'Tonnes Recycled', icon: 'fa-solid fa-recycle' },
          { value: 40, suffix: '%', label: 'Waste Diverted', icon: 'fa-solid fa-arrow-up-right-dots' },
          { value: 12, label: 'Recovery Programmes', icon: 'fa-solid fa-gears' },
          { value: 3, label: 'Treatment Facilities', icon: 'fa-solid fa-warehouse' },
        ]}
        darkBackground
      />

      {/* Programmes */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Sustainability Programmes
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Practical initiatives that turn environmental ambition into measurable results.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {programmes.map((prog) => (
              <div key={prog.title} className="card-premium rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                  <i className={`${prog.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{prog.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{prog.desc}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Sustainability Goals */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Sustainability Goals
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {goals.map((g, index) => (
                <div key={g.target} className={`reveal reveal-up stagger-${index + 1} card-premium flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md`}>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${g.icon} text-xl text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green">
                    Target {g.year}
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-bold text-gray-900">{g.target}</h3>
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
            Join Us in Building a Sustainable Future
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Partner with Green Label Services and turn your waste into an environmental win.
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
