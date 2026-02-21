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
    description: 'Comprehensive medical waste collection, treatment, and disposal programme serving over 50 hospitals, clinics, and laboratories across the Kampala metropolitan area. Includes sharps management, pharmaceutical waste, and infection-control materials.',
    highlights: ['50+ facilities served', 'Daily collection schedules', 'Autoclave & incineration treatment'],
  },
  {
    icon: 'fa-solid fa-oil-well',
    title: 'Oil Field Waste Management',
    client: 'Western Uganda Exploration Sites',
    status: 'Ongoing',
    image: '/images/gallery/img3.jpg',
    description: 'Full-spectrum hazardous waste management for oil exploration and production activities in the Albertine Graben region. Covers drill cuttings, produced water, chemical waste, and spill remediation.',
    highlights: ['NEMA & PAU compliant', 'Spill response capability', 'Environmental monitoring'],
  },
  {
    icon: 'fa-solid fa-city',
    title: 'Municipal Waste Modernisation',
    client: 'Local Government Authorities',
    status: 'Completed 2023',
    image: '/images/gallery/img1.jpg',
    description: 'Modernised waste collection infrastructure for multiple municipal authorities, replacing outdated systems with GPS-tracked fleets, scheduled routes, and community recycling points.',
    highlights: ['3 districts upgraded', 'GPS-tracked fleet', '40% recycling increase'],
  },
  {
    icon: 'fa-solid fa-industry',
    title: 'Industrial Waste Audit & Compliance',
    client: 'Manufacturing Sector Clients',
    status: 'Completed 2022',
    image: '/images/vehicles/harzard_vehicle3.jpg',
    description: 'Comprehensive waste auditing and compliance advisory for major manufacturers, resulting in optimised waste streams, reduced disposal costs, and full regulatory alignment.',
    highlights: ['12 factories audited', '30% cost reduction', '100% NEMA compliance'],
  },
  {
    icon: 'fa-solid fa-mountain-sun',
    title: 'Mining Waste Remediation',
    client: 'Eastern Uganda Mining Operations',
    status: 'Completed 2021',
    image: '/images/gallery/img4.jpg',
    description: 'Environmental remediation of legacy mining waste at three sites in Eastern Uganda, including tailings stabilisation, soil restoration, and groundwater monitoring.',
    highlights: ['3 sites remediated', 'Groundwater protected', 'Community health improved'],
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'National Waste Training Initiative',
    client: 'Ministry of Health / NEMA',
    status: 'Ongoing',
    image: '/images/training/training3.jpg',
    description: 'Multi-year capacity-building programme training healthcare workers, local government officers, and community leaders in safe waste handling, segregation, and disposal best practices.',
    highlights: ['2,000+ people trained', '15 districts covered', 'Certified curriculum'],
  },
]

export default function ProjectsPage() {
  return (
    <>
      <Hero
        heading="Our Projects"
        subheading="Delivering Impact Across Uganda"
        backgroundImage="/images/gallery/img1.jpg"
        breadcrumbs={[{ label: 'Company', href: '/about' }, { label: 'Project Profiles' }]}
        variant="fullWidth"
      />

      {/* Intro */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Proven Results, Measurable Impact
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                From healthcare facilities in Kampala to oil fields in the Albertine Graben, our projects demonstrate a consistent track record of safe, compliant, and innovative waste management. Each engagement is tailored to the client&apos;s sector, scale, and regulatory landscape.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        stats={[
          { value: 50, suffix: '+', label: 'Active Projects', icon: 'fa-solid fa-diagram-project' },
          { value: 15, label: 'Districts Covered', icon: 'fa-solid fa-map-location-dot' },
          { value: 2194, suffix: '+', label: 'Clients Served', icon: 'fa-solid fa-building' },
          { value: 100, suffix: '%', label: 'Compliance Rate', icon: 'fa-solid fa-clipboard-check' },
        ]}
        darkBackground
      />

      {/* Featured Projects */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Featured Projects
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-12 max-w-2xl text-center text-gray-600">
              A selection of flagship engagements that showcase our capabilities across healthcare, oil &amp; gas, municipal, industrial, and mining sectors.
            </p>
          </ScrollRevealSection>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <ScrollRevealSection key={project.title}>
                <div className={`reveal reveal-up stagger-${Math.min((index % 3) + 1, 3)} card-premium overflow-hidden rounded-2xl bg-white shadow-md md:flex ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="relative h-64 md:h-auto md:w-2/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                        <i className={`${project.icon} text-lg text-brand-green`} aria-hidden="true" />
                      </div>
                      <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                        {project.status}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-green">{project.client}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{project.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          <i className="fa-solid fa-check text-brand-green text-[10px]" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-16">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Have a Waste Management Challenge?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200">
            We design tailored solutions for every sector and scale. Let&apos;s discuss your project.
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
