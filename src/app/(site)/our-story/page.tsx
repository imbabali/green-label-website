import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import HorizontalTimeline from '@/components/shared/HorizontalTimeline'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
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
  { year: 2000, icon: 'fa-solid fa-seedling', title: 'Company Founded', description: 'Green Label Services was established in Kampala with a mission to provide safe, reliable waste collection services across Uganda.', image: '/images/hero/aga1.webp' },
  { year: 2004, icon: 'fa-solid fa-hospital', title: 'Medical Waste Division', description: 'Launched our dedicated medical waste management division, partnering with hospitals and healthcare facilities across Kampala.', image: '/images/offices/office2.jpg' },
  { year: 2008, icon: 'fa-solid fa-certificate', title: 'NEMA Certification', description: 'Received full National Environment Management Authority certification, affirming our commitment to environmental compliance.', image: '/images/certificates/iso.png' },
  { year: 2012, icon: 'fa-solid fa-oil-well', title: 'Oil & Gas Expansion', description: 'Expanded operations into the oil and gas sector, providing hazardous waste management for exploration and production companies.', image: '/images/vehicles/hazard_vehicle1.jpg' },
  { year: 2015, icon: 'fa-solid fa-truck-fast', title: 'Fleet Modernisation', description: 'Invested in a modern fleet of 50+ specialised waste collection and transport vehicles to serve clients nationwide.', image: '/images/vehicles/harzard_vehicle2.jpg' },
  { year: 2018, icon: 'fa-solid fa-graduation-cap', title: 'Training Academy', description: 'Established the Green Label Training Academy to educate communities and businesses on proper waste management practices.', image: '/images/training/training3.jpg' },
  { year: 2022, icon: 'fa-solid fa-award', title: 'National Recognition', description: 'Awarded Uganda\'s Best Waste Management Company for outstanding service, innovation, and environmental stewardship.', image: '/images/hero/waste.jpg' },
  { year: 2025, icon: 'fa-solid fa-earth-africa', title: '25 Years of Excellence', description: 'Celebrating 25 years of environmental leadership with over 2,194 active clients and 76,000+ tonnes of waste safely managed annually.', image: '/images/offices/office3.jpg' },
]

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.9-5.5 4.5-6.3" />
      <path d="M12 19c-2-3-4-6-4-9" />
    </svg>
  )
}

function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a6 6 0 0 1 8.48 0L21 7" />
      <path d="m21 3-9 9" />
      <path d="M3 3h4l2 2" />
      <path d="M3 7V3" />
    </svg>
  )
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="8" y2="6.01" />
      <line x1="16" y1="6" x2="16" y2="6.01" />
      <line x1="12" y1="6" x2="12" y2="6.01" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
    </svg>
  )
}

function RecycleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 4.875 7.97l3.078-1.78" />
      <path d="M15.707 13.596 19.125 7.97l-3.078-1.78" />
      <path d="m9.5 1.5 1.5 3-3 1" />
      <path d="m14.5 1.5-1.5 3 3 1" />
    </svg>
  )
}

const values = [
  { icon: ShieldIcon, title: 'Safety First', description: 'Every operation prioritises the safety of our team, clients, and the communities we serve.' },
  { icon: LeafIcon, title: 'Environmental Stewardship', description: 'We go beyond compliance to actively protect and restore Uganda\'s natural environment.' },
  { icon: HandshakeIcon, title: 'Integrity', description: 'Transparent business practices and honest communication form the foundation of every relationship.' },
  { icon: LightbulbIcon, title: 'Innovation', description: 'Continuously adopting new technologies and methods to improve waste management outcomes.' },
  { icon: UsersIcon, title: 'Community Focus', description: 'Investing in community education and environmental awareness programmes across Uganda.' },
  { icon: StarIcon, title: 'Excellence', description: 'Delivering consistently high-quality services that exceed client expectations every time.' },
]

export default function OurStoryPage() {
  return (
    <>
      {/* Split Hero with badge */}
      <Hero
        heading="Our Story"
        subheading="25 Years of Environmental Excellence"
        badge="Since 2000"
        variant="split"
        backgroundImage="/images/hero/aga1.webp"
        description="From humble beginnings in Kampala to becoming Uganda's most trusted waste management partner, our journey has been driven by a commitment to environmental stewardship and community wellbeing."
        ctaButtons={[
          { label: 'Our Services', href: '/services', variant: 'secondary' },
          { label: 'Contact Us', href: '/contact', variant: 'outline' },
        ]}
        flipped
      />

      {/* Timeline Section */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-route mr-2 text-brand-green" aria-hidden="true" />Our Journey</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-4 max-w-xl text-center text-sm text-gray-600">A timeline of key milestones that have shaped Green Label Services.</p>
          </ScrollRevealSection>
          <HorizontalTimeline milestones={milestones} />
        </div>
      </section>

      {/* Stats — Light (after timeline) */}
      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', iconNode: <CalendarIcon className="h-7 w-7" /> },
          { value: 2194, suffix: '+', label: 'Clients Served', iconNode: <BuildingIcon className="h-7 w-7" /> },
          { value: 76000, label: 'Tonnes Managed', iconNode: <RecycleIcon className="h-7 w-7" /> },
          { value: 300, suffix: '+', label: 'Team Members', iconNode: <UsersIcon className="h-7 w-7" /> },
        ]}
      />

      {/* Values — left-green border glass cards */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-right-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-heart mr-2 text-brand-green" aria-hidden="true" />Our Core Values</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">The principles that guide every decision and action.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-3 gap-3 md:gap-6 lg:grid-cols-3">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className={`reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${Math.min(i + 1, 6)} glass flex items-start gap-4 rounded-2xl border-l-4 border-l-brand-green p-5`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10">
                      <Icon className="h-5 w-5 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{value.title}</h3>
                      <p className="text-xs leading-relaxed text-gray-600">{value.description}</p>
                    </div>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-rocket mr-2" aria-hidden="true" />Be Part of Our Next Chapter</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Contact Us</Link>
            <Link href="/careers" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Join Our Team</Link>
          </div>
        </div>
      </section>
    </>
  )
}
