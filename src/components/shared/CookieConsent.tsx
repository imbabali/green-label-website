'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      // Small delay so the banner slides in after page paint
      const timer = setTimeout(() => setVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-message"
      className="fixed inset-x-0 bottom-0 z-50 animate-slide-up"
    >
      <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <div className="rounded-xl bg-white px-5 py-4 shadow-lg ring-1 ring-gray-200 sm:flex sm:items-center sm:gap-6">
          <p id="cookie-consent-message" className="flex-1 text-sm text-gray-700">
            We use cookies and analytics to improve your experience. See our{' '}
            <Link
              href="/privacy"
              className="font-medium text-brand-green underline underline-offset-2 hover:text-brand-green-dark"
            >
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
          <div className="mt-3 flex gap-3 sm:mt-0 sm:flex-shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              className="min-h-[44px] rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="min-h-[44px] rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
