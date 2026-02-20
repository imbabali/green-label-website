'use client'

import { useEffect, useCallback } from 'react'

interface ModalImage {
  url: string
  alt: string
  caption?: string
}

interface ImageModalProps {
  images: ModalImage[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageModalProps) {
  const currentIndex = initialIndex

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1
    // We dispatch a custom event for parent to handle index updates
    window.dispatchEvent(
      new CustomEvent('image-modal-navigate', { detail: { index: prevIndex } })
    )
  }, [currentIndex, images.length])

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1
    window.dispatchEvent(
      new CustomEvent('image-modal-navigate', { detail: { index: nextIndex } })
    )
  }, [currentIndex, images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrev()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, goToPrev, goToNext])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <i className="fa-solid fa-xmark text-xl" aria-hidden="true" />
      </button>

      {/* Counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <i className="fa-solid fa-chevron-left text-lg" aria-hidden="true" />
        </button>
      )}

      {/* Image */}
      <div className="flex max-h-[85vh] max-w-[90vw] flex-col items-center">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="max-h-[75vh] max-w-full rounded-lg object-contain"
        />
        {currentImage.caption && (
          <p className="mt-4 max-w-lg text-center text-sm text-gray-300">
            {currentImage.caption}
          </p>
        )}
      </div>

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <i className="fa-solid fa-chevron-right text-lg" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
