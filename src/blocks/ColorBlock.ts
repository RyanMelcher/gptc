import type { Block } from 'payload'

export const ColorBlock: Block = {
  slug: 'color',
  labels: { singular: 'Color Panel', plural: 'Color Panels' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'color',
      type: 'select',
      defaultValue: 'bolt',
      options: [
        { label: 'Bolt', value: 'bolt' },
        { label: 'Leaf', value: 'leaf' },
        { label: 'Marigold', value: 'marigold' },
        { label: 'Magenta', value: 'magenta' },
        { label: 'Ink', value: 'ink' },
      ],
    },
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
