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
        { label: 'Bolt (Teal)', value: 'bolt' },
        { label: 'Leaf (Olive)', value: 'leaf' },
        { label: 'Marigold', value: 'marigold' },
        { label: 'Magenta', value: 'magenta' },
        { label: 'Ink', value: 'ink' },
        { label: 'Sage', value: 'sage' },
        { label: 'Mint', value: 'mint' },
        { label: 'Sky', value: 'sky' },
        { label: 'Periwinkle', value: 'periwinkle' },
        { label: 'Butter', value: 'butter' },
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
