# GPTCplays Phase 1 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a working Next.js 16 + Payload 3 + Postgres app with brutalist theme baseline, Users + Media collections, dev Docker for Postgres, and a healthcheck. End state: `pnpm dev` runs, admin can log in at `/admin`, themed shell renders at `/`, media uploads persist to a Docker volume.

**Architecture:** Single Next 16 App Router app with Payload 3 mounted at `/admin` + `/api`. Postgres runs in Docker for dev. Media stored on local filesystem under `/app/media` (volume in prod). Tailwind 4 with CSS custom properties for the Stripe-derived brutalist palette. shadcn primitives re-themed; Framer Motion installed but not yet wired.

**Tech Stack:** Next.js 16, Payload 3, TypeScript, Postgres 16, pnpm, Tailwind 4, shadcn/ui, Framer Motion, Vitest, Playwright (smoke), Docker.

**Spec reference:** `contexts/2026-06-11-gptcplays-init-design.md`

---

## File Structure (Phase 1)

```
gptcplays.com/
├── .dockerignore
├── .env.example
├── .gitignore
├── .nvmrc
├── README.md
├── docker-compose.dev.yml          # dev Postgres only
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts              # only if Tailwind 4 needs config; otherwise CSS-only
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── public/
│   └── favicon.ico
├── media/                          # gitignored, mounted in compose
├── src/
│   ├── payload.config.ts
│   ├── payload-types.ts            # generated
│   ├── app/
│   │   ├── (payload)/              # Payload admin route group (from template)
│   │   │   ├── admin/[[...segments]]/page.tsx
│   │   │   ├── admin/[[...segments]]/not-found.tsx
│   │   │   ├── api/[...slug]/route.ts
│   │   │   ├── api/graphql/route.ts
│   │   │   ├── api/graphql-playground/route.ts
│   │   │   ├── custom.scss
│   │   │   └── layout.tsx
│   │   ├── (site)/                 # public frontend
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   └── api/
│   │       └── health/route.ts
│   ├── collections/
│   │   ├── Users.ts
│   │   └── Media.ts
│   ├── components/
│   │   └── brutal/
│   │       ├── Block.tsx
│   │       ├── BrutalButton.tsx
│   │       └── BrutalCard.tsx
│   ├── lib/
│   │   └── env.ts                  # runtime env validation
│   └── styles/
│       └── theme.css               # CSS vars for palette + typography
└── tests/
    ├── unit/
    │   └── env.test.ts
    └── smoke/
        └── admin.spec.ts
```

**Boundaries:**
- `src/payload.config.ts` is the single Payload entry — collection imports flow into it.
- Each collection file owns one collection; no cross-imports between collection files.
- `src/components/brutal/` exports themed primitives that all UI later consumes.
- `src/lib/env.ts` is the only place that reads `process.env`.
- `(site)` and `(payload)` route groups isolate frontend from admin so they can have different layouts.

---

## Task 1: Initialize pnpm + TypeScript + Node version pin

**Files:**
- Create: `package.json`, `.nvmrc`, `.gitignore`, `tsconfig.json`, `README.md`

- [ ] **Step 1: Create `.nvmrc`**

```
22
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules
.next
.env
.env.local
*.log
media/
backups/
playwright-report/
test-results/
coverage/
.DS_Store
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "gptcplays",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22 <23" },
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "payload": "payload",
    "migrate": "payload migrate",
    "migrate:create": "payload migrate:create",
    "generate:types": "payload generate:types",
    "generate:importmap": "payload generate:importmap",
    "db:up": "docker compose -f docker-compose.dev.yml up -d db",
    "db:down": "docker compose -f docker-compose.dev.yml down"
  }
}
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"], "@payload-config": ["./src/payload.config.ts"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "src/payload-types.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create minimal `README.md`**

```markdown
# gptcplays.com

Great Plains Theatre Commons site. Payload 3 + Next.js 16.

