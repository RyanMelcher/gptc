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
        { label: 'Bolt', value: 'bolt' },
        { label: 'Leaf', value: 'leaf' },
        { label: 'Magenta', value: 'magenta' },
        { label: 'Paper', value: 'paper' },
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
