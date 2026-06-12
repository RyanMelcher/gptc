import type { CollectionConfig } from 'payload'
import { revalidate, detailPaths } from '../lib/revalidate'

export const Artists: CollectionConfig = {
  slug: 'artists',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'roles', 'featured', 'updatedAt'],
  },
  hooks: {
    afterChange: [({ doc, previousDoc }) => revalidate(detailPaths('/artists', doc, previousDoc))],
    afterDelete: [({ doc }) => revalidate(detailPaths('/artists', doc))],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Playwright', value: 'playwright' },
        { label: 'Director', value: 'director' },
        { label: 'Actor', value: 'actor' },
        { label: 'Staff', value: 'staff' },
      ],
    },
    { name: 'bio', type: 'richText' },
    { name: 'headshot', type: 'upload', relationTo: 'media' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
