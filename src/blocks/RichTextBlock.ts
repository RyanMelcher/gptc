import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { colorField } from '../fields/colorField'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    colorField('color', { admin: { description: 'Optional background tint for this section.' } }),
  ],
}
