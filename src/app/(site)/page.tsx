import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from '@/components/shared/HeroCarousel'
import StatsCounter from '@/components/shared/StatsCounter'
import ReviewCarousel from '@/components/shared/ReviewCarousel'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { GradientOrb, WaveDivider, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata, organizationJsonLd } from '@/lib/utils/seo'
import { COMPANY_INFO } from '@/lib/data/constants'

export const revalidate = 60

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Green Label Services — Safe And Trusted Waste Collection Service',
    description:
      'Green Label Services is Uganda\'s leading waste management company with 25+ years of experience. We provide medical waste, oil & gas waste, liquid waste, and hazardous waste collection services.',
  })
}

// ---------------------------------------------------------------------------
// Fallback data when Sanity / Supabase are not configured
// ---------------------------------------------------------------------------

const fallbackServices = [
  {
    icon: 'fa-solid fa-biohazard',
    title: 'Medical Waste',
    description:
      'Safe collection, transport, and disposal of healthcare waste from hospitals, clinics, and laboratories across Uganda.',
    href: '/services',
  },
  {
    icon: 'fa-solid fa-oil-well',
    title: 'Oil & Gas Waste',
    description:
      'Specialized handling of petroleum-related waste including drill cuttings, produced water, and contaminated soils.',
    href: '/oil-and-gas',
  },
  {
    icon: 'fa-solid fa-droplet',
    title: 'Liquid Waste',
    description:
      'Professional liquid waste collection and treatment services for industrial, commercial, and residential clients.',
    href: '/services',
  },
  {
    icon: 'fa-solid fa-store',
    title: 'Retail Waste',
    description:
      'Comprehensive waste management solutions for shopping centres, markets, and commercial establishments.',
    href: '/services',
  },
  {
    icon: 'fa-solid fa-toolbox',
    title: 'Equipment Supply',
    description:
      'Supply and servicing of waste management equipment including bins, skips, compactors, and specialized containers.',
    href: '/services',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Training',
    description:
      'Accredited waste management training programs for healthcare workers, oil & gas personnel, and institutional staff.',
    href: '/training',
  },
]

const fallbackLicenses = [
  {
    title: 'NEMA Transport License',
    number: 'NEMA/TL/2024/001',
    scope: 'Transportation of hazardous waste within Uganda',
  },
  {
    title: 'NEMA Treatment License',
    number: 'NEMA/TR/2024/002',
    scope: 'Treatment and disposal of medical and hazardous waste',
  },
  {
    title: 'NEMA Storage License',
    number: 'NEMA/SL/2024/003',
    scope: 'Temporary storage of hazardous waste at designated facilities',
  },
  {
    title: 'NEMA Collection License',
    number: 'NEMA/CL/2024/004',
    scope: 'Collection of solid and liquid waste from commercial and industrial premises',
  },
  {
    title: 'NEMA Disposal License',
    number: 'NEMA/DL/2024/005',
    scope: 'Final disposal of non-hazardous and hazardous waste at approved sites',
  },
  {
    title: 'NEMA EIA Certificate',
    number: 'NEMA/EIA/2024/006',
    scope: 'Environmental Impact Assessment approval for waste management operations',
  },
]

const fallbackPosts: { title: string; slug: string; excerpt: string; featuredImage?: string; publishedAt: string; category: { name: string; slug: string }; author: { name: string } }[] = [
  {
    title: 'Best Practices for Medical Waste Disposal in Healthcare Facilities',
    slug: 'best-practices-medical-waste-disposal',
    excerpt:
      'Learn the essential guidelines for proper medical waste segregation, storage, and disposal to protect healthcare workers and the environment.',
    publishedAt: '2025-12-15',
    category: { name: 'Medical Waste', slug: 'medical-waste' },
    author: { name: 'Green Label Services' },
  },
  {
    title: 'Understanding Oil & Gas Waste Management Regulations in East Africa',
    slug: 'oil-gas-waste-regulations-east-africa',
    excerpt:
      'A comprehensive overview of the regulatory framework governing oil and gas waste management across the East African region.',
    publishedAt: '2025-11-28',
    category: { name: 'Oil & Gas', slug: 'oil-and-gas' },
    author: { name: 'Green Label Services' },
  },
  {
    title: 'Green Label Services Expands Operations to Western Uganda',
    slug: 'expansion-western-uganda',
    excerpt:
      'We are proud to announce the expansion of our waste management services to Mbarara, Fort Portal, and surrounding districts.',
    publishedAt: '2025-11-10',
    category: { name: 'Company News', slug: 'company-news' },
    author: { name: 'Green Label Services' },
  },
]

