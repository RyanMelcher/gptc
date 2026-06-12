import type { GlobalConfig } from 'payload'
import { revalidate } from '../lib/revalidate'

export const Site: GlobalConfig = {
  slug: 'site',
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidate(['/'])],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'logoText',
              type: 'text',
              defaultValue: 'GPTC',
            },
            {
              name: 'navLinks',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'statusPills',
              type: 'array',
              labels: { singular: 'Pill', plural: 'Pills' },
              admin: { description: 'Small status bar above the nav (e.g. "Festival 2026 — May 24").' },
              fields: [
                { name: 'label', type: 'text', required: true },
                {
                  name: 'tone',
                  type: 'select',
                  defaultValue: 'ink',
                  options: [
                    { label: 'Ink', value: 'ink' },
                    { label: 'Bolt', value: 'bolt' },
                    { label: 'Leaf', value: 'leaf' },
                    { label: 'Marigold', value: 'marigold' },
                    { label: 'Magenta', value: 'magenta' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'What\'s On',
          fields: [
            {
              name: 'whatsOn',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Card', plural: 'Cards' },
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Now Playing", "Upcoming"' } },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'href', type: 'text', required: true },
                {
                  name: 'tone',
                  type: 'select',
                  defaultValue: 'paper',
                  options: [
                    { label: 'Paper', value: 'paper' },
                    { label: 'Marigold', value: 'marigold' },
                    { label: 'Leaf', value: 'leaf' },
                    { label: 'Bolt', value: 'bolt' },
                    { label: 'Magenta', value: 'magenta' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerColumns',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                },
                { name: 'href', type: 'text', required: true },
              ],
            },
            { name: 'tagline', type: 'text', defaultValue: 'New plays. New voices. Great Plains.' },
          ],
        },
      ],
    },
  ],
}
