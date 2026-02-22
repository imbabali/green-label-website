import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the next/headers module before importing the rate limiter
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

import { checkRateLimit } from '../rate-limit'
import { headers } from 'next/headers'

const mockHeaders = vi.mocked(headers)

function createMockHeaders(ip: string = '127.0.0.1') {
  return {
    get: (name: string) => {
      if (name === 'x-forwarded-for') return ip
      if (name === 'x-real-ip') return ip
      return null
    },
  } as unknown as Awaited<ReturnType<typeof headers>>
}

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockHeaders.mockReset()
    mockHeaders.mockResolvedValue(createMockHeaders('192.168.1.1'))
  })

  it('allows the first request', async () => {
    // Use a unique IP to avoid cross-test pollution
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.1'))
    const result = await checkRateLimit('contact')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBeGreaterThanOrEqual(0)
  })

  it('allows requests within the limit', async () => {
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.2'))

    const result1 = await checkRateLimit('contact')
    expect(result1.allowed).toBe(true)

    const result2 = await checkRateLimit('contact')
    expect(result2.allowed).toBe(true)
  })

  it('returns remaining count that decreases', async () => {
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.3'))

    const result1 = await checkRateLimit('contact')
    const result2 = await checkRateLimit('contact')
    expect(result2.remaining).toBeLessThan(result1.remaining)
  })

  it('blocks requests exceeding the limit', async () => {
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.4'))

    // contact limit is max: 3
    await checkRateLimit('contact') // 1
    await checkRateLimit('contact') // 2
    await checkRateLimit('contact') // 3

    const result = await checkRateLimit('contact') // 4 - should be blocked
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
    expect(result.retryAfter).toBeGreaterThan(0)
  })

  it('returns allowed: true with Infinity remaining for unknown action', async () => {
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.5'))
    // Cast to any to test unknown action

    const result = await checkRateLimit(
      'nonexistent' as unknown as Parameters<typeof checkRateLimit>[0]
    )
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(Infinity)
  })

  it('tracks different IPs independently', async () => {
    // First IP exhausts the limit
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.6'))
    await checkRateLimit('contact')
    await checkRateLimit('contact')
    await checkRateLimit('contact')
    const blocked = await checkRateLimit('contact')
    expect(blocked.allowed).toBe(false)

    // Second IP should still be allowed
    mockHeaders.mockResolvedValue(createMockHeaders('10.0.0.7'))
    const allowed = await checkRateLimit('contact')
    expect(allowed.allowed).toBe(true)
  })
})
