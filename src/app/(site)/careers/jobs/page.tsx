import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import JobCard from '@/components/careers/JobCard'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { jobListQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import EmptyState from '@/components/shared/EmptyState'

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
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {transformedJobs.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {transformedJobs.map((job: any, index: number) => (
                  <div key={job.slug} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-briefcase"
              title="No open positions right now"
              description="Check back soon or send your CV to careers@greenlabelservicesug.com"
              actionLabel="Back to Careers"
              actionHref="/careers"
            />
          )}
        </div>
      </section>
    </>
  )
}
