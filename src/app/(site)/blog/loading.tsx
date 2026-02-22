import { SkeletonCard } from '@/components/shared/Skeleton'

export default function BlogLoading() {
  return (
    <div className="bg-gradient-subtle py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="shimmer mx-auto mb-10 h-10 w-64 rounded-lg bg-gray-200" />
        <div className="grid grid-cols-3 gap-3 md:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
