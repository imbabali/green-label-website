import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/shared/Hero'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Leadership Team',
    description:
      'Meet the leadership team behind Green Label Services — dedicated professionals driving Uganda\'s waste management industry forward.',
    path: '/leadership',
  })
}

const boardMembers = [
  {
    name: 'Mr. Francis Olupot',
    role: 'Chairman, Board of Directors',
    bio: 'Brings over 30 years of corporate governance experience, guiding the strategic vision and long-term growth of Green Label Services.',
    icon: 'fa-solid fa-chess-king',
  },
  {
    name: 'Ms. Sarah Nakamya',
    role: 'Non-Executive Director',
    bio: 'An environmental law expert with extensive experience in regulatory compliance and sustainability policy in East Africa.',
    icon: 'fa-solid fa-scale-balanced',
  },
  {
    name: 'Dr. Peter Otim',
    role: 'Non-Executive Director',
    bio: 'A public health specialist who ensures Green Label maintains the highest standards in medical and hazardous waste management.',
    icon: 'fa-solid fa-user-doctor',
  },
]

const leadershipValues = [
  {
    icon: 'fa-solid fa-compass',
    title: 'Strategic Vision',
    description: 'Setting the direction for sustainable growth and industry leadership across East Africa.',
  },
  {
    icon: 'fa-solid fa-hands-holding-circle',
    title: 'Accountability',
    description: 'Taking ownership of outcomes and maintaining the highest standards of corporate governance.',
  },
  {
    icon: 'fa-solid fa-people-group',
    title: 'Team Empowerment',
    description: 'Investing in our people through training, mentorship, and creating pathways for career growth.',
  },
  {
    icon: 'fa-solid fa-earth-africa',
    title: 'Environmental Commitment',
    description: 'Leading by example in environmental stewardship and sustainable business practices.',
  },
]

export default function LeadershipPage() {
  return (
    <>
      <Hero
        heading="Leadership Team"
        subheading="Guiding Environmental Excellence"
        variant="fullWidth"
        backgroundImage="/images/gallery/img5.png"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Leadership' }]}
        description="Our leadership team combines decades of industry experience with a shared passion for environmental sustainability and community wellbeing."
      />

      {/* Intro Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Driven by Purpose, Led by Experience
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Since 2000, our leadership team has steered Green Label Services through 25 years of growth, innovation, and environmental impact. Their collective expertise spans waste management, environmental science, public health, and corporate governance.
          </p>
        </div>
      </section>

      {/* CEO Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/hero/mugume.jpg"
                  alt="Dr. Grace Mugume - Chief Executive Officer"
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <span className="mb-2 inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                  Chief Executive Officer
                </span>
                <h3 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  Dr. Grace Mugume
                </h3>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Dr. Grace Mugume founded Green Label Services in 2000 with a vision to transform waste management in Uganda. Under her leadership, the company has grown from a small Kampala-based operation to the nation&apos;s leading environmental services provider, serving over 2,194 clients across healthcare, oil and gas, manufacturing, and government sectors.
                </p>
                <p className="mt-3 leading-relaxed text-gray-600">
                  With a doctorate in Environmental Science and over 25 years of industry experience, Dr. Mugume is a recognised voice in sustainable waste management across East Africa. She champions innovation, community education, and regulatory excellence.
                </p>
                <div className="mt-4 flex gap-3">
                  <a href={`mailto:ceo@greenlabelservicesug.com`} className="inline-flex items-center gap-2 rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark">
                    <i className="fa-solid fa-envelope" aria-hidden="true" /> Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Board of Directors
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Our board provides strategic oversight and guidance, ensuring Green Label maintains the highest standards of corporate governance and environmental responsibility.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {boardMembers.map((member) => (
              <div key={member.name} className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${member.icon} text-3xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-brand-orange">{member.role}</p>
                <p className="text-sm leading-relaxed text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Values */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Leadership Values
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadershipValues.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
                  <i className={`${value.icon} text-2xl text-brand-orange`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Interested in Joining Our Team?
          </h2>
          <p className="mt-4 text-gray-200">
            We are always looking for passionate people to join our mission.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/careers" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-dark">
              View Careers
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
