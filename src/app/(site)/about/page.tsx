import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
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
      <Hero heading="About Us" variant="fullWidth" breadcrumbs={[{ label: 'About Us' }]} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Providing Trusted, Competitive And Reliable Business Waste Collection
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Founded in 2000, Green Label Services has grown from a small Kampala-based operation into Uganda&apos;s premier waste management company. With over 25 years of experience, we serve hospitals, oil companies, manufacturers, and government agencies across the country.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${f.icon} text-2xl text-brand-green`} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900">How We Work</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-xl font-bold text-white">
                  {s.num}
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border-t-4 border-t-brand-green bg-white p-8 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10">
                  <i className={`${v.icon} text-xl text-brand-green`} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">{v.title}</h3>
                {v.text && <p className="text-gray-600 leading-relaxed">{v.text}</p>}
                {v.list && (
                  <ul className="space-y-2">
                    {v.list.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <i className="fa-solid fa-check text-brand-green text-sm" /> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item) => (
              <div key={item.title} className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <i className={`${item.icon} text-xl text-brand-orange`} />
                </div>
                <span className="font-heading font-bold text-gray-900">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
          { value: 76000, label: 'Tonnes Recycled', icon: 'fa-solid fa-recycle' },
          { value: 99, suffix: '%', label: 'Satisfaction', icon: 'fa-solid fa-star' },
        ]}
        darkBackground
      />

      <section className="bg-brand-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Ready to experience superior waste management?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-dark">
              Get A Quote
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
