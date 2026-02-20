import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ImageGallery from '@/components/shared/ImageGallery'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { galleryQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Gallery',
    description: 'View our gallery showcasing Green Label Services operations, facilities, and community initiatives across Uganda.',
    path: '/gallery',
  })
}

export default async function GalleryPage() {
  let images: { url: string; alt: string; caption?: string; category?: string }[] = []

  try {
    const raw = await sanityFetch<any[]>({ query: galleryQuery })
    images = raw.map((img) => ({
      url: img.image ? urlFor(img.image).width(800).url() : '',
      alt: img.caption || 'Green Label Services',
      caption: img.caption,
      category: img.category || undefined,
    })).filter((img) => img.url)
  } catch {
    // fallback
  }

  // Fallback images if none from Sanity
  if (images.length === 0) {
    images = [
      { url: '/images/placeholder-gallery-1.jpg', alt: 'Waste collection operations', category: 'Operations' },
      { url: '/images/placeholder-gallery-2.jpg', alt: 'Fleet of vehicles', category: 'Fleet' },
      { url: '/images/placeholder-gallery-3.jpg', alt: 'Community outreach', category: 'Community' },
      { url: '/images/placeholder-gallery-4.jpg', alt: 'Treatment facility', category: 'Facilities' },
    ]
  }

  return (
    <>
      <Hero
        heading="Our Gallery"
        subheading="See Our Work in Action"
        variant="fullWidth"
        breadcrumbs={[{ label: 'Gallery' }]}
        description="Explore our operations, facilities, fleet, and community initiatives across Uganda."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageGallery images={images} />
        </div>
      </section>
    </>
  )
}
