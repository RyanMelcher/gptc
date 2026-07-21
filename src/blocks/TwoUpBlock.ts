import type { Block } from 'payload'
import { colorField } from '../fields/colorField'

export const TwoUpBlock: Block = {
  slug: 'twoUp',
  labels: { singular: 'Two-Up', plural: 'Two-Ups' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'left',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'right',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'href', type: 'text' },
      ],
    },
    colorField('color', { admin: { description: 'Optional background tint.' } }),
  ],
}
