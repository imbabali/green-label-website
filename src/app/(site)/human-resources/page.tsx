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
    title: 'Human Resources',
    description: 'Green Label Services team of 300+ professionals — scientists, engineers, certified waste specialists, and safety officers.',
    path: '/human-resources',
  })
}

const departments = [
  { icon: 'fa-solid fa-flask', title: 'Environmental Scientists', count: '25+', description: 'Waste characterisation, environmental monitoring, impact assessment, and remediation.' },
  { icon: 'fa-solid fa-gears', title: 'Engineers & Technicians', count: '40+', description: 'Treatment plants, fleet maintenance, and infrastructure development.' },
  { icon: 'fa-solid fa-id-card-clip', title: 'Certified Waste Specialists', count: '80+', description: 'NEMA-certified handlers for hazardous, medical, industrial, and municipal waste.' },
  { icon: 'fa-solid fa-hard-hat', title: 'Health & Safety Officers', count: '15+', description: 'OSHA-trained — daily inspections, drills, compliance monitoring.' },
  { icon: 'fa-solid fa-truck-front', title: 'Drivers & Fleet Operators', count: '60+', description: 'Licensed with hazardous goods training and defensive driving certification.' },
  { icon: 'fa-solid fa-headset', title: 'Admin & Client Services', count: '30+', description: 'Dedicated account managers, scheduling, and responsive support.' },
]

const benefits = [
  { icon: 'fa-solid fa-graduation-cap', title: 'Continuous Learning', desc: 'Annual training budgets and conference sponsorship.' },
  { icon: 'fa-solid fa-heart', title: 'Health & Wellness', desc: 'Medical insurance and annual health screenings.' },
  { icon: 'fa-solid fa-ranking-star', title: 'Career Progression', desc: 'Structured promotion pathways and leadership programmes.' },
  { icon: 'fa-solid fa-people-arrows', title: 'Inclusive Culture', desc: 'Equal opportunity, fair pay, respectful workplace.' },
]

export default function HumanResourcesPage() {
  return (
    <>
      <Hero
        heading="Human Resources"
        subheading="300+ Professionals Driving Excellence"
        description="Behind every safe collection and compliant disposal stands a team of qualified professionals. We invest heavily in recruitment, training, and welfare."
        backgroundImage="/images/training/training4.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Human Resources' }]}
        variant="fullWidth"
      />

      <StatsCounter
        stats={[
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
          { value: 6, label: 'Departments', icon: 'fa-solid fa-sitemap' },
          { value: 95, suffix: '%', label: 'Retention', icon: 'fa-solid fa-user-check' },
          { value: 40, suffix: '+', label: 'Training Hours / Year', icon: 'fa-solid fa-chalkboard' },
        ]}
        darkBackground
      />

      {/* Departments — Carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Our Team</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Six departments working together for safe, compliant waste management.</p>
          </ScrollRevealSection>
          <CardCarousel>
            {departments.map((d) => (
              <div key={d.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl border-t-4 border-t-brand-green bg-white p-5 shadow-md">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                      <i className={`${d.icon} text-lg text-brand-green`} aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-orange">{d.count}</span>
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{d.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{d.description}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Benefits — compact row */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Why People Stay</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <div key={b.title} className={`reveal reveal-up stagger-${i + 1} card-premium flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm`}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${b.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xs font-bold text-gray-900">{b.title}</h3>
                  <p className="mt-1 text-[10px] text-gray-600">{b.desc}</p>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Join Our Growing Team</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/careers" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">View Open Positions</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact HR</Link>
          </div>
        </div>
      </section>
    </>
  )
}
