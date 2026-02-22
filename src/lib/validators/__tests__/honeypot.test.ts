import { describe, it, expect } from 'vitest'
import { honeypotSchema, isHoneypotFilled } from '../honeypot'

describe('isHoneypotFilled', () => {
  it('returns false for undefined', () => {
    expect(isHoneypotFilled(undefined)).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isHoneypotFilled('')).toBe(false)
  })

  it('returns true for non-empty string (spam detected)', () => {
    expect(isHoneypotFilled('bot input')).toBe(true)
    expect(isHoneypotFilled('a')).toBe(true)
    expect(isHoneypotFilled(' ')).toBe(true)
  })
})

describe('honeypotSchema', () => {
  it('accepts empty string', () => {
    const result = honeypotSchema.parse('')
    expect(result).toBe('')
  })

  it('accepts undefined (defaults to empty string)', () => {
    const result = honeypotSchema.parse(undefined)
    expect(result).toBe('')
  })

  it('rejects non-empty string as spam', () => {
    expect(() => honeypotSchema.parse('bot input')).toThrow()
  })

  it('rejects any string with content', () => {
    expect(() => honeypotSchema.parse('a')).toThrow()
    expect(() => honeypotSchema.parse('spam content here')).toThrow()
  })
})
