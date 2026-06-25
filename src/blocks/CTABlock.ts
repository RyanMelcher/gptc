import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'magenta',
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
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
