'use client'

import { useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

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
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

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

  // Keyboard navigation, focus trap, and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'

    // Focus the close button on open
    requestAnimationFrame(() => {
      const firstBtn = modalRef.current?.querySelector<HTMLElement>('button')
      firstBtn?.focus()
    })

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          onClose()
          return
        case 'ArrowLeft':
          goToPrev()
          return
        case 'ArrowRight':
          goToNext()
          return
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose, goToPrev, goToNext])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div
      ref={modalRef}
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
        <div className="relative h-[75vh] w-[90vw]">
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            sizes="90vw"
            className="rounded-lg object-contain"
            priority
          />
        </div>
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
