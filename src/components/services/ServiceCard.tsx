import Link from 'next/link'
import Image from 'next/image'

interface ServiceCardProps {
  service: {
    title: string
    slug: string
    shortDescription: string
    featuredImage?: string
    icon?: string
    category?: { name: string; slug: string }
    isFeatured?: boolean
    href?: string
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const serviceHref = service.href || `/services/${service.slug}`

  return (
    <article className="card-premium group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {service.featuredImage ? (
          <Image
            src={service.featuredImage}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-green/10">
            <i className={`${service.icon || 'fa-solid fa-recycle'} text-4xl text-brand-green`} />
          </div>
        )}
        {/* Premium hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-brand-green-dark/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={serviceHref}
            className="translate-y-4 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
          >
            View Details
          </Link>
        </div>
        {service.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow-md">
            Featured
          </span>
        )}
      </div>
      {/* Gradient top border on hover */}
      <div className="absolute left-0 right-0 top-[192px] h-0.5 bg-gradient-to-r from-brand-green to-brand-orange opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      <div className="p-5">
        {service.category && (
          <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-brand-green">
            {service.category.name}
          </span>
        )}
        <h3 className="font-heading text-lg font-bold text-gray-900">
          <Link href={serviceHref} className="hover:text-brand-green">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {service.shortDescription}
        </p>
        <Link
          href={serviceHref}
          className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-dark"
        >
          Learn More <i className="fa-solid fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
