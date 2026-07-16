import * as React from 'react'
import { cn } from '@/lib/cn'

type Level = 1 | 2 | 3

export type MarkerHeadingProps = {
  level?: Level
} & React.HTMLAttributes<HTMLHeadingElement>

export function MarkerHeading({
  level = 2,
  className,
  ...props
}: MarkerHeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag
      className={cn('font-marker leading-[0.95] tracking-normal', className)}
      {...props}
    />
  )
}
