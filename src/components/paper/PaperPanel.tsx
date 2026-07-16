import * as React from 'react'
import { cn } from '@/lib/cn'

export type PaperPanelProps = {
  as?: React.ElementType
  /** small rotation for hand-placed collage feel; degrees */
  jitter?: number
  /** render a torn top edge */
  torn?: boolean
} & React.HTMLAttributes<HTMLElement>

export function PaperPanel({
  as: Tag = 'section',
  jitter = 0,
  torn = false,
  className,
  style,
  children,
  ...props
}: PaperPanelProps) {
  return (
    <Tag
      className={cn(
        'relative paper-texture border-[3px] border-[var(--color-ink)] p-8',
        'shadow-brutal-lg',
        // A straight top border would show through the ragged notches of the
        // torn edge, so drop it and let the torn span be the only top treatment.
        torn && 'border-t-0',
        className,
      )}
      style={{ rotate: jitter ? `${jitter}deg` : undefined, ...style }}
      {...props}
    >
      {torn && (
        <span
          data-torn-edge
          aria-hidden
          className="pointer-events-none absolute -top-3 left-0 right-0 h-3"
          style={{
            background: 'inherit',
            clipPath:
              'polygon(0 100%, 4% 20%, 8% 90%, 14% 15%, 20% 85%, 27% 25%, 34% 95%, 41% 20%, 48% 80%, 55% 15%, 62% 90%, 69% 25%, 76% 85%, 83% 20%, 90% 95%, 96% 30%, 100% 100%)',
          }}
        />
      )}
      {children}
    </Tag>
  )
}
