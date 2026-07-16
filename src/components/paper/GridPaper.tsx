import * as React from 'react'
import { cn } from '@/lib/cn'

export function GridPaper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // Inset content past the red margin rule (--paper-grid-margin), like a
      // real notebook page. Avoid overriding with a plain `p-*` on the consumer;
      // use py-*/pr-* so this left inset survives.
      className={cn(
        'paper-grid pl-[calc(var(--paper-grid-margin)+1rem)] py-6 pr-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