const fallbackTestimonials = [
  {
    id: '1',
    title: 'Exceptional Service Quality',
    comment:
      'Green Label Services has been our trusted waste management partner for over 5 years. Their reliability and professionalism are unmatched in the industry.',
    overall_rating: 5,
    service_type: 'medical_waste',
    created_at: '2025-10-15',
    profiles: { first_name: 'Dr. Sarah', last_name: 'Nakamya' },
  },
  {
    id: '2',
    title: 'Professional and Timely',
    comment:
      'We rely on Green Label for all our oil field waste disposal needs. Their team is knowledgeable, prompt, and always compliant with environmental regulations.',
    overall_rating: 5,
    service_type: 'oil_gas_waste',
    created_at: '2025-09-22',
    profiles: { first_name: 'James', last_name: 'Okello' },
  },
  {
    id: '3',
    title: 'Great Value for Money',
    comment:
      'Switching to Green Label was one of the best decisions for our facility. Competitive pricing without compromising on quality or safety standards.',
    overall_rating: 4,
    service_type: 'liquid_waste',
    created_at: '2025-08-18',
    profiles: { first_name: 'Agnes', last_name: 'Tumusiime' },
  },
]

// ---------------------------------------------------------------------------
// Data fetching helpers
// ---------------------------------------------------------------------------

async function getHomeData() {
  try {
    const { sanityFetch } = await import('@/lib/sanity/client')
    const { homePageQuery } = await import('@/lib/sanity/queries')
    const data = await sanityFetch<{
      featuredServices: Array<{
        _id: string
        title: string
        slug: { current: string }
        shortDescription: string
        icon: string
        category: { name: string; slug: { current: string } }
      }>
      latestPosts: Array<{
        _id: string
        title: string
        slug: { current: string }
        excerpt: string
        featuredImage: string
        publishedAt: string
        category: { name: string; slug: { current: string } }
        author: { name: string; photo: string }
      }>
      nemaLicenses: Array<{
        _id: string
        title: string
        number: string
        scope: string
      }>
    }>(homePageQuery)
    return data
  } catch {
    return null
  }
}

