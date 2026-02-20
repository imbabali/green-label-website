import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils/format'

interface JobDetailProps {
  job: {
    title: string
    slug: string
    location: string
    isRemote?: boolean
    jobType: string
    experienceLevel: string
    department?: string
    category?: { name: string }
    salaryRange?: { min: number; max: number; currency: string; isVisible: boolean }
    shortDescription: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responsibilities?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requirements?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    benefits?: any[]
    applicationDeadline?: string
  }
}

const LABELS: Record<string, Record<string, string>> = {
  jobType: { full_time: 'Full Time', part_time: 'Part Time', contract: 'Contract', internship: 'Internship', temporary: 'Temporary' },
  experienceLevel: { entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior', executive: 'Executive' },
}

export default function JobDetail({ job }: JobDetailProps) {
  const isUrgent =
    job.applicationDeadline &&
    (new Date(job.applicationDeadline).getTime() - Date.now()) / 86400000 < 7

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="mb-6 text-lg text-gray-600">{job.shortDescription}</p>

        {job.responsibilities && (
          <section className="mb-8">
            <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">Responsibilities</h2>
            <div className="portable-text">
              <PortableText value={job.responsibilities} />
            </div>
          </section>
        )}

        {job.requirements && (
          <section className="mb-8">
            <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">Requirements</h2>
            <div className="portable-text">
              <PortableText value={job.requirements} />
            </div>
          </section>
        )}

        {job.benefits && (
          <section className="mb-8">
            <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">Benefits</h2>
            <div className="portable-text">
              <PortableText value={job.benefits} />
            </div>
          </section>
        )}

        <div className="mt-8">
          <Link
            href={`/careers/jobs/${job.slug}/apply`}
            className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-lg font-semibold text-white hover:bg-brand-orange-dark"
          >
            <i className="fa-solid fa-paper-plane" /> Apply Now
          </Link>
        </div>
      </div>

      <aside>
        <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">Job Summary</h3>

          {isUrgent && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">
              <i className="fa-solid fa-exclamation-triangle mr-1" /> Closing Soon!
            </div>
          )}

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Job Type</dt>
              <dd className="text-gray-900">{LABELS.jobType[job.jobType] || job.jobType}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Experience</dt>
              <dd className="text-gray-900">
                {LABELS.experienceLevel[job.experienceLevel] || job.experienceLevel}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Location</dt>
              <dd className="text-gray-900">
                {job.location} {job.isRemote && '(Remote Available)'}
              </dd>
            </div>
            {job.department && (
              <div>
                <dt className="font-medium text-gray-500">Department</dt>
                <dd className="text-gray-900">{job.department}</dd>
              </div>
            )}
            {job.salaryRange?.isVisible && (
              <div>
                <dt className="font-medium text-gray-500">Salary Range</dt>
                <dd className="text-gray-900">
                  {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} -{' '}
                  {job.salaryRange.max.toLocaleString()}
                </dd>
              </div>
            )}
            {job.applicationDeadline && (
              <div>
                <dt className="font-medium text-gray-500">Application Deadline</dt>
                <dd className={isUrgent ? 'font-semibold text-red-600' : 'text-gray-900'}>
                  {formatDateShort(job.applicationDeadline)}
                </dd>
              </div>
            )}
          </dl>

          <Link
            href={`/careers/jobs/${job.slug}/apply`}
            className="mt-6 block w-full rounded-md bg-brand-green py-3 text-center font-semibold text-white hover:bg-brand-green-dark"
          >
            Apply for this Position
          </Link>
        </div>
      </aside>
    </div>
  )
}
