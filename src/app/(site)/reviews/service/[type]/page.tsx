import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ReviewCard from '@/components/reviews/ReviewCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'
import { SERVICE_TYPE_MAP } from '@/lib/data/service-types'
import Link from 'next/link'

const REVIEWS_PER_PAGE = 12

interface Props {
  params: Promise<{ type: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params
  const typeName = SERVICE_TYPE_MAP[type as keyof typeof SERVICE_TYPE_MAP] || type
  return generatePageMetadata({
    title: `${typeName} Reviews`,
    description: `Customer reviews for ${typeName} services from Green Label Services.`,
    path: `/reviews/service/${type}`,
  })
}

export default async function ReviewsByServicePage({ params, searchParams }: Props) {
  const { type } = await params
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1', 10))
  const offset = (page - 1) * REVIEWS_PER_PAGE
  const typeName = SERVICE_TYPE_MAP[type as keyof typeof SERVICE_TYPE_MAP] || type

  const supabase = await createClient()

  const { data: reviews, count } = await supabase
    .from('reviews')
    .select('*, profiles(first_name, last_name)', { count: 'exact' })
    .eq('service_type', type)
    .order('created_at', { ascending: false })
    .range(offset, offset + REVIEWS_PER_PAGE - 1)

  const totalPages = Math.ceil((count || 0) / REVIEWS_PER_PAGE)

  return (
    <>
      <Hero
        heading={`${typeName} Reviews`}
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {reviews && reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <i className="fa-solid fa-star mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No reviews for this service</h3>
              <Link href="/reviews" className="mt-4 inline-block text-brand-green hover:underline">
                View all reviews
              </Link>
            </div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath={`/reviews/service/${type}`} />
        </div>
      </section>
    </>
  )
}
