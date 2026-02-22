import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardGrid from '@/components/shared/CardGrid'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Awards & Recognition',
    description: 'Awards, certifications and licences held by Green Label Services — Uganda\'s leading waste management company recognised for environmental excellence.',
    path: '/awards',
  })
}

const awards = [
  {
    icon: 'fa-solid fa-ranking-star',
    year: '2022',
    title: 'Best Waste Management Company',
    body: 'National Environmental Award',
    description: 'Recognised as the leading waste management company in Uganda for outstanding service delivery, environmental compliance, and innovation in waste processing.',
  },
  {
    icon: 'fa-solid fa-earth-africa',
    year: '2020',
    title: 'Environmental Excellence Award',
    body: 'East Africa Business Awards',
    description: 'Honoured for exceptional commitment to environmental sustainability and pioneering eco-friendly waste management practices across East Africa.',
  },
  {
    icon: 'fa-solid fa-hand-holding-heart',
    year: '2019',
    title: 'Community Impact Award',
    body: 'Uganda CSR Awards',
    description: 'Awarded for significant contributions to community health and well-being through responsible waste management and public education programmes.',
  },
]

const certificates = [
  { image: 'iso.png', name: 'ISO Certification', issuer: 'International Organization for Standardization' },
  { image: 'nema_iganga.png', name: 'NEMA Licence — Iganga', issuer: 'National Environment Management Authority' },
  { image: 'nema_mbarara.png', name: 'NEMA Licence — Mbarara', issuer: 'National Environment Management Authority' },
  { image: 'kcca_trading_2025.png', name: 'KCCA Trading Licence', issuer: 'Kampala Capital City Authority' },
  { image: 'ppda_2025_2026.png', name: 'PPDA Registration', issuer: 'Public Procurement & Disposal of Assets' },
  { image: 'nsd_registration.png', name: 'NSD Registration', issuer: 'National Secretariat of Standards' },
  { image: 'unbs.png', name: 'UNBS Certification', issuer: 'Uganda National Bureau of Standards' },
  { image: 'oil_cert.png', name: 'Oil & Gas Certification', issuer: 'Petroleum Authority of Uganda' },
  { image: 'licence_storage_hazardous.png', name: 'Hazardous Waste Storage', issuer: 'NEMA' },
  { image: 'transportation_hazardous.png', name: 'Hazardous Waste Transport', issuer: 'NEMA' },
  { image: 'non_hazardous_waste.png', name: 'Non-Hazardous Waste Licence', issuer: 'NEMA' },
  { image: 'qehs_policy.png', name: 'QEHS Policy Certificate', issuer: 'Green Label Services' },
]

export default function AwardsPage() {
  return (
    <>
      {/* Centered Hero — prestige feel */}
      <Hero
        heading="Awards & Recognition"
        subheading="Certified Excellence in Waste Management"
        description="Over 25 years, Green Label Services has earned the trust of regulators, industry bodies, and clients alike."
        backgroundImage="/images/gallery/img5.png"
        variant="split"
        badge="15+ Certifications"
      />

      <StatsCounter
        stats={[
          { value: 15, suffix: '+', label: 'Certifications', icon: 'fa-solid fa-certificate' },
          { value: 3, label: 'National Awards', icon: 'fa-solid fa-trophy' },
          { value: 25, suffix: '+', label: 'Years Recognised', icon: 'fa-solid fa-calendar-check' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-handshake' },
        ]}
        darkBackground
      />

      {/* Awards — amber/gold accent trophy cards */}
      <section className="relative overflow-hidden bg-gradient-warm py-12 md:py-16">
        <GradientOrb color="orange" size="lg" className="-left-32 top-10 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-crown mr-2 text-brand-green" aria-hidden="true" />Notable Awards</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Recognised for leadership in waste management and environmental stewardship.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
              {awards.map((award, i) => (
                <div key={award.title} className={`reveal reveal-scale stagger-${i + 1} card-premium rounded-2xl border-b-4 border-b-amber-400 bg-white p-4 md:p-6 text-center shadow-md`}>
                  <div className="relative mx-auto mb-4 w-fit">
                    <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-amber-50 to-white shadow-lg shadow-amber-200/40 ring-4 ring-amber-100/60">
                      <i className={`${award.icon} text-2xl text-amber-600`} aria-hidden="true" />
                    </div>
                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green shadow-md">
                      <i className="fa-solid fa-check text-[10px] text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="inline-block rounded-full bg-brand-orange/10 px-3 py-0.5 text-xs font-semibold text-brand-orange">{award.year}</span>
                  <h3 className="mt-2 font-heading text-base font-bold text-gray-900">{award.title}</h3>
                  <p className="mt-1 text-xs font-medium text-brand-green">{award.body}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{award.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Certifications — 4-col grid with glass hover */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-certificate mr-2 text-brand-green" aria-hidden="true" />Certifications & Licences</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Fully licensed and certified by every relevant authority — your guarantee of compliance.</p>
          </ScrollRevealSection>
          <CardGrid columns={4}>
            {certificates.map((cert) => (
              <div key={cert.image} className="card-premium overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="flex h-36 items-center justify-center bg-gray-50 p-3">
                  <Image
                    src={`/images/certificates/${cert.image}`}
                    alt={cert.name}
                    width={280}
                    height={160}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-heading text-xs font-bold text-gray-900">{cert.name}</h3>
                  <p className="mt-0.5 text-[10px] text-gray-500">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-trophy mr-2" aria-hidden="true" />Partner with a Certified Leader</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Contact Us</Link>
            <Link href="#quote" data-quote-trigger="" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Request A Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
