import Link from 'next/link'
import { breadcrumbJsonLd } from '@/lib/utils/seo'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build JSON-LD data: always include Home, then all items that have an href,
  // plus the last item (current page) mapped to the current path.
  const jsonLdItems = [
    { name: 'Home', href: '/' },
    ...items.map((item) => ({
      name: item.label,
      href: item.href || '',
    })),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(jsonLdItems)),
        }}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
          <li className="flex items-center">
            <Link
              href="/"
              className="transition-colors hover:text-brand-green"
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center">
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &gt;
                </span>
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-gray-900"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-green"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
