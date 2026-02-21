import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import JobDetail from '@/components/careers/JobDetail'
import { generatePageMetadata, jobPostingJsonLd } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { jobDetailQuery } from '@/lib/sanity/queries'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const job = await sanityFetch<any>({ query: jobDetailQuery, params: { slug } })
    if (!job) return generatePageMetadata({ title: 'Job Not Found', path: `/careers/jobs/${slug}` })
    return generatePageMetadata({
      title: job.seo?.metaTitle || job.title,
      description: job.seo?.metaDescription || job.shortDescription,
      path: `/careers/jobs/${slug}`,
    })
  } catch {
    return generatePageMetadata({ title: 'Job', path: `/careers/jobs/${slug}` })
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params

  let job: any = null
  try {
    job = await sanityFetch<any>({ query: jobDetailQuery, params: { slug } })
  } catch {
    notFound()
  }

  if (!job) notFound()

  const jsonLd = jobPostingJsonLd({
    title: job.title,
    description: job.shortDescription || '',
    slug: slug,
    location: job.location,
    jobType: job.jobType || 'full_time',
    experienceLevel: job.experienceLevel || '',
    applicationDeadline: job.applicationDeadline,
    isRemote: job.isRemote,
    ...(job.salaryRange?.isVisible && {
      salaryMin: job.salaryRange.min,
      salaryMax: job.salaryRange.max,
      currency: job.salaryRange.currency,
    }),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        heading={job.title}
        variant="fullWidth"
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <JobDetail job={job} />
        </div>
      </section>
    </>
  )
}
