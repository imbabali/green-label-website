import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import ImageGallery from '@/components/shared/ImageGallery'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Fleet',
    description: 'Green Label Services fleet of 50+ specialised waste collection and transport vehicles.',
    path: '/fleet',
  })
}

const vehicles = [
  { image: '/images/vehicles/hazard_vehicle1.jpg', title: 'HAZMAT Response Unit', type: 'Emergency' },
  { image: '/images/vehicles/harzard_vehicle2.jpg', title: 'Hazardous Waste Tanker', type: 'Liquid' },
  { image: '/images/vehicles/harzard_vehicle3.jpg', title: 'Industrial Compactor', type: 'Solid' },
  { image: '/images/vehicles/harzard_vehicle4.jpg', title: 'Medical Waste Van', type: 'Healthcare' },
  { image: '/images/vehicles/harzard_vehicle5.jpg', title: 'Skip Loader Truck', type: 'Construction' },
  { image: '/images/vehicles/harzard_vehicle6.jpg', title: 'Vacuum Tanker', type: 'Liquid' },
  { image: '/images/vehicles/harzard_vehicle7.jpg', title: 'Roll-Off Container', type: 'Industrial' },
  { image: '/images/vehicles/harzard_vehicle8.jpg', title: 'General Collection', type: 'Municipal' },
]

const features = [
  { icon: 'fa-solid fa-satellite-dish', title: 'GPS Tracking', desc: 'Real-time location for route optimisation and chain-of-custody.' },
  { icon: 'fa-solid fa-gauge', title: 'Speed Governance', desc: 'Electronic limiters for safe highway and on-site operation.' },
  { icon: 'fa-solid fa-wrench', title: 'Preventive Maintenance', desc: 'Scheduled servicing with pre/post-trip inspections.' },
  { icon: 'fa-solid fa-shield-halved', title: 'Safety Equipment', desc: 'Fire suppression, spill kits, cameras, reflective markings.' },
]

const galleryImages = vehicles.map((v) => ({
  url: v.image,
  alt: v.title,
  caption: v.title,
  category: v.type,
}))

export default function OurFleetPage() {
  return (
    <>
      <Hero
        heading="Our Fleet"
        subheading="50+ Specialist Vehicles"
        description="One of Uganda's largest and most diverse waste management fleets — purpose-built, GPS-tracked, and maintained to the highest standards."
        backgroundImage="/images/vehicles/harzard_vehicle8.jpg"
        variant="split"
        badge="50+ Vehicles"
      />

      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Vehicles', icon: 'fa-solid fa-truck' },
          { value: 8, label: 'Categories', icon: 'fa-solid fa-layer-group' },
          { value: 99, suffix: '%', label: 'Availability', icon: 'fa-solid fa-circle-check' },
          { value: 100, suffix: '%', label: 'GPS Coverage', icon: 'fa-solid fa-satellite' },
        ]}
        darkBackground
      />

      {/* Vehicle Gallery — Dark filterable section */}
      <section className="relative overflow-hidden bg-gradient-green py-12 md:py-16">
        <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-white md:text-3xl"><i className="fa-solid fa-truck-fast mr-2 text-brand-orange-light" aria-hidden="true" />Our Vehicles</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-300">Browse our fleet by category.</p>
          </ScrollRevealSection>
          <ImageGallery images={galleryImages} filterable />
        </div>
      </section>

      {/* Fleet Standards — glass frosted cards */}
      <section className="bg-gradient-subtle py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-6 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-gears mr-2 text-brand-green" aria-hidden="true" />Fleet Standards</h2>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {features.map((f, i) => (
                <div key={f.title} className={`reveal reveal-up stagger-${i + 1} glass flex flex-col items-center rounded-xl p-4 text-center`}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${f.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xs font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-1 text-[10px] text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-headset mr-2" aria-hidden="true" />Need Waste Collection or Transport?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Request A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
