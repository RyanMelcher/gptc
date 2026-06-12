import type { CollectionConfig } from 'payload'
import { revalidate, detailPaths } from '../lib/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startsAt', 'updatedAt'],
  },
  hooks: {
    afterChange: [({ doc, previousDoc }) => revalidate(detailPaths('/events', doc, previousDoc))],
    afterDelete: [({ doc }) => revalidate(detailPaths('/events', doc))],
  },
  access: {
    read: () => true,
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
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'other',
      options: [
        { label: 'Reading', value: 'reading' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Festival', value: 'festival' },
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'startsAt', type: 'date', required: true, index: true },
    { name: 'endsAt', type: 'date' },
    { name: 'venue', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'ticketURL', type: 'text' },
    { name: 'hero', type: 'upload', relationTo: 'media' },
  ],
}
