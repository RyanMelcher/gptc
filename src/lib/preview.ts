import { draftMode } from 'next/headers'

export async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

export function previewUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const secret = process.env.PREVIEW_SECRET || ''
  const u = new URL('/api/preview', base || 'http://localhost:3000')
  u.searchParams.set('path', path)
  u.searchParams.set('secret', secret)
  return u.toString()
}
