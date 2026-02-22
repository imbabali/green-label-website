import { describe, it, expect } from 'vitest'
import { cleanPhone, isValidUgandaPhone, phoneSchema, phoneRequiredSchema } from '../phone'

describe('cleanPhone', () => {
  it('removes spaces from phone numbers', () => {
    expect(cleanPhone('+256 772 423 092')).toBe('+256772423092')
  })

  it('removes dashes from phone numbers', () => {
    expect(cleanPhone('0772-423-092')).toBe('0772423092')
  })

  it('removes parentheses from phone numbers', () => {
    expect(cleanPhone('(0772) 423092')).toBe('0772423092')
  })

  it('removes mixed separators', () => {
    expect(cleanPhone('+256 (772) 423-092')).toBe('+256772423092')
  })

  it('leaves clean numbers unchanged', () => {
    expect(cleanPhone('+256772423092')).toBe('+256772423092')
    expect(cleanPhone('0772423092')).toBe('0772423092')
  })
})

describe('isValidUgandaPhone', () => {
  it('accepts valid +256 format numbers', () => {
    expect(isValidUgandaPhone('+256772423092')).toBe(true)
    expect(isValidUgandaPhone('+256700123456')).toBe(true)
    expect(isValidUgandaPhone('+256312345678')).toBe(true)
  })

  it('accepts valid 256 format without plus', () => {
    expect(isValidUgandaPhone('256772423092')).toBe(true)
    expect(isValidUgandaPhone('256700123456')).toBe(true)
  })

  it('accepts valid 0-prefix format numbers', () => {
    expect(isValidUgandaPhone('0772423092')).toBe(true)
    expect(isValidUgandaPhone('0700123456')).toBe(true)
    expect(isValidUgandaPhone('0312345678')).toBe(true)
  })

  it('accepts generic 10-15 digit numbers', () => {
    expect(isValidUgandaPhone('1234567890')).toBe(true)
    expect(isValidUgandaPhone('123456789012345')).toBe(true)
  })

  it('handles numbers with whitespace via cleanPhone', () => {
    expect(isValidUgandaPhone('+256 772 423 092')).toBe(true)
    expect(isValidUgandaPhone('0772 423 092')).toBe(true)
  })

  it('rejects numbers that are too short', () => {
    expect(isValidUgandaPhone('12345')).toBe(false)
    expect(isValidUgandaPhone('07724')).toBe(false)
  })

  it('rejects invalid patterns', () => {
    expect(isValidUgandaPhone('abc')).toBe(false)
    expect(isValidUgandaPhone('')).toBe(false)
  })
})

describe('phoneSchema', () => {
  it('accepts and cleans valid phone numbers', async () => {
    const result = await phoneSchema.parseAsync('+256 772 423 092')
    expect(result).toBe('+256772423092')
  })

  it('accepts empty strings (phone is optional)', async () => {
    const result = await phoneSchema.parseAsync('')
    expect(result).toBe('')
  })
})

describe('phoneRequiredSchema', () => {
  it('accepts valid phone numbers', async () => {
    const result = await phoneRequiredSchema.parseAsync('+256772423092')
    expect(result).toBe('+256772423092')
  })

  it('rejects empty string', async () => {
    await expect(phoneRequiredSchema.parseAsync('')).rejects.toThrow()
  })

  it('rejects invalid phone numbers', async () => {
    await expect(phoneRequiredSchema.parseAsync('abc')).rejects.toThrow()
  })
})
