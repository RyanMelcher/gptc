import type { GlobalConfig } from 'payload'
import { revalidate } from '../lib/revalidate'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidate(['/'])],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text', required: true, defaultValue: 'New plays. New voices. Great Plains.' },
        { name: 'subhead', type: 'textarea' },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Looping background video (mp4 or webm). Muted, autoplay.' },
        },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Fallback image while video loads or if video missing.' },
        },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Plan Your Visit' },
            { name: 'href', type: 'text', defaultValue: '/visit' },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: "See What's On" },
            { name: 'href', type: 'text', defaultValue: '/events' },
          ],
        },
      ],
    },
    {
      name: 'upcomingShow',
      type: 'group',
      admin: { description: 'Card highlighting the next show. Pulls title, date, venue, ticket link from the linked event.' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Upcoming Show' },
        { name: 'event', type: 'relationship', relationTo: 'events' },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Poster image. Falls back to the event hero if empty.' },
        },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Get Tickets' },
      ],
    },
    {
      name: 'featuredPlay',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Featured Play' },
        { name: 'play', type: 'relationship', relationTo: 'plays' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'callout',
      type: 'group',
      admin: { description: 'Full-bleed color block (e.g. festival announcement).' },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text' },
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
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
  ],
}