## Dev
- `pnpm install`
- `cp .env.example .env` and fill secrets
- `pnpm db:up`
- `pnpm migrate`
- `pnpm dev` → http://localhost:3000
```

- [ ] **Step 6: Commit**

```bash
git init && git add -A && git commit -m "chore: initialize pnpm + tsconfig"
```

---

## Task 2: Install Next.js 16 + Payload 3 + Postgres adapter

**Files:** modifies `package.json` via pnpm

- [ ] **Step 1: Install runtime deps**

```bash
pnpm add next@^16 react@^19 react-dom@^19 \
  payload@^3 @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical \
  sharp graphql \
  framer-motion clsx tailwind-merge \
  zod
```

- [ ] **Step 2: Install dev deps**

```bash
pnpm add -D typescript @types/node @types/react @types/react-dom \
  eslint eslint-config-next \
  tailwindcss @tailwindcss/postcss postcss \
  vitest @vitejs/plugin-react jsdom \
  @playwright/test
```

- [ ] **Step 3: Verify installed versions**

Run: `pnpm list --depth=0`
Expected: `next@16.x`, `payload@3.x`, `@payloadcms/db-postgres@3.x` listed.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install next 16, payload 3, postgres adapter, tooling"
```

---

## Task 3: Create env loader + `.env.example`

**Files:**
- Create: `src/lib/env.ts`, `.env.example`
- Test: `tests/unit/env.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/env.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { loadEnv } from '@/lib/env'

describe('loadEnv', () => {
  const ORIGINAL = { ...process.env }
  afterEach(() => { process.env = { ...ORIGINAL } })

  it('returns parsed env when required vars present', () => {
    process.env.DATABASE_URI = 'postgres://x'
    process.env.PAYLOAD_SECRET = 'a'.repeat(32)
    process.env.NEXT_PUBLIC_SERVER_URL = 'http://localhost:3000'
    const env = loadEnv()
    expect(env.DATABASE_URI).toBe('postgres://x')
  })

  it('throws when PAYLOAD_SECRET too short', () => {
    process.env.DATABASE_URI = 'postgres://x'
    process.env.PAYLOAD_SECRET = 'short'
    process.env.NEXT_PUBLIC_SERVER_URL = 'http://localhost:3000'
    expect(() => loadEnv()).toThrow()
  })
})
```

- [ ] **Step 2: Run test, expect FAIL**

Run: `pnpm test tests/unit/env.test.ts`
Expected: FAIL — cannot find module `@/lib/env`.

- [ ] **Step 3: Implement `src/lib/env.ts`**

```ts
import { z } from 'zod'

const schema = z.object({
  DATABASE_URI: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  PREVIEW_SECRET: z.string().min(16).optional(),
  REVALIDATE_SECRET: z.string().min(16).optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof schema>

let cached: Env | null = null
export function loadEnv(): Env {
  if (cached) return cached
  const parsed = schema.safeParse(process.env)
  if (!parsed.success) {
    throw new Error(`Invalid env: ${parsed.error.message}`)
  }
  cached = parsed.data
  return cached
}
```

- [ ] **Step 4: Run test, expect PASS**

Run: `pnpm test tests/unit/env.test.ts`
Expected: PASS.

- [ ] **Step 5: Create `.env.example`**

```
DATABASE_URI=postgres://gptc:gptc@localhost:5432/gptc
PAYLOAD_SECRET=replace-me-with-32-plus-random-characters
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PREVIEW_SECRET=replace-me-16-plus-chars
REVALIDATE_SECRET=replace-me-16-plus-chars
RESEND_API_KEY=
EMAIL_FROM=hello@gptcplays.com
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/env.ts tests/unit/env.test.ts .env.example
git commit -m "feat: env loader with zod validation"
```

---

## Task 4: Configure Vitest

**Files:**
- Create: `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
  },
})
```

- [ ] **Step 2: Verify Vitest picks up alias**

