import Link from 'next/link'
import Image from 'next/image'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Event, Media } from '@/payload-types'

export type UpcomingShowCardProps = {
  eyebrow?: string | null
  event?: Event | string | number | null
  poster?: Media | string | number | null
  ctaLabel?: string | null
}

function formatDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function UpcomingShowCard({ eyebrow, event, poster, ctaLabel }: UpcomingShowCardProps) {
  if (!event || typeof event === 'string' || typeof event === 'number') return null

  const img = mediaUrl(poster, 'hero') ?? mediaUrl(event.hero, 'hero')
  const alt = mediaAlt(poster) || mediaAlt(event.hero) || event.title
  const href = `/events/${event.slug}`
  const dateLabel = formatDate(event.startsAt)

  return (
    <section className="bg-[var(--color-paper)] border-b-[3px] border-[var(--color-ink)] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <article className="border-[3px] border-[var(--color-ink)] shadow-[6px_6px_0_var(--color-ink)] bg-[var(--color-paper)] grid md:grid-cols-2">
          {img ? (
            <Link href={href} className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[var(--color-ink)] overflow-hidden bg-[var(--color-ink)]">
              <Image
                src={img}
                alt={alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Link>
          ) : null}
          <div className="p-6 md:p-10 flex flex-col justify-center gap-4">
            {eyebrow && (
              <p className="font-display uppercase tracking-widest text-xs md:text-sm">{eyebrow}</p>
            )}
            <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95]">
              <Link href={href} className="hover:underline">{event.title}</Link>
            </h2>
            <dl className="space-y-1 text-base md:text-lg">
              {dateLabel && (
                <div className="flex gap-2">
                  <dt className="font-display uppercase tracking-widest text-xs md:text-sm pt-1">When</dt>
                  <dd>{dateLabel}</dd>
                </div>
              )}
              {event.venue && (
                <div className="flex gap-2">
                  <dt className="font-display uppercase tracking-widest text-xs md:text-sm pt-1">Where</dt>
                  <dd>{event.venue}</dd>
                </div>
              )}
            </dl>
            <div className="flex flex-wrap gap-3 mt-2">
              {event.ticketURL && (
                <a href={event.ticketURL} target="_blank" rel="noreferrer">
                  <BrutalButton variant="bolt">{ctaLabel || 'Get Tickets'}</BrutalButton>
                </a>
              )}
              <Link href={href}>
                <BrutalButton variant="ink">Details</BrutalButton>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
