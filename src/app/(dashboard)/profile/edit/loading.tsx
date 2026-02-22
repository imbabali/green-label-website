export default function EditProfileLoading() {
  return (
    <div className="mx-auto max-w-2xl">
      {/* Page title */}
      <div className="shimmer mb-6 h-9 w-40 rounded-lg bg-gray-200" />

      {/* Form card skeleton matching EditProfilePage */}
      <div className="card-premium space-y-6 rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100">
        {/* First Name + Last Name (2-column grid) */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="shimmer mb-1 h-4 w-20 rounded bg-gray-200" />
            <div className="shimmer h-10 w-full rounded-lg bg-gray-200" />
          </div>
          <div>
            <div className="shimmer mb-1 h-4 w-20 rounded bg-gray-200" />
            <div className="shimmer h-10 w-full rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Username */}
        <div>
          <div className="shimmer mb-1 h-4 w-20 rounded bg-gray-200" />
          <div className="shimmer h-10 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Phone */}
        <div>
          <div className="shimmer mb-1 h-4 w-12 rounded bg-gray-200" />
          <div className="shimmer h-10 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Bio (textarea) */}
        <div>
          <div className="shimmer mb-1 h-4 w-8 rounded bg-gray-200" />
          <div className="shimmer h-24 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Location */}
        <div>
          <div className="shimmer mb-1 h-4 w-16 rounded bg-gray-200" />
          <div className="shimmer h-10 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Profile Photo */}
        <div>
          <div className="shimmer mb-1 h-4 w-24 rounded bg-gray-200" />
          <div className="shimmer h-10 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Save button */}
        <div className="shimmer h-12 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}
