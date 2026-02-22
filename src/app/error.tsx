'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-green-800">500</h1>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">Internal Server Error</h2>
      <p className="mt-2 max-w-md text-gray-600">
        Something went wrong on our end. Please try again or contact us if the problem persists.
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
          href="/"
          className="rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
