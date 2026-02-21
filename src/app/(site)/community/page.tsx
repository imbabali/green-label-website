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
    title: 'Community Impact',
    description: 'Green Label Services community engagement — education, clean-up campaigns, health outreach, and environmental stewardship across Uganda.',
    path: '/community',
  })
}

const initiatives = [
  {
    icon: 'fa-solid fa-school',
    title: 'Schools Environmental Programme',
    description: 'Delivering waste segregation and hygiene education to primary and secondary schools, reaching thousands of students with hands-on workshops and learning materials.',
  },
  {
    icon: 'fa-solid fa-broom',
    title: 'Community Clean-Up Drives',
    description: 'Quarterly clean-up campaigns in Kampala neighbourhoods, trading centres, and wetland areas — mobilising volunteers and providing equipment and waste transport.',
  },
  {
    icon: 'fa-solid fa-hand-holding-medical',
    title: 'Healthcare Waste Outreach',
    description: 'Training community health workers and village health teams on safe disposal of sharps, expired medicines, and household medical waste.',
  },
  {
    icon: 'fa-solid fa-people-group',
    title: 'Youth Employment & Skills',
    description: 'Employing and training young people from host communities in waste collection, sorting, and recycling — creating sustainable livelihoods.',
  },
  {
    icon: 'fa-solid fa-water',
    title: 'Clean Water Partnerships',
    description: 'Protecting community water sources by managing waste near boreholes, springs, and wetlands in collaboration with local water user committees.',
  },
  {
    icon: 'fa-solid fa-handshake-angle',
    title: 'Local Authority Support',
    description: 'Providing pro-bono waste management advisory and emergency response support to sub-county and district local governments.',
  },
]

const impacts = [
  { icon: 'fa-solid fa-children', title: '10,000+ Students Reached', desc: 'Environmental education delivered to schools across 15 districts.' },
  { icon: 'fa-solid fa-dumpster', title: '200+ Clean-Up Events', desc: 'Neighbourhood and wetland clean-ups since programme inception.' },
  { icon: 'fa-solid fa-briefcase', title: '150+ Youth Employed', desc: 'Local youth trained and employed in waste management roles.' },
  { icon: 'fa-solid fa-tint', title: '30+ Water Sources Protected', desc: 'Community boreholes and springs safeguarded from waste contamination.' },
]

export default function CommunityImpactPage() {
  return (
    <>
      <Hero
        heading="Community Impact"
        subheading="Empowering Communities, Protecting Environments"
        backgroundImage="/images/training/training1.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Community Impact' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                More Than a Service Provider
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Green Label Services believes that responsible waste management is inseparable from community well-being. We invest in education, employment, and environmental protection in every community where we operate — because a cleaner environment means healthier, more prosperous neighbourhoods.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 15, label: 'Districts Reached', icon: 'fa-solid fa-map' },
          { value: 10000, suffix: '+', label: 'Students Educated', icon: 'fa-solid fa-graduation-cap' },
          { value: 200, suffix: '+', label: 'Clean-Up Events', icon: 'fa-solid fa-broom' },
          { value: 150, suffix: '+', label: 'Youth Employed', icon: 'fa-solid fa-user-plus' },
        ]}
        darkBackground
      />

      {/* Initiatives */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Community Initiatives
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Hands-on programmes that create lasting environmental and social change in the communities we serve.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {initiatives.map((item) => (
              <div key={item.title} className="card-premium rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                  <i className={`${item.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Impact highlights */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Measurable Impact
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impacts.map((item, index) => (
                <div key={item.title} className={`reveal reveal-up stagger-${index + 1} card-premium flex items-start gap-4 rounded-2xl bg-white p-5 shadow-md`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${item.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
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
            Partner With Us for Community Impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Whether through CSR partnerships, sponsorship, or collaborative programmes — let&apos;s make a difference together.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Get In Touch
            </Link>
            <Link href="/careers" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
