import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Projects',
    description: 'Major waste management projects completed by Green Label Services across Uganda — healthcare, oil & gas, municipal, and industrial sectors.',
    path: '/projects',
  })
}

const projects = [
  {
    icon: 'fa-solid fa-hospital',
    title: 'Kampala Medical Waste Programme',
    client: '50+ Healthcare Facilities',
    status: 'Ongoing',
    image: '/images/training/training5.jpg',
    description: 'Comprehensive medical waste collection, treatment, and disposal serving over 50 hospitals and clinics across Kampala.',
    highlights: ['50+ facilities', 'Daily collections', 'Autoclave treatment'],
  },
  {
    icon: 'fa-solid fa-oil-well',
    title: 'Oil Field Waste Management',
    client: 'Western Uganda Exploration',
    status: 'Ongoing',
    image: '/images/gallery/img3.jpg',
    description: 'Full-spectrum hazardous waste management for oil exploration in the Albertine Graben region.',
    highlights: ['NEMA compliant', 'Spill response', 'Env. monitoring'],
  },
  {
    icon: 'fa-solid fa-city',
    title: 'Municipal Waste Modernisation',
    client: 'Local Government Authorities',
    status: '2023',
    image: '/images/gallery/img1.jpg',
    description: 'Modernised waste collection for municipal authorities with GPS-tracked fleets and community recycling points.',
    highlights: ['3 districts', 'GPS fleet', '40% recycling \u2191'],
  },
  {
    icon: 'fa-solid fa-industry',
    title: 'Industrial Waste Compliance',
    client: 'Manufacturing Sector',
    status: '2022',
    image: '/images/vehicles/harzard_vehicle3.jpg',
    description: 'Waste auditing and compliance advisory for 12 major manufacturers \u2014 optimising streams and reducing costs.',
    highlights: ['12 factories', '30% cost \u2193', '100% compliant'],
  },
  {
    icon: 'fa-solid fa-mountain-sun',
    title: 'Mining Waste Remediation',
    client: 'Eastern Uganda Mining Ops',
    status: '2021',
    image: '/images/gallery/img4.jpg',
    description: 'Environmental remediation of legacy mining waste \u2014 tailings stabilisation, soil restoration, groundwater monitoring.',
    highlights: ['3 sites', 'Groundwater safe', 'Community health \u2191'],
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'National Waste Training Initiative',
    client: 'Ministry of Health / NEMA',
    status: 'Ongoing',
    image: '/images/training/training3.jpg',
    description: 'Multi-year capacity-building programme training healthcare workers and local government officers.',
    highlights: ['2,000+ trained', '15 districts', 'Certified'],
  },
]

export default function ProjectsPage() {
  return (
    <>
      {/* Split Hero with badge */}
      <Hero
        heading="Our Projects"
        subheading="Delivering Impact Across Uganda"
        description="From healthcare facilities in Kampala to oil fields in the Albertine Graben \u2014 proven results across every sector."
        backgroundImage="/images/gallery/img1.jpg"
        variant="split"
        badge="50+ Active Projects"
        ctaButtons={[
          { label: 'Get A Quote', href: '#quote', variant: 'secondary' },
          { label: 'Contact Us', href: '/contact', variant: 'outline' },
        ]}
        flipped
      />

      {/* Stats — Light */}
      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Active Projects', icon: 'fa-solid fa-diagram-project' },
          { value: 15, label: 'Districts Covered', icon: 'fa-solid fa-map-location-dot' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building' },
          { value: 100, suffix: '%', label: 'Compliance Rate', icon: 'fa-solid fa-clipboard-check' },
        ]}
      />

      {/* Projects — 2-col paired image+text cards */}
      <section className="relative overflow-hidden bg-gradient-subtle py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-right-32 top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl"><i className="fa-solid fa-diagram-project mr-2 text-brand-green" aria-hidden="true" />Featured Projects</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">Flagship engagements across healthcare, oil &amp; gas, municipal, industrial, and mining sectors.</p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 lg:grid-cols-2">
              {projects.map((project, i) => (
                <article key={project.title} className={`min-w-[70vw] shrink-0 snap-start sm:min-w-[45vw] lg:min-w-0 lg:shrink reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${Math.min(i + 1, 6)} card-premium overflow-hidden rounded-2xl bg-white shadow-md`}>
                  <div className="relative h-32 md:h-40">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow backdrop-blur-sm ${project.status === 'Ongoing' ? 'bg-brand-green/90 text-white' : 'bg-white/90 text-gray-800'}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10">
                        <i className={`${project.icon} text-xs text-brand-green`} aria-hidden="true" />
                      </div>
                      <p className="text-xs font-medium text-brand-green">{project.client}</p>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-gray-900">{project.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.highlights.map((h) => (
                        <span key={h} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                          <i className="fa-solid fa-check text-brand-green text-[8px]" aria-hidden="true" />{h}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
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
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl"><i className="fa-solid fa-briefcase mr-2" aria-hidden="true" />Have a Waste Management Challenge?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="#quote" data-quote-trigger="" className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark">Request A Quote</Link>
            <Link href="/contact" className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
