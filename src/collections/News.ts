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
import { revalidate, detailPaths } from '../lib/revalidate'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'],
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      const secret = process.env.PREVIEW_SECRET || ''
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      return `${base}/api/preview?secret=${secret}&path=/news/${encodeURIComponent(slug)}`
    },
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [({ doc, previousDoc }) => revalidate(detailPaths('/news', doc, previousDoc))],
    afterDelete: [({ doc }) => revalidate(detailPaths('/news', doc))],
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
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'hero', type: 'upload', relationTo: 'media' },
    { name: 'publishedAt', type: 'date', index: true },
    { name: 'tags', type: 'array', fields: [{ name: 'value', type: 'text' }] },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [HeroBlock, ColorBlock, RichTextBlock, TwoUpBlock, MediaBlock, CTABlock, QuoteBlock, EmbedBlock],
    },
  ],
}
