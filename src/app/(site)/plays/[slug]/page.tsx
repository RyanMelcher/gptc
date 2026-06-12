import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { payload } from '@/lib/payload'
import { isDraft } from '@/lib/preview'

async function getPlay(slug: string) {
  const p = await payload()
  const draft = await isDraft()
  const { docs } = await p.find({
    collection: 'plays',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
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
  const play = await getPlay(slug)
  if (!play) return {}
  return { title: `${play.title} | Plays` }
}

export default async function PlayDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const play = await getPlay(slug)
  if (!play) notFound()

  const author =
    typeof play.playwright === 'object' && play.playwright ? play.playwright.name : null

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-6">
      <h1 className="text-5xl md:text-7xl font-black">{play.title}</h1>
      {author && (
        <p className="text-xl uppercase tracking-wider">By {author}</p>
      )}
      {play.synopsis && <p className="text-lg leading-relaxed">{play.synopsis}</p>}
      {play.themes && play.themes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {play.themes.map((t) =>
            t.value ? (
              <span
                key={t.id}
                className="border-[3px] border-[var(--color-ink)] bg-[var(--color-marigold)] px-3 py-1 text-sm uppercase tracking-wider"
              >
                {t.value}
              </span>
            ) : null,
          )}
        </div>
      )}
    </main>
  )
}
