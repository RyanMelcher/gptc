import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/cn'

export type ImageTextProps = {
  image?: Media | string | number | null
  content: SerializedEditorState
  imageSide?: 'left' | 'right' | null
  imageWidth?: 'third' | 'half' | null
  color?: string | null
}

export function ImageTextRender({
  image,
  content,
  imageSide = 'left',
  imageWidth = 'half',
  color,
}: ImageTextProps) {
  const img = mediaUrl(image, 'card')
  const tint = color ? { background: `var(--color-${color})`, color: `var(--on-${color})` } : undefined
  const imgCols = imageWidth === 'third' ? 'md:col-span-4' : 'md:col-span-6'
  const textCols = imageWidth === 'third' ? 'md:col-span-8' : 'md:col-span-6'
  return (
    <section className={cn('grid md:grid-cols-12 gap-8 items-center', color && 'p-8')} style={tint}>
      {img && (
        <div
          className={cn(
            'relative aspect-[4/3] border-[3px] border-[var(--color-ink)]',
            imgCols,
            imageSide === 'right' && 'md:order-2',
          )}
        >
          <Image src={img} alt={mediaAlt(image)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className={cn('prose prose-lg max-w-none', textCols)}>
        <RichText data={content} />
      </div>
    </section>
  )
}
