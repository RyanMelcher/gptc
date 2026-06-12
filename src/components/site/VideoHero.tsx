import { BrutalButton } from '@/components/brutal/BrutalButton'
import { mediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

export type VideoHeroProps = {
  eyebrow?: string | null
  headline: string
  subhead?: string | null
  video?: Media | string | number | null
  poster?: Media | string | number | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
}

export function VideoHero({
  eyebrow,
  headline,
  subhead,
  video,
  poster,
  primaryCta,
  secondaryCta,
}: VideoHeroProps) {
  const vSrc = mediaUrl(video)
  const pSrc = mediaUrl(poster, 'hero')

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden border-b-[3px] border-[var(--color-ink)]">
      {vSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={pSrc ?? undefined}
        >
          <source src={vSrc} />
        </video>
      ) : pSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-ink)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24 text-[var(--color-paper)]">
          {eyebrow && (
            <p className="font-display uppercase tracking-widest text-sm mb-4 inline-block border-[2px] border-[var(--color-paper)] px-3 py-1">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.92] max-w-5xl">
            {headline}
          </h1>
          {subhead && (
            <p className="mt-6 text-lg md:text-2xl max-w-2xl">{subhead}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta?.label && primaryCta?.href && (
              <a href={primaryCta.href}>
                <BrutalButton variant="marigold">{primaryCta.label}</BrutalButton>
              </a>
            )}
            {secondaryCta?.label && secondaryCta?.href && (
              <a href={secondaryCta.href}>
                <BrutalButton variant="leaf">{secondaryCta.label}</BrutalButton>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
