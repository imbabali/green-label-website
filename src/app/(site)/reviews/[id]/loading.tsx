import { SkeletonText } from '@/components/shared/Skeleton'

export default function ReviewDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="shimmer mx-auto mb-4 h-10 w-36 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content skeleton matching ReviewDetail layout */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Title + author row */}
            <div className="mb-6">
              <div className="shimmer mb-2 h-9 w-3/4 rounded-lg bg-gray-200" />
              <div className="shimmer h-4 w-48 rounded bg-gray-200" />
            </div>

            {/* Service info bar */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-4">
                <div className="shimmer h-7 w-32 rounded-full bg-gray-200" />
                <div className="shimmer h-4 w-40 rounded bg-gray-200" />
                <div className="shimmer h-7 w-36 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Rating cards grid (4 columns) */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4 text-center">
                  <div className="shimmer mx-auto mb-2 h-4 w-20 rounded bg-gray-200" />
                  <div className="mb-1 flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="shimmer h-4 w-4 rounded bg-gray-200" />
                    ))}
                  </div>
                  <div className="shimmer mx-auto h-6 w-10 rounded bg-gray-200" />
                </div>
              ))}
            </div>

            {/* Review comment body */}
            <SkeletonText lines={5} />
          </div>
        </div>
      </section>
    </div>
  )
}
