import type { MetadataRoute } from 'next'
import { payload } from '@/lib/payload'

const STATIC_PATHS = ['', '/plays', '/productions', '/events', '/news', '/artists']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const p = await payload()

  const [pages, plays, productions, events, news, artists] = await Promise.all([
    p.find({ collection: 'pages', limit: 500, depth: 0 }),
    p.find({ collection: 'plays', limit: 500, depth: 0 }),
    p.find({ collection: 'productions', limit: 500, depth: 0 }),
    p.find({ collection: 'events', limit: 500, depth: 0 }),
    p.find({ collection: 'news', limit: 500, depth: 0 }),
    p.find({ collection: 'artists', limit: 500, depth: 0 }),
  ])

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: now,
  }))

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...pages.docs.map((d) => ({ url: `${base}/${d.slug}`, lastModified: new Date(d.updatedAt) })),
    ...plays.docs.map((d) => ({ url: `${base}/plays/${d.slug}`, lastModified: new Date(d.updatedAt) })),
    ...productions.docs.map((d) => ({ url: `${base}/productions/${d.slug}`, lastModified: new Date(d.updatedAt) })),
    ...events.docs.map((d) => ({ url: `${base}/events/${d.slug}`, lastModified: new Date(d.updatedAt) })),
    ...news.docs.map((d) => ({ url: `${base}/news/${d.slug}`, lastModified: new Date(d.updatedAt) })),
    ...artists.docs.map((d) => ({ url: `${base}/artists/${d.slug}`, lastModified: new Date(d.updatedAt) })),
  ]

  return [...staticEntries, ...dynamicEntries]
}
