import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { colorField } from '../fields/colorField'

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: { singular: 'Image + Text', plural: 'Image + Text' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'imageWidth',
      type: 'select',
      defaultValue: 'half',
      options: [
        { label: 'One third', value: 'third' },
        { label: 'Half', value: 'half' },
      ],
    },
    colorField('color', { admin: { description: 'Optional background tint.' } }),
  ],
}
