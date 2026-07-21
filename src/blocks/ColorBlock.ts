import type { Block } from 'payload'
import { colorField } from '../fields/colorField'

export const ColorBlock: Block = {
  slug: 'color',
  labels: { singular: 'Color Panel', plural: 'Color Panels' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    colorField('color', { defaultValue: 'bolt' }),
    {
      name: 'align',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
  ],
}
