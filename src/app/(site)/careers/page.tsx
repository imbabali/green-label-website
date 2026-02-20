import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import { generatePageMetadata } from '@/lib/utils/seo'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Careers',
    description: 'Join the Green Label Services team. Explore career opportunities in waste management, environmental services, and more across Uganda.',
    path: '/careers',
  })
}

const benefits = [
  { icon: 'fa-solid fa-graduation-cap', title: 'Professional Development', desc: 'Ongoing training and certification programmes to advance your career.' },
  { icon: 'fa-solid fa-heart-pulse', title: 'Health & Wellness', desc: 'Comprehensive health insurance and wellness programmes for you and your family.' },
  { icon: 'fa-solid fa-money-bill-trend-up', title: 'Competitive Pay', desc: 'Market-competitive salaries with performance-based bonuses.' },
  { icon: 'fa-solid fa-people-group', title: 'Great Team', desc: 'Work alongside passionate professionals committed to environmental excellence.' },
  { icon: 'fa-solid fa-leaf', title: 'Meaningful Work', desc: 'Make a real difference in protecting Uganda\'s environment and communities.' },
  { icon: 'fa-solid fa-clock', title: 'Work-Life Balance', desc: 'Flexible scheduling and generous leave policies.' },
]

export default function CareersPage() {
  return (
    <>
      <Hero backgroundImage="/images/training/training2.jpg"
        heading="Join Our Team"
        subheading="Build a Career That Matters"
        variant="fullWidth"
        description="At Green Label Services, we believe our people are our greatest asset. Join a team of 300+ professionals dedicated to environmental excellence."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Why Work With Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Green Label Services has been recognized as one of Uganda&apos;s best employers in the environmental sector.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10">
                  <i className={`${b.icon} text-xl text-brand-green`} />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/careers/jobs"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-4 text-lg font-semibold text-white hover:bg-brand-orange-dark"
            >
              <i className="fa-solid fa-briefcase" /> View Open Positions
            </Link>
          </div>
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
          { value: 25, suffix: '+', label: 'Years Operating', icon: 'fa-solid fa-calendar' },
          { value: 5, label: 'Regional Offices', icon: 'fa-solid fa-building' },
          { value: 95, suffix: '%', label: 'Retention Rate', icon: 'fa-solid fa-heart' },
        ]}
        darkBackground
      />
    </>
  )
}
