import { cn } from '@/lib/cn'

type Kind = 'youtube' | 'vimeo' | 'iframe'
type Aspect = '16x9' | '4x3' | '1x1'

export type EmbedRenderProps = {
  kind: Kind
  url: string
  aspect?: Aspect | null
  caption?: string | null
}

const aspectClass: Record<Aspect, string> = {
  '16x9': 'aspect-video',
  '4x3': 'aspect-[4/3]',
  '1x1': 'aspect-square',
}

function toEmbedSrc(kind: Kind, raw: string): string | null {
  try {
    const u = new URL(raw)
    if (kind === 'youtube') {
      const id =
        u.searchParams.get('v') ||
        u.pathname.replace(/^\//, '').split('/').filter(Boolean).pop()
      return id ? `https://www.youtube.com/embed/${id}` : raw
    }
    if (kind === 'vimeo') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : raw
    }
    return raw
  } catch {
    return null
  }
}

export function EmbedRender({ kind, url, aspect = '16x9', caption }: EmbedRenderProps) {
  const src = toEmbedSrc(kind, url)
  if (!src) return null
  return (
    <figure className="max-w-5xl mx-auto space-y-3">
      <div
        className={cn(
          'border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] overflow-hidden bg-[var(--color-ink)]',
          aspectClass[aspect ?? '16x9'],
        )}
      >
        <iframe
          src={src}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="font-display uppercase tracking-widest text-xs text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
