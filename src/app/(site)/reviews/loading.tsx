import { SkeletonCard } from '@/components/shared/Skeleton'

export default function ReviewsLoading() {
  return (
    <div className="bg-gradient-subtle py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="shimmer mx-auto mb-10 h-10 w-64 rounded-lg bg-gray-200" />
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[70vw] shrink-0 snap-start sm:min-w-[45vw] lg:min-w-0 lg:shrink">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
