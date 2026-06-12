import * as React from 'react'
import { cn } from '@/lib/cn'

export function Block({
  as: Tag = 'section',
  className,
  ...props
}: { as?: React.ElementType } & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn('border-[3px] border-[var(--color-ink)] p-8', className)}
      {...props}
    />
  )
}
