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
    title: 'Financial Capacity',
    description: 'Green Label Services financial strength — 25 years of consistent growth, diversified revenue, and continuous investment in waste management infrastructure.',
    path: '/finances',
  })
}

const strengths = [
  {
    icon: 'fa-solid fa-chart-line',
    title: '25 Years of Growth',
    description: 'Consistent year-on-year revenue growth since incorporation in 2000, demonstrating financial resilience and strong market demand for our services.',
  },
  {
    icon: 'fa-solid fa-coins',
    title: 'Diversified Revenue',
    description: 'Income streams across healthcare, oil & gas, municipal, industrial, and mining sectors — reducing concentration risk and ensuring stability.',
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Strong Client Retention',
    description: 'Multi-year contracts with government agencies, hospitals, and multinational corporations — reflecting trust and service quality.',
  },
  {
    icon: 'fa-solid fa-money-bill-trend-up',
    title: 'Continuous Investment',
    description: 'Ongoing capital investment in vehicles, treatment facilities, technology, and human capital to stay ahead of industry demand.',
  },
  {
    icon: 'fa-solid fa-file-invoice-dollar',
    title: 'Clean Financial Records',
    description: 'Externally audited annual accounts, tax compliance, and transparent financial reporting to all stakeholders.',
  },
  {
    icon: 'fa-solid fa-landmark',
    title: 'Banking Relationships',
    description: 'Established credit facilities with major Ugandan banks, providing working capital flexibility for large-scale project mobilisation.',
  },
]

const investments = [
  { icon: 'fa-solid fa-truck', title: 'Fleet Expansion', desc: 'UGX 2B+ invested in 15 new specialist vehicles in 2025 alone.' },
  { icon: 'fa-solid fa-warehouse', title: 'Treatment Facilities', desc: 'New waste treatment plant in Mbarara to serve Western Uganda.' },
  { icon: 'fa-solid fa-microchip', title: 'Technology', desc: 'GPS fleet management, digital waste tracking, and client portal systems.' },
  { icon: 'fa-solid fa-user-graduate', title: 'People', desc: 'Training Academy and continuous professional development for 300+ staff.' },
]

export default function FinancialCapacityPage() {
  return (
    <>
      <Hero
        heading="Financial Capacity"
        subheading="Strength to Deliver, Stability to Endure"
        backgroundImage="/images/offices/office3.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Finances' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Financially Strong, Operationally Ready
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                A waste management partner must have the financial capacity to invest in equipment, hire and retain skilled professionals, and mobilise quickly for new contracts. Green Label Services has maintained strong financial health for over 25 years — enabling us to deliver world-class service at scale.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years in Business', icon: 'fa-solid fa-calendar-check' },
          { value: 2194, suffix: '+', label: 'Active Clients', icon: 'fa-solid fa-building' },
          { value: 300, suffix: '+', label: 'Employees', icon: 'fa-solid fa-users' },
          { value: 50, suffix: '+', label: 'Vehicles Owned', icon: 'fa-solid fa-truck' },
        ]}
        darkBackground
      />

      {/* Financial Strengths */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Financial Strengths
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              The financial foundations that make Green Label Services a reliable long-term partner.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {strengths.map((s) => (
              <div key={s.title} className="card-premium rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                  <i className={`${s.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{s.description}</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Recent Investments */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Recent Investments
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {investments.map((item, index) => (
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
            Partner with Financial Confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Our financial strength means we can mobilise fast, invest in your account, and deliver long-term.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Request A Quote
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
