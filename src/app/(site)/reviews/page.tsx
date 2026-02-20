import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ReviewCard from '@/components/reviews/ReviewCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { SERVICE_TYPES } from '@/lib/data/service-types'

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
      <Hero backgroundImage="/images/hero/waste.jpg"
        heading="Customer Reviews"
        subheading="What Our Clients Say"
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Summary */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">{avgRating} <span className="text-lg font-normal text-gray-500">/ 5</span></p>
              <p className="text-sm text-gray-600">Based on {count || 0} reviews</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/reviews/create"
                className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-dark"
              >
                Write a Review
              </Link>
            </div>
          </div>

          {/* Service type filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/reviews"
              className={`rounded-full px-4 py-2 text-sm font-medium ${!params.service ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </Link>
            {SERVICE_TYPES.map((st) => (
              <Link
                key={st.value}
                href={`/reviews/service/${st.value}`}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                {st.label}
              </Link>
            ))}
          </div>

          {/* Reviews grid */}
          {reviews && reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <i className="fa-solid fa-star mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No reviews yet</h3>
              <p className="mt-2 text-gray-600">Be the first to leave a review!</p>
              <Link href="/reviews/create" className="mt-4 inline-block rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-dark">
                Write a Review
              </Link>
            </div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath="/reviews" />
        </div>
      </section>
    </>
  )
}
