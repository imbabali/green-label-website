'use client'

import Link from 'next/link'

export default function ServiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-green-800">Error</h1>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">Could not load this service</h2>
      <p className="mt-2 max-w-md text-gray-600">
        We encountered an error while loading this service page. Please try again or browse our
        other services.
      </p>
      {error.digest && <p className="mt-1 text-sm text-gray-400">Error ID: {error.digest}</p>}
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Try Again
        </button>
        <Link
          href="/services"
          className="rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
        >
          Browse Services
        </Link>
      </div>
    </div>
  )
}
