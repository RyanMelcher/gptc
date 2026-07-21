import { PaperPanel } from '@/components/paper/PaperPanel'
import { MarkerHeading } from '@/components/paper/MarkerHeading'
import { cn } from '@/lib/cn'

export type ColorProps = {
  headline: string
  body?: string | null
  color?: string | null
  align?: 'left' | 'center' | null
}

export function ColorRender({ headline, body, color = 'bolt', align = 'left' }: ColorProps) {
  const slug = color || 'bolt'
  return (
    <PaperPanel
      jitter={1}
      className={cn('py-16', align === 'center' && 'text-center')}
      style={{
        background: `var(--color-${slug}, var(--color-bolt))`,
        color: `var(--on-${slug}, var(--color-paper))`,
      }}
    >
      <MarkerHeading level={2} className="text-4xl md:text-6xl">
        {headline}
      </MarkerHeading>
      {body && <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{body}</p>}
    </PaperPanel>
  )
}
