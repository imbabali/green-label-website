import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/shared/Hero'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
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
    initials: 'FO',
    role: 'Chairman, Board of Directors',
    bio: 'Brings over 30 years of corporate governance experience, guiding the strategic vision and long-term growth of Green Label Services.',
  },
  {
    name: 'Ms. Sarah Nakamya',
    initials: 'SN',
    role: 'Non-Executive Director',
    bio: 'An environmental law expert with extensive experience in regulatory compliance and sustainability policy in East Africa.',
  },
  {
    name: 'Dr. Peter Otim',
    initials: 'PO',
    role: 'Non-Executive Director',
    bio: 'A public health specialist who ensures Green Label maintains the highest standards in medical and hazardous waste management.',
  },
]

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" stroke="none" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const leadershipValues = [
  { icon: CompassIcon, title: 'Strategic Vision', description: 'Setting the direction for sustainable growth and industry leadership across East Africa.' },
  { icon: ShieldCheckIcon, title: 'Accountability', description: 'Taking ownership of outcomes and maintaining the highest standards of corporate governance.' },
  { icon: UsersIcon, title: 'Team Empowerment', description: 'Investing in our people through training, mentorship, and creating pathways for career growth.' },
  { icon: GlobeIcon, title: 'Environmental Commitment', description: 'Leading by example in environmental stewardship and sustainable business practices.' },
]

export default function LeadershipPage() {
  return (
    <>
      {/* Split Hero — professional leadership feel */}
      <Hero
        heading="Leadership Team"
        subheading="Guiding Environmental Excellence"
        backgroundImage="/images/gallery/img5.png"
        description="Our leadership team combines decades of industry experience with a shared passion for environmental sustainability and community wellbeing."
        variant="split"
        badge="Since 2000"
      />

      {/* CEO Section — premium glass card */}
      <section className="relative overflow-hidden bg-gradient-subtle py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-left-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up glass mx-auto max-w-4xl rounded-2xl p-6 md:p-10">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative h-28 w-28 md:h-36 md:w-36 shrink-0 overflow-hidden rounded-full ring-4 ring-brand-green/20 shadow-lg">
                  <Image
                    src="/images/hero/mugume.jpg"
                    alt="Dr. Grace Mugume - Chief Executive Officer"
                    fill
                    sizes="144px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <span className="mb-2 inline-block rounded-full bg-brand-orange/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                    Chief Executive Officer
                  </span>
                  <h3 className="font-heading text-xl font-bold text-gray-900 md:text-2xl">Dr. Grace Mugume</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    Dr. Grace Mugume founded Green Label Services in 2000 with a vision to transform waste management in Uganda. Under his leadership, the company has grown from a small Kampala-based operation to the nation&apos;s leading environmental services provider, serving over 2,194 clients across healthcare, oil and gas, manufacturing, and government sectors.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    With a doctorate in Environmental Science and over 25 years of industry experience, Dr. Mugume is a recognised voice in sustainable waste management across East Africa.
                  </p>
                  <div className="mt-3">
                    <a href="mailto:ceo@greenlabelservicesug.com" className="inline-flex items-center gap-2 rounded-md bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green-dark">
                      <i className="fa-solid fa-envelope" aria-hidden="true" /> Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Board of Directors — warm bg with glass cards */}
      <section className="bg-gradient-warm py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-users-line mr-2 text-brand-green" aria-hidden="true" />Board of Directors</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Strategic oversight ensuring the highest standards of governance and environmental responsibility.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 lg:grid-cols-3">
              {boardMembers.map((member, i) => (
                <div key={member.name} className={`min-w-[44vw] shrink-0 snap-start sm:min-w-[30vw] lg:min-w-0 lg:shrink reveal reveal-scale stagger-${i + 1} glass rounded-2xl p-6 text-center`}>
                  <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-brand-green shadow-md">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      <circle cx="50" cy="36" r="16" fill="rgba(255,255,255,0.18)" />
                      <ellipse cx="50" cy="82" rx="28" ry="20" fill="rgba(255,255,255,0.18)" />
                    </svg>
                    <span className="relative text-xl font-bold text-white">{member.initials}</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{member.name}</h3>
                  <p className="mb-2 text-xs font-medium text-brand-orange">{member.role}</p>
                  <p className="text-xs leading-relaxed text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Leadership Values — dark glass section */}
      <section className="relative overflow-hidden bg-gradient-green py-12 md:py-16">
        <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl"><i className="fa-solid fa-compass mr-2 text-brand-orange-light" aria-hidden="true" />Leadership Values</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 lg:grid-cols-4">
              {leadershipValues.map((value, i) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className={`min-w-[44vw] shrink-0 snap-start sm:min-w-[30vw] lg:min-w-0 lg:shrink reveal reveal-up stagger-${i + 1} glass-dark rounded-2xl p-5 text-center`}>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                      <Icon className="h-6 w-6 text-brand-orange-light" />
                    </div>
                    <h3 className="mb-1 font-heading text-sm font-bold text-white">{value.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-300">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-briefcase mr-2" aria-hidden="true" />Interested in Joining Our Team?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/careers" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">View Careers</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
