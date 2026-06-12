import Link from 'next/link'
import { payload } from '@/lib/payload'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export const metadata = { title: 'Artists | Great Plains Theatre Commons' }

export default async function ArtistsIndex() {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'artists',
    limit: 200,
    sort: 'name',
    depth: 1,
  })

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-8">
      <h1 className="text-5xl md:text-7xl font-black">ARTISTS</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((artist) => (
          <Link key={artist.id} href={`/artists/${artist.slug}`}>
            <BrutalCard>
              <h2 className="text-2xl font-black">{artist.name}</h2>
              {artist.roles && artist.roles.length > 0 && (
                <p className="mt-2 text-sm uppercase tracking-wider">
                  {artist.roles.join(' · ')}
                </p>
              )}
            </BrutalCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
