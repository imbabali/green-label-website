'use client'

import { useState, useEffect, useCallback } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`back-to-top fixed bottom-[76px] right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 sm:right-7 ${
        visible ? 'visible' : ''
      }`}
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  )
}
