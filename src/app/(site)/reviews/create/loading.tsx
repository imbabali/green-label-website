export default function CreateReviewLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="shimmer mx-auto mb-4 h-10 w-52 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Form skeleton matching ReviewForm layout */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Service Type + Service Name (2-column grid) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="shimmer mb-1 h-4 w-24 rounded bg-gray-200" />
                <div className="shimmer h-12 w-full rounded-lg bg-gray-200" />
              </div>
              <div>
                <div className="shimmer mb-1 h-4 w-28 rounded bg-gray-200" />
                <div className="shimmer h-12 w-full rounded-lg bg-gray-200" />
              </div>
            </div>

            {/* Ratings heading */}
            <div className="shimmer h-6 w-20 rounded-lg bg-gray-200" />

            {/* Rating fields (2-column grid, 4 items) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="shimmer mb-2 h-4 w-32 rounded bg-gray-200" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="shimmer h-6 w-6 rounded bg-gray-200" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Review Title */}
            <div>
              <div className="shimmer mb-1 h-4 w-24 rounded bg-gray-200" />
              <div className="shimmer h-12 w-full rounded-lg bg-gray-200" />
            </div>

            {/* Review Comment (textarea) */}
            <div>
              <div className="shimmer mb-1 h-4 w-24 rounded bg-gray-200" />
              <div className="shimmer h-32 w-full rounded-lg bg-gray-200" />
            </div>

            {/* Would recommend checkbox */}
            <div className="flex items-center gap-3">
              <div className="shimmer h-5 w-5 rounded bg-gray-200" />
              <div className="shimmer h-4 w-72 rounded bg-gray-200" />
            </div>

            {/* Submit button */}
            <div className="shimmer h-14 w-44 rounded-lg bg-gray-200" />
          </div>
        </div>
      </section>
    </div>
  )
}
