import Image from 'next/image'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/cn'

type Item = { id?: string | null; image?: Media | string | number | null; caption?: string | null }

export type GalleryProps = {
  layout?: 'grid' | 'masonry' | null
  columns?: '2' | '3' | '4' | null
  items?: Item[] | null
}

const gridCols: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 md:grid-cols-3',
  '4': 'sm:grid-cols-2 md:grid-cols-4',
}

const masonryCols: Record<string, string> = {
  '2': 'sm:columns-2',
  '3': 'sm:columns-2 md:columns-3',
  '4': 'sm:columns-2 md:columns-4',
}

export function GalleryRender({ layout = 'grid', columns = '3', items }: GalleryProps) {
  if (!items?.length) return null
  const col = columns ?? '3'
  const masonry = layout === 'masonry'
  return (
    <div
      className={cn(
        masonry
          ? `columns-1 ${masonryCols[col]} gap-4 [&>*]:mb-4`
          : `grid grid-cols-1 ${gridCols[col]} gap-4`,
      )}
    >
      {items.map((it, i) => {
        const img = mediaUrl(it.image, 'card')
        if (!img) return null
        return (
          <figure key={it.id ?? i} className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]">
            <div className={cn('relative', masonry ? '' : 'aspect-[4/3]')}>
              {masonry ? (
                <Image
                  src={img}
                  alt={mediaAlt(it.image)}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-auto object-cover"
                />
              ) : (
                <Image src={img} alt={mediaAlt(it.image)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              )}
            </div>
            {it.caption && <figcaption className="p-3 text-sm">{it.caption}</figcaption>}
          </figure>
        )
      })}
    </div>
  )
}
