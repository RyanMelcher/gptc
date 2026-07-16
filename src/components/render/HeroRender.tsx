import { PaperPanel } from '@/components/paper/PaperPanel'
import { MarkerHeading } from '@/components/paper/MarkerHeading'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { cn } from '@/lib/cn'

type Bg =
  | 'marigold'
  | 'bolt'
  | 'leaf'
  | 'magenta'
  | 'paper'
  | 'sage'
  | 'mint'
  | 'sky'
  | 'periwinkle'
  | 'butter'

export type HeroProps = {
  eyebrow?: string | null
  headline: string
  subhead?: string | null
  background?: Bg | null
  cta?: { label?: string | null; href?: string | null } | null
}

const bgClass: Record<Bg, string> = {
  marigold: 'bg-[var(--color-marigold)]',
  bolt: 'bg-[var(--color-bolt)] text-[var(--color-paper)]',
  leaf: 'bg-[var(--color-leaf)] text-[var(--color-paper)]',
  magenta: 'bg-[var(--color-magenta)] text-[var(--color-paper)]',
  paper: 'bg-[var(--color-paper)]',
  sage: 'bg-[var(--color-sage)]',
  mint: 'bg-[var(--color-mint)]',
  sky: 'bg-[var(--color-sky)]',
  periwinkle: 'bg-[var(--color-periwinkle)]',
  butter: 'bg-[var(--color-butter)]',
}

export function HeroRender({ eyebrow, headline, subhead, background = 'marigold', cta }: HeroProps) {
  return (
    <PaperPanel torn jitter={-1} className={cn(bgClass[background ?? 'marigold'])}>
      {eyebrow && (
        <p className="font-marker uppercase tracking-widest text-sm">{eyebrow}</p>
      )}
      <MarkerHeading level={1} className="text-5xl md:text-7xl mt-2">
        {headline}
      </MarkerHeading>
      {subhead && <p className="mt-4 text-lg md:text-xl max-w-2xl">{subhead}</p>}
      {cta?.label && cta?.href && (
        <a href={cta.href} className="inline-block mt-6">
          <BrutalButton variant="ink">{cta.label}</BrutalButton>
        </a>
      )}
    </PaperPanel>
  )
}
