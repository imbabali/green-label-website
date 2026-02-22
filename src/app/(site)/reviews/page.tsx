import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ReviewCard from '@/components/reviews/ReviewCard'
import Pagination from '@/components/shared/Pagination'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { SERVICE_TYPES } from '@/lib/data/service-types'
import EmptyState from '@/components/shared/EmptyState'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Customer Reviews',
    description: 'Read reviews from Green Label Services customers about our waste management solutions across Uganda.',
    path: '/reviews',
  })
}

const REVIEWS_PER_PAGE = 12

interface Props {
  searchParams: Promise<{ page?: string; service?: string }>
}

export default async function ReviewsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const offset = (page - 1) * REVIEWS_PER_PAGE

  const supabase = await createClient()

  let query = supabase
    .from('reviews')
    .select('*, profiles(first_name, last_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + REVIEWS_PER_PAGE - 1)

  if (params.service) {
    query = query.eq('service_type', params.service)
  }

  const { data: reviews, count } = await query
  const totalPages = Math.ceil((count || 0) / REVIEWS_PER_PAGE)

  // Get average rating
  const { data: avgData } = await supabase
    .from('reviews')
    .select('overall_rating')

  const avgRating = avgData && avgData.length > 0
    ? (avgData.reduce((sum: number, r: any) => sum + r.overall_rating, 0) / avgData.length).toFixed(1)
    : '0'

  return (
    <>
      <Hero
        heading="Customer Reviews"
        subheading="What Our Clients Say"
        description="Read what our clients have to say about our waste management services, or share your own experience."
        backgroundImage="/images/hero/waste.jpg"
        variant="split"
        badge="Client Feedback"
        flipped
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Summary — premium hero stat card */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-green shadow-lg shadow-brand-green/20">
                <i className="fa-solid fa-star text-2xl text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{avgRating} <span className="text-lg font-normal text-gray-500">/ 5</span></p>
                <p className="text-sm text-gray-600">Based on {count || 0} reviews</p>
              </div>
            </div>
            <Link
              href="/reviews/create"
              className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-md shadow-brand-orange/20 transition-all hover:bg-brand-orange-dark hover:shadow-lg"
            >
              Write a Review
            </Link>
          </div>

          {/* Service type filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/reviews"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${!params.service ? 'bg-brand-green text-white shadow-md shadow-brand-green/20' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'}`}
            >
              All
            </Link>
            {SERVICE_TYPES.map((st) => (
              <Link
                key={st.value}
                href={`/reviews/service/${st.value}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
              >
                {st.label}
              </Link>
            ))}
          </div>

          {/* Reviews grid */}
          {reviews && reviews.length > 0 ? (
            <ScrollRevealSection>
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 lg:grid-cols-3">
                {reviews.map((review: any, index: number) => (
                  <div key={review.id} className={`min-w-[70vw] shrink-0 snap-start sm:min-w-[45vw] lg:min-w-0 lg:shrink reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-star"
              title="No reviews yet"
              description="Be the first to leave a review!"
              actionLabel="Write a Review"
              actionHref="/reviews/create"
            />
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath="/reviews" />
        </div>
      </section>
    </>
  )
}
