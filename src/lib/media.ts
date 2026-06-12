import type { Media } from '@/payload-types'

export function mediaUrl(m: Media | string | number | null | undefined, size?: 'thumb' | 'card' | 'hero' | 'og'): string | null {
  if (!m || typeof m === 'string' || typeof m === 'number') return null
  const sized = size && m.sizes?.[size]?.url
  return sized || m.url || null
}

export function mediaAlt(m: Media | string | number | null | undefined): string {
  if (!m || typeof m === 'string' || typeof m === 'number') return ''
  return m.alt || ''
}
