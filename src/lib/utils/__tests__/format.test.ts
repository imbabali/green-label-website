import { describe, it, expect } from 'vitest'
import {
  truncate,
  estimateReadingTime,
  toTitleCase,
  slugify,
  pluralize,
  formatRating,
} from '../format'

describe('truncate', () => {
  it('returns full text when shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('returns full text when exactly maxLength', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  it('truncates text longer than maxLength with ellipsis', () => {
    const result = truncate('The quick brown fox jumps over the lazy dog', 20)
    expect(result.length).toBeLessThanOrEqual(23) // 20 chars + possible "..."
    expect(result).toContain('...')
  })

  it('truncates at word boundary', () => {
    const result = truncate('hello world foo bar', 12)
    // Should cut before a partial word
    expect(result).toBe('hello world...')
  })

  it('handles single word longer than maxLength', () => {
    const result = truncate('superlongword', 5)
    expect(result).toContain('...')
  })
})

describe('estimateReadingTime', () => {
  it('returns 1 minute for very short text', () => {
    expect(estimateReadingTime('hello world')).toBe(1)
  })

  it('returns 1 minute for text under 200 words', () => {
    const words = Array(150).fill('word').join(' ')
    expect(estimateReadingTime(words)).toBe(1)
  })

  it('returns correct time for longer text', () => {
    const words = Array(400).fill('word').join(' ')
    expect(estimateReadingTime(words)).toBe(2)
  })

  it('returns correct time for 1000 words', () => {
    const words = Array(1000).fill('word').join(' ')
    expect(estimateReadingTime(words)).toBe(5)
  })

  it('always returns at least 1', () => {
    expect(estimateReadingTime('')).toBeGreaterThanOrEqual(1)
  })
})

describe('toTitleCase', () => {
  it('capitalizes first letter of each word', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
  })

  it('handles already uppercase text', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
  })

  it('handles single word', () => {
    expect(toTitleCase('hello')).toBe('Hello')
  })

  it('handles mixed case', () => {
    expect(toTitleCase('hELLo wOrLD')).toBe('Hello World')
  })

  it('handles empty string', () => {
    expect(toTitleCase('')).toBe('')
  })
})

describe('slugify', () => {
  it('converts text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with hyphens', () => {
    expect(slugify('foo bar baz')).toBe('foo-bar-baz')
  })

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('replaces underscores with hyphens', () => {
    expect(slugify('hello_world')).toBe('hello-world')
  })

  it('removes leading and trailing hyphens', () => {
    expect(slugify('--hello world--')).toBe('hello-world')
  })

  it('handles multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world')
  })

  it('handles empty string', () => {
    expect(slugify('')).toBe('')
  })
})

describe('formatRating', () => {
  it('formats integer to one decimal place', () => {
    expect(formatRating(4)).toBe('4.0')
  })

  it('formats float to one decimal place', () => {
    expect(formatRating(4.567)).toBe('4.6')
  })

  it('preserves one decimal place', () => {
    expect(formatRating(3.5)).toBe('3.5')
  })

  it('handles zero', () => {
    expect(formatRating(0)).toBe('0.0')
  })

  it('handles perfect score', () => {
    expect(formatRating(5)).toBe('5.0')
  })
})

describe('pluralize', () => {
  it('returns singular for count of 1', () => {
    expect(pluralize(1, 'item')).toBe('item')
  })

  it('returns plural with s suffix for count > 1', () => {
    expect(pluralize(2, 'item')).toBe('items')
  })

  it('returns plural for count of 0', () => {
    expect(pluralize(0, 'item')).toBe('items')
  })

  it('uses custom plural form when provided', () => {
    expect(pluralize(2, 'person', 'people')).toBe('people')
    expect(pluralize(1, 'person', 'people')).toBe('person')
  })

  it('handles large counts', () => {
    expect(pluralize(100, 'review')).toBe('reviews')
  })
})
