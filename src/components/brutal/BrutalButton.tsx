import * as React from 'react'
import { cn } from '@/lib/cn'

type Variant =
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

const palette: Record<Variant, string> = {
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

export const BrutalButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function BrutalButton({ className, variant = 'bolt', ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-5 py-3 font-[var(--font-display)] uppercase tracking-wider',
        'border-[3px] border-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)]',
        'transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-ink)]',
        palette[variant],
        className,
      )}
      {...props}
    />
  )
})
