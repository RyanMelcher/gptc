import Link from 'next/link'
import { payload } from '@/lib/payload'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export const metadata = { title: 'News | Great Plains Theatre Commons' }

export default async function NewsIndex() {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'news',
    limit: 50,
    sort: '-publishedAt',
    depth: 1,
  })

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-8">
      <h1 className="text-5xl md:text-7xl font-black">NEWS</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`}>
            <BrutalCard>
              <h2 className="text-2xl font-black">{item.title}</h2>
              {item.publishedAt && (
                <p className="mt-2 text-sm uppercase tracking-wider">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              )}
              {item.excerpt && <p className="mt-3 text-base line-clamp-3">{item.excerpt}</p>}
            </BrutalCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
