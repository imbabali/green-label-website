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
    title: 'Community Impact',
    description: 'Green Label Services community engagement — education, clean-up campaigns, health outreach, and environmental stewardship across Uganda.',
    path: '/community',
  })
}

const initiatives = [
  { icon: 'fa-solid fa-school', title: 'Schools Programme', description: 'Waste segregation and hygiene education reaching thousands of students with hands-on workshops.' },
  { icon: 'fa-solid fa-broom', title: 'Clean-Up Drives', description: 'Quarterly campaigns in neighbourhoods, trading centres, and wetland areas with volunteers and equipment.' },
  { icon: 'fa-solid fa-hand-holding-medical', title: 'Healthcare Outreach', description: 'Training community health workers on safe disposal of sharps, medicines, and household medical waste.' },
  { icon: 'fa-solid fa-people-group', title: 'Youth Employment', description: 'Employing and training young people in waste collection, sorting, and recycling — creating livelihoods.' },
  { icon: 'fa-solid fa-water', title: 'Clean Water', description: 'Protecting boreholes, springs, and wetlands by managing waste near community water sources.' },
  { icon: 'fa-solid fa-handshake-angle', title: 'Local Authority Support', description: 'Pro-bono advisory and emergency response support to sub-county and district governments.' },
]

const impacts = [
  { icon: 'fa-solid fa-children', stat: '10,000+', label: 'Students Reached' },
  { icon: 'fa-solid fa-dumpster', stat: '200+', label: 'Clean-Up Events' },
  { icon: 'fa-solid fa-briefcase', stat: '150+', label: 'Youth Employed' },
  { icon: 'fa-solid fa-tint', stat: '30+', label: 'Water Sources Protected' },
]

export default function CommunityImpactPage() {
  return (
    <>
      <Hero
        heading="Community Impact"
        subheading="Empowering Communities, Protecting Environments"
        description="Responsible waste management is inseparable from community well-being. We invest in education, employment, and protection in every community where we operate."
        backgroundImage="/images/training/training1.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Community Impact' }]}
        variant="fullWidth"
      />

      <StatsCounter
        stats={[
          { value: 15, label: 'Districts Reached', icon: 'fa-solid fa-map' },
          { value: 10000, suffix: '+', label: 'Students Educated', icon: 'fa-solid fa-graduation-cap' },
          { value: 200, suffix: '+', label: 'Clean-Up Events', icon: 'fa-solid fa-broom' },
          { value: 150, suffix: '+', label: 'Youth Employed', icon: 'fa-solid fa-user-plus' },
        ]}
        darkBackground
      />

      {/* Initiatives — Carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Our Initiatives</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Hands-on programmes creating lasting environmental and social change.</p>
          </ScrollRevealSection>

          <CardCarousel>
            {initiatives.map((item) => (
              <div key={item.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl bg-white p-5 shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10">
                    <i className={`${item.icon} text-lg text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Impact — compact row */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Measurable Impact</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {impacts.map((item, i) => (
                <div key={item.label} className={`reveal reveal-up stagger-${i + 1} card-premium flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${item.icon} text-base text-brand-orange`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-heading text-base font-bold text-brand-green">{item.stat}</p>
                    <p className="text-[10px] text-gray-600">{item.label}</p>
                  </div>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Partner With Us for Community Impact</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get In Touch</Link>
            <Link href="/careers" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Join Our Team</Link>
          </div>
        </div>
      </section>
    </>
  )
}