Run: `pnpm test`
Expected: env test PASSES (no module resolution error).

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts
git commit -m "chore: configure vitest with @ alias"
```

---

## Task 5: Configure ESLint + Next config

**Files:**
- Create: `eslint.config.mjs`, `next.config.ts`, `next-env.d.ts`

- [ ] **Step 1: Create `eslint.config.mjs`**

```js
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({ baseDirectory: import.meta.dirname })
export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next/**', 'node_modules/**', 'src/payload-types.ts'] },
]
```

If `@eslint/eslintrc` is not installed: `pnpm add -D @eslint/eslintrc`.

- [ ] **Step 2: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const config: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'gptcplays.com' },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(config)
```

- [ ] **Step 3: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 4: Run lint to confirm config loads**

Run: `pnpm lint`
Expected: no config errors (warnings about empty src/ are fine).

- [ ] **Step 5: Commit**

```bash
git add eslint.config.mjs next.config.ts next-env.d.ts
git commit -m "chore: eslint + next.config wired for payload"
```

---

## Task 6: Dev Postgres in Docker Compose

**Files:**
- Create: `docker-compose.dev.yml`, `.dockerignore`

- [ ] **Step 1: Create `docker-compose.dev.yml`**

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: gptc
      POSTGRES_PASSWORD: gptc
      POSTGRES_DB: gptc
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "gptc"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

- [ ] **Step 2: Create `.dockerignore`**

```
node_modules
.next
.git
media
backups
*.log
.env
.env.local
playwright-report
test-results
coverage
```

- [ ] **Step 3: Start Postgres and verify**

Run:
```bash
pnpm db:up
docker compose -f docker-compose.dev.yml exec db pg_isready -U gptc
```
Expected: `accepting connections`.

- [ ] **Step 4: Commit**

```bash
git add docker-compose.dev.yml .dockerignore
git commit -m "chore: dev postgres compose"
```

---

## Task 7: Create Users collection

**Files:**
- Create: `src/collections/Users.ts`

- [ ] **Step 1: Implement Users collection**

```ts
// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Users.ts
git commit -m "feat: users collection with admin/editor roles"
```

---

## Task 8: Create Media collection

**Files:**
- Create: `src/collections/Media.ts`

- [ ] **Step 1: Implement Media collection**

```ts
// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import path from 'node:path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumb', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1600 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumb',
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text' },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Media.ts
git commit -m "feat: media collection with image sizes + local upload"
```

---

## Task 9: Payload config

**Files:**
- Create: `src/payload.config.ts`

- [ ] **Step 1: Implement payload config**

```ts
// src/payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      title: 'GPTC Plays Admin',
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
})
```

- [ ] **Step 2: Generate types**

```bash
cp .env.example .env  # if not done
# edit .env: real PAYLOAD_SECRET (32+ chars)
pnpm generate:types
```
Expected: `src/payload-types.ts` created.

- [ ] **Step 3: Commit**

```bash
git add src/payload.config.ts src/payload-types.ts
git commit -m "feat: payload config with users + media, postgres, lexical"
```

---

## Task 10: Payload route group (admin + api)

**Files:**
- Create: `src/app/(payload)/layout.tsx`, `src/app/(payload)/admin/[[...segments]]/page.tsx`, `src/app/(payload)/admin/[[...segments]]/not-found.tsx`, `src/app/(payload)/api/[...slug]/route.ts`, `src/app/(payload)/api/graphql/route.ts`, `src/app/(payload)/api/graphql-playground/route.ts`, `src/app/(payload)/custom.scss`

These files are thin wrappers around `@payloadcms/next` exports. Mirror the official template exactly.

- [ ] **Step 1: Create `src/app/(payload)/layout.tsx`**

```tsx
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap.js'
import './custom.scss'
import React from 'react'

export const metadata = { title: 'GPTC Plays Admin' }

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={config} importMap={importMap}>
    {children}
  </RootLayout>
)
export default Layout
```

- [ ] **Step 2: Create `src/app/(payload)/admin/[[...segments]]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
```

- [ ] **Step 3: Create `src/app/(payload)/admin/[[...segments]]/not-found.tsx`**

```tsx
import config from '@payload-config'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

const NotFound = ({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) => NotFoundPage({ config, params, searchParams, importMap })

export default NotFound
```

- [ ] **Step 4: Create `src/app/(payload)/api/[...slug]/route.ts`**

```ts
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
```

- [ ] **Step 5: Create `src/app/(payload)/api/graphql/route.ts`**

```ts
import config from '@payload-config'
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'

export const POST = GRAPHQL_POST(config)
export const OPTIONS = REST_OPTIONS(config)
```

- [ ] **Step 6: Create `src/app/(payload)/api/graphql-playground/route.ts`**

```ts
import config from '@payload-config'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'

export const GET = GRAPHQL_PLAYGROUND_GET(config)
```

- [ ] **Step 7: Create `src/app/(payload)/custom.scss`**

```scss
// Reserved for admin UI overrides later.
```

- [ ] **Step 8: Generate importMap**

Run: `pnpm generate:importmap`
Expected: `src/app/(payload)/admin/importMap.js` created.

- [ ] **Step 9: Commit**

```bash
git add src/app/\(payload\)
git commit -m "feat: mount payload admin + api routes"
```

---

## Task 11: Run first migration + verify admin

**Files:** none (commands only)

- [ ] **Step 1: Create initial migration**

Run: `pnpm migrate:create initial`
Expected: a new file under `src/migrations/`.

- [ ] **Step 2: Apply migration**

Run: `pnpm migrate`
Expected: tables created in Postgres.

- [ ] **Step 3: Boot dev server**

Run: `pnpm dev`
Expected: server on http://localhost:3000. Navigate to `/admin`.

- [ ] **Step 4: Create first admin user via UI**

Expected: signup screen → create user → land on admin dashboard. Confirm Users + Media collections visible.

- [ ] **Step 5: Upload one image to Media**

Expected: file written under `./media/`. Image renders in admin with thumb.

- [ ] **Step 6: Stop server. Commit migration.**

```bash
git add src/migrations/
git commit -m "chore: initial payload migration"
```

---

## Task 12: Tailwind 4 + theme tokens

**Files:**
- Create: `postcss.config.mjs`, `src/styles/theme.css`, `src/app/(site)/globals.css`

- [ ] **Step 1: Create `postcss.config.mjs`**

```js
export default {
  plugins: { '@tailwindcss/postcss': {} },
}
```

- [ ] **Step 2: Create `src/styles/theme.css`**

```css
@theme {
  --color-ink: #0a0a0a;
  --color-paper: #fffaf3;

  --color-bolt: #635bff;       /* electric Stripe blue */
  --color-leaf: #00d4a0;       /* lime/teal */
  --color-marigold: #ffb84d;
  --color-magenta: #ff4da6;
  --color-cobalt: #1d4ed8;

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --shadow-brutal: 4px 4px 0 var(--color-ink);
  --shadow-brutal-lg: 8px 8px 0 var(--color-ink);

  --radius-brutal: 0px;
  --border-brutal: 3px;
}
```

- [ ] **Step 3: Create `src/app/(site)/globals.css`**

```css
@import 'tailwindcss';
@import '../../styles/theme.css';

