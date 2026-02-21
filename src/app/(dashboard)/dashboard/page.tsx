import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDateShort } from '@/lib/utils/format'

export const metadata: Metadata = { title: 'Dashboard — Green Label Services' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: reviews, count: reviewCount } = await supabase
    .from('reviews')
    .select('id, title, overall_rating, created_at', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: applications, count: appCount } = await supabase
    .from('job_applications')
    .select('id, job_slug, status, created_at', { count: 'exact' })
    .eq('email', user.email || '')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl font-bold text-gray-900">
        Welcome, {profile?.first_name || user.email}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div className="card-premium rounded-2xl border-t-4 border-t-brand-green bg-white p-6 shadow-md">
          <h2 className="mb-4 font-heading text-lg font-bold text-gray-900">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10">
              <i className="fa-solid fa-user text-sm text-brand-green" />
            </span>
            Profile
          </h2>
          <p className="text-sm text-gray-600">
            {profile?.first_name} {profile?.last_name}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <Link href="/profile/edit" className="mt-4 inline-block text-sm font-semibold text-brand-green hover:underline">
            Edit Profile
          </Link>
        </div>

        {/* Reviews Card */}
        <div className="card-premium rounded-2xl border-t-4 border-t-brand-orange bg-white p-6 shadow-md">
          <h2 className="mb-4 font-heading text-lg font-bold text-gray-900">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/10">
              <i className="fa-solid fa-star text-sm text-brand-orange" />
            </span>
            Reviews
          </h2>
          <p className="text-3xl font-bold text-gradient-green">{reviewCount || 0}</p>
          <p className="text-sm text-gray-500">reviews written</p>
          <Link href="/reviews/my-reviews" className="mt-4 inline-block text-sm font-semibold text-brand-green hover:underline">
            View All
          </Link>
        </div>

        {/* Applications Card */}
        <div className="card-premium rounded-2xl border-t-4 border-t-blue-500 bg-white p-6 shadow-md">
          <h2 className="mb-4 font-heading text-lg font-bold text-gray-900">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <i className="fa-solid fa-briefcase text-sm text-blue-600" />
            </span>
            Applications
          </h2>
          <p className="text-3xl font-bold text-gradient-green">{appCount || 0}</p>
          <p className="text-sm text-gray-500">job applications</p>
          <Link href="/careers/jobs" className="mt-4 inline-block text-sm font-semibold text-brand-green hover:underline">
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* Recent Reviews */}
      {reviews && reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">Recent Reviews</h2>
          <div className="card-premium divide-y divide-gray-100 rounded-2xl bg-white shadow-md">
            {reviews.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between p-4 transition-colors hover:bg-brand-green-50">
                <div>
                  <Link href={`/reviews/${r.id}`} className="font-medium text-gray-900 hover:text-brand-green">
                    {r.title}
                  </Link>
                  <p className="text-xs text-gray-500">{formatDateShort(r.created_at)}</p>
                </div>
                <span className="text-sm font-semibold text-brand-orange">{r.overall_rating}/5</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Applications */}
      {applications && applications.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">Recent Applications</h2>
          <div className="card-premium divide-y divide-gray-100 rounded-2xl bg-white shadow-md">
            {applications.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between p-4 transition-colors hover:bg-brand-green-50">
                <div>
                  <p className="font-medium text-gray-900">{a.job_slug}</p>
                  <p className="text-xs text-gray-500">{formatDateShort(a.created_at)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  a.status === 'new' ? 'bg-blue-100 text-blue-700' :
                  a.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                  a.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
