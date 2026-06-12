import { NextResponse, type NextRequest } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: NextRequest) {
  ;(await draftMode()).disable()
  const path = new URL(req.url).searchParams.get('path') || '/'
  return NextResponse.redirect(new URL(path, req.url))
}