@layer base {
  html { background: var(--color-paper); color: var(--color-ink); }
  body { font-family: var(--font-body); }
  h1, h2, h3, h4 { font-family: var(--font-display); letter-spacing: -0.02em; }
}
```

- [ ] **Step 4: Commit**

```bash
git add postcss.config.mjs src/styles/theme.css src/app/\(site\)/globals.css
git commit -m "feat: tailwind 4 with brutalist theme tokens"
```

---

## Task 13: Brutalist primitives

**Files:**
- Create: `src/components/brutal/Block.tsx`, `src/components/brutal/BrutalButton.tsx`, `src/components/brutal/BrutalCard.tsx`, `src/lib/cn.ts`
- Test: `tests/unit/brutal.test.tsx`

- [ ] **Step 1: Create `src/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

- [ ] **Step 2: Write failing test**

```tsx
// tests/unit/brutal.test.tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrutalButton } from '@/components/brutal/BrutalButton'

describe('BrutalButton', () => {
  it('renders children and applies brutal shadow class', () => {
    const { getByRole } = render(<BrutalButton>Go</BrutalButton>)
    const btn = getByRole('button')
    expect(btn.textContent).toBe('Go')
    expect(btn.className).toContain('shadow-')
  })
})
```

- [ ] **Step 3: Install testing-library**

