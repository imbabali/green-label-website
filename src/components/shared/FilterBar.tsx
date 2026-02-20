'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface FilterOption {
  value: string
  label: string
}

interface Filter {
  key: string
  label: string
  options: FilterOption[]
}

interface FilterBarProps {
  filters: Filter[]
  searchPlaceholder?: string
  basePath: string
}

export default function FilterBar({
  filters,
  searchPlaceholder = 'Search...',
  basePath,
}: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState(
    searchParams.get('q') || ''
  )

  const getActiveFilters = useCallback(() => {
    const active: { key: string; label: string; filterLabel: string; value: string }[] = []

    filters.forEach((filter) => {
      const value = searchParams.get(filter.key)
      if (value) {
        const option = filter.options.find((o) => o.value === value)
        if (option) {
          active.push({
            key: filter.key,
            label: option.label,
            filterLabel: filter.label,
            value,
          })
        }
      }
    })

    return active
  }, [filters, searchParams])

  const activeFilters = getActiveFilters()
  const hasActiveFilters =
    activeFilters.length > 0 || searchParams.get('q')

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      // Reset to page 1 when filtering
      params.delete('page')

      const queryString = params.toString()
      router.push(queryString ? `${basePath}?${queryString}` : basePath)
    },
    [router, searchParams, basePath]
  )

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      updateParams('q', searchValue.trim())
    },
    [searchValue, updateParams]
  )

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      updateParams(key, value)
    },
    [updateParams]
  )

  const removeFilter = useCallback(
    (key: string) => {
      updateParams(key, '')
    },
    [updateParams]
  )

  const clearAllFilters = useCallback(() => {
    setSearchValue('')
    router.push(basePath)
  }, [router, basePath])

  return (
    <div className="mb-8 rounded-xl bg-white p-4 shadow-md ring-1 ring-gray-100 md:p-6">
      {/* Search + Filters Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 gap-2"
          role="search"
        >
          <div className="relative flex-1">
            <label htmlFor="filter-search" className="sr-only">
              Search
            </label>
            <i
              className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="filter-search"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            Search
          </button>
        </form>

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <div key={filter.key} className="flex-shrink-0">
            <label htmlFor={`filter-${filter.key}`} className="sr-only">
              {filter.label}
            </label>
            <select
              id={`filter-${filter.key}`}
              value={searchParams.get(filter.key) || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 md:w-auto"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
          <span className="text-xs font-medium text-gray-500">
            Active filters:
          </span>

          {searchParams.get('q') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
              Search: &quot;{searchParams.get('q')}&quot;
              <button
                type="button"
                onClick={() => {
                  setSearchValue('')
                  removeFilter('q')
                }}
                aria-label="Remove search filter"
                className="ml-1 hover:text-brand-green-dark"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </span>
          )}

          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green"
            >
              {filter.filterLabel}: {filter.label}
              <button
                type="button"
                onClick={() => removeFilter(filter.key)}
                aria-label={`Remove ${filter.filterLabel} filter`}
                className="ml-1 hover:text-brand-green-dark"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-2 text-xs font-medium text-gray-500 underline transition-colors hover:text-brand-green"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
