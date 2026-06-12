import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { payload } from '@/lib/payload'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { isDraft } from '@/lib/preview'

async function getProduction(slug: string) {
  const p = await payload()
  const draft = await isDraft()
  const { docs } = await p.find({
    collection: 'productions',
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
  const prod = await getProduction(slug)
  if (!prod) return {}
  return { title: `${prod.title} | Productions` }
}

export default async function ProductionDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const prod = await getProduction(slug)
  if (!prod) notFound()

  const director =
    typeof prod.director === 'object' && prod.director ? prod.director.name : null
  const playTitle =
    typeof prod.play === 'object' && prod.play ? prod.play.title : null

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-6">
      <h1 className="text-5xl md:text-7xl font-black">{prod.title}</h1>
      {playTitle && (
        <p className="text-xl uppercase tracking-wider">From the play &ldquo;{playTitle}&rdquo;</p>
      )}
      <dl className="grid grid-cols-2 gap-4 text-base">
        {prod.season && (
          <div>
            <dt className="font-display uppercase text-sm tracking-wider">Season</dt>
            <dd>{prod.season}</dd>
          </div>
        )}
        {prod.venue && (
          <div>
            <dt className="font-display uppercase text-sm tracking-wider">Venue</dt>
            <dd>{prod.venue}</dd>
          </div>
        )}
        {director && (
          <div>
            <dt className="font-display uppercase text-sm tracking-wider">Director</dt>
            <dd>{director}</dd>
          </div>
        )}
        {prod.startsOn && (
          <div>
            <dt className="font-display uppercase text-sm tracking-wider">Dates</dt>
            <dd>
              {new Date(prod.startsOn).toLocaleDateString()}
              {prod.endsOn ? ` – ${new Date(prod.endsOn).toLocaleDateString()}` : ''}
            </dd>
          </div>
        )}
      </dl>
      {prod.ticketURL && (
        <a href={prod.ticketURL} target="_blank" rel="noopener noreferrer">
          <BrutalButton variant="magenta">Buy Tickets</BrutalButton>
        </a>
      )}
    </main>
  )
}
