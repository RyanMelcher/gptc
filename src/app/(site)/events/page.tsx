import Link from 'next/link'
import { payload } from '@/lib/payload'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export const metadata = { title: 'Events | Great Plains Theatre Commons' }

export default async function EventsIndex({
  searchParams,
}: {
  searchParams: Promise<{ when?: 'past' | 'upcoming' }>
}) {
  const { when = 'upcoming' } = await searchParams
  const p = await payload()
  const now = new Date().toISOString()
  const where =
    when === 'past'
      ? { startsAt: { less_than: now } }
      : { startsAt: { greater_than_equal: now } }

  const { docs } = await p.find({
    collection: 'events',
    limit: 100,
    sort: when === 'past' ? '-startsAt' : 'startsAt',
    depth: 1,
    where,
  })

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-8">
      <h1 className="text-5xl md:text-7xl font-black">EVENTS</h1>
      <nav className="flex gap-4">
        <Link
          href="/events"
          className={`border-[3px] border-[var(--color-ink)] px-4 py-2 ${
            when === 'upcoming' ? 'bg-[var(--color-leaf)]' : ''
          }`}
        >
          Upcoming
        </Link>
        <Link
          href="/events?when=past"
          className={`border-[3px] border-[var(--color-ink)] px-4 py-2 ${
            when === 'past' ? 'bg-[var(--color-leaf)]' : ''
          }`}
        >
          Past
        </Link>
      </nav>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((evt) => (
          <Link key={evt.id} href={`/events/${evt.slug}`}>
            <BrutalCard>
              <p className="text-sm uppercase tracking-wider">{evt.type}</p>
              <h2 className="text-2xl font-black mt-2">{evt.title}</h2>
              <p className="mt-2 text-sm">
                {new Date(evt.startsAt).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              {evt.venue && <p className="text-sm">{evt.venue}</p>}
            </BrutalCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
