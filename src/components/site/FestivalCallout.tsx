import { BrutalButton } from '@/components/brutal/BrutalButton'
import { cn } from '@/lib/cn'

type Tone = 'bolt' | 'leaf' | 'marigold' | 'magenta' | 'ink'

const toneClass: Record<Tone, string> = {
  bolt: 'bg-[var(--color-bolt)] text-[var(--color-paper)]',
  leaf: 'bg-[var(--color-leaf)] text-[var(--color-ink)]',
  marigold: 'bg-[var(--color-marigold)] text-[var(--color-ink)]',
  magenta: 'bg-[var(--color-magenta)] text-[var(--color-paper)]',
  ink: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
}

export type FestivalCalloutProps = {
  eyebrow?: string | null
  headline?: string | null
  body?: string | null
  tone?: Tone | null
  cta?: { label?: string | null; href?: string | null } | null
}

export function FestivalCallout({ eyebrow, headline, body, tone = 'magenta', cta }: FestivalCalloutProps) {
  if (!headline && !body) return null
  return (
    <section
      className={cn(
        'border-b-[3px] border-[var(--color-ink)] py-20',
        toneClass[tone ?? 'magenta'],
      )}
    >
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-[2fr_1fr] items-end">
        <div>
          {eyebrow && (
            <p className="font-display uppercase tracking-widest text-sm mb-4">{eyebrow}</p>
          )}
          {headline && (
            <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.95]">
              {headline}
            </h2>
          )}
          {body && <p className="mt-6 text-lg md:text-xl max-w-2xl">{body}</p>}
        </div>
        {cta?.label && cta?.href && (
          <div className="md:justify-self-end">
            <a href={cta.href}>
              <BrutalButton variant="ink">{cta.label}</BrutalButton>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
