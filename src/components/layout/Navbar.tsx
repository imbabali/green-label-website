'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, COMPANY_INFO } from '@/lib/data/constants'
import MegaMenu from '@/components/layout/MegaMenu'

interface NavbarProps {
  services?: { title: string; slug: string }[]
}

export default function Navbar({ services = [] }: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenAccordion(null)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleAccordion = useCallback((label: string) => {
    setOpenAccordion((prev) => (prev === label ? null : label))
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const isNavItemActive = (item: (typeof NAV_ITEMS)[number]) => {
    if ('href' in item && item.href) return isActive(item.href)
    if ('children' in item && item.children) {
      return item.children.some((group) =>
        group.links.some((link) => isActive(link.href))
      )
    }
    return false
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg border-b-2 border-brand-green/10'
          : 'bg-white shadow-none'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1" aria-label="Green Label Services home">
          <span className="font-heading text-xl font-extrabold tracking-tight text-brand-green lg:text-2xl">
            GREEN
          </span>
          <span className="font-heading text-xl font-extrabold tracking-tight text-brand-orange lg:text-2xl">
            LABEL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 lg:flex" role="menubar">
          {NAV_ITEMS.map((item) => {
            const hasChildren = 'children' in item && item.children
            const active = isNavItemActive(item)

            if (!hasChildren) {
              return (
                <li key={item.label} role="none">
                  <Link
                    href={'href' in item ? item.href : '#'}
                    role="menuitem"
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand-green ${
                      active
                        ? 'text-brand-green'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            const menuId = `mega-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`
            const isDynamicServices =
              'dynamicServices' in item && item.dynamicServices

            return (
              <li
                key={item.label}
                role="none"
                className="group relative"
                onMouseEnter={() => setOpenMegaMenu(item.label)}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <button
                  type="button"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={openMegaMenu === item.label}
                  aria-controls={menuId}
                  onFocus={() => setOpenMegaMenu(item.label)}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand-green ${
                    active
                      ? 'text-brand-green'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                  <i
                    className="fa-solid fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"
                    aria-hidden="true"
                  />
                </button>
                <MegaMenu
                  id={menuId}
                  groups={item.children.map((g) => ({
                    heading: g.heading,
                    links: [...g.links],
                  }))}
                  dynamicLinks={isDynamicServices ? services : undefined}
                />
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-md bg-brand-green px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-green/20 transition-all hover:bg-brand-green-dark hover:shadow-lg hover:shadow-brand-green/30 lg:inline-flex"
          >
            Contact Us
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand-green lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <i
              className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[57px] bottom-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-lg transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ overscrollBehavior: 'contain' }}
        aria-label="Mobile navigation"
        role="navigation"
      >
        <div className="divide-y divide-gray-100 px-4 pt-2" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
          {NAV_ITEMS.map((item) => {
            const hasChildren = 'children' in item && item.children
            const active = isNavItemActive(item)

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={'href' in item ? item.href : '#'}
                  aria-current={active ? 'page' : undefined}
                  className={`block py-3 text-base font-medium transition-colors ${
                    active ? 'text-brand-green' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              )
            }

            const isOpen = openAccordion === item.label
            const isDynamicServices =
              'dynamicServices' in item && item.dynamicServices

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.label)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between py-3 text-base font-medium transition-colors ${
                    active ? 'text-brand-green' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                  <i
                    className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={`accordion-content ${isOpen ? 'open' : ''}`}
                >
                  <div className="space-y-4 pb-3 pl-4">
                    {item.children.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        {group.heading && (
                          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
                            {group.heading}
                          </p>
                        )}
                        <ul className="space-y-1">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className={`block py-1.5 text-sm transition-colors hover:text-brand-green ${
                                  isActive(link.href)
                                    ? 'font-medium text-brand-green'
                                    : 'text-gray-600'
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {isDynamicServices && services.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
                          Our Services
                        </p>
                        <ul className="space-y-1">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                className={`block py-1.5 text-sm transition-colors hover:text-brand-green ${
                                  isActive(`/services/${service.slug}`)
                                    ? 'font-medium text-brand-green'
                                    : 'text-gray-600'
                                }`}
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href="/services"
                              className="block py-1.5 text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange-dark"
                            >
                              View All Services &rarr;
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Mobile CTA */}
          <div className="pt-4">
            <Link
              href="/contact"
              className="block w-full rounded-md bg-brand-green py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Contact Us
            </Link>
            <button
              type="button"
              className="mt-3 block w-full rounded-md bg-brand-orange py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark"
              data-quote-trigger
            >
              Request A Quote
            </button>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <a
              href={COMPANY_INFO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="flex h-11 w-11 items-center justify-center text-gray-500 transition-colors hover:text-brand-green"
            >
              <i className="fa-brands fa-facebook-f text-lg" aria-hidden="true" />
            </a>
            <a
              href={COMPANY_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
              className="flex h-11 w-11 items-center justify-center text-gray-500 transition-colors hover:text-brand-green"
            >
              <i className="fa-brands fa-linkedin-in text-lg" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
