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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Column 1: Company Info & Contact */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="mb-3 inline-flex items-center gap-1" aria-label="Green Label Services home">
              <span className="font-heading text-lg font-extrabold tracking-tight text-brand-green-light">
                GREEN
              </span>
              <span className="font-heading text-lg font-extrabold tracking-tight text-brand-orange">
                LABEL
              </span>
            </Link>
            <p className="mb-4 text-xs leading-relaxed text-gray-400">
              Uganda&apos;s leading waste management company — 25+ years of safe, trusted waste collection and disposal.
            </p>
            <address className="space-y-2 not-italic">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-brand-orange"
              >
                <i className="fa-solid fa-envelope text-[10px] text-brand-green-light" aria-hidden="true" />
                {COMPANY_INFO.email}
              </a>
              {COMPANY_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-brand-orange"
                >
                  <i className="fa-solid fa-phone text-[10px] text-brand-green-light" aria-hidden="true" />
                  {phone}
                </a>
              ))}
            </address>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-white">
              <span className="inline-block border-b-2 border-brand-green pb-1">Company</span>
            </h2>
            <ul className="space-y-1.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries + Dynamic Services */}
          <div>
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-white">
              <span className="inline-block border-b-2 border-brand-green pb-1">Industries</span>
            </h2>
            <ul className="space-y-1.5">
              {FOOTER_LINKS.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {services.length > 0 && (
              <>
                <h3 className="mb-2 mt-4 font-heading text-xs font-bold uppercase tracking-wider text-white">
                  <span className="inline-block border-b-2 border-brand-green pb-1">Services</span>
                </h3>
                <ul className="space-y-1.5">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs text-gray-400 transition-colors hover:text-brand-orange"
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
          <div className="col-span-2 lg:col-span-1">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-white">
              <span className="inline-block border-b-2 border-brand-green pb-1">Newsletter</span>
            </h2>
            <p className="mb-3 text-xs text-gray-400">
              Subscribe for the latest news and insights on waste management.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
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
            <div className="flex items-center gap-2">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-brand-green hover:text-white"
              >
                <i className="fa-brands fa-facebook-f text-xs" aria-hidden="true" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-brand-green hover:text-white"
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
