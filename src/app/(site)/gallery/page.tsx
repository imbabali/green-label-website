import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ImageGallery from '@/components/shared/ImageGallery'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
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
      { url: '/images/gallery/img1.jpg', alt: 'Green Label Services waste collection operations', category: 'Operations' },
      { url: '/images/vehicles/harzard_vehicle3.jpg', alt: 'Hazardous waste collection vehicle', category: 'Fleet' },
      { url: '/images/training/training1.jpg', alt: 'Staff training and community outreach', category: 'Training' },
      { url: '/images/hero/aga1.webp', alt: 'Green Label Services headquarters', category: 'Facilities' },
      { url: '/images/vehicles/hazard_vehicle1.jpg', alt: 'Medical waste transport vehicle', category: 'Fleet' },
      { url: '/images/gallery/img3.jpg', alt: 'Waste management operations', category: 'Operations' },
      { url: '/images/training/training3.jpg', alt: 'Environmental safety training', category: 'Training' },
      { url: '/images/offices/office1.jpg', alt: 'Iganga treatment facility', category: 'Facilities' },
      { url: '/images/vehicles/harzard_vehicle5.jpg', alt: 'Liquid waste collection truck', category: 'Fleet' },
      { url: '/images/gallery/img6.jpg', alt: 'Waste disposal operations', category: 'Operations' },
      { url: '/images/offices/office2.jpg', alt: 'Mbarara eco-center', category: 'Facilities' },
      { url: '/images/training/training5.jpg', alt: 'Community awareness program', category: 'Training' },
    ]
  }

  return (
    <>
      {/* Centered Hero — visual/gallery feel */}
      <Hero
        heading="Our Gallery"
        subheading="See Our Work in Action"
        description="Explore our operations, facilities, fleet, and community initiatives across Uganda."
        variant="centered"
        badge="Photo Gallery"
      />

      {/* Filterable gallery on dark bg */}
      <section className="relative overflow-hidden bg-gradient-green py-12 md:py-16">
        <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-white md:text-3xl"><i className="fa-solid fa-images mr-2 text-brand-orange-light" aria-hidden="true" />Browse by Category</h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-300">Filter images by operations, fleet, training, or facilities.</p>
          </ScrollRevealSection>
          <ImageGallery images={images} filterable />
        </div>
      </section>
    </>
  )
}
