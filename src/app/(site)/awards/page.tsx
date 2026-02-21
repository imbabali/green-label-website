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
    icon: 'fa-solid fa-trophy',
    year: '2022',
    title: 'Best Waste Management Company',
    body: 'National Environmental Award',
    description: 'Recognised as the leading waste management company in Uganda for outstanding service delivery, environmental compliance, and innovation in waste processing.',
  },
  {
    icon: 'fa-solid fa-award',
    year: '2020',
    title: 'Environmental Excellence Award',
    body: 'East Africa Business Awards',
    description: 'Honoured for exceptional commitment to environmental sustainability and pioneering eco-friendly waste management practices across East Africa.',
  },
  {
    icon: 'fa-solid fa-medal',
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
      <Hero
        heading="Awards & Recognition"
        subheading="Certified Excellence in Waste Management"
        backgroundImage="/images/certificates/iso.png"
        breadcrumbs={[{ label: 'Awards & Recognition' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                A Track Record of Excellence
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Over 25 years, Green Label Services has earned the trust of regulators, industry bodies, and clients alike. Our awards and certifications reflect an unwavering commitment to environmental compliance, operational safety, and service excellence across Uganda and East Africa.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 15, suffix: '+', label: 'Certifications', icon: 'fa-solid fa-certificate' },
          { value: 3, label: 'National Awards', icon: 'fa-solid fa-trophy' },
          { value: 25, suffix: '+', label: 'Years Recognised', icon: 'fa-solid fa-calendar-check' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-handshake' },
        ]}
        darkBackground
      />

      {/* Awards */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Notable Awards
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Recognised by national and regional bodies for leadership in waste management and environmental stewardship.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="grid gap-8 md:grid-cols-3">
              {awards.map((award, index) => (
                <div
                  key={award.title}
                  className={`reveal reveal-up stagger-${index + 1} card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-8 text-center shadow-md`}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                    <i className={`${award.icon} text-2xl text-brand-green`} aria-hidden="true" />
                  </div>
                  <span className="inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                    {award.year}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold text-gray-900">{award.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-green">{award.body}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{award.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Certifications & Licences */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Certifications & Licences
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Fully licensed and certified by every relevant national and international authority — your guarantee of safe, compliant waste management.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={4}>
            {certificates.map((cert) => (
              <div key={cert.image} className="card-premium overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="flex h-40 items-center justify-center bg-gray-50 p-4">
                  <Image
                    src={`/images/certificates/${cert.image}`}
                    alt={cert.name}
                    width={280}
                    height={160}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-bold text-gray-900">{cert.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-16">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Partner with a Certified Leader
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Work with a company whose credentials are backed by every major environmental and standards authority in Uganda.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Contact Us
            </Link>
            <Link href="#quote" data-quote-trigger="" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Request A Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
