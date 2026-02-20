import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import ReviewCard from '@/components/reviews/ReviewCard'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'My Reviews',
    description: 'View and manage your reviews.',
    path: '/reviews/my-reviews',
  })
}

export default async function MyReviewsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/reviews/my-reviews')

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, profiles(first_name, last_name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <Hero
        heading="My Reviews"
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">You have written {reviews?.length || 0} review(s).</p>
            <Link
              href="/reviews/create"
              className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark"
            >
              Write New Review
            </Link>
          </div>

          {reviews && reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <i className="fa-solid fa-star mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No reviews yet</h3>
              <p className="mt-2 text-gray-600">Share your experience with our services.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