```bash
pnpm add -D @testing-library/react @testing-library/dom
```

Add to `vitest.config.ts` test block: `environment: 'jsdom'`.

- [ ] **Step 4: Run test, expect FAIL**

Run: `pnpm test tests/unit/brutal.test.tsx`
Expected: FAIL — cannot find module `@/components/brutal/BrutalButton`.

- [ ] **Step 5: Implement `BrutalButton`**

```tsx
// src/components/brutal/BrutalButton.tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

type Variant = 'bolt' | 'leaf' | 'marigold' | 'magenta' | 'ink'

export const BrutalButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function BrutalButton({ className, variant = 'bolt', ...props }, ref) {
  const palette: Record<Variant, string> = {
    bolt: 'bg-(--color-bolt) text-(--color-paper)',
    leaf: 'bg-(--color-leaf) text-(--color-ink)',
    marigold: 'bg-(--color-marigold) text-(--color-ink)',
    magenta: 'bg-(--color-magenta) text-(--color-paper)',
    ink: 'bg-(--color-ink) text-(--color-paper)',
  }
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-5 py-3 font-display uppercase tracking-wider',
        'border-[3px] border-(--color-ink) shadow-[4px_4px_0_var(--color-ink)]',
        'transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-ink)]',
        palette[variant],
        className,
      )}
      {...props}
    />
  )
})
```

- [ ] **Step 6: Implement `Block`**

```tsx
// src/components/brutal/Block.tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

export function Block({
  as: Tag = 'section',
  className,
  ...props
}: { as?: React.ElementType } & React.HTMLAttributes<HTMLElement>) {
  return <Tag className={cn('border-[3px] border-(--color-ink) p-8', className)} {...props} />
}
```

- [ ] **Step 7: Implement `BrutalCard`**

```tsx
// src/components/brutal/BrutalCard.tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

export function BrutalCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-[3px] border-(--color-ink) bg-(--color-paper) p-6',
        'shadow-[4px_4px_0_var(--color-ink)] hover:-rotate-1 transition-transform',
        className,
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 8: Run test, expect PASS**

Run: `pnpm test tests/unit/brutal.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/brutal src/lib/cn.ts tests/unit/brutal.test.tsx vitest.config.ts package.json pnpm-lock.yaml
git commit -m "feat: brutal primitives (Block, BrutalButton, BrutalCard)"
```

---

## Task 14: Site layout + temporary homepage

**Files:**
- Create: `src/app/(site)/layout.tsx`, `src/app/(site)/page.tsx`

- [ ] **Step 1: Create `src/app/(site)/layout.tsx`**

```tsx
import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import type { Metadata } from 'next'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const body = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Great Plains Theatre Commons',
  description: 'New plays. New voices. Great Plains.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Create `src/app/(site)/page.tsx`**

```tsx
import { Block } from '@/components/brutal/Block'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 p-8">
      <Block className="bg-(--color-marigold)">
        <h1 className="text-6xl font-black">GREAT PLAINS THEATRE COMMONS</h1>
        <p className="mt-4 text-xl">New plays. New voices. Great Plains.</p>
        <BrutalButton variant="ink" className="mt-6">Explore</BrutalButton>
      </Block>
      <div className="grid gap-6 md:grid-cols-3">
        <BrutalCard><h3 className="text-2xl">Plays</h3></BrutalCard>
        <BrutalCard><h3 className="text-2xl">Productions</h3></BrutalCard>
        <BrutalCard><h3 className="text-2xl">Events</h3></BrutalCard>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Run: `pnpm dev` and visit `http://localhost:3000`.
