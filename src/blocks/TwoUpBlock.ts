import type { Block } from 'payload'

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
  ],
}
