import Link from 'next/link'
import Image from 'next/image'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media } from '@/payload-types'

type Side = {
  heading: string
  body?: string | null
  image?: Media | string | number | null
  href?: string | null
}

export type TwoUpProps = {
  headline?: string | null
  left: Side
  right: Side
}

function Pane({ side }: { side: Side }) {
  const img = mediaUrl(side.image, 'card')
  const inner = (
    <article className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] shadow-[4px_4px_0_var(--color-ink)] hover:-translate-y-1 transition-transform">
      {img && (
        <div className="relative aspect-[16/10] border-b-[3px] border-[var(--color-ink)]">
          <Image src={img} alt={mediaAlt(side.image)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-2xl md:text-3xl font-black">{side.heading}</h3>
        {side.body && <p className="mt-2">{side.body}</p>}
      </div>
    </article>
  )
  return side.href ? <Link href={side.href}>{inner}</Link> : inner
}

export function TwoUpRender({ headline, left, right }: TwoUpProps) {
  return (
    <section className="space-y-6">
      {headline && <h2 className="font-display text-3xl md:text-5xl font-black">{headline}</h2>}
      <div className="grid gap-6 md:grid-cols-2">
        <Pane side={left} />
        <Pane side={right} />
      </div>
    </section>
  )
}
