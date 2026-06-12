import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'confirmedAt', 'unsubscribedAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    { name: 'source', type: 'text', defaultValue: 'site' },
    { name: 'token', type: 'text', required: true, index: true },
    { name: 'confirmedAt', type: 'date' },
    { name: 'unsubscribedAt', type: 'date' },
  ],
}
