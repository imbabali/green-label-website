'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { JOB_TYPES, EXPERIENCE_LEVELS } from '@/lib/data/service-types'

interface JobFilterPanelProps {
  categories: { name: string; slug: string }[]
}

export default function JobFilterPanel({ categories }: JobFilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/careers/jobs?${params.toString()}`)
  }

  function clearAll() {
    router.push('/careers/jobs')
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <input
            type="text"
            placeholder="Search jobs..."
            defaultValue={searchParams.get('search') || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
        </div>
        <select
          value={searchParams.get('category') || ''}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select
          value={searchParams.get('type') || ''}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
        >
          <option value="">All Types</option>
          {JOB_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <select
          value={searchParams.get('experience') || ''}
          onChange={(e) => updateFilter('experience', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
        >
          <option value="">All Experience</option>
          {EXPERIENCE_LEVELS.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>
        <select
          value={searchParams.get('remote') || ''}
          onChange={(e) => updateFilter('remote', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
        >
          <option value="">All Locations</option>
          <option value="true">Remote Only</option>
          <option value="false">On-site Only</option>
        </select>
      </div>
      {hasFilters && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          <button
            onClick={clearAll}
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}
