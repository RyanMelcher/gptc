import Image from 'next/image'
import { cn } from '@/lib/cn'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media } from '@/payload-types'

type Tier = 'lead' | 'sponsor' | 'individual'

export type Sponsor = {
  id?: string | null
  name: string
  logo?: Media | string | number | null
  href?: string | null
  tier?: Tier | null
}

export type SponsorsStripProps = {
  heading?: string | null
  subheading?: string | null
  items?: Sponsor[] | null
}

const TIER_ORDER: Tier[] = ['lead', 'sponsor', 'individual']

export function SponsorsStrip({ heading, subheading, items }: SponsorsStripProps) {
  if (!items?.length) return null

  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    list: items.filter((s) => (s.tier ?? 'sponsor') === tier),
  })).filter((g) => g.list.length > 0)

  return (
    <section className="bg-[var(--color-butter)] border-y-[3px] border-[var(--color-ink)] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {heading && (
          <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-center max-w-4xl mx-auto leading-tight">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="mt-3 text-center text-base md:text-lg max-w-3xl mx-auto">
            {subheading}
          </p>
        )}

        <div className="mt-10 space-y-10">
          {byTier.map(({ tier, list }) => (
            <SponsorRow key={tier} tier={tier} list={list} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SponsorRow({ tier, list }: { tier: Tier; list: Sponsor[] }) {
  const sizing = 'w-32 h-12 sm:w-40 sm:h-16 md:w-48 md:h-20'
  return (
    <div>
      <p className="font-display uppercase tracking-widest text-xs text-center mb-5 text-[var(--color-ink)]/70">
        {tier === 'lead' ? 'Lead Support' : tier === 'sponsor' ? 'Sponsors' : 'Individual Supporters'}
      </p>
      <ul
        className={cn(
          'flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6',
          tier === 'individual' && 'gap-x-4 gap-y-2 md:gap-x-6',
        )}
      >
        {list.map((s, i) => (
          <li key={s.id ?? `${tier}-${i}`}>
            <SponsorMark sponsor={s} sizing={sizing} tier={tier} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function SponsorMark({ sponsor, sizing, tier }: { sponsor: Sponsor; sizing: string; tier: Tier }) {
  const url = mediaUrl(sponsor.logo, 'card')
  const alt = mediaAlt(sponsor.logo) || sponsor.name

  const content =
    url && tier !== 'individual' ? (
      <div className={cn('relative', sizing)}>
        <Image src={url} alt={alt} fill className="object-contain" sizes="(min-width: 768px) 192px, (min-width: 640px) 160px, 128px" />
      </div>
    ) : (
      <span
        className={cn(
          tier === 'individual'
            ? 'font-body text-base md:text-lg'
            : 'font-display uppercase tracking-wide text-lg md:text-xl font-bold',
        )}
      >
        {sponsor.name}
      </span>
    )

  if (sponsor.href) {
    return (
      <a
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    )
  }
  return <span className="inline-flex items-center">{content}</span>
}
