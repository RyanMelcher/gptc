import * as React from 'react'
import { cn } from '@/lib/cn'

type Variant = 'bolt' | 'leaf' | 'marigold' | 'magenta' | 'ink'

const palette: Record<Variant, string> = {
  bolt: 'bg-[var(--color-bolt)] text-[var(--color-paper)]',
  leaf: 'bg-[var(--color-leaf)] text-[var(--color-ink)]',
  marigold: 'bg-[var(--color-marigold)] text-[var(--color-ink)]',
  magenta: 'bg-[var(--color-magenta)] text-[var(--color-paper)]',
  ink: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
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
