import Image from 'next/image'
import { cn } from '@/lib/cn'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media } from '@/payload-types'

export type MediaRenderProps = {
  asset: Media | string | number
  caption?: string | null
  size?: 'inset' | 'wide' | 'full' | null
}

const sizeClass: Record<'inset' | 'wide' | 'full', string> = {
  inset: 'max-w-3xl mx-auto',
  wide: 'max-w-5xl mx-auto',
  full: 'w-full',
}

export function MediaRender({ asset, caption, size = 'wide' }: MediaRenderProps) {
  const src = mediaUrl(asset, size === 'full' ? 'hero' : 'card')
  if (!src) return null
  const isVideo = typeof asset === 'object' && asset.mimeType?.startsWith('video/')

  return (
    <figure className={cn(sizeClass[size ?? 'wide'], 'space-y-3')}>
      <div className="border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] overflow-hidden">
        {isVideo ? (
          <video src={src} controls className="w-full" />
        ) : (
          <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
            <Image src={src} alt={mediaAlt(asset)} fill sizes="100vw" className="object-cover" />
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="font-display uppercase tracking-widest text-xs text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
