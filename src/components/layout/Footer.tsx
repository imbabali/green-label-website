import Link from 'next/link'
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/data/constants'

interface FooterProps {
  services?: { title: string; slug: string }[]
}

export default function Footer({ services = [] }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Company Info & Contact */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-1" aria-label="Green Label Services home">
              <span className="font-heading text-xl font-extrabold tracking-tight text-brand-green-light">
                GREEN
              </span>
              <span className="font-heading text-xl font-extrabold tracking-tight text-brand-orange">
                LABEL
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Uganda&apos;s leading waste management company with over 25 years
              of experience in safe, trusted waste collection and disposal
              services across the country.
            </p>
            <address className="space-y-3 not-italic">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-brand-orange"
              >
                <i className="fa-solid fa-envelope mt-0.5 text-brand-green-light" aria-hidden="true" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              {COMPANY_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-brand-orange"
                >
                  <i className="fa-solid fa-phone mt-0.5 text-brand-green-light" aria-hidden="true" />
                  <span>{phone}</span>
                </a>
              ))}
            </address>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h2 className="mb-4 font-heading text-base font-bold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries + Dynamic Services */}
          <div>
            <h2 className="mb-4 font-heading text-base font-bold uppercase tracking-wider text-white">
              Industries
            </h2>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {services.length > 0 && (
              <>
                <h3 className="mb-3 mt-6 font-heading text-sm font-bold uppercase tracking-wider text-white">
                  Services
                </h3>
                <ul className="space-y-2.5">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm text-gray-400 transition-colors hover:text-brand-orange"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h2 className="mb-4 font-heading text-base font-bold uppercase tracking-wider text-white">
              Newsletter
            </h2>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to our newsletter for the latest news, updates, and
              insights on waste management in Uganda.
            </p>
            {/* Placeholder for NewsletterForm component */}
            <div id="newsletter-form" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <nav aria-label="Policy links" className="flex flex-wrap items-center gap-4">
            {FOOTER_LINKS.policies.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 transition-colors hover:text-brand-orange"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
