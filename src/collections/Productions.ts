import type { CollectionConfig } from 'payload'

export const Productions: CollectionConfig = {
  slug: 'productions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'play', 'season', 'updatedAt'],
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
    { name: 'play', type: 'relationship', relationTo: 'plays', required: true },
    { name: 'season', type: 'text', admin: { description: 'e.g. "2026 Festival"' } },
    { name: 'year', type: 'number', index: true },
    { name: 'venue', type: 'text' },
    { name: 'director', type: 'relationship', relationTo: 'artists' },
    { name: 'cast', type: 'relationship', relationTo: 'artists', hasMany: true },
    { name: 'startsOn', type: 'date' },
    { name: 'endsOn', type: 'date' },
    {
      name: 'photos',
      type: 'array',
      fields: [{ name: 'asset', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'program', type: 'upload', relationTo: 'media' },
    { name: 'ticketURL', type: 'text' },
  ],
}
