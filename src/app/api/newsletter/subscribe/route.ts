import { NextResponse, type NextRequest } from 'next/server'
import { randomBytes } from 'node:crypto'
import { payload } from '@/lib/payload'
import { rateLimit } from '@/lib/rate-limit'
import { sendEmail, confirmEmail } from '@/lib/newsletter/email'

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function isEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

type Body = { email?: unknown; company?: unknown }

async function parseBody(req: NextRequest): Promise<Body> {
  const ct = req.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) return req.json() as Promise<Body>
  const form = await req.formData()
  return { email: form.get('email'), company: form.get('company') }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const rl = rateLimit(`subscribe:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
    )
  }

  const body: Body = await parseBody(req).catch(() => ({}))

  if (typeof body.company === 'string' && body.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  const email = body.email.toLowerCase()
  const token = randomBytes(24).toString('hex')

  const p = await payload()
  const existing = await p.find({
    collection: 'subscribers',
    where: { email: { equals: email } },
    limit: 1,
  })

  let subscriberToken = token
  if (existing.docs[0]) {
    const doc = existing.docs[0]
    if (doc.confirmedAt && !doc.unsubscribedAt) {
      return NextResponse.json({ ok: true, alreadyConfirmed: true })
    }
    subscriberToken = doc.token || token
    await p.update({
      collection: 'subscribers',
      id: doc.id,
      data: { token: subscriberToken, unsubscribedAt: null },
    })
  } else {
    await p.create({
      collection: 'subscribers',
      data: { email, source: 'site', token: subscriberToken },
    })
  }

  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const url = new URL('/api/newsletter/confirm', base)
  url.searchParams.set('token', subscriberToken)
  const { subject, html } = confirmEmail(url.toString())
  try {
    await sendEmail({ to: email, subject, html })
  } catch (err) {
    console.error('[newsletter] email send failed', err)
    return NextResponse.json({ error: 'email_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
