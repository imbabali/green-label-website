import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { GradientOrb, WaveDivider, DotPattern } from '@/components/shared/DecorativeElements'
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
      {/* Centered Hero with inline stats — corporate */}
      <Hero
        heading="Financial Capacity"
        subheading="Strength to Deliver, Stability to Endure"
        description="25 years of financial health enabling us to invest in equipment, retain skilled professionals, and mobilise quickly for new contracts."
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Finances' }]}
        variant="centered"
        badge="25+ Years of Growth"
        stats={[
          { value: '25+', label: 'Years in Business' },
          { value: '2,194+', label: 'Active Clients' },
          { value: '300+', label: 'Employees' },
          { value: '50+', label: 'Vehicles Owned' },
        ]}
      />

      {/* Strengths — 2-col alternating glass cards */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-chart-pie mr-2 text-brand-green" aria-hidden="true" />Financial Strengths</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">The foundations that make us a reliable long-term partner.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-4 md:grid-cols-2">
              {strengths.map((s, i) => (
                <div key={s.title} className={`reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${Math.min(i + 1, 6)} glass flex items-start gap-4 rounded-2xl p-5`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10">
                    <i className={`${s.icon} text-lg text-brand-green`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-600">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Investments — bottom-orange border, centered stat */}
      <section className="bg-gradient-warm py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-piggy-bank mr-2 text-brand-green" aria-hidden="true" />Recent Investments</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {investments.map((item, i) => (
                <div key={item.title} className={`reveal reveal-up stagger-${i + 1} card-premium flex flex-col items-center rounded-xl border-b-4 border-b-brand-orange bg-white p-4 text-center shadow-sm`}>
                  <p className="text-gradient-green text-2xl font-bold">{item.stat}</p>
                  <h3 className="mt-1 font-heading text-xs font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-[10px] text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <WaveDivider flip color="#fef7ed" />
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-handshake mr-2" aria-hidden="true" />Partner with Financial Confidence</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Request A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
