import Link from 'next/link'

interface EmptyStateProps {
  icon: string
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-subtle shadow-inner">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
          <i className={`${icon} text-3xl text-gray-300`} aria-hidden="true" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {description && (
        <p className="mx-auto mt-2 max-w-sm text-gray-600">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white shadow-md shadow-brand-green/20 transition-all hover:bg-brand-green-dark hover:shadow-lg"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
