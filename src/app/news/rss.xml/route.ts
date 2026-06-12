import { payload } from '@/lib/payload'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const p = await payload()
  const { docs } = await p.find({
    collection: 'news',
    limit: 50,
    sort: '-publishedAt',
    depth: 0,
  })

  const items = docs
    .map((d) => {
      const link = `${base}/news/${d.slug}`
      const pub = d.publishedAt ? new Date(d.publishedAt).toUTCString() : new Date(d.updatedAt).toUTCString()
      return `    <item>
      <title>${esc(d.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      ${d.excerpt ? `<description>${esc(d.excerpt)}</description>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Great Plains Theatre Commons · News</title>
    <link>${base}/news</link>
    <description>News and announcements from Great Plains Theatre Commons.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600',
    },
  })
}
