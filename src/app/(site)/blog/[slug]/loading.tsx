import { SkeletonText, SkeletonImage } from '@/components/shared/Skeleton'

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="shimmer mx-auto mb-4 h-10 w-48 rounded-lg bg-gray-200" />
            <div className="shimmer mx-auto h-5 w-64 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content skeleton: 2-column layout matching PostDetail + Sidebar */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-3">
            {/* Main article area */}
            <div className="lg:col-span-2">
              {/* Featured image */}
              <SkeletonImage className="mb-8 h-64 w-full md:h-80" />

              {/* Category + date row */}
              <div className="mb-6 flex items-center gap-4">
                <div className="shimmer h-6 w-24 rounded-full bg-gray-200" />
                <div className="shimmer h-4 w-32 rounded bg-gray-200" />
              </div>

              {/* Title */}
              <div className="shimmer mb-4 h-9 w-full rounded-lg bg-gray-200" />
              <div className="shimmer mb-8 h-9 w-3/4 rounded-lg bg-gray-200" />

              {/* Article body paragraphs */}
              <SkeletonText lines={4} className="mb-6" />
              <SkeletonText lines={5} className="mb-6" />
              <SkeletonText lines={3} className="mb-6" />

              {/* Tags row */}
              <div className="mb-8 flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="shimmer h-7 w-20 rounded-full bg-gray-200" />
                ))}
              </div>

              {/* Previous / Next navigation */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="shimmer h-4 w-36 rounded bg-gray-200" />
                <div className="shimmer h-4 w-36 rounded bg-gray-200" />
              </div>

              {/* Comments section */}
              <div className="mt-12">
                <div className="shimmer mb-6 h-7 w-32 rounded-lg bg-gray-200" />
                <div className="space-y-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-gray-100 bg-white p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="shimmer h-8 w-8 rounded-full bg-gray-200" />
                        <div className="shimmer h-4 w-24 rounded bg-gray-200" />
                        <div className="shimmer h-3 w-20 rounded bg-gray-200" />
                      </div>
                      <SkeletonText lines={2} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              {/* Author card */}
              <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="shimmer h-12 w-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="shimmer mb-2 h-5 w-28 rounded bg-gray-200" />
                    <div className="shimmer h-3 w-20 rounded bg-gray-200" />
                  </div>
                </div>
                <SkeletonText lines={2} />
              </div>

              {/* Categories */}
              <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
                <div className="shimmer mb-4 h-6 w-28 rounded-lg bg-gray-200" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="shimmer h-4 w-24 rounded bg-gray-200" />
                      <div className="shimmer h-4 w-6 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent posts */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <div className="shimmer mb-4 h-6 w-32 rounded-lg bg-gray-200" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="shimmer h-16 w-16 shrink-0 rounded-lg bg-gray-200" />
                      <div className="flex-1">
                        <div className="shimmer mb-2 h-4 w-full rounded bg-gray-200" />
                        <div className="shimmer h-3 w-20 rounded bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
