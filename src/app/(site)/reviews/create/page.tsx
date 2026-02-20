import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import ReviewForm from '@/components/forms/ReviewForm'
import { generatePageMetadata } from '@/lib/utils/seo'
import { createClient } from '@/lib/supabase/server'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Write a Review',
    description: 'Share your experience with Green Label Services.',
    path: '/reviews/create',
  })
}

export default async function CreateReviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/reviews/create')

  return (
    <>
      <Hero
        heading="Write a Review"
        variant="fullWidth"
        breadcrumbs={[{ label: 'Reviews', href: '/reviews' }, { label: 'Write a Review' }]}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ReviewForm />
        </div>
      </section>
    </>
  )
}
