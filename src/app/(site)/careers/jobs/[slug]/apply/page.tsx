import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import JobApplicationForm from '@/components/forms/JobApplicationForm'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { jobDetailQuery } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const job = await sanityFetch<any>({ query: jobDetailQuery, params: { slug } })
    if (!job) return generatePageMetadata({ title: 'Apply', path: `/careers/jobs/${slug}/apply` })
    return generatePageMetadata({
      title: `Apply — ${job.title}`,
      description: `Apply for the ${job.title} position at Green Label Services.`,
      path: `/careers/jobs/${slug}/apply`,
    })
  } catch {
    return generatePageMetadata({ title: 'Apply', path: `/careers/jobs/${slug}/apply` })
  }
}

export default async function JobApplyPage({ params }: Props) {
  const { slug } = await params

  let job: any = null
  try {
    job = await sanityFetch<any>({ query: jobDetailQuery, params: { slug } })
  } catch {
    notFound()
  }

  if (!job || !job.isActive) notFound()

  return (
    <>
      <Hero
        heading={`Apply for ${job.title}`}
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-lg bg-brand-green/5 p-6">
            <h2 className="font-heading text-lg font-bold text-gray-900">{job.title}</h2>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
              <span><i className="fa-solid fa-location-dot mr-1" /> {job.location}</span>
              <span><i className="fa-solid fa-briefcase mr-1" /> {job.jobType}</span>
              {job.applicationDeadline && (
                <span><i className="fa-solid fa-clock mr-1" /> Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          <JobApplicationForm jobSlug={slug} jobTitle={job.title} />
        </div>
      </section>
    </>
  )
}
