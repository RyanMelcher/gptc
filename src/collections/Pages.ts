import type { CollectionConfig } from 'payload'
import {
  HeroBlock,
  ColorBlock,
  RichTextBlock,
  TwoUpBlock,
  MediaBlock,
  CTABlock,
  QuoteBlock,
  EmbedBlock,
} from '../blocks'
import { revalidate, pagesPaths } from '../lib/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      const secret = process.env.PREVIEW_SECRET || ''
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      return `${base}/api/preview?secret=${secret}&path=/${encodeURIComponent(slug)}`
    },
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidate(pagesPaths(doc, previousDoc))
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidate(pagesPaths(doc))
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path segment(s). Use "home" for the homepage.' },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [HeroBlock, ColorBlock, RichTextBlock, TwoUpBlock, MediaBlock, CTABlock, QuoteBlock, EmbedBlock],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
