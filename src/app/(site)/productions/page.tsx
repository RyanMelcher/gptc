import Link from 'next/link'
import type { Where } from 'payload'
import { payload } from '@/lib/payload'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export const metadata = { title: 'Productions | Great Plains Theatre Commons' }

export default async function ProductionsIndex({
  searchParams,
}: {
  searchParams: Promise<{ season?: string; year?: string }>
}) {
  const { year } = await searchParams
  const p = await payload()
  const where: Where = {}
  if (year) where.year = { equals: Number(year) }

  const { docs } = await p.find({
    collection: 'productions',
    limit: 100,
    sort: '-year',
    depth: 1,
    where,
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:p-8 space-y-8">
      <h1 className="text-5xl md:text-7xl font-black">PRODUCTIONS</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((prod) => (
          <Link key={prod.id} href={`/productions/${prod.slug}`}>
            <BrutalCard>
              <h2 className="text-2xl font-black">{prod.title}</h2>
              {prod.season && (
                <p className="mt-2 text-sm uppercase tracking-wider">{prod.season}</p>
              )}
              {prod.venue && <p className="mt-1 text-sm">{prod.venue}</p>}
            </BrutalCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
