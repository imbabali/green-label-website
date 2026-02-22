import { headers } from 'next/headers'

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  max: number
  /** Time window in seconds */
  windowSeconds: number
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  auth: { max: 5, windowSeconds: 900 },
  contact: { max: 3, windowSeconds: 3600 },
  quote: { max: 3, windowSeconds: 3600 },
  newsletter: { max: 3, windowSeconds: 86400 },
  comment: { max: 5, windowSeconds: 600 },
  inquiry: { max: 3, windowSeconds: 3600 },
  application: { max: 3, windowSeconds: 3600 },
  review: { max: 5, windowSeconds: 3600 },
}

// In-memory store (resets on server restart; suitable for serverless with short lifetimes)
const store = new Map<string, { count: number; resetAt: number }>()

export async function checkRateLimit(
  action: keyof typeof RATE_LIMITS
): Promise<{ allowed: boolean; remaining: number; retryAfter?: number }> {
  const config = RATE_LIMITS[action]
  if (!config) return { allowed: true, remaining: Infinity }

  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             headersList.get('x-real-ip') ||
             'unknown'

  const key = `${action}:${ip}`
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return { allowed: true, remaining: config.max - 1 }
  }

  if (entry.count >= config.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  entry.count++
  return { allowed: true, remaining: config.max - entry.count }
}
