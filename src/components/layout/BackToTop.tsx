'use client'

import { useState, useEffect, useCallback } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [footerOffset, setFooterOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
      const footer = document.querySelector('footer')
      if (footer) {
        const overlap = window.innerHeight - footer.getBoundingClientRect().top
        setFooterOffset(Math.max(0, overlap))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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
      className={`back-to-top fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition-all hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 sm:right-6 ${
        visible ? 'visible' : ''
      }`}
      style={{ bottom: `${72 + footerOffset}px` }}
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  )
}
