import Link from 'next/link'

interface MegaMenuGroup {
  heading: string
  links: { label: string; href: string }[]
}

interface MegaMenuProps {
  groups: MegaMenuGroup[]
  dynamicLinks?: { title: string; slug: string }[]
  id: string
}

export default function MegaMenu({ groups, dynamicLinks, id }: MegaMenuProps) {
  const hasDynamicLinks = dynamicLinks && dynamicLinks.length > 0
  const totalColumns = groups.length + (hasDynamicLinks ? 1 : 0)

  return (
    <div
      id={id}
      role="menu"
      className="mega-menu absolute left-1/2 top-full z-50 mt-0 w-max min-w-[280px] -translate-x-1/2 rounded-b-lg bg-white p-6 shadow-xl ring-1 ring-black/5"
    >
      <div
        className="grid gap-8"
        style={{
          gridTemplateColumns: `repeat(${totalColumns}, minmax(180px, 1fr))`,
        }}
      >
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} role="none">
            {group.heading && (
              <h3 className="mb-3 border-b border-gray-100 pb-2 font-heading text-sm font-bold uppercase tracking-wider text-brand-green">
                {group.heading}
              </h3>
            )}
            <ul role="none" className="space-y-1">
              {group.links.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    className="block rounded px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {hasDynamicLinks && (
          <div role="none">
            <h3 className="mb-3 border-b border-gray-100 pb-2 font-heading text-sm font-bold uppercase tracking-wider text-brand-green">
              Our Services
            </h3>
            <ul role="none" className="space-y-1">
              {dynamicLinks.map((service) => (
                <li key={service.slug} role="none">
                  <Link
                    href={`/services/${service.slug}`}
                    role="menuitem"
                    className="block rounded px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-green"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li role="none">
                <Link
                  href="/services"
                  role="menuitem"
                  className="mt-2 block rounded px-2 py-1.5 text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange-dark"
                >
                  View All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
