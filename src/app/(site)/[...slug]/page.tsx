import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { payload } from '@/lib/payload'
import { BlockRenderer } from '@/components/render/BlockRenderer'
import { isDraft } from '@/lib/preview'

type Params = { slug: string[] }

async function getPage(slugSegments: string[]) {
  const slug = slugSegments.join('/')
  const p = await payload()
  const draft = await isDraft()
  const result = await p.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft,
    overrideAccess: draft,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || undefined,
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <main className="mx-auto max-w-6xl p-8">
      <BlockRenderer blocks={page.blocks} />
    </main>
  )
}
