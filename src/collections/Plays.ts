import type { CollectionConfig } from 'payload'
import { revalidate, detailPaths } from '../lib/revalidate'

export const Plays: CollectionConfig = {
  slug: 'plays',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'playwright', 'lifecycle', 'updatedAt'],
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      const secret = process.env.PREVIEW_SECRET || ''
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      return `${base}/api/preview?secret=${secret}&path=/plays/${encodeURIComponent(slug)}`
    },
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [({ doc, previousDoc }) => revalidate(detailPaths('/plays', doc, previousDoc))],
    afterDelete: [({ doc }) => revalidate(detailPaths('/plays', doc))],
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
    {
      name: 'playwright',
      type: 'relationship',
      relationTo: 'artists',
      required: true,
    },
    { name: 'synopsis', type: 'textarea' },
    { name: 'themes', type: 'array', fields: [{ name: 'value', type: 'text' }] },
    {
      name: 'lifecycle',
      type: 'select',
      required: true,
      defaultValue: 'in_development',
      options: [
        { label: 'In Development', value: 'in_development' },
        { label: 'Produced', value: 'produced' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'media',
      type: 'array',
      fields: [{ name: 'asset', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}
