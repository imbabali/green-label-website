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
    title: 'Our Fleet',
    description: 'Green Label Services fleet of 50+ specialised waste collection and transport vehicles — GPS-tracked, NEMA-compliant, and maintained to the highest standards.',
    path: '/fleet',
  })
}

const vehicles = [
  { image: '/images/vehicles/hazard_vehicle1.jpg', title: 'HAZMAT Response Unit', type: 'Emergency' },
  { image: '/images/vehicles/harzard_vehicle2.jpg', title: 'Hazardous Waste Tanker', type: 'Liquid Waste' },
  { image: '/images/vehicles/harzard_vehicle3.jpg', title: 'Industrial Compactor', type: 'Solid Waste' },
  { image: '/images/vehicles/harzard_vehicle4.jpg', title: 'Medical Waste Van', type: 'Healthcare' },
  { image: '/images/vehicles/harzard_vehicle5.jpg', title: 'Skip Loader Truck', type: 'Construction' },
  { image: '/images/vehicles/harzard_vehicle6.jpg', title: 'Vacuum Tanker', type: 'Liquid Waste' },
  { image: '/images/vehicles/harzard_vehicle7.jpg', title: 'Roll-Off Container Truck', type: 'Industrial' },
  { image: '/images/vehicles/harzard_vehicle8.jpg', title: 'General Collection Vehicle', type: 'Municipal' },
]

const features = [
  { icon: 'fa-solid fa-satellite-dish', title: 'GPS Live Tracking', description: 'Real-time location monitoring of every vehicle for route optimisation, ETA accuracy, and chain-of-custody documentation.' },
  { icon: 'fa-solid fa-gauge', title: 'Speed Governance', description: 'Electronic speed limiters on all vehicles to ensure safe operation on highways and within client premises.' },
  { icon: 'fa-solid fa-wrench', title: 'Preventive Maintenance', description: 'Scheduled servicing programme with pre-trip and post-trip inspections to minimise breakdowns and ensure roadworthiness.' },
  { icon: 'fa-solid fa-shield-halved', title: 'Safety Equipment', description: 'Fire suppression, spill kits, reverse cameras, and reflective markings fitted as standard on every vehicle.' },
]

export default function OurFleetPage() {
  return (
    <>
      <Hero
        heading="Our Fleet"
        subheading="50+ Specialist Vehicles Ready to Serve"
        backgroundImage="/images/vehicles/harzard_vehicle8.jpg"
        breadcrumbs={[{ label: 'Capacity', href: '/infrastructure' }, { label: 'Vehicles' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                A Fleet Built for Every Waste Challenge
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Green Label Services operates one of Uganda&apos;s largest and most diverse waste management fleets. Every vehicle is purpose-built, GPS-tracked, regularly maintained, and operated by trained, certified drivers — ensuring safe, on-time waste collection and transport nationwide.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Vehicles', icon: 'fa-solid fa-truck' },
          { value: 8, label: 'Vehicle Categories', icon: 'fa-solid fa-layer-group' },
          { value: 99, suffix: '%', label: 'Fleet Availability', icon: 'fa-solid fa-circle-check' },
          { value: 100, suffix: '%', label: 'GPS Coverage', icon: 'fa-solid fa-satellite' },
        ]}
        darkBackground
      />

      {/* Vehicle Gallery */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Vehicles
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Purpose-built for every waste type — from daily municipal collection to emergency hazardous waste response.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={4}>
            {vehicles.map((v) => (
              <div key={v.title} className="card-premium overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="relative h-48">
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="mb-1 inline-block rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-semibold text-brand-green">
                    {v.type}
                  </span>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{v.title}</h3>
                </div>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Fleet Features */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Fleet Management Standards
            </h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, index) => (
                <div key={f.title} className={`reveal reveal-up stagger-${index + 1} card-premium rounded-2xl bg-white p-6 text-center shadow-md`}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${f.icon} text-xl text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{f.description}</p>
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
            Need Waste Collection or Transport?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            Our fleet is ready — scheduled collections, one-off pickups, or emergency response.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Request A Quote
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
