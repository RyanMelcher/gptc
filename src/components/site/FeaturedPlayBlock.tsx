import Link from 'next/link'
import Image from 'next/image'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media, Play, Artist } from '@/payload-types'

export type FeaturedPlayProps = {
  eyebrow?: string | null
  play?: Play | string | number | null
  image?: Media | string | number | null
}

export function FeaturedPlayBlock({ eyebrow, play, image }: FeaturedPlayProps) {
  if (!play || typeof play !== 'object') return null
  const author =
    typeof play.playwright === 'object' && play.playwright
      ? (play.playwright as Artist).name
      : null
  const img = mediaUrl(image, 'hero')

  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-paper)] border-b-[3px] border-[var(--color-ink)] py-20">
      <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-2 items-center">
        {img && (
          <div className="relative aspect-[4/5] border-[3px] border-[var(--color-paper)] shadow-[8px_8px_0_var(--color-marigold)]">
            <Image
              src={img}
              alt={mediaAlt(image)}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div>
          {eyebrow && (
            <p className="font-display uppercase tracking-widest text-sm mb-4">{eyebrow}</p>
          )}
          <h2 className="font-display text-4xl md:text-6xl font-black leading-tight">
            {play.title}
          </h2>
          {author && (
            <p className="mt-3 font-display uppercase tracking-widest text-base">By {author}</p>
          )}
          {play.synopsis && (
            <p className="mt-6 text-lg leading-relaxed max-w-prose">{play.synopsis}</p>
          )}
          <div className="mt-8">
            <Link href={`/plays/${play.slug}`}>
              <BrutalButton variant="marigold">Read more</BrutalButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
