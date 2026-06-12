import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { payload } from '@/lib/payload'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { RichText } from '@payloadcms/richtext-lexical/react'

async function getEvent(slug: string) {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'events',
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
  const evt = await getEvent(slug)
  if (!evt) return {}
  return { title: `${evt.title} | Events` }
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const evt = await getEvent(slug)
  if (!evt) notFound()

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-6">
      <p className="text-sm uppercase tracking-wider">{evt.type}</p>
      <h1 className="text-5xl md:text-7xl font-black">{evt.title}</h1>
      <p className="text-lg">
        {new Date(evt.startsAt).toLocaleString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })}
      </p>
      {evt.venue && <p className="text-lg">{evt.venue}</p>}
      {evt.description && (
        <div className="prose prose-lg max-w-none">
          <RichText data={evt.description} />
        </div>
      )}
      {evt.ticketURL && (
        <a href={evt.ticketURL} target="_blank" rel="noopener noreferrer">
          <BrutalButton variant="magenta">Get Tickets</BrutalButton>
        </a>
      )}
    </main>
  )
}
