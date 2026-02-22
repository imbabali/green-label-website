import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ServiceCard from '@/components/services/ServiceCard'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { serviceListQuery, serviceCategoriesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import EmptyState from '@/components/shared/EmptyState'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const categories = await sanityFetch<any[]>({ query: serviceCategoriesQuery })
    const cat = categories?.find((c: any) => (c.slug?.current || c.slug) === slug)
    return generatePageMetadata({
      title: cat ? `${cat.name} Services` : 'Service Category',
      description: cat?.description || `Browse ${cat?.name || ''} waste management services.`,
      path: `/services/category/${slug}`,
    })
  } catch {
    return generatePageMetadata({ title: 'Service Category', path: `/services/category/${slug}` })
  }
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { slug } = await params

  let services: any[] = []
  let categoryName = slug

  try {
    const [allServices, categories] = await Promise.all([
      sanityFetch<any[]>({ query: serviceListQuery }),
      sanityFetch<any[]>({ query: serviceCategoriesQuery }),
    ])
    const cat = categories?.find((c: any) => (c.slug?.current || c.slug) === slug)
    if (cat) categoryName = cat.name
    services = (allServices || []).filter(
      (s: any) => s.category && (s.category.slug?.current || s.category.slug) === slug
    )
  } catch {
    // fallback
  }

  const transformedServices = services.map((s: any) => ({
    title: s.title,
    slug: s.slug?.current || s.slug,
    shortDescription: s.shortDescription || '',
    featuredImage: s.featuredImage ? urlFor(s.featuredImage).width(600).url() : undefined,
    icon: s.icon,
    category: s.category ? { name: s.category.name, slug: s.category.slug?.current || s.category.slug } : undefined,
    isFeatured: s.isFeatured,
  }))

  return (
    <>
      <Hero
        heading={categoryName}
        subheading="Service Category"
        variant="fullWidth"
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {transformedServices.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {transformedServices.map((service: any, index: number) => (
                  <div key={service.slug} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-folder-open"
              title="No services in this category"
              actionLabel="View all services"
              actionHref="/services"
            />
          )}
        </div>
      </section>
    </>
  )
}
