import * as React from 'react'
import { cn } from '@/lib/cn'

export type PhotoCutoutProps = {
  src: string
  alt: string
  /** outline glow color token, e.g. var(--color-bolt) */
  glow?: string
} & React.HTMLAttributes<HTMLSpanElement>

export function PhotoCutout({
  src,
  alt,
  glow = 'var(--color-bolt)',
  className,
  style,
  ...props
}: PhotoCutoutProps) {
  return (
    <span
      data-cutout
      className={cn('inline-block', className)}
      style={{ filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 2px ${glow})`, ...style }}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block max-w-full" />
    </span>
  )
}
