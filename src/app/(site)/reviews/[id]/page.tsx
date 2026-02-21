import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import ReviewDetail from '@/components/reviews/ReviewDetail'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: review } = await supabase
    .from('reviews')
    .select('title, service_name')
    .eq('id', id)
    .single()

  return generatePageMetadata({
    title: review?.title || 'Review',
    description: `Customer review for ${review?.service_name || 'Green Label Services'}.`,
    path: `/reviews/${id}`,
  })
}

export default async function ReviewDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: review } = await supabase
    .from('reviews')
    .select('*, profiles(first_name, last_name)')
    .eq('id', id)
    .single()

  if (!review) notFound()

  // Check if current user is the owner
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user ? user.id === review.user_id : false

  return (
    <>
      <Hero
        heading="Review"
        variant="fullWidth"
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ReviewDetail review={review} isOwner={isOwner} />
        </div>
      </section>
    </>
  )
}
