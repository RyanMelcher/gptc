import type { Page } from '@/payload-types'
import { HeroRender } from './HeroRender'
import { ColorRender } from './ColorRender'
import { RichTextRender } from './RichTextRender'
import { TwoUpRender } from './TwoUpRender'
import { MediaRender } from './MediaRender'
import { CTARender } from './CTARender'
import { QuoteRender } from './QuoteRender'
import { EmbedRender } from './EmbedRender'
import { ImageTextRender } from './ImageTextRender'
import { ButtonGroupRender } from './ButtonGroupRender'
import { GalleryRender } from './GalleryRender'

type BlockUnion = NonNullable<Page['blocks']>[number]

export function BlockRenderer({ blocks }: { blocks?: BlockUnion[] | null }) {
  if (!blocks?.length) return null
  return (
    <div className="space-y-10">
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroRender key={block.id} {...block} />
          case 'color':
            return <ColorRender key={block.id} {...block} />
          case 'richText':
            return <RichTextRender key={block.id} content={block.content} color={block.color} />
          case 'twoUp':
            return <TwoUpRender key={block.id} {...block} />
          case 'media':
            return <MediaRender key={block.id} {...block} />
          case 'cta':
            return <CTARender key={block.id} {...block} />
          case 'quote':
            return <QuoteRender key={block.id} {...block} />
          case 'embed':
            return <EmbedRender key={block.id} {...block} />
          case 'imageText':
            return <ImageTextRender key={block.id} {...block} />
          case 'buttonGroup':
            return <ButtonGroupRender key={block.id} {...block} />
          case 'gallery':
            return <GalleryRender key={block.id} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
