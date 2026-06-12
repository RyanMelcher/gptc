# GPTCplays.com — Initial Build Design

**Date:** 2026-06-11
**Scope:** Greenfield build of gptcplays.com — Payload 3 + Next.js 16 site for Great Plains Theatre Commons.
**Mission:** Strengthen community by supporting diverse new stories/plays by writers.

---

## 1. Architecture & Stack

- **Single Next.js 16 app** (App Router, TypeScript, React Server Components). Payload 3 mounted at `/admin` (UI) and `/api` (REST/GraphQL/local API). No separate backend service.
- **Database:** Postgres 16 via `@payloadcms/db-postgres`. Drizzle-based migrations committed to repo. Container entrypoint runs `pnpm migrate` before `next start`.
- **Media storage:** Local filesystem via Payload's default upload adapter. Mounted as Docker volume at `/app/media`. Survives container rebuilds. Backup via host-level volume snapshot.
- **UI stack:** Tailwind 4 + shadcn/ui (themed) + Framer Motion. Neo-brutalist design tokens (chunky borders, hard offset shadows, Stripe-derived palette as CSS custom properties).
- **Email:** Resend (preferred) or SMTP, env-gated. Used for newsletter confirmation + admin form notifications.
- **Deploy target:** Self-hosted Linux server running Traefik. Single Docker image built via multi-stage Dockerfile. `docker compose` brings up app + Postgres + optional pg-dump cron sidecar. Traefik handles TLS (LetsEncrypt) and routing for `gptcplays.com`.
- **Package manager:** pnpm.

## 2. Collections & Content Model

### Globals
- **`Site`** — top nav, footer, social links, contact info, palette overrides.
- **`Homepage`** — hero block stack (uses page block library).

### Collections
- **`Pages`** — slug, SEO fields, **blocks[]** layout. Drafts + versions enabled. Live preview wired.
- **`Plays`** — title, playwright (relationship → Artists), synopsis, themes, status (`in-development` / `produced` / `published`), media[], optional blocks[] for long-form page. Drafts + versions.
- **`Productions`** — relationship → Play, season/year, venue, director, cast (relationships → Artists), date range, production photos, program PDF, external `ticketURL`. Drafts + versions.
- **`Events`** — title, type (`reading` / `workshop` / `festival` / `fundraiser` / `other`), `startsAt`, `endsAt`, venue, description (rich text), `ticketURL`, hero image.
- **`News`** — title, slug, excerpt, blocks[], `publishedAt`, tags, hero image. Drafts + versions. RSS feed.
- **`Artists`** — name, role(s) (`playwright` / `director` / `actor` / `staff` — multi-select), bio (rich text), headshot, external links, `featured` boolean.
- **`Media`** — upload collection. Image sizes: `thumb` 400px, `card` 800px, `hero` 1600px, `og` 1200×630. Accepts images + PDFs.
- **`Users`** — staff editors. Roles via Payload access control: `admin`, `editor`. Admin-only collection.
- **`Subscribers`** — `email`, `source`, `confirmedAt`, `unsubscribedAt`, `token`. Created via public custom endpoint with rate limit + honeypot. Admin can export CSV.

### Page Block Library (composable, neo-brutalist)
`HeroBlock`, `ColorBlock` (oversized colored panel + headline), `TwoUpBlock`, `RichTextBlock`, `MediaBlock`, `CTABlock`, `PlayCarouselBlock`, `EventListBlock`, `NewsGridBlock`, `ArtistGridBlock`, `QuoteBlock`, `NewsletterBlock`, `EmbedBlock` (oEmbed/iframe).

### Access Control
- Public: read access only to published documents (drafts hidden).
- Editor: CRUD on content collections, no Users management.
- Admin: full access.

## 3. Frontend Theming & Routes

### Routes (App Router)
- `/` — Homepage global → block renderer
- `/[...slug]` — catch-all → `Pages` by slug
- `/plays` index + `/plays/[slug]`
- `/productions` (filter by season) + `/productions/[slug]`
- `/events` (Upcoming / Past tabs) + `/events/[slug]`
- `/news` index + `/news/[slug]`
- `/artists` + `/artists/[slug]`
- `/api/newsletter/subscribe` — Payload custom endpoint
- `/api/newsletter/confirm` — token confirmation
- `/admin/*` — Payload UI
- `/preview` — draft preview gateway (secret-gated)
- `/sitemap.xml`, `/robots.txt`, `/news/rss.xml`

