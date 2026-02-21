import Link from 'next/link'
import { COMPANY_INFO } from '@/lib/data/constants'

const quickLinks = [
  { label: 'Drop Off Locations', href: '/locations' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
]

export default function TopBar() {
  return (
    <div className="bg-gradient-green border-b border-white/10 text-white">
      {/* Mobile: simplified bar */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden">
        <span className="text-xs font-medium tracking-wide">
          {COMPANY_INFO.tagline}
        </span>
        <Link
          href="/quote"
          className="rounded bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow-sm shadow-brand-orange/20 transition-colors hover:bg-brand-orange-dark"
          data-quote-trigger
        >
          Get A Quote
        </Link>
      </div>

      {/* Desktop: full top bar */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-6 py-2 text-sm md:flex">
        {/* Left: Tagline */}
        <p className="font-medium tracking-wide">
          {COMPANY_INFO.tagline}
        </p>

        {/* Center: Quick links */}
        <nav aria-label="Quick links" className="flex items-center gap-1">
          {quickLinks.map((link, index) => (
            <span key={link.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-green-300/60" aria-hidden="true">|</span>
              )}
              <Link
                href={link.href}
                className="transition-colors hover:text-brand-orange-light"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Right: Quote button + social icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded bg-brand-orange px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-brand-orange/20 transition-all hover:bg-brand-orange-dark hover:shadow-md hover:shadow-brand-orange/30"
            data-quote-trigger
          >
            Request A Quote!
          </button>

          <div className="flex items-center gap-3" aria-label="Social media links">
            <a
              href={COMPANY_INFO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="transition-all hover:scale-110 hover:text-brand-orange-light"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            </a>
            <a
              href={COMPANY_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
              className="transition-all hover:scale-110 hover:text-brand-orange-light"
            >
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
