import { Block as BrutalBlock } from '@/components/brutal/Block'
import { cn } from '@/lib/cn'

type Color =
  | 'bolt'
  | 'leaf'
  | 'marigold'
  | 'magenta'
  | 'ink'
  | 'sage'
  | 'mint'
  | 'sky'
  | 'periwinkle'
  | 'butter'

export type ColorProps = {
  headline: string
  body?: string | null
  color?: Color | null
  align?: 'left' | 'center' | null
}

const palette: Record<Color, string> = {
  bolt: 'bg-[var(--color-bolt)] text-[var(--color-paper)]',
  leaf: 'bg-[var(--color-leaf)] text-[var(--color-paper)]',
  marigold: 'bg-[var(--color-marigold)] text-[var(--color-ink)]',
  magenta: 'bg-[var(--color-magenta)] text-[var(--color-paper)]',
  ink: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
  sage: 'bg-[var(--color-sage)] text-[var(--color-ink)]',
  mint: 'bg-[var(--color-mint)] text-[var(--color-ink)]',
  sky: 'bg-[var(--color-sky)] text-[var(--color-ink)]',
  periwinkle: 'bg-[var(--color-periwinkle)] text-[var(--color-ink)]',
  butter: 'bg-[var(--color-butter)] text-[var(--color-ink)]',
}

export function ColorRender({ headline, body, color = 'bolt', align = 'left' }: ColorProps) {
  return (
    <BrutalBlock
      className={cn(
        'shadow-[8px_8px_0_var(--color-ink)] py-16',
        palette[color ?? 'bolt'],
        align === 'center' && 'text-center',
      )}
    >
      <h2 className="text-4xl md:text-6xl font-black">{headline}</h2>
      {body && <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{body}</p>}
    </BrutalBlock>
  )
}
