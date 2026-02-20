import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import ServiceDetail from '@/components/services/ServiceDetail'
import ServiceCard from '@/components/services/ServiceCard'
import ServiceInquiryForm from '@/components/forms/ServiceInquiryForm'
import { generatePageMetadata, serviceJsonLd } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { serviceDetailQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const service = await sanityFetch<any>({ query: serviceDetailQuery, params: { slug } })
    if (!service) return generatePageMetadata({ title: 'Service Not Found', path: `/services/${slug}` })
    return generatePageMetadata({
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.shortDescription,
      path: `/services/${slug}`,
    })
  } catch {
    return generatePageMetadata({ title: 'Service', path: `/services/${slug}` })
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params

  let service: any = null
  try {
    service = await sanityFetch<any>({ query: serviceDetailQuery, params: { slug } })
  } catch {
    notFound()
  }

  if (!service) notFound()

  const jsonLd = serviceJsonLd({
    title: service.title,
    description: service.shortDescription || '',
    slug: slug,
  })

  const relatedServices = (service.relatedServices || []).map((s: any) => ({
    title: s.title,
    slug: s.slug?.current || s.slug,
    shortDescription: s.shortDescription || '',
    featuredImage: s.featuredImage ? urlFor(s.featuredImage).width(400).url() : undefined,
    icon: s.icon,
    category: s.category ? { name: s.category.name, slug: s.category.slug?.current || s.category.slug } : undefined,
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        heading={service.title}
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ServiceDetail service={service} />
            </div>

            <aside>
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
                  <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                    Enquire About This Service
                  </h3>
                  <ServiceInquiryForm serviceSlug={slug} serviceTitle={service.title} />
                </div>

                <div className="rounded-xl bg-brand-green/5 p-6">
                  <h3 className="mb-3 font-heading font-bold text-gray-900">Need Help?</h3>
                  <p className="mb-4 text-sm text-gray-600">Speak directly to our service team.</p>
                  <a href="tel:+256772423092" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:underline">
                    <i className="fa-solid fa-phone" /> +256 772 423 092
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mt-16 border-t border-gray-200 pt-16">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900">Related Services</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedServices.map((s: any) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
