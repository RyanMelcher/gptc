import Link from 'next/link'
import { payload } from '@/lib/payload'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export const metadata = { title: 'Plays | Great Plains Theatre Commons' }

export default async function PlaysIndex() {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'plays',
    limit: 100,
    sort: '-updatedAt',
    depth: 1,
  })

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-8">
      <h1 className="text-5xl md:text-7xl font-black">PLAYS</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((play) => {
          const author =
            typeof play.playwright === 'object' && play.playwright
              ? play.playwright.name
              : null
          return (
            <Link key={play.id} href={`/plays/${play.slug}`}>
              <BrutalCard>
                <h2 className="text-2xl font-black">{play.title}</h2>
                {author && <p className="mt-2 text-sm uppercase tracking-wider">{author}</p>}
                {play.synopsis && <p className="mt-3 text-base line-clamp-3">{play.synopsis}</p>}
              </BrutalCard>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
