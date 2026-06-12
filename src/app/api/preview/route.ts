import { NextResponse, type NextRequest } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')
  const path = url.searchParams.get('path') || '/'

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse('Invalid preview secret', { status: 401 })
  }

  ;(await draftMode()).enable()
  return NextResponse.redirect(new URL(path, req.url))
}
