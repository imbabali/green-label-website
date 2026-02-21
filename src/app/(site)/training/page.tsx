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
    title: 'Education & Training',
    description: 'Professional waste management training and certification programmes — hazardous waste handling, medical waste, OSHA compliance, and community education.',
    path: '/training',
  })
}

const programmes = [
  {
    icon: 'fa-solid fa-biohazard',
    title: 'Hazardous Waste Handling',
    description: 'NEMA-aligned certification course covering identification, segregation, packaging, labelling, transport, and emergency response for hazardous waste streams.',
    duration: '5 Days',
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    title: 'Medical Waste Management',
    description: 'Practical training for healthcare workers on WHO colour-coded segregation, sharps safety, spill management, and infection prevention protocols.',
    duration: '3 Days',
  },
  {
    icon: 'fa-solid fa-helmet-safety',
    title: 'Occupational Safety & Health',
    description: 'OSHA-aligned course covering workplace hazard identification, PPE usage, incident reporting, emergency drills, and safety leadership.',
    duration: '4 Days',
  },
  {
    icon: 'fa-solid fa-leaf',
    title: 'Environmental Compliance',
    description: 'Workshop on NEMA regulations, Environmental Impact Assessment requirements, waste tracking documentation, and audit preparation.',
    duration: '2 Days',
  },
  {
    icon: 'fa-solid fa-people-roof',
    title: 'Community Waste Awareness',
    description: 'Outreach programme for local leaders, school teachers, and community health workers on waste segregation, composting, and safe disposal practices.',
    duration: '1 Day',
  },
  {
    icon: 'fa-solid fa-building-columns',
    title: 'Corporate Waste Management',
    description: 'Tailored training for office managers and facility teams on waste minimisation, recycling programmes, and regulatory compliance.',
    duration: '1 Day',
  },
]

const deliveryMethods = [
  { icon: 'fa-solid fa-chalkboard-user', title: 'On-Site Training', desc: 'Instructors come to your facility for hands-on, contextualised learning.' },
  { icon: 'fa-solid fa-building', title: 'Training Centre', desc: 'Purpose-built classrooms and practical labs at our Kampala campus.' },
  { icon: 'fa-solid fa-laptop', title: 'Virtual Sessions', desc: 'Live online workshops for remote teams and multi-site organisations.' },
  { icon: 'fa-solid fa-screwdriver-wrench', title: 'Custom Programmes', desc: 'Bespoke curricula designed around your industry, waste types, and team.' },
]

export default function TrainingPage() {
  return (
    <>
      <Hero
        heading="Education & Training"
        subheading="The Green Label Training Academy"
        backgroundImage="/images/training/training3.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Education & Training' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Building Capacity, Saving Lives
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Proper waste management starts with knowledge. The Green Label Training Academy delivers certified professional development programmes for waste handlers, healthcare workers, corporate teams, and community leaders — equipping them with the skills to manage waste safely and in full regulatory compliance.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 2000, suffix: '+', label: 'People Trained', icon: 'fa-solid fa-user-graduate' },
          { value: 6, label: 'Certified Courses', icon: 'fa-solid fa-scroll' },
          { value: 15, label: 'Districts Covered', icon: 'fa-solid fa-map-pin' },
          { value: 98, suffix: '%', label: 'Pass Rate', icon: 'fa-solid fa-chart-simple' },
        ]}
        darkBackground
      />

      {/* Programmes */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Training Programmes
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Six certified courses covering every aspect of waste management — from hands-on handling to regulatory compliance.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {programmes.map((p) => (
              <div key={p.title} className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${p.icon} text-xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                    {p.duration}
                  </span>
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{p.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Delivery Methods */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              How We Deliver
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {deliveryMethods.map((m, index) => (
                <div key={m.title} className={`reveal reveal-up stagger-${index + 1} card-premium flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${m.icon} text-xl text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{m.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{m.desc}</p>
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
            Invest in Your Team&apos;s Safety Skills
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Book a training session — on-site, at our campus, or online — and equip your team with certified waste management expertise.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Book Training
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
