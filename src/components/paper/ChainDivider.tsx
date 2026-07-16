import * as React from 'react'
import { cn } from '@/lib/cn'

const CHAIN_COLORS = [
  'var(--color-magenta)',
  'var(--color-marigold)',
  'var(--color-bolt)',
  'var(--color-leaf)',
  'var(--color-cobalt)',
  'var(--color-periwinkle)',
]

export type ChainDividerProps = {
  links?: number
  className?: string
}

// A construction-paper chain: thick pill-shaped loops that overlap and tilt
// alternately, so they read as interlocking paper links rather than flat rings.
export function ChainDivider({ links = 8, className }: ChainDividerProps) {
  const w = 46 // link width
  const h = 74 // link height (portrait loops)
  const step = w * 0.62 // horizontal advance; overlap makes them interlock
  const cy = 52
  const padX = 10
  const width = padX * 2 + (links - 1) * step + w
  const height = 104

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox={`0 0 ${width} ${height}`}
      className={cn('h-14 w-full', className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {Array.from({ length: links }).map((_, i) => {
        const cx = padX + w / 2 + i * step
        const tilt = i % 2 === 0 ? -9 : 9
        return (
          <rect
            key={i}
            data-chain-link
            x={cx - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
            rx={w / 2}
            fill="none"
            stroke={CHAIN_COLORS[i % CHAIN_COLORS.length]}
            strokeWidth={12}
            transform={`rotate(${tilt} ${cx} ${cy})`}
          />
        )
      })}
    </svg>
  )
}
