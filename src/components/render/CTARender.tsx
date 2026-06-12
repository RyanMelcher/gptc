import { Block as BrutalBlock } from '@/components/brutal/Block'
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

export type CTARenderProps = {
  headline: string
  body?: string | null
  tone?: Tone | null
  cta: { label: string; href: string }
}

export function CTARender({ headline, body, tone = 'magenta', cta }: CTARenderProps) {
  return (
    <BrutalBlock
      className={cn(
        'shadow-[8px_8px_0_var(--color-ink)] flex flex-col md:flex-row md:items-center md:justify-between gap-6',
        toneClass[tone ?? 'magenta'],
      )}
    >
      <div>
        <h2 className="font-display text-3xl md:text-5xl font-black">{headline}</h2>
        {body && <p className="mt-3 text-lg max-w-xl">{body}</p>}
      </div>
      <a href={cta.href} className="shrink-0">
        <BrutalButton variant="ink">{cta.label}</BrutalButton>
      </a>
    </BrutalBlock>
  )
}
