import { SkeletonText } from '@/components/shared/Skeleton'

export default function JobDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="shimmer mx-auto mb-4 h-10 w-80 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content skeleton: 3-column grid matching JobDetail */}
      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content (2 cols) */}
            <div className="lg:col-span-2">
              {/* Short description */}
              <div className="shimmer mb-6 h-5 w-full rounded bg-gray-200" />
              <div className="shimmer mb-6 h-5 w-4/5 rounded bg-gray-200" />

              {/* Responsibilities section */}
              <section className="mb-8">
                <div className="shimmer mb-4 h-7 w-44 rounded-lg bg-gray-200" />
                <SkeletonText lines={5} />
              </section>

              {/* Requirements section */}
              <section className="mb-8">
                <div className="shimmer mb-4 h-7 w-40 rounded-lg bg-gray-200" />
                <SkeletonText lines={5} />
              </section>

              {/* Benefits section */}
              <section className="mb-8">
                <div className="shimmer mb-4 h-7 w-28 rounded-lg bg-gray-200" />
                <SkeletonText lines={4} />
              </section>

              {/* Apply button placeholder */}
              <div className="mt-8">
                <div className="shimmer inline-block h-12 w-40 rounded-md bg-gray-200" />
              </div>
            </div>

            {/* Sidebar - Job Summary card */}
            <aside>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="shimmer mb-4 h-6 w-32 rounded-lg bg-gray-200" />

                <div className="space-y-4">
                  {/* Job Type */}
                  <div>
                    <div className="shimmer mb-1 h-3 w-16 rounded bg-gray-200" />
                    <div className="shimmer h-4 w-24 rounded bg-gray-200" />
                  </div>
                  {/* Experience */}
                  <div>
                    <div className="shimmer mb-1 h-3 w-20 rounded bg-gray-200" />
                    <div className="shimmer h-4 w-20 rounded bg-gray-200" />
                  </div>
                  {/* Location */}
                  <div>
                    <div className="shimmer mb-1 h-3 w-16 rounded bg-gray-200" />
                    <div className="shimmer h-4 w-32 rounded bg-gray-200" />
                  </div>
                  {/* Department */}
                  <div>
                    <div className="shimmer mb-1 h-3 w-20 rounded bg-gray-200" />
                    <div className="shimmer h-4 w-28 rounded bg-gray-200" />
                  </div>
                  {/* Deadline */}
                  <div>
                    <div className="shimmer mb-1 h-3 w-36 rounded bg-gray-200" />
                    <div className="shimmer h-4 w-24 rounded bg-gray-200" />
                  </div>
                </div>

                {/* Apply button placeholder */}
                <div className="shimmer mt-6 h-12 w-full rounded-md bg-gray-200" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
