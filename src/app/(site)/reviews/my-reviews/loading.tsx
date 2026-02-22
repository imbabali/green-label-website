import { SkeletonCard } from '@/components/shared/Skeleton'

export default function MyReviewsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="shimmer mx-auto mb-4 h-10 w-44 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content skeleton matching MyReviews layout */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header row: count text + Write New Review button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="shimmer h-5 w-52 rounded bg-gray-200" />
            <div className="shimmer h-10 w-40 rounded-lg bg-gray-200" />
          </div>

          {/* Review cards grid (matches 2-col mobile, 3-col desktop) */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
