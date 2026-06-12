import { NextResponse, type NextRequest } from 'next/server'
import { payload } from '@/lib/payload'

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get('token')
  if (!token || token.length < 16) {
    return NextResponse.redirect(new URL('/newsletter/invalid', req.url))
  }

  const p = await payload()
  const { docs } = await p.find({
    collection: 'subscribers',
    where: { token: { equals: token } },
    limit: 1,
  })
  const sub = docs[0]
  if (!sub) {
    return NextResponse.redirect(new URL('/newsletter/invalid', req.url))
  }

  if (!sub.confirmedAt) {
    await p.update({
      collection: 'subscribers',
      id: sub.id,
      data: { confirmedAt: new Date().toISOString() },
    })
  }

  return NextResponse.redirect(new URL('/newsletter/confirmed', req.url))
}
