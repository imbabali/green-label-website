import { z } from 'zod'

const envSchema = z.object({
  // Public (available on client)
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'NEXT_PUBLIC_SANITY_PROJECT_ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, 'NEXT_PUBLIC_SANITY_DATASET is required'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  // Server-only
  SANITY_API_TOKEN: z.string().min(1, 'SANITY_API_TOKEN is required').optional(),
  SANITY_REVALIDATE_SECRET: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables. Check server logs for details.')
  }
  return parsed.data
}

export const env = validateEnv()
