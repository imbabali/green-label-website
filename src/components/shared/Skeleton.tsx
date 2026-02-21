export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <div className={`shimmer rounded-2xl bg-gray-200 ${className}`} />
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="shimmer h-4 rounded-lg bg-gray-200"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-0 shadow-md ${className}`}>
      <SkeletonImage className="h-48 w-full rounded-b-none" />
      <div className="p-5">
        <div className="shimmer mb-3 h-5 w-2/3 rounded-lg bg-gray-200" />
        <SkeletonText lines={2} />
        <div className="mt-4 flex items-center gap-3">
          <div className="shimmer h-8 w-8 rounded-full bg-gray-200" />
          <div className="shimmer h-4 w-24 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonStatCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-md ${className}`}>
      <div className="shimmer mb-3 h-8 w-8 rounded-lg bg-gray-200" />
      <div className="shimmer mb-2 h-8 w-20 rounded-lg bg-gray-200" />
      <div className="shimmer h-4 w-32 rounded-lg bg-gray-200" />
    </div>
  )
}
