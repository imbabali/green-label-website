import { z } from 'zod'

export const honeypotSchema = z
  .string()
  .max(0, 'Spam detected')
  .optional()
  .default('')

export function isHoneypotFilled(value: string | undefined): boolean {
  return !!value && value.length > 0
}
