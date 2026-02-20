import { z } from 'zod'

const DISPOSABLE_DOMAINS = [
  'mailinator.com',
  'guerrillamail.com',
  'temp-mail.org',
  'throwaway.email',
  'fakeinbox.com',
  'yopmail.com',
  'maildrop.cc',
  '10minutemail.com',
  'trashmail.com',
  'tempail.com',
  'sharklasers.com',
  'guerrillamailblock.com',
  'grr.la',
  'dispostable.com',
  'mailnesia.com',
]

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return DISPOSABLE_DOMAINS.includes(domain)
}

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email must be less than 254 characters')
  .transform((val) => val.toLowerCase().trim())
  .refine((val) => !isDisposableEmail(val), {
    message: 'Please use a permanent email address. Disposable email addresses are not accepted.',
  })
