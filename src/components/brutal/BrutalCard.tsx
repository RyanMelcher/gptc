import * as React from 'react'
import { cn } from '@/lib/cn'

export function BrutalCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] p-6',
        'shadow-[4px_4px_0_var(--color-ink)] hover:-rotate-1 transition-transform',
        className,
      )}
      {...props}
    />
  )
}
