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
    title: 'Human Resources',
    description: 'Green Label Services team of 300+ professionals — environmental scientists, engineers, certified waste specialists, and safety officers.',
    path: '/human-resources',
  })
}

const departments = [
  {
    icon: 'fa-solid fa-flask',
    title: 'Environmental Scientists',
    count: '25+',
    description: 'Specialists in waste characterisation, environmental monitoring, impact assessment, and remediation — ensuring science-driven decision-making.',
  },
  {
    icon: 'fa-solid fa-gears',
    title: 'Engineers & Technicians',
    count: '40+',
    description: 'Mechanical, environmental, and civil engineers managing treatment plants, fleet maintenance, and infrastructure development.',
  },
  {
    icon: 'fa-solid fa-id-card-clip',
    title: 'Certified Waste Specialists',
    count: '80+',
    description: 'NEMA-certified handlers trained in hazardous, medical, industrial, and municipal waste segregation, collection, and treatment.',
  },
  {
    icon: 'fa-solid fa-hard-hat',
    title: 'Health & Safety Officers',
    count: '15+',
    description: 'OSHA-trained professionals ensuring zero-harm operations through daily inspections, drills, and compliance monitoring.',
  },
  {
    icon: 'fa-solid fa-truck-front',
    title: 'Drivers & Fleet Operators',
    count: '60+',
    description: 'Licensed drivers with hazardous goods training, defensive driving certification, and daily vehicle pre-trip inspection responsibilities.',
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Admin & Client Services',
    count: '30+',
    description: 'Dedicated account managers, scheduling coordinators, and support staff ensuring responsive, personalised client service.',
  },
]

const benefits = [
  { icon: 'fa-solid fa-graduation-cap', title: 'Continuous Learning', desc: 'Annual training budgets, certified courses, and conference sponsorship for every team member.' },
  { icon: 'fa-solid fa-heart', title: 'Health & Wellness', desc: 'Medical insurance, annual health screenings, and occupational health monitoring for all staff.' },
  { icon: 'fa-solid fa-ranking-star', title: 'Career Progression', desc: 'Structured promotion pathways, performance reviews, and leadership development programmes.' },
  { icon: 'fa-solid fa-people-arrows', title: 'Inclusive Culture', desc: 'Equal opportunity employer committed to diversity, fair pay, and a respectful workplace.' },
]

export default function HumanResourcesPage() {
  return (
    <>
      <Hero
        heading="Human Resources"
        subheading="300+ Professionals Driving Excellence"
        backgroundImage="/images/training/training4.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Human Resources' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Our People, Our Strength
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Behind every safe collection, every compliant disposal, and every satisfied client stands a team of over 300 qualified professionals. We invest heavily in recruitment, training, and employee welfare because we know that our people are the foundation of our service quality.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
          { value: 6, label: 'Departments', icon: 'fa-solid fa-sitemap' },
          { value: 95, suffix: '%', label: 'Staff Retention', icon: 'fa-solid fa-user-check' },
          { value: 40, suffix: '+', label: 'Hours Training / Year', icon: 'fa-solid fa-chalkboard' },
        ]}
        darkBackground
      />

      {/* Departments */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Team
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Specialists across six departments working together to deliver safe, compliant waste management.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {departments.map((d) => (
              <div key={d.title} className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${d.icon} text-xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
                    {d.count}
                  </span>
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{d.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{d.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Employee Benefits */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Why People Stay
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, index) => (
                <div key={b.title} className={`reveal reveal-up stagger-${index + 1} card-premium flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${b.icon} text-xl text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{b.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{b.desc}</p>
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
            Join Our Growing Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            We&apos;re always looking for passionate professionals committed to environmental excellence.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/careers" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              View Open Positions
            </Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Contact HR
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
