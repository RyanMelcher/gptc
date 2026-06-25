import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { payload } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

async function getArtist(slug: string) {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'artists',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const artist = await getArtist(slug)
  if (!artist) return {}
  return { title: `${artist.name} | Artists` }
}

export default async function ArtistDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artist = await getArtist(slug)
  if (!artist) notFound()

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:p-8 space-y-6">
      <h1 className="text-5xl md:text-7xl font-black">{artist.name}</h1>
      {artist.roles && artist.roles.length > 0 && (
        <p className="text-xl uppercase tracking-wider">{artist.roles.join(' · ')}</p>
      )}
      {artist.bio && (
        <div className="prose prose-lg max-w-none">
          <RichText data={artist.bio} />
        </div>
      )}
      {artist.links && artist.links.length > 0 && (
        <ul className="flex flex-wrap gap-3">
          {artist.links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[3px] border-[var(--color-ink)] bg-[var(--color-leaf)] px-3 py-1 text-sm uppercase tracking-wider"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