### Theming
- **Palette:** Stripe-derived CSS custom props — electric blue, lime, marigold, magenta, ink-black, paper-white. Exposed as Tailwind 4 `@theme` tokens.
- **Brutalist primitives:** `Block`, `Chunk`, `BrutalButton`, `BrutalCard`, `MarqueeBar`, `StickerLabel`. Hard borders (2–3px), zero or hard 4px radius, drop-shadow `4px 4px 0 var(--ink)`, subtle hover rotate/squash.
- **Typography:** variable display font for headings (e.g. Space Grotesk or similar via `next/font`); neutral sans for body. Generous tracking on H1.
- **Motion:** Framer Motion. `whileInView` block reveals, button press squash, marquee scrollers, View Transitions API where supported.
- **shadcn:** themed via CSS vars; default border-radius overridden; no soft shadows.
- **Block renderer:** `<BlockRenderer blocks={page.blocks} />` switches on `blockType`. Each block is its own RSC; client interactivity isolated to leaf components.
- **Images:** `next/image` with Payload-generated size variants, served from `/media/**`.
- **SEO:** `generateMetadata` per route, sourced from Payload SEO plugin fields.

## 4. Infrastructure, Dev Workflow, Maintenance

### Docker
- **`Dockerfile`** — multi-stage (deps → build → runner) on Node 22-alpine. Next.js standalone output. Runs `pnpm migrate && node server.js`.
- **`docker-compose.yml`** services:
  - `app` — Next/Payload container. Labels for Traefik (host rule `gptcplays.com`, TLS via existing certresolver, healthcheck on `/api/health`). Volumes: `media`.
  - `db` — `postgres:16-alpine`. Volume: `pgdata`. Not exposed externally.
  - `db-backup` (optional) — nightly `pg_dump` to `backups/` volume.
- **Networks:** external `traefik` network for `app`; internal network for `app` ↔ `db`.

### Environment Variables
`DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `PREVIEW_SECRET`, `REVALIDATE_SECRET`.

### Dev Workflow
- pnpm scripts: `dev`, `build`, `start`, `payload`, `migrate`, `migrate:create`, `generate:types`, `generate:importmap`, `lint`, `test`, `seed`.
- Local dev: `docker compose up db` only; Next runs on host for HMR.
- Seed script populates demo Pages/Plays/Productions/Events/Artists so admin isn't empty on first boot.
- Pre-commit: lint-staged + typecheck.
- CI (GitHub Actions): typecheck, lint, build, migrations dry-run.

### Maintenance
- **Migrations:** every schema change → `pnpm migrate:create` → commit. Entrypoint applies on container start.
- **Backups:** nightly `pg_dump` to `backups/` volume; media volume snapshotted at host level.
- **Revalidation:** Payload `afterChange` / `afterDelete` hooks call `revalidateTag` / `revalidatePath` for affected routes.
- **Versions + drafts** on Pages/Plays/Productions/News for editor staging.
- **Logging:** pino → stdout; Traefik aggregates. Optional Sentry, env-gated.
- **Upgrades:** Renovate bot. Payload minor monthly, Next on Vercel's schedule.

### Testing
- **Vitest:** utilities, access control, custom endpoints.
- **Playwright smoke:** homepage renders, admin login succeeds, create+publish page reflects on frontend.

---

## Out of Scope (deferred / separate spec)
- Full ticketing with payments (Stripe Checkout / inventory / refunds).
- Public member accounts (donor portal, ticket history).
- Mailchimp/ConvertKit API sync (local Subscribers collection only; export CSV for now).
- S3-compatible object storage migration (local volume sufficient).
- Multi-site / Turborepo expansion.
- Dark mode.

## Open Items
- Final font selection for display + body (placeholder: Space Grotesk + Inter).
- Resend vs SMTP final pick — defer until newsletter wiring lands; both supported via env.
- Exact Stripe palette hex values — to be locked during theme implementation against design references (Gumroad / RetroUI).
