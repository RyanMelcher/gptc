import { z } from 'zod'

const schema = z.object({
  DATABASE_URI: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  PREVIEW_SECRET: z.string().min(16).optional(),
  REVALIDATE_SECRET: z.string().min(16).optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof schema>

let cached: Env | null = null

export function loadEnv(opts: { fresh?: boolean } = {}): Env {
  if (cached && !opts.fresh) return cached
  const parsed = schema.safeParse(process.env)
  if (!parsed.success) {
    throw new Error(`Invalid env: ${parsed.error.message}`)
  }
  cached = parsed.data
  return cached
}
