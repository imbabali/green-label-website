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
    description: 'Safe, GPS-tracked waste transport across Uganda — hazardous, medical, industrial, and general waste logistics.',
    path: '/transport',
  })
}

const safetyFeatures = [
  { icon: 'fa-solid fa-satellite', label: 'GPS Tracking' },
  { icon: 'fa-solid fa-gauge-simple-high', label: 'Speed Limiters' },
  { icon: 'fa-solid fa-video', label: 'Reverse Cameras' },
  { icon: 'fa-solid fa-fire-extinguisher', label: 'Fire Suppression' },
]

const vehicleTypes = [
  { icon: 'fa-solid fa-truck-ramp-box', title: 'Compactor Trucks', description: 'High-capacity rear-loaders for general and commercial waste on scheduled routes.', color: 'from-brand-green to-brand-green-dark' },
  { icon: 'fa-solid fa-truck-droplet', title: 'Vacuum Tankers', description: 'Liquid waste, septic, and industrial sludge with metered pumps and spill containment.', color: 'from-brand-green to-brand-green-dark' },
  { icon: 'fa-solid fa-temperature-low', title: 'Medical Vehicles', description: 'Temperature-controlled vans with sealed compartments for infectious and sharps waste.', color: 'from-brand-orange to-brand-orange-dark' },
  { icon: 'fa-solid fa-truck-moving', title: 'Skip Loaders', description: 'Construction and bulky industrial waste — 6m\u00B3, 8m\u00B3, and 12m\u00B3 capacities.', color: 'from-brand-green to-brand-green-dark' },
  { icon: 'fa-solid fa-trailer', title: 'Roll-On / Roll-Off', description: 'Large-volume RORO containers for manufacturing, mining, and transfer stations.', color: 'from-brand-orange to-brand-orange-dark' },
  { icon: 'fa-solid fa-truck-field', title: 'Emergency Units', description: 'Rapid-deployment with spill kits, HAZMAT gear, and containment booms \u2014 24/7.', color: 'from-brand-orange to-brand-orange-dark' },
]

export default function TransportPage() {
  return (
    <>
      <Hero
        heading="Transport & Logistics"
        subheading="Safe, Tracked, Compliant"
        description="50+ specialised vehicles \u2014 GPS-tracked, regularly maintained, driven by certified operators. From routine collection to emergency HAZMAT response."
        backgroundImage="/images/vehicles/harzard_vehicle5.jpg"
        variant="split"
        badge="Tracked Fleet"
      />

      {/* Safety badges — glass frosted on warm bg */}
      <section className="bg-gradient-warm py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {safetyFeatures.map((f, i) => (
                <div key={f.label} className={`reveal reveal-scale stagger-${i + 1} glass flex items-center gap-2.5 rounded-xl p-3`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <i className={`${f.icon} text-base text-brand-orange`} aria-hidden="true" />
                  </div>
                  <span className="font-heading text-xs font-bold text-gray-900">{f.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats — Light Mode */}
      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Vehicles', icon: 'fa-solid fa-truck-fast' },
          { value: 6, label: 'Vehicle Types', icon: 'fa-solid fa-layer-group' },
          { value: 99, suffix: '%', label: 'On-Time Delivery', icon: 'fa-solid fa-stopwatch' },
          { value: 0, label: 'Transport Incidents', icon: 'fa-solid fa-triangle-exclamation' },
        ]}
      />

      {/* Vehicle Types — 3-col image-style cards */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-truck-fast mr-2 text-brand-green" aria-hidden="true" />Our Fleet</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Purpose-built vehicles for every waste type and volume.</p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {vehicleTypes.map((v) => (
              <div key={v.title} className="card-premium h-full overflow-hidden rounded-2xl bg-white shadow-md">
                <div className={`relative flex h-28 items-center justify-center rounded-t-2xl bg-gradient-to-br ${v.color}`}>
                  <i className={`${v.icon} text-4xl text-white/80`} aria-hidden="true" />
                  <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-gray-800 shadow backdrop-blur-sm">{v.title.split(' ')[0]}</span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">{v.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{v.description}</p>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-headset mr-2" aria-hidden="true" />Need Reliable Waste Transport?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Get A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
