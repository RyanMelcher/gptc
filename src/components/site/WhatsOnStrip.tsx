import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media } from '@/payload-types'

type Tone = 'paper' | 'marigold' | 'leaf' | 'bolt' | 'magenta'

const toneBg: Record<Tone, string> = {
  paper: 'bg-[var(--color-paper)]',
  marigold: 'bg-[var(--color-marigold)]',
  leaf: 'bg-[var(--color-leaf)]',
  bolt: 'bg-[var(--color-bolt)] text-[var(--color-paper)]',
  magenta: 'bg-[var(--color-magenta)] text-[var(--color-paper)]',
}

export type WhatsOnCard = {
  id?: string | null
  eyebrow?: string | null
  title: string
  body?: string | null
  image?: Media | string | number | null
  href: string
  tone?: Tone | null
}

export function WhatsOnStrip({ cards }: { cards?: WhatsOnCard[] | null }) {
  if (!cards?.length) return null
  return (
    <section className="bg-[var(--color-paper)] border-b-[3px] border-[var(--color-ink)] py-16">
      <div className="mx-auto max-w-7xl px-6 space-y-8">
        <h2 className="font-display text-4xl md:text-5xl font-black">What&rsquo;s On</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const img = mediaUrl(c.image, 'card')
            return (
              <Link key={c.id ?? i} href={c.href} className="group block">
                <article
                  className={cn(
                    'border-[3px] border-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)]',
                    'transition-transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_var(--color-ink)]',
                    toneBg[c.tone ?? 'paper'],
                  )}
                >
                  {img && (
                    <div className="relative aspect-[4/3] border-b-[3px] border-[var(--color-ink)] overflow-hidden">
                      <Image
                        src={img}
                        alt={mediaAlt(c.image)}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {c.eyebrow && (
                      <p className="font-display uppercase tracking-widest text-xs mb-2">
                        {c.eyebrow}
                      </p>
                    )}
                    <h3 className="font-display text-2xl font-black leading-tight">{c.title}</h3>
                    {c.body && <p className="mt-2 text-base line-clamp-3">{c.body}</p>}
                    <p className="mt-4 font-display uppercase text-sm tracking-widest underline">
                      Learn more
                    </p>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
