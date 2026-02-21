import { SkeletonStatCard, SkeletonText } from '@/components/shared/Skeleton'

export default function DashboardLoading() {
  return (
    <div>
      <div className="shimmer mb-6 h-9 w-48 rounded-lg bg-gray-200" />
      <div className="grid gap-6 md:grid-cols-3">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>
      <div className="mt-8">
        <div className="shimmer mb-4 h-7 w-40 rounded-lg bg-gray-200" />
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <SkeletonText lines={5} />
        </div>
      </div>
    </div>
  )
}
