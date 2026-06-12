import { describe, it, expect, afterEach } from 'vitest'
import { loadEnv } from '@/lib/env'

describe('loadEnv', () => {
  const ORIGINAL = { ...process.env }
  afterEach(() => {
    process.env = { ...ORIGINAL }
  })

  it('returns parsed env when required vars present', () => {
    process.env.DATABASE_URI = 'postgres://x'
    process.env.PAYLOAD_SECRET = 'a'.repeat(32)
    process.env.NEXT_PUBLIC_SERVER_URL = 'http://localhost:3000'
    const env = loadEnv({ fresh: true })
    expect(env.DATABASE_URI).toBe('postgres://x')
  })

  it('throws when PAYLOAD_SECRET too short', () => {
    process.env.DATABASE_URI = 'postgres://x'
    process.env.PAYLOAD_SECRET = 'short'
    process.env.NEXT_PUBLIC_SERVER_URL = 'http://localhost:3000'
    expect(() => loadEnv({ fresh: true })).toThrow()
  })
})
