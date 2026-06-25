import type { Media } from '@/payload-types'

export function mediaUrl(m: Media | string | number | null | undefined, size?: 'thumb' | 'card' | 'hero' | 'og'): string | null {
  if (!m || typeof m === 'string' || typeof m === 'number') return null
  const sized = size && m.sizes?.[size]?.url
  const raw = sized || m.url || null
  return raw ? toRelative(raw) : null
}

function toRelative(url: string): string {
  try {
    const u = new URL(url)
    return u.pathname + u.search + u.hash
  } catch {
    return url
  }
}

export function mediaAlt(m: Media | string | number | null | undefined): string {
  if (!m || typeof m === 'string' || typeof m === 'number') return ''
  return m.alt || ''
}
