import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import JobCard from '@/components/careers/JobCard'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { jobListQuery } from '@/lib/sanity/queries'
import Link from 'next/link'

export const revalidate = 300

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Job Openings',
    description: 'Browse current job openings at Green Label Services. Find your next career opportunity in waste management and environmental services.',
    path: '/careers/jobs',
  })
}

interface Props {
  searchParams: Promise<{ category?: string; type?: string; experience?: string; remote?: string; q?: string }>
}

export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams
  let jobs: any[] = []

  try {
    jobs = await sanityFetch<any[]>({
      query: jobListQuery,
      params: {
        category: params.category || '',
        jobType: params.type || '',
        experienceLevel: params.experience || '',
        isRemote: params.remote === 'true' ? true : null,
        search: params.q || '',
      },
    })
  } catch {
    // fallback
  }

  const transformedJobs = (jobs || []).map((j: any) => ({
    title: j.title,
    slug: j.slug?.current || j.slug,
    category: j.category ? { name: j.category.name } : undefined,
    location: j.location || 'Kampala',
    isRemote: j.isRemote,
    jobType: j.jobType,
    experienceLevel: j.experienceLevel,
    shortDescription: j.shortDescription || '',
    applicationDeadline: j.applicationDeadline,
    isFeatured: j.isFeatured,
    salaryRange: j.salaryRange,
  }))

  return (
    <>
      <Hero
        heading="Open Positions"
        subheading="Find Your Next Opportunity"
        variant="fullWidth"
        breadcrumbs={[{ label: 'Careers', href: '/careers' }, { label: 'Jobs' }]}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {transformedJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {transformedJobs.map((job: any) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <i className="fa-solid fa-briefcase mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No open positions right now</h3>
              <p className="mt-2 text-gray-600">
                Check back soon or send your CV to{' '}
                <a href="mailto:careers@greenlabelservicesug.com" className="text-brand-green hover:underline">
                  careers@greenlabelservicesug.com
                </a>
              </p>
              <Link href="/careers" className="mt-4 inline-block text-brand-green hover:underline">
                Back to Careers
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
