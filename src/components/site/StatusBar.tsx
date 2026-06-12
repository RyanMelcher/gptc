import { cn } from '@/lib/cn'

type Tone = 'ink' | 'bolt' | 'leaf' | 'marigold' | 'magenta'

const toneClass: Record<Tone, string> = {
  ink: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
  bolt: 'bg-[var(--color-bolt)] text-[var(--color-paper)]',
  leaf: 'bg-[var(--color-leaf)] text-[var(--color-ink)]',
  marigold: 'bg-[var(--color-marigold)] text-[var(--color-ink)]',
  magenta: 'bg-[var(--color-magenta)] text-[var(--color-paper)]',
}

type Pill = { id?: string | null; label: string; tone?: Tone | null }

export function StatusBar({ pills }: { pills?: Pill[] | null }) {
  if (!pills?.length) return null
  return (
    <div className="border-b-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-2 px-6 py-2 text-xs uppercase tracking-widest font-display">
        {pills.map((p, i) => (
          <span
            key={p.id ?? i}
            className={cn('px-3 py-1 border-[2px] border-[var(--color-ink)]', toneClass[p.tone ?? 'ink'])}
          >
            {p.label}
          </span>
        ))}
      </div>
    </div>
  )
}
