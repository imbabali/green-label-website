import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-green-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
