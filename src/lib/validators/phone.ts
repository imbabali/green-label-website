import { z } from 'zod'

const UGANDA_PHONE_REGEX = /^\+?256\d{9}$|^0\d{9}$|^\d{10,15}$/

export function cleanPhone(phone: string): string {
  return phone.replace(/[\s\-()]/g, '')
}

export function isValidUgandaPhone(phone: string): boolean {
  const cleaned = cleanPhone(phone)
  return UGANDA_PHONE_REGEX.test(cleaned)
}

export const phoneSchema = z
  .string()
  .transform(cleanPhone)
  .refine((val) => !val || isValidUgandaPhone(val), {
    message: 'Please enter a valid Uganda phone number (e.g., +256 772 423 092 or 0772 423 092)',
  })

export const phoneRequiredSchema = z
  .string()
  .min(1, 'Phone number is required')
  .transform(cleanPhone)
  .refine(isValidUgandaPhone, {
    message: 'Please enter a valid Uganda phone number (e.g., +256 772 423 092 or 0772 423 092)',
  })
