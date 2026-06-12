import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { payload } from '@/lib/payload'
import { BlockRenderer } from '@/components/render/BlockRenderer'
import { isDraft } from '@/lib/preview'

async function getNews(slug: string) {
  const p = await payload()
  const draft = await isDraft()
  const { docs } = await p.find({
    collection: 'news',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getNews(slug)
  if (!item) return {}
  return {
    title: `${item.title} | News`,
    description: item.excerpt || undefined,
  }
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getNews(slug)
  if (!item) notFound()

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-6">
      {item.publishedAt && (
        <p className="text-sm uppercase tracking-wider">
          {new Date(item.publishedAt).toLocaleDateString()}
        </p>
      )}
      <h1 className="text-5xl md:text-7xl font-black">{item.title}</h1>
      {item.excerpt && <p className="text-xl leading-relaxed">{item.excerpt}</p>}
      <BlockRenderer blocks={item.blocks} />
    </main>
  )
}
