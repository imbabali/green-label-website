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
    title: 'Financial Capacity',
    description: 'Green Label Services financial strength — 25 years of growth, diversified revenue, and continuous infrastructure investment.',
    path: '/finances',
  })
}

const strengths = [
  { icon: 'fa-solid fa-chart-line', title: '25 Years of Growth', description: 'Consistent year-on-year revenue growth demonstrating financial resilience.' },
  { icon: 'fa-solid fa-coins', title: 'Diversified Revenue', description: 'Income across healthcare, oil & gas, municipal, industrial, and mining sectors.' },
  { icon: 'fa-solid fa-handshake', title: 'Strong Retention', description: 'Multi-year contracts with government agencies, hospitals, and multinationals.' },
  { icon: 'fa-solid fa-money-bill-trend-up', title: 'Continuous Investment', description: 'Ongoing capital investment in vehicles, treatment facilities, and technology.' },
  { icon: 'fa-solid fa-file-invoice-dollar', title: 'Clean Records', description: 'Externally audited annual accounts and full tax compliance.' },
  { icon: 'fa-solid fa-landmark', title: 'Banking Relationships', description: 'Established credit facilities for large-scale project mobilisation.' },
]

const investments = [
  { icon: 'fa-solid fa-truck', title: 'Fleet', stat: 'UGX 2B+', desc: '15 new specialist vehicles in 2025.' },
  { icon: 'fa-solid fa-warehouse', title: 'Facilities', stat: 'Mbarara', desc: 'New treatment plant for Western Uganda.' },
  { icon: 'fa-solid fa-microchip', title: 'Technology', stat: 'Digital', desc: 'GPS fleet management & client portal.' },
  { icon: 'fa-solid fa-user-graduate', title: 'People', stat: '300+', desc: 'Training Academy & CPD for all staff.' },
]

export default function FinancialCapacityPage() {
  return (
    <>
      <Hero
        heading="Financial Capacity"
        subheading="Strength to Deliver, Stability to Endure"
        description="25 years of financial health enabling us to invest in equipment, retain skilled professionals, and mobilise quickly for new contracts."
        backgroundImage="/images/offices/office3.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Finances' }]}
        variant="fullWidth"
      />

      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years in Business', icon: 'fa-solid fa-calendar-check' },
          { value: 2194, suffix: '+', label: 'Active Clients', icon: 'fa-solid fa-building' },
          { value: 300, suffix: '+', label: 'Employees', icon: 'fa-solid fa-users' },
          { value: 50, suffix: '+', label: 'Vehicles Owned', icon: 'fa-solid fa-truck' },
        ]}
        darkBackground
      />

      {/* Strengths — Carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Financial Strengths</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">The foundations that make us a reliable long-term partner.</p>
          </ScrollRevealSection>
          <CardCarousel>
            {strengths.map((s) => (
              <div key={s.title} className="w-[75vw] max-w-[300px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl bg-white p-5 shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10">
                    <i className={`${s.icon} text-lg text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{s.description}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Recent Investments — compact */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Recent Investments</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {investments.map((item, i) => (
                <div key={item.title} className={`reveal reveal-up stagger-${i + 1} card-premium flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${item.icon} text-base text-brand-orange`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-heading text-xs font-bold text-gray-900">{item.title}</p>
                    <p className="text-[10px] font-bold text-brand-green">{item.stat}</p>
                    <p className="text-[10px] text-gray-500">{item.desc}</p>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Partner with Financial Confidence</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Request A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
