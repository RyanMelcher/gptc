import * as React from 'react'
import { cn } from '@/lib/cn'

export function BrutalCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'paper-texture border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] p-6',
        'shadow-brutal hover:-rotate-1 transition-transform',
        className,
      )}
      {...props}
    />
  )
}
