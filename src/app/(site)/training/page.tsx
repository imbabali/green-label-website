import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardCarousel from '@/components/shared/CardCarousel'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Education & Training',
    description: 'Professional waste management training — hazardous waste handling, medical waste, OSHA compliance, and community education.',
    path: '/training',
  })
}

const programmes = [
  { icon: 'fa-solid fa-biohazard', title: 'Hazardous Waste Handling', duration: '5 Days', description: 'NEMA-aligned certification: identification, segregation, packaging, transport, emergency response.' },
  { icon: 'fa-solid fa-heart-pulse', title: 'Medical Waste Management', duration: '3 Days', description: 'WHO colour-coded segregation, sharps safety, spill management, infection prevention.' },
  { icon: 'fa-solid fa-helmet-safety', title: 'Occupational Safety', duration: '4 Days', description: 'OSHA-aligned hazard identification, PPE usage, incident reporting, emergency drills.' },
  { icon: 'fa-solid fa-leaf', title: 'Environmental Compliance', duration: '2 Days', description: 'NEMA regulations, EIA requirements, waste tracking, audit preparation.' },
  { icon: 'fa-solid fa-people-roof', title: 'Community Awareness', duration: '1 Day', description: 'Outreach for local leaders and teachers on segregation, composting, safe disposal.' },
  { icon: 'fa-solid fa-building-columns', title: 'Corporate Training', duration: '1 Day', description: 'Tailored for office managers on waste minimisation, recycling, and compliance.' },
]

const delivery = [
  { icon: 'fa-solid fa-chalkboard-user', title: 'On-Site', desc: 'Instructors at your facility.' },
  { icon: 'fa-solid fa-building', title: 'Campus', desc: 'Purpose-built classrooms & labs.' },
  { icon: 'fa-solid fa-laptop', title: 'Virtual', desc: 'Live online for remote teams.' },
  { icon: 'fa-solid fa-screwdriver-wrench', title: 'Custom', desc: 'Bespoke for your industry.' },
]

export default function TrainingPage() {
  return (
    <>
      {/* Centered Hero with inline stats */}
      <Hero
        heading="Education & Training"
        subheading="The Green Label Training Academy"
        description="Certified professional development for waste handlers, healthcare workers, corporate teams, and community leaders."
        backgroundImage="/images/training/training3.jpg"
        variant="split"
        badge="Training Academy"
        stats={[
          { value: '2,000+', label: 'People Trained' },
          { value: '6', label: 'Certified Courses' },
          { value: '15', label: 'Districts Covered' },
          { value: '98%', label: 'Pass Rate' },
        ]}
      />

      {/* Programmes — numbered 3-col grid */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-book-open mr-2 text-brand-green" aria-hidden="true" />Our Programmes</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Six certified courses covering every aspect of waste management.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programmes.map((p, i) => (
                <div key={p.title} className={`reveal reveal-up stagger-${Math.min(i + 1, 6)} card-premium relative h-full overflow-hidden rounded-2xl bg-white p-5 shadow-md`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                      <i className={`${p.icon} text-lg text-brand-green`} aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-orange">{p.duration}</span>
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{p.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Delivery Methods — glass frosted carousel */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-graduation-cap mr-2 text-brand-green" aria-hidden="true" />How We Deliver</h2>
          </ScrollRevealSection>
          <CardCarousel>
            {delivery.map((m) => (
              <div key={m.title} className="w-[60vw] max-w-[240px] shrink-0 snap-start">
                <div className="glass flex h-full flex-col items-center rounded-xl p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${m.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xs font-bold text-gray-900">{m.title}</h3>
                  <p className="mt-1 text-[10px] text-gray-600">{m.desc}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-headset mr-2" aria-hidden="true" />Invest in Your Team&apos;s Safety Skills</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Book Training</Link>
            <Link href="#quote" data-quote-trigger="" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Request A Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
