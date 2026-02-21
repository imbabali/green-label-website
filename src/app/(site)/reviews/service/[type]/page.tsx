import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ReviewCard from '@/components/reviews/ReviewCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'
import { SERVICE_TYPE_MAP } from '@/lib/data/service-types'
import Link from 'next/link'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import EmptyState from '@/components/shared/EmptyState'

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

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {reviews && reviews.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              title="No reviews for this service"
              actionLabel="View all reviews"
              actionHref="/reviews"
            />
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath={`/reviews/service/${type}`} />
        </div>
      </section>
    </>
  )
}
