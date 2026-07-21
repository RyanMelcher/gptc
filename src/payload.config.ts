import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Artists } from './collections/Artists'
import { Plays } from './collections/Plays'
import { Productions } from './collections/Productions'
import { Events } from './collections/Events'
import { News } from './collections/News'
import { Subscribers } from './collections/Subscribers'
import { Site } from './globals/Site'
import { Homepage } from './globals/Homepage'
import { Theme } from './globals/Theme'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Origins allowed for CORS + CSRF. Payload rejects mutating admin requests whose
// Origin isn't listed here with "You are not allowed to do this action", so this
// must cover every host the browser can actually be on. We derive it from
// APP_DOMAIN (apex + www, which Traefik both serve) as well as the explicit
// NEXT_PUBLIC_SERVER_URL, so a mis-set public URL alone can't break the admin.
const publicURL = process.env.NEXT_PUBLIC_SERVER_URL?.trim() || ''
const appDomain = process.env.APP_DOMAIN?.trim() || ''
const allowedOrigins = [
  ...new Set(
    [
      publicURL,
      appDomain && `https://${appDomain}`,
      appDomain && `https://www.${appDomain}`,
    ].filter(Boolean) as string[],
  ),
]
const serverURL = publicURL || (appDomain ? `https://${appDomain}` : undefined)

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { title: 'GPTC Plays Admin' },
  },
  collections: [Users, Media, Pages, Artists, Plays, Productions, Events, News, Subscribers],
  globals: [Site, Homepage, Theme],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  sharp,
  cors: allowedOrigins,
  csrf: allowedOrigins,
})
