import type { Block } from 'payload'
import { colorField } from '../fields/colorField'

export const ButtonGroupBlock: Block = {
  slug: 'buttonGroup',
  labels: { singular: 'Button Group', plural: 'Button Groups' },
  fields: [
    {
      name: 'align',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        colorField('color', { defaultValue: 'ink' }),
        {
          name: 'style',
          type: 'select',
          defaultValue: 'solid',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
  ],
}
