import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Story',
    description:
      'Discover how Green Label Services grew from a small Kampala startup in 2000 to Uganda\'s leading waste management company with 25 years of environmental excellence.',
    path: '/our-story',
  })
}

const milestones = [
  {
    year: 2000,
    icon: 'fa-solid fa-seedling',
    title: 'Company Founded',
    description:
      'Green Label Services was established in Kampala with a mission to provide safe, reliable waste collection services across Uganda.',
    image: '/images/hero/aga1.webp',
  },
  {
    year: 2004,
    icon: 'fa-solid fa-hospital',
    title: 'Medical Waste Division',
    description:
      'Launched our dedicated medical waste management division, partnering with hospitals and healthcare facilities across Kampala.',
    image: '/images/offices/office2.jpg',
  },
  {
    year: 2008,
    icon: 'fa-solid fa-certificate',
    title: 'NEMA Certification',
    description:
      'Received full National Environment Management Authority certification, affirming our commitment to environmental compliance.',
    image: '/images/certificates/iso.png',
  },
  {
    year: 2012,
    icon: 'fa-solid fa-oil-well',
    title: 'Oil & Gas Expansion',
    description:
      'Expanded operations into the oil and gas sector, providing hazardous waste management for exploration and production companies.',
    image: '/images/vehicles/hazard_vehicle1.jpg',
  },
  {
    year: 2015,
    icon: 'fa-solid fa-truck-fast',
    title: 'Fleet Modernisation',
    description:
      'Invested in a modern fleet of 50+ specialised waste collection and transport vehicles to serve clients nationwide.',
    image: '/images/vehicles/harzard_vehicle2.jpg',
  },
  {
    year: 2018,
    icon: 'fa-solid fa-graduation-cap',
    title: 'Training Academy',
    description:
      'Established the Green Label Training Academy to educate communities and businesses on proper waste management practices.',
    image: '/images/training/training3.jpg',
  },
  {
    year: 2022,
    icon: 'fa-solid fa-award',
    title: 'National Recognition',
    description:
      'Awarded Uganda\'s Best Waste Management Company for outstanding service, innovation, and environmental stewardship.',
    image: '/images/hero/waste.jpg',
  },
  {
    year: 2025,
    icon: 'fa-solid fa-earth-africa',
    title: '25 Years of Excellence',
    description:
      'Celebrating 25 years of environmental leadership with over 2,194 active clients and 76,000+ tonnes of waste safely managed annually.',
    image: '/images/offices/office3.jpg',
  },
]

const values = [
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Safety First',
    description: 'Every operation prioritises the safety of our team, clients, and the communities we serve.',
  },
  {
    icon: 'fa-solid fa-leaf',
    title: 'Environmental Stewardship',
    description: 'We go beyond compliance to actively protect and restore Uganda\'s natural environment.',
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Integrity',
    description: 'Transparent business practices and honest communication form the foundation of every relationship.',
  },
  {
    icon: 'fa-solid fa-lightbulb',
    title: 'Innovation',
    description: 'Continuously adopting new technologies and methods to improve waste management outcomes.',
  },
  {
    icon: 'fa-solid fa-users',
    title: 'Community Focus',
    description: 'Investing in community education and environmental awareness programmes across Uganda.',
  },
  {
    icon: 'fa-solid fa-star',
    title: 'Excellence',
    description: 'Delivering consistently high-quality services that exceed client expectations every time.',
  },
]

export default function OurStoryPage() {
  return (
    <>
      <Hero
        heading="Our Story"
        subheading="25 Years of Environmental Excellence"
        badge="Since 2000"
        variant="fullWidth"
        backgroundImage="/images/hero/aga1.webp"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Our Story' }]}
        description="From humble beginnings in Kampala to becoming Uganda's most trusted waste management partner, our journey has been driven by a commitment to environmental stewardship and community wellbeing."
      />

      {/* Timeline Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Our Journey
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
            A timeline of key milestones that have shaped Green Label Services into the company it is today.
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-brand-green/20 md:block" aria-hidden="true" />
            <div className="absolute left-6 top-0 h-full w-0.5 bg-brand-green/20 md:hidden" aria-hidden="true" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0

                return (
                  <div key={milestone.year} className="relative">
                    {/* Mobile layout */}
                    <div className="flex gap-6 md:hidden">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-white shadow-lg">
                        <i className={milestone.icon} aria-hidden="true" />
                      </div>
                      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                        {milestone.image && (
                          <div className="relative h-40 w-full">
                            <Image
                              src={milestone.image}
                              alt={milestone.title}
                              fill
                              sizes="(max-width: 768px) 80vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <span className="mb-1 inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-sm font-bold text-brand-orange">
                            {milestone.year}
                          </span>
                          <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop alternating layout */}
                    <div className="hidden md:grid md:grid-cols-2 md:gap-8">
                      {isLeft ? (
                        <>
                          <div className="text-right">
                            <div className="inline-block overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm">
                              {milestone.image && (
                                <div className="relative h-48 w-full">
                                  <Image
                                    src={milestone.image}
                                    alt={milestone.title}
                                    fill
                                    sizes="45vw"
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-6">
                                <span className="mb-1 inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-sm font-bold text-brand-orange">
                                  {milestone.year}
                                </span>
                                <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                                  {milestone.title}
                                </h3>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                              </div>
                            </div>
                          </div>
                          <div />
                        </>
                      ) : (
                        <>
                          <div />
                          <div>
                            <div className="inline-block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                              {milestone.image && (
                                <div className="relative h-48 w-full">
                                  <Image
                                    src={milestone.image}
                                    alt={milestone.title}
                                    fill
                                    sizes="45vw"
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-6">
                                <span className="mb-1 inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-sm font-bold text-brand-orange">
                                  {milestone.year}
                                </span>
                                <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                                  {milestone.title}
                                </h3>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Center icon (desktop) */}
                    <div className="absolute left-1/2 top-6 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-brand-green text-white shadow-lg md:flex">
                      <i className={milestone.icon} aria-hidden="true" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Our Core Values
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            The principles that guide every decision and action at Green Label Services.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-green/10">
                  <i className={`${value.icon} text-2xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building' },
          { value: 76000, label: 'Tonnes Managed', icon: 'fa-solid fa-recycle' },
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
        ]}
        darkBackground
      />

      {/* CTA Section */}
      <section className="bg-brand-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Be Part of Our Next Chapter
          </h2>
          <p className="mt-4 text-gray-200">
            Partner with us for reliable, environmentally responsible waste management.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-dark">
              Contact Us
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
