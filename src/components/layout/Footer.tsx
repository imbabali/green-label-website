import Link from 'next/link'
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/data/constants'
import NewsletterForm from '@/components/shared/NewsletterForm'

interface FooterProps {
  services?: { title: string; slug: string }[]
}

export default function Footer({ services = [] }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white" role="contentinfo">
      {/* Gradient top border */}
      <div
        aria-hidden="true"
        className="h-1"
        style={{ background: 'linear-gradient(to right, #2c632c, #F7941D)' }}
      />

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
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/20">
                  <i className="fa-solid fa-envelope text-xs text-brand-green-light" aria-hidden="true" />
                </span>
                <span className="pt-1">{COMPANY_INFO.email}</span>
              </a>
              {COMPANY_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-brand-orange"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/20">
                    <i className="fa-solid fa-phone text-xs text-brand-green-light" aria-hidden="true" />
                  </span>
                  <span className="pt-1">{phone}</span>
                </a>
              ))}
            </address>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h2 className="mb-4 font-heading text-base font-bold uppercase tracking-wider text-white">
              <span className="inline-block border-b-2 border-brand-green pb-1">Company</span>
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
              <span className="inline-block border-b-2 border-brand-green pb-1">Industries</span>
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
                  <span className="inline-block border-b-2 border-brand-green pb-1">Services</span>
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
              <span className="inline-block border-b-2 border-brand-green pb-1">Newsletter</span>
            </h2>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to our newsletter for the latest news, updates, and
              insights on waste management in Uganda.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
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
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-brand-green hover:text-white"
              >
                <i className="fa-brands fa-facebook-f text-xs" aria-hidden="true" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-brand-green hover:text-white"
              >
                <i className="fa-brands fa-linkedin-in text-xs" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
