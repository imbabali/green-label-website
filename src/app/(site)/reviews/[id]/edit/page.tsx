import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import ReviewForm from '@/components/forms/ReviewForm'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ id: string }>
}

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Edit Review',
    description: 'Edit your review for Green Label Services.',
    path: '/reviews/edit',
  })
}

export default async function EditReviewPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(`/login?redirect=/reviews/${id}/edit`)

  const { data: review } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single()

  if (!review) notFound()
  if (review.user_id !== user.id) redirect('/reviews')

  return (
    <>
      <Hero
        heading="Edit Review"
        variant="fullWidth"
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ReviewForm
            initialData={{
              service_type: review.service_type,
              service_name: review.service_name,
              overall_rating: review.overall_rating,
              quality_rating: review.quality_rating ?? undefined,
              value_rating: review.value_rating ?? undefined,
              customer_service_rating: review.customer_service_rating ?? undefined,
              title: review.title,
              comment: review.comment,
              would_recommend: review.would_recommend,
            }}
            reviewId={id}
          />
        </div>
      </section>
    </>
  )
}
