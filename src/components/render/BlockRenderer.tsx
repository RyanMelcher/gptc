import type { Page } from '@/payload-types'
import { HeroRender } from './HeroRender'
import { ColorRender } from './ColorRender'
import { RichTextRender } from './RichTextRender'

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
            return <RichTextRender key={block.id} content={block.content} />
          default:
            return null
        }
      })}
    </div>
  )
}
