import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Press Releases',
    description: 'Latest news, announcements, and media coverage from Green Label Services — Uganda\'s leading waste management company.',
    path: '/press-releases',
  })
}

const releases = [
  {
    date: 'January 2026',
    title: 'Green Label Services Expands Operations to Mbarara Region',
    summary: 'New regional depot and treatment facility to serve Western Uganda\'s growing waste management needs, creating 50+ local jobs.',
    tag: 'Expansion',
  },
  {
    date: 'November 2025',
    title: 'Partnership with Ministry of Health on Medical Waste Programme',
    summary: 'Multi-year contract to provide medical waste collection and treatment for government health facilities across 10 districts.',
    tag: 'Partnership',
  },
  {
    date: 'September 2025',
    title: 'ISO 14001 Environmental Management Certification Achieved',
    summary: 'Green Label Services becomes one of the first waste management companies in Uganda to achieve ISO 14001:2015 certification.',
    tag: 'Certification',
  },
  {
    date: 'June 2025',
    title: 'Launch of Community Recycling Points in Kampala',
    summary: 'Five new community recycling drop-off points installed in partnership with KCCA, making recycling accessible to 100,000+ residents.',
    tag: 'Community',
  },
  {
    date: 'March 2025',
    title: 'Green Label Training Academy Celebrates 2,000th Graduate',
    summary: 'Milestone reached as the Training Academy certifies its 2,000th waste management professional since inception.',
    tag: 'Training',
  },
  {
    date: 'January 2025',
    title: 'Fleet Expansion: 15 New Specialist Vehicles Commissioned',
    summary: 'Investment of over UGX 2 billion in new compactors, vacuum tankers, and medical waste vehicles to meet growing client demand.',
    tag: 'Investment',
  },
]

const tagColors: Record<string, string> = {
  Expansion: 'bg-blue-50 text-blue-700',
  Partnership: 'bg-purple-50 text-purple-700',
  Certification: 'bg-green-50 text-green-700',
  Community: 'bg-amber-50 text-amber-700',
  Training: 'bg-teal-50 text-teal-700',
  Investment: 'bg-rose-50 text-rose-700',
}

const mediaHighlights = [
  { icon: 'fa-solid fa-newspaper', title: 'Press Coverage', desc: 'Featured in Daily Monitor, New Vision, and The Observer for environmental leadership.' },
  { icon: 'fa-solid fa-microphone', title: 'Industry Speaking', desc: 'Regular speakers at NEMA Environmental Forum and East Africa Waste Summit.' },
  { icon: 'fa-solid fa-tv', title: 'Broadcast Media', desc: 'Profiled on NTV Uganda and NBS for community impact and sustainability initiatives.' },
  { icon: 'fa-solid fa-camera', title: 'Photo Library', desc: 'High-resolution images available for editorial use — contact our media team.' },
]

export default function PressReleasesPage() {
  return (
    <>
      <Hero
        heading="Press Releases"
        subheading="News & Announcements"
        backgroundImage="/images/offices/office2.jpg"
        breadcrumbs={[{ label: 'News & Media', href: '/blog' }, { label: 'Press Releases' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Latest from Green Label Services
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Stay up to date with our latest milestones, partnerships, and initiatives. For media inquiries, contact our communications team at <a href="mailto:info@greenlabelservicesug.com" className="font-medium text-brand-green hover:underline">info@greenlabelservicesug.com</a>.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Releases Timeline */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Recent Announcements
            </h2>
          </ScrollRevealSection>

          <div className="space-y-6">
            {releases.map((r, index) => (
              <ScrollRevealSection key={r.title}>
                <div className={`reveal reveal-up stagger-${Math.min((index % 3) + 1, 3)} card-premium rounded-2xl border-l-4 border-l-brand-green bg-white p-6 shadow-md`}>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">
                      <i className="fa-regular fa-calendar mr-1.5" aria-hidden="true" />
                      {r.date}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagColors[r.tag] || 'bg-gray-50 text-gray-700'}`}>
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{r.summary}</p>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Media Highlights */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Media Highlights
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mediaHighlights.map((m, index) => (
                <div key={m.title} className={`reveal reveal-up stagger-${index + 1} card-premium flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${m.icon} text-xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{m.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{m.desc}</p>
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
            Media Inquiries Welcome
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            For interviews, press kits, or editorial images, reach our communications team.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Contact Media Team
            </Link>
            <Link href="/blog" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
