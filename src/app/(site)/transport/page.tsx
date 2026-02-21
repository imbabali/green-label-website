import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardGrid from '@/components/shared/CardGrid'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Transport & Logistics',
    description: 'Safe, GPS-tracked waste transport services across Uganda — hazardous, medical, industrial, and general waste logistics by Green Label Services.',
    path: '/transport',
  })
}

const vehicleTypes = [
  {
    icon: 'fa-solid fa-truck-ramp-box',
    title: 'Compactor Trucks',
    description: 'High-capacity rear-loader compactors for efficient general and commercial waste collection on scheduled urban and peri-urban routes.',
  },
  {
    icon: 'fa-solid fa-truck-droplet',
    title: 'Vacuum Tankers',
    description: 'Specialised tanker vehicles for liquid waste, septic, and industrial sludge — fitted with metered pumps and spill containment systems.',
  },
  {
    icon: 'fa-solid fa-temperature-low',
    title: 'Medical Waste Vehicles',
    description: 'Temperature-controlled vans with sealed compartments and colour-coded bins for safe transport of infectious, sharps, and pharmaceutical waste.',
  },
  {
    icon: 'fa-solid fa-truck-moving',
    title: 'Skip Loaders',
    description: 'Heavy-duty skip lorries for construction, demolition, and bulky industrial waste — available in 6m³, 8m³, and 12m³ capacities.',
  },
  {
    icon: 'fa-solid fa-trailer',
    title: 'Roll-On / Roll-Off',
    description: 'Large-volume RORO containers for high-output operations — manufacturing, mining, and municipal transfer stations.',
  },
  {
    icon: 'fa-solid fa-truck-field',
    title: 'Emergency Response Units',
    description: 'Rapid-deployment vehicles pre-loaded with spill kits, HAZMAT gear, and containment booms for 24/7 emergency call-outs.',
  },
]

const safetyFeatures = [
  { icon: 'fa-solid fa-satellite', label: 'GPS Tracking' },
  { icon: 'fa-solid fa-gauge-simple-high', label: 'Speed Limiters' },
  { icon: 'fa-solid fa-video', label: 'Reverse Cameras' },
  { icon: 'fa-solid fa-fire-extinguisher', label: 'Fire Suppression' },
]

export default function TransportPage() {
  return (
    <>
      <Hero
        heading="Transport & Logistics"
        subheading="Safe, Tracked, Compliant Waste Transport"
        backgroundImage="/images/vehicles/harzard_vehicle5.jpg"
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Transport & Logistics' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                A Modern Fleet Built for Safety
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Every waste journey matters. Green Label Services operates a fleet of over 50 specialised vehicles — each GPS-tracked, regularly maintained, and driven by certified operators. From routine collection to emergency HAZMAT response, our logistics ensure your waste reaches licensed facilities safely and on time.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Safety badges */}
          <ScrollRevealSection>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {safetyFeatures.map((f, index) => (
                <div key={f.label} className={`reveal reveal-up stagger-${index + 1} card-premium flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${f.icon} text-lg text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-sm font-bold text-gray-900">{f.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Vehicles', icon: 'fa-solid fa-truck-fast' },
          { value: 6, label: 'Vehicle Types', icon: 'fa-solid fa-layer-group' },
          { value: 99, suffix: '%', label: 'On-Time Delivery', icon: 'fa-solid fa-stopwatch' },
          { value: 0, label: 'Transport Incidents', icon: 'fa-solid fa-triangle-exclamation' },
        ]}
        darkBackground
      />

      {/* Vehicle Types */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Fleet
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Purpose-built vehicles for every waste type and volume — from daily collections to emergency deployments.
            </p>
          </ScrollRevealSection>

          <CardGrid columns={3}>
            {vehicleTypes.map((v) => (
              <div key={v.title} className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${v.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{v.description}</p>
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
            Need Reliable Waste Transport?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            GPS-tracked, NEMA-compliant transport for any waste type, anywhere in Uganda.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">
              Get A Quote
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
