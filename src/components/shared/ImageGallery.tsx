'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ImageModal from '@/components/shared/ImageModal'

interface GalleryImage {
  url: string
  alt: string
  caption?: string
  category?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  filterable?: boolean
}

export default function ImageGallery({
  images,
  filterable = false,
}: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  // Extract unique categories
  const categories = filterable
    ? [
        'all',
        ...Array.from(
          new Set(images.map((img) => img.category).filter(Boolean))
        ),
      ]
    : []

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory)

  const openModal = useCallback((index: number) => {
    setModalIndex(index)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  // Listen for navigation events from ImageModal
  useEffect(() => {
    function handleNavigate(e: Event) {
      const customEvent = e as CustomEvent<{ index: number }>
      setModalIndex(customEvent.detail.index)
    }

    window.addEventListener('image-modal-navigate', handleNavigate)
    return () =>
      window.removeEventListener('image-modal-navigate', handleNavigate)
  }, [])

  // Map filtered images for the modal
  const modalImages = filteredImages.map((img) => ({
    url: img.url,
    alt: img.alt,
    caption: img.caption,
  }))

  return (
    <div>
      {/* Category Filters */}
      {filterable && categories.length > 1 && (
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Image categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => {
                setActiveCategory(category as string)
                setModalIndex(0)
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ${
                activeCategory === category
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all'
                ? 'All'
                : (category as string).charAt(0).toUpperCase() +
                  (category as string).slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {filteredImages.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => openModal(index)}
            className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            aria-label={`View ${image.alt}${image.caption ? `: ${image.caption}` : ''}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
              <i
                className="fa-solid fa-expand text-2xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              {image.caption && (
                <p className="mt-2 max-w-[80%] truncate px-2 text-center text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {image.caption}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          No images found for this category.
        </p>
      )}

      {/* Modal */}
      <ImageModal
        images={modalImages}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </div>
  )
}
