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
    title: 'About Us',
    description: 'Learn about Green Label Services — Uganda\'s leading waste management company with 25+ years of experience in medical, oil & gas, and hazardous waste management.',
    path: '/about',
  })
}

const features = [
  { icon: 'fa-solid fa-leaf', title: 'Eco-Friendly Solutions', description: 'We prioritize environmental sustainability in every aspect of our waste management operations.' },
  { icon: 'fa-solid fa-clock', title: 'Reliable Service', description: 'Count on us for consistent, timely waste collection and disposal services across Uganda.' },
  { icon: 'fa-solid fa-heart', title: 'Customer Satisfaction', description: '99.9% customer satisfaction rate through personalized service and dedicated account management.' },
]

const steps = [
  { num: '01', title: 'Provide Us With The Details', desc: 'Tell us about your waste management needs, volume, and frequency requirements.' },
  { num: '02', title: 'Pick The Suitable Plan For You', desc: 'We\'ll design a customized waste management plan that fits your budget and requirements.' },
  { num: '03', title: 'Book Waste Pickup Instantly', desc: 'Schedule your waste pickup at your convenience — we offer flexible scheduling options.' },
  { num: '04', title: 'We Collect Waste & Leave Quickly', desc: 'Our professional team handles collection efficiently with minimal disruption to your operations.' },
]

const values = [
  { icon: 'fa-solid fa-bullseye', title: 'Our Mission', text: 'To provide safe, efficient, and environmentally responsible waste management solutions that protect public health and preserve Uganda\'s natural environment.' },
  { icon: 'fa-solid fa-eye', title: 'Our Vision', text: 'To be East Africa\'s most trusted and innovative waste management company, setting the standard for environmental excellence.' },
  { icon: 'fa-solid fa-gem', title: 'Our Values', list: ['Safety First', 'Environmental Stewardship', 'Integrity & Transparency', 'Innovation & Excellence', 'Community Focus'] },
]

const whyUs = [
  { icon: 'fa-solid fa-leaf', title: 'Environmentally Conscious' },
  { icon: 'fa-solid fa-calendar-check', title: 'Reliable Scheduling' },
  { icon: 'fa-solid fa-users', title: 'Professional Team' },
  { icon: 'fa-solid fa-tag', title: 'Competitive Pricing' },
  { icon: 'fa-solid fa-truck', title: 'Modern Equipment' },
  { icon: 'fa-solid fa-certificate', title: 'Fully Licensed' },
]

export default function AboutPage() {
  return (
    <>
      {/* Split Hero — company intro with image */}
      <Hero
        heading="About Us"
        subheading="Uganda's Leading Waste Management Company"
        description="Founded in 2000, Green Label Services has grown from a small Kampala-based operation into Uganda's premier waste management company. Over 25 years of trusted service."
        backgroundImage="/images/hero/waste.jpg"
        variant="split"
        badge="Since 2000"
        ctaButtons={[
          { label: 'Our Services', href: '/services', variant: 'secondary' },
          { label: 'Contact Us', href: '/contact', variant: 'outline' },
        ]}
      />

      {/* Features — 3-col glass cards on white */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-left-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CardGrid columns={3}>
            {features.map((f) => (
              <div key={f.title} className="glass h-full rounded-2xl p-4 md:p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${f.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading text-sm font-bold text-gray-900">{f.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{f.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* How We Work — numbered steps with orange bottom borders */}
      <section className="relative overflow-hidden bg-gradient-warm py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-8 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-gears mr-2 text-brand-green" aria-hidden="true" />How We Work</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="relative flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 lg:grid-cols-4">
              <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-brand-green via-brand-orange to-brand-green lg:block" aria-hidden="true" />
              {steps.map((s, i) => (
                <div key={s.num} className={`min-w-[44vw] shrink-0 snap-start sm:min-w-[30vw] lg:min-w-0 lg:shrink reveal reveal-up stagger-${i + 1} relative text-center`}>
                  <div className="relative z-10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-green text-sm font-bold text-white shadow-lg shadow-brand-green/25">{s.num}</div>
                  <div className="border-b-2 border-b-brand-orange pb-3">
                    <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                    <p className="text-xs text-gray-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Mission / Vision / Values — left-green border cards */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 lg:grid-cols-3">
              {values.map((v, i) => (
                <div key={v.title} className={`min-w-[44vw] shrink-0 snap-start sm:min-w-[30vw] lg:min-w-0 lg:shrink reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${i + 1} card-premium rounded-2xl border-l-4 border-l-brand-green bg-white p-4 md:p-6 shadow-md`}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10">
                    <i className={`${v.icon} text-lg text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold text-gray-900">{v.title}</h3>
                  {v.text && <p className="text-sm leading-relaxed text-gray-600">{v.text}</p>}
                  {v.list && (
                    <ul className="space-y-1.5">
                      {v.list.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <i className="fa-solid fa-circle-check text-xs text-brand-green" aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Why Choose Us — 3-col with orange accent */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-8 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-star mr-2 text-brand-green" aria-hidden="true" />Why Choose Us</h2>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {whyUs.map((item) => (
              <div key={item.title} className="card-premium flex items-center gap-3 rounded-2xl border-b-2 border-b-brand-orange bg-white p-4 shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <i className={`${item.icon} text-lg text-brand-orange`} aria-hidden="true" />
                </div>
                <span className="font-heading text-sm font-bold text-gray-900">{item.title}</span>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Stats — Light Mode */}
      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
          { value: 76000, label: 'Tonnes Recycled', icon: 'fa-solid fa-recycle' },
          { value: 99, suffix: '%', label: 'Satisfaction', icon: 'fa-solid fa-star' },
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
            <i className="fa-solid fa-handshake mr-2" aria-hidden="true" />Ready to experience superior waste management?
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Get A Quote
            </Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
