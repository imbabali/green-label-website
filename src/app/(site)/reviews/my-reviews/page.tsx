import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import ReviewCard from '@/components/reviews/ReviewCard'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import EmptyState from '@/components/shared/EmptyState'

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

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">You have written {reviews?.length || 0} review(s).</p>
            <Link
              href="/reviews/create"
              className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-orange/20 hover:bg-brand-orange-dark hover:shadow-lg"
            >
              Write New Review
            </Link>
          </div>

          {reviews && reviews.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {reviews.map((review: any, index: number) => (
                  <div key={review.id} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-star"
              title="No reviews yet"
              description="Share your experience with our services."
              actionLabel="Write a Review"
              actionHref="/reviews/create"
            />
          )}
        </div>
      </section>
    </>
  )
}
