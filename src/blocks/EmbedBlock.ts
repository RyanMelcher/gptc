import type { Block } from 'payload'

export const EmbedBlock: Block = {
  slug: 'embed',
  labels: { singular: 'Embed', plural: 'Embeds' },
  fields: [
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Iframe (raw URL)', value: 'iframe' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'YouTube/Vimeo URL or any iframe-safe URL.' },
    },
    { name: 'aspect', type: 'select', defaultValue: '16x9', options: [
      { label: '16:9', value: '16x9' },
      { label: '4:3', value: '4x3' },
      { label: '1:1', value: '1x1' },
    ] },
    { name: 'caption', type: 'text' },
  ],
}
