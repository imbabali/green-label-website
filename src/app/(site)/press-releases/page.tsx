import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardCarousel from '@/components/shared/CardCarousel'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Press Releases',
    description: 'Latest news, announcements, and media coverage from Green Label Services.',
    path: '/press-releases',
  })
}

const releases = [
  { date: 'Jan 2026', title: 'Operations Expand to Mbarara Region', summary: 'New regional depot and treatment facility creating 50+ local jobs.', tag: 'Expansion', color: 'bg-blue-50 text-blue-700' },
  { date: 'Nov 2025', title: 'Ministry of Health Medical Waste Contract', summary: 'Multi-year contract for government health facilities across 10 districts.', tag: 'Partnership', color: 'bg-purple-50 text-purple-700' },
  { date: 'Sep 2025', title: 'ISO 14001 Certification Achieved', summary: 'Among the first waste companies in Uganda to achieve ISO 14001:2015.', tag: 'Certification', color: 'bg-green-50 text-green-700' },
  { date: 'Jun 2025', title: 'Community Recycling Points Launch', summary: 'Five new recycling drop-offs in Kampala, reaching 100,000+ residents.', tag: 'Community', color: 'bg-amber-50 text-amber-700' },
  { date: 'Mar 2025', title: 'Training Academy: 2,000th Graduate', summary: 'Milestone as the Academy certifies its 2,000th waste management professional.', tag: 'Training', color: 'bg-teal-50 text-teal-700' },
  { date: 'Jan 2025', title: '15 New Specialist Vehicles Commissioned', summary: 'UGX 2B+ investment in compactors, tankers, and medical waste vehicles.', tag: 'Investment', color: 'bg-rose-50 text-rose-700' },
]

const mediaHighlights = [
  { icon: 'fa-solid fa-newspaper', title: 'Press Coverage', desc: 'Daily Monitor, New Vision, The Observer' },
  { icon: 'fa-solid fa-microphone', title: 'Industry Speaking', desc: 'NEMA Forum & East Africa Waste Summit' },
  { icon: 'fa-solid fa-tv', title: 'Broadcast Media', desc: 'NTV Uganda & NBS features' },
  { icon: 'fa-solid fa-camera', title: 'Photo Library', desc: 'Editorial images available on request' },
]

export default function PressReleasesPage() {
  return (
    <>
      <Hero
        heading="Press Releases"
        subheading="News & Announcements"
        description="Stay up to date with our latest milestones, partnerships, and initiatives."
        backgroundImage="/images/offices/office2.jpg"
        breadcrumbs={[{ label: 'News & Media', href: '/blog' }, { label: 'Press Releases' }]}
        variant="fullWidth"
      />

      {/* Media highlights — compact bar */}
      <section className="bg-gradient-subtle py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {mediaHighlights.map((m, i) => (
                <div key={m.title} className={`reveal reveal-up stagger-${i + 1} card-premium flex items-center gap-2.5 rounded-xl bg-white p-3 shadow-sm`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${m.icon} text-base text-brand-green`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-heading text-xs font-bold text-gray-900">{m.title}</p>
                    <p className="text-[10px] text-gray-500">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Releases — Horizontal carousel */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-8 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">Recent Announcements</h2>
          </ScrollRevealSection>

          <CardCarousel hint="Swipe for more releases">
            {releases.map((r) => (
              <div key={r.title} className="w-[80vw] max-w-[360px] shrink-0 snap-start">
                <div className="card-premium h-full rounded-2xl border-l-4 border-l-brand-green bg-white p-5 shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500"><i className="fa-regular fa-calendar mr-1" aria-hidden="true" />{r.date}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.color}`}>{r.tag}</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{r.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{r.summary}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Media Inquiries Welcome</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-200">For interviews, press kits, or editorial images, reach our communications team.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Contact Media Team</Link>
            <Link href="/blog" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Read Our Blog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
