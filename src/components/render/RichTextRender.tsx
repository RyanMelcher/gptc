import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RichTextProps = {
  content: SerializedEditorState
  color?: string | null
}

export function RichTextRender({ content, color }: RichTextProps) {
  const tint = color
    ? { background: `var(--color-${color})`, color: `var(--on-${color})` }
    : undefined
  return (
    <div className={color ? 'py-10' : undefined} style={tint}>
      <div className="prose prose-lg max-w-3xl mx-auto">
        <RichText data={content} />
      </div>
    </div>
  )
}