async function getRecentReviews() {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('reviews')
      .select('id, title, comment, overall_rating, service_type, created_at, profiles(first_name, last_name)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(6)
    return data
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function HomePage() {
  const [homeData, reviews] = await Promise.all([
    getHomeData(),
    getRecentReviews(),
  ])

  const heroSlides = [
    {
      heading: 'Competitive And Reliable Medical Waste Collection!',
      description:
        'For over 25 years, Green Label Services has been Uganda\'s most trusted partner for safe and compliant medical waste management. We serve hospitals, clinics, and laboratories with excellence.',
      backgroundImage: '/images/gallery/img1.jpg',
      ctaButtons: [
        { label: 'Our Services', href: '/services', variant: 'primary' as const },
        { label: 'Get A Quote', href: '#quote', variant: 'outline' as const },
      ],
    },
    {
      heading: 'Oil & Gas Waste Management Excellence',
      description:
        'Specialized waste management services for the oil and gas industry. From drill cuttings to produced water, we handle it all with the highest environmental and safety standards.',
      backgroundImage: '/images/gallery/img2.jpeg',
      ctaButtons: [
        { label: 'Learn More', href: '/oil-and-gas', variant: 'primary' as const },
        { label: 'Contact Us', href: '/contact', variant: 'outline' as const },
      ],
    },
    {
      heading: 'Safe And Trusted Waste Collection Service',
      description:
        'Our commitment to environmental sustainability drives everything we do. From collection to disposal, we ensure your waste is managed responsibly and in full compliance with NEMA regulations.',
      backgroundImage: '/images/vehicles/harzard_vehicle3.jpg',
      ctaButtons: [
        { label: 'About Us', href: '/about', variant: 'secondary' as const },
        { label: 'Request Quote', href: '#quote', variant: 'outline' as const },
      ],
    },
  ]

  const statsData = [
    { value: 25, suffix: '+', label: 'Years of Experience', icon: 'fa-solid fa-calendar-check' },
    { value: 76000, label: 'Tonnes Processed Annually', icon: 'fa-solid fa-recycle' },
    { value: 2194, suffix: '+', label: 'Satisfied Clients', icon: 'fa-solid fa-users' },
    { value: 99, suffix: '.9%', label: 'Customer Satisfaction', icon: 'fa-solid fa-star' },
  ]

  const services = fallbackServices
  const licenses = homeData?.nemaLicenses ?? fallbackLicenses
  const posts = homeData?.latestPosts
    ? homeData.latestPosts.slice(0, 3).map((p) => ({
        title: p.title,
        slug: p.slug.current,
        excerpt: p.excerpt,
        featuredImage: p.featuredImage,
        publishedAt: p.publishedAt,
        category: p.category
          ? { name: p.category.name, slug: p.category.slug.current }
          : undefined,
        author: p.author ? { name: p.author.name } : undefined,
      }))
    : fallbackPosts

  const reviewData = reviews ?? fallbackTestimonials

  const jsonLd = organizationJsonLd()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* a) Hero Carousel                                                   */}
      {/* ----------------------------------------------------------------- */}
      <HeroCarousel slides={heroSlides} />

      {/* ----------------------------------------------------------------- */}
      {/* b) Services Grid Section                                           */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-subtle py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-radial-green" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange">
                What We Offer
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                <i className="fa-solid fa-layer-group mr-2 text-brand-green" aria-hidden="true" />Our Services
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Comprehensive Waste Management Solutions
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`reveal reveal-up stagger-${Math.min(index + 1, 6)} card-premium group rounded-2xl border border-gray-100 bg-white p-6 shadow-md`}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <i className={`${service.icon} text-2xl`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
                  >
                    Learn More
                    <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="reveal reveal-scale mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-heading text-sm font-semibold text-white shadow-md shadow-brand-green/20 transition-all hover:bg-brand-green-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              >
                View All Services
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </Link>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* c) Stats Section                                                   */}
      {/* ----------------------------------------------------------------- */}
      <StatsCounter stats={statsData} darkBackground />

      {/* ----------------------------------------------------------------- */}
      {/* d) NEMA Licenses Section                                           */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute inset-0 pattern-grid" aria-hidden="true" />
        <WaveDivider flip color="#f9fafb" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto max-w-3xl text-center">
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange">
                Compliance
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                <i className="fa-solid fa-certificate mr-2 text-brand-green" aria-hidden="true" />Licensed &amp; Certified
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Fully licensed by the National Environment Management Authority (NEMA) for all waste management operations
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {licenses.map((license, index) => (
                <div
                  key={license.number ?? index}
                  className={`reveal reveal-up stagger-${Math.min(index + 1, 6)} card-premium rounded-2xl border border-gray-100 bg-white p-6 shadow-md`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                    <i className="fa-solid fa-certificate text-xl" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-heading text-base font-bold text-gray-900">
                    {license.title}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-brand-green">
                    {license.number}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {license.scope}
                  </p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* e) Reviews Section                                                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-subtle py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-radial-orange" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange">
                Testimonials
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                <i className="fa-solid fa-quote-left mr-2 text-brand-green" aria-hidden="true" />What Our Clients Say
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Trusted by hospitals, oil companies, and businesses across Uganda
              </p>
            </div>
          </ScrollRevealSection>

          <ReviewCarousel reviews={reviewData} />

          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
            >
              View All Reviews
              <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* f) Latest Blog Posts Section                                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-warm py-16 md:py-20">
        <DotPattern className="opacity-30" />
        <WaveDivider flip color="#ffffff" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange">
                Our Blog
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                <i className="fa-solid fa-newspaper mr-2 text-brand-green" aria-hidden="true" />Latest News &amp; Insights
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Stay informed about waste management best practices, industry updates, and company news
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`reveal reveal-up stagger-${Math.min(index + 1, 3)} card-premium group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                        <i className="fa-solid fa-newspaper text-4xl text-brand-green/30" aria-hidden="true" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
                    {post.category && (
                      <span className="absolute right-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow-md">
                        {post.category.name}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    {post.author && (
                      <p className="mb-2 text-xs font-medium text-gray-500">
                        <i className="fa-solid fa-user mr-1.5" aria-hidden="true" />
                        {post.author.name}
                      </p>
                    )}
                    <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-colors hover:text-brand-green"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {post.excerpt.length > 150
                        ? post.excerpt.substring(0, 150).trimEnd() + '...'
                        : post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
                    >
                      Read Article
                      <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="reveal reveal-scale mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-heading text-sm font-semibold text-white shadow-md shadow-brand-green/20 transition-all hover:bg-brand-green-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              >
                View All Posts
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </Link>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* g) Partners & Clients Section                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange">
                Our Partners
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                <i className="fa-solid fa-handshake mr-2 text-brand-green" aria-hidden="true" />Trusted By Industry Leaders
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We proudly serve leading organizations across Uganda&apos;s oil &amp; gas, healthcare, and public sectors
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-3 items-center gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {[
              { src: '/images/partners/cnooc.png', alt: 'CNOOC Uganda' },
              { src: '/images/partners/cosl.png', alt: 'COSL' },
              { src: '/images/partners/usaid.png', alt: 'USAID' },
              { src: '/images/partners/nms.png', alt: 'National Medical Stores' },
              { src: '/images/partners/moh.png', alt: 'Ministry of Health' },
              { src: '/images/partners/nda.png', alt: 'National Drug Authority' },
              { src: '/images/partners/excel.png', alt: 'Excel Construction' },
              { src: '/images/partners/balton.png', alt: 'Balton' },
              { src: '/images/partners/karmodbeta.png', alt: 'Karmod' },
              { src: '/images/partners/mantrac.png', alt: 'Mantrac Uganda' },
              { src: '/images/partners/daqing.png', alt: 'Daqing' },
              { src: '/images/partners/cscec.png', alt: 'CSCEC' },
              { src: '/images/partners/gcc.png', alt: 'GCC' },
              { src: '/images/partners/jsi.png', alt: 'JSI' },
              { src: '/images/partners/chai.png', alt: 'CHAI' },
              { src: '/images/partners/aidstarone.png', alt: 'AIDStar-One' },
              { src: '/images/partners/glazer.png', alt: 'Glazer' },
              { src: '/images/partners/kcca.png', alt: 'KCCA' },
            ].map((partner) => (
              <div
                key={partner.alt}
                className="relative flex h-20 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={120}
                  height={48}
                  className="object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* h) CTA Section                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-green py-16 md:py-20">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-32 opacity-20" />
        <GradientOrb color="green" size="md" className="-bottom-16 -left-16 opacity-20" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <div className="reveal reveal-up">
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                <i className="fa-solid fa-headset mr-2" aria-hidden="true" />Ready to Get Started?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200">
                Partner with Uganda&apos;s most trusted waste management company. Let us handle your waste
                professionally, safely, and in full compliance with environmental regulations.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="#quote"
                  data-quote-trigger=""
                  className="inline-flex items-center rounded-lg bg-brand-orange px-6 py-3 font-heading text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                >
                  Request A Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* i) JSON-LD                                                         */}
      {/* ----------------------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
