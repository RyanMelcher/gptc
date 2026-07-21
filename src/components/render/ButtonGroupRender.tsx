import Link from 'next/link'
import { cn } from '@/lib/cn'

type Item = {
  id?: string | null
  label: string
  href: string
  color?: string | null
  style?: 'solid' | 'outline' | null
}

export type ButtonGroupProps = {
  align?: 'left' | 'center' | null
  items?: Item[] | null
}

export function ButtonGroupRender({ align = 'left', items }: ButtonGroupProps) {
  if (!items?.length) return null
  return (
    <div className={cn('flex flex-wrap gap-4', align === 'center' && 'justify-center')}>
      {items.map((it, i) => {
        const slug = it.color || 'ink'
        const solid = (it.style ?? 'solid') === 'solid'
        const style = solid
          ? { background: `var(--color-${slug})`, color: `var(--on-${slug})`, borderColor: `var(--color-${slug})` }
          : { background: 'transparent', color: 'var(--color-ink)', borderColor: `var(--color-${slug})` }
        return (
          <Link
            key={it.id ?? i}
            href={it.href}
            style={style}
            className="inline-flex items-center px-6 py-3 border-[3px] font-display uppercase text-sm tracking-widest shadow-brutal hover:-translate-y-0.5 transition-transform"
          >
            {it.label}
          </Link>
        )
      })}
    </div>
  )
}
