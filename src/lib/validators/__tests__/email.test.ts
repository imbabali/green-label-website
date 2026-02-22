import { describe, it, expect } from 'vitest'
import { isDisposableEmail, emailSchema } from '../email'

describe('isDisposableEmail', () => {
  it('returns true for disposable email domains', () => {
    expect(isDisposableEmail('user@mailinator.com')).toBe(true)
    expect(isDisposableEmail('test@guerrillamail.com')).toBe(true)
    expect(isDisposableEmail('foo@yopmail.com')).toBe(true)
    expect(isDisposableEmail('bar@temp-mail.org')).toBe(true)
    expect(isDisposableEmail('baz@10minutemail.com')).toBe(true)
  })

  it('returns false for legitimate email domains', () => {
    expect(isDisposableEmail('user@gmail.com')).toBe(false)
    expect(isDisposableEmail('user@yahoo.com')).toBe(false)
    expect(isDisposableEmail('user@greenlabelservicesug.com')).toBe(false)
    expect(isDisposableEmail('user@outlook.com')).toBe(false)
  })

  it('is case-insensitive for domain matching', () => {
    expect(isDisposableEmail('user@MAILINATOR.COM')).toBe(true)
    expect(isDisposableEmail('user@Mailinator.com')).toBe(true)
  })

  it('handles the domain extraction correctly', () => {
    // The function lowercases the domain part
    expect(isDisposableEmail('USER@mailinator.com')).toBe(true)
  })
})

describe('emailSchema', () => {
  it('accepts valid email addresses', async () => {
    const result = await emailSchema.parseAsync('user@gmail.com')
    expect(result).toBe('user@gmail.com')
  })

  it('transforms email to lowercase', async () => {
    const result = await emailSchema.parseAsync('User@Gmail.COM')
    expect(result).toBe('user@gmail.com')
  })

  it('rejects empty string', async () => {
    await expect(emailSchema.parseAsync('')).rejects.toThrow()
  })

  it('rejects invalid email format', async () => {
    await expect(emailSchema.parseAsync('not-an-email')).rejects.toThrow()
    await expect(emailSchema.parseAsync('missing@')).rejects.toThrow()
    await expect(emailSchema.parseAsync('@nodomain.com')).rejects.toThrow()
  })

  it('rejects disposable email domains', async () => {
    await expect(emailSchema.parseAsync('user@mailinator.com')).rejects.toThrow(/disposable/i)
    await expect(emailSchema.parseAsync('test@guerrillamail.com')).rejects.toThrow(/disposable/i)
  })

  it('rejects emails longer than 254 characters', async () => {
    const longLocal = 'a'.repeat(250)
    await expect(emailSchema.parseAsync(`${longLocal}@test.com`)).rejects.toThrow()
  })
})
