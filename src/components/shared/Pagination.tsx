import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string>
}

function buildUrl(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>
): string {
  const params = new URLSearchParams(searchParams || {})
  if (page > 1) {
    params.set('page', String(page))
  } else {
    params.delete('page')
  }
  const queryString = params.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []

  if (current <= 3) {
    // Near the start
    pages.push(1, 2, 3, 4, 'ellipsis', total)
  } else if (current >= total - 2) {
    // Near the end
    pages.push(1, 'ellipsis', total - 3, total - 2, total - 1, total)
  } else {
    // In the middle
    pages.push(1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total)
  }

  return pages
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  const baseButtonClass =
    'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2'
  const activeClass = 'bg-brand-green text-white shadow-md shadow-brand-green/25'
  const defaultClass =
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
  const disabledClass =
    'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center gap-1">
        {/* First */}
        {isFirst ? (
          <button type="button" disabled className={`${baseButtonClass} ${disabledClass}`} aria-label="First page">
            <i className="fa-solid fa-angles-left text-xs" aria-hidden="true" />
          </button>
        ) : (
          <Link
            href={buildUrl(basePath, 1, searchParams)}
            className={`${baseButtonClass} ${defaultClass}`}
            aria-label="Go to first page"
          >
            <i className="fa-solid fa-angles-left text-xs" aria-hidden="true" />
          </Link>
        )}

        {/* Previous */}
        {isFirst ? (
          <button type="button" disabled className={`${baseButtonClass} ${disabledClass}`} aria-label="Previous page">
            <i className="fa-solid fa-angle-left text-xs" aria-hidden="true" />
          </button>
        ) : (
          <Link
            href={buildUrl(basePath, currentPage - 1, searchParams)}
            className={`${baseButtonClass} ${defaultClass}`}
            aria-label="Go to previous page"
          >
            <i className="fa-solid fa-angle-left text-xs" aria-hidden="true" />
          </Link>
        )}

        {/* Page numbers */}
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center px-2 text-gray-400"
                aria-hidden="true"
              >
                ...
              </span>
            )
          }

          const isCurrent = page === currentPage
          return (
            <Link
              key={page}
              href={buildUrl(basePath, page, searchParams)}
              className={`${baseButtonClass} min-w-[40px] ${
                isCurrent ? activeClass : defaultClass
              }`}
              aria-label={`Page ${page}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        })}

        {/* Next */}
        {isLast ? (
          <button type="button" disabled className={`${baseButtonClass} ${disabledClass}`} aria-label="Next page">
            <i className="fa-solid fa-angle-right text-xs" aria-hidden="true" />
          </button>
        ) : (
          <Link
            href={buildUrl(basePath, currentPage + 1, searchParams)}
            className={`${baseButtonClass} ${defaultClass}`}
            aria-label="Go to next page"
          >
            <i className="fa-solid fa-angle-right text-xs" aria-hidden="true" />
          </Link>
        )}

        {/* Last */}
        {isLast ? (
          <button type="button" disabled className={`${baseButtonClass} ${disabledClass}`} aria-label="Last page">
            <i className="fa-solid fa-angles-right text-xs" aria-hidden="true" />
          </button>
        ) : (
          <Link
            href={buildUrl(basePath, totalPages, searchParams)}
            className={`${baseButtonClass} ${defaultClass}`}
            aria-label="Go to last page"
          >
            <i className="fa-solid fa-angles-right text-xs" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Page info */}
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  )
}
