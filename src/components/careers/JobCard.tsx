import Link from 'next/link'
import { formatDateShort } from '@/lib/utils/format'

interface JobCardProps {
  job: {
    title: string
    slug: string
    category?: { name: string }
    location: string
    isRemote?: boolean
    jobType: string
    experienceLevel: string
    shortDescription: string
    applicationDeadline?: string
    isFeatured?: boolean
    salaryRange?: { min: number; max: number; currency: string; isVisible: boolean }
  }
}

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
  temporary: 'Temporary',
}

const EXP_LABELS: Record<string, string> = {
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior',
  executive: 'Executive',
}

export default function JobCard({ job }: JobCardProps) {
  const isUrgent =
    job.applicationDeadline &&
    (new Date(job.applicationDeadline).getTime() - Date.now()) / 86400000 < 7

  return (
    <div className={`card-premium relative rounded-2xl border border-gray-100 bg-white p-6 shadow-md ${job.isFeatured ? 'ring-2 ring-brand-orange/30' : ''}`}>
      {job.isFeatured && (
        <span className="absolute right-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow-md shadow-brand-orange/20">
          Featured
        </span>
      )}

      <div className="mb-3">
        <h3 className="font-heading text-lg font-bold text-gray-900">
          <Link href={`/careers/jobs/${job.slug}`} className="hover:text-brand-green">
            {job.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">Green Label Services</p>
      </div>

      {job.salaryRange?.isVisible && (
        <p className="mb-2 text-sm font-semibold text-brand-green">
          {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} -{' '}
          {job.salaryRange.max.toLocaleString()}
        </p>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {job.category && (
          <span className="rounded-full bg-brand-green-50 px-2.5 py-0.5 text-xs font-medium text-brand-green">
            <i className="fa-solid fa-folder mr-1" /> {job.category.name}
          </span>
        )}
        <span className="rounded-full bg-brand-orange-50 px-2.5 py-0.5 text-xs font-medium text-brand-orange-dark">
          <i className="fa-solid fa-location-dot mr-1" /> {job.location}
        </span>
        {job.isRemote && (
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            Remote
          </span>
        )}
      </div>

      <p className="mb-4 text-sm text-gray-600">
        {job.shortDescription.length > 150
          ? job.shortDescription.slice(0, 150) + '...'
          : job.shortDescription}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {JOB_TYPE_LABELS[job.jobType] || job.jobType}
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {EXP_LABELS[job.experienceLevel] || job.experienceLevel}
        </span>
      </div>

      {job.applicationDeadline && (
        <p className={`mb-4 text-sm ${isUrgent ? 'font-semibold text-red-600' : 'text-gray-500'}`}>
          <i className="fa-solid fa-clock mr-1" />
          Deadline: {formatDateShort(job.applicationDeadline)}
          {isUrgent && ' — Closing Soon!'}
        </p>
      )}

      <div className="flex gap-3">
        <Link
          href={`/careers/jobs/${job.slug}`}
          className="rounded-lg border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
        >
          View Details
        </Link>
        <Link
          href={`/careers/jobs/${job.slug}/apply`}
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-orange/20 transition-colors hover:bg-brand-orange-dark"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
}
