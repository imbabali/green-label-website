import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDate(date: string | Date, formatStr = 'MMMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, formatStr)
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, 'MMM d, yyyy')
}

export function formatDateParts(date: string | Date): { day: string; month: string; year: string } {
  const d = typeof date === 'string' ? parseISO(date) : date
  return {
    day: format(d, 'dd'),
    month: format(d, 'MMM'),
    year: format(d, 'yyyy'),
  }
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural || `${singular}s`
}