Expected: marigold hero block with chunky title, three cards. Brutalist look.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(site\)/layout.tsx src/app/\(site\)/page.tsx
git commit -m "feat: temporary themed homepage shell"
```

---

## Task 15: Healthcheck endpoint

**Files:**
- Create: `src/app/api/health/route.ts`
- Test: `tests/unit/health.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/health.test.ts
import { describe, it, expect } from 'vitest'
import { GET } from '@/app/api/health/route'

describe('GET /api/health', () => {
  it('returns ok status', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
  })
})
```

- [ ] **Step 2: Run test, expect FAIL**

Run: `pnpm test tests/unit/health.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement route**

```ts
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ status: 'ok', ts: new Date().toISOString() })
}
```

- [ ] **Step 4: Run test, expect PASS**

Run: `pnpm test tests/unit/health.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/health/route.ts tests/unit/health.test.ts
git commit -m "feat: /api/health endpoint"
```

---

## Task 16: Playwright admin smoke test

**Files:**
- Create: `playwright.config.ts`, `tests/smoke/admin.spec.ts`

- [ ] **Step 1: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/smoke',
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
```

- [ ] **Step 2: Install browser**

Run: `pnpm exec playwright install chromium`

- [ ] **Step 3: Write smoke test**

```ts
// tests/smoke/admin.spec.ts
import { test, expect } from '@playwright/test'

test('homepage renders brutalist hero', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('GREAT PLAINS')
})

test('admin login page loads', async ({ page }) => {
  await page.goto('/admin/login')
  await expect(page.locator('form')).toBeVisible()
})

test('health endpoint returns ok', async ({ request }) => {
  const res = await request.get('/api/health')
  expect(res.status()).toBe(200)
  expect(await res.json()).toMatchObject({ status: 'ok' })
})
```

- [ ] **Step 4: Run smoke tests**

Run: `pnpm test:e2e`
Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/smoke/admin.spec.ts
git commit -m "test: playwright smoke for home, admin, health"
```

---

## Task 17: Tear-down + rebuild verification

**Files:** none

- [ ] **Step 1: Stop dev server**

- [ ] **Step 2: Bring down Postgres without removing volume**

Run: `pnpm db:down`
Expected: container stops; `pgdata` volume retained.

- [ ] **Step 3: Bring it back up**

Run: `pnpm db:up && pnpm dev`

- [ ] **Step 4: Confirm admin user + uploaded media still present**

Visit `/admin`, log in with original credentials. Open Media collection. Image from Task 11 should still be listed and its thumbnail should still render.

- [ ] **Step 5: No commit** (verification only).

---

## Self-Review Notes

- Spec coverage (Phase 1 subset): repo scaffold ✓ (T1–T5), dev Postgres ✓ (T6), Users + Media ✓ (T7, T8), Payload mounted in Next ✓ (T9, T10), migrations ✓ (T11), Tailwind 4 + tokens ✓ (T12), brutal primitives ✓ (T13), themed shell ✓ (T14), healthcheck ✓ (T15), smoke tests ✓ (T16). Persistence sanity ✓ (T17).
- Out of phase 1 (covered by later plans): Pages collection + block library, content collections (Plays/Productions/Events/News/Artists), Site/Homepage globals, public frontend routes per collection, Subscribers + newsletter endpoint, email integration, live preview + revalidation hooks, sitemap/robots/RSS, seed script, production Dockerfile, prod docker-compose with Traefik labels, CI.
- No placeholders, types/paths consistent across tasks (`@payload-config` alias used in tsconfig + Payload route files; `BrutalButton` API stable from T13 → T14).

---

## After Phase 1

When Phase 1 is verified working, write the next plan:
`contexts/2026-06-11-gptcplays-init-phase-2-content-model-plan.md` covering Pages collection, block library types, BlockRenderer, and the first three blocks (Hero, Color, RichText) end-to-end.
