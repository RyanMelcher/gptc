import type { CollectionConfig } from 'payload'

export const Plays: CollectionConfig = {
  slug: 'plays',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'playwright', 'lifecycle', 'updatedAt'],
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 25,
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
