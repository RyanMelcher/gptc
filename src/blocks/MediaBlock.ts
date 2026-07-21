import type { Block } from 'payload'
import { colorField } from '../fields/colorField'

export const MediaBlock: Block = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  fields: [
    { name: 'asset', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Inset', value: 'inset' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full Bleed', value: 'full' },
      ],
    },
    colorField('color', { admin: { description: 'Optional caption/background tint.' } }),
  ],
}
