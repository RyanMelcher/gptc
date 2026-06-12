import { describe, it, expect, beforeEach } from 'vitest'
import { rateLimit, _resetRateLimit } from '@/lib/rate-limit'

describe('rateLimit', () => {
  beforeEach(() => _resetRateLimit())

  it('allows requests under the limit', () => {
    for (let i = 0; i < 5; i++) {
      expect(rateLimit('k', { limit: 5, windowMs: 1000 })).toEqual({ ok: true })
    }
  })

  it('blocks the 6th request when limit is 5', () => {
    for (let i = 0; i < 5; i++) rateLimit('k', { limit: 5, windowMs: 1000 })
    const res = rateLimit('k', { limit: 5, windowMs: 1000 })
    expect(res.ok).toBe(false)
  })

  it('isolates keys', () => {
    for (let i = 0; i < 5; i++) rateLimit('a', { limit: 5, windowMs: 1000 })
    expect(rateLimit('b', { limit: 5, windowMs: 1000 })).toEqual({ ok: true })
  })
})
