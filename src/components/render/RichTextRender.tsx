import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RichTextProps = {
  content: SerializedEditorState
}

export function RichTextRender({ content }: RichTextProps) {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto">
      <RichText data={content} />
    </div>
  )
}
