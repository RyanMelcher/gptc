import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'subhead', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'marigold',
      options: [
        { label: 'Marigold', value: 'marigold' },
        { label: 'Bolt (Teal)', value: 'bolt' },
        { label: 'Leaf (Olive)', value: 'leaf' },
        { label: 'Magenta', value: 'magenta' },
        { label: 'Paper', value: 'paper' },
        { label: 'Sage', value: 'sage' },
        { label: 'Mint', value: 'mint' },
        { label: 'Sky', value: 'sky' },
        { label: 'Periwinkle', value: 'periwinkle' },
        { label: 'Butter', value: 'butter' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
