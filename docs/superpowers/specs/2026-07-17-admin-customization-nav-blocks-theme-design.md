# Admin Customization: Nav Dropdowns, Content Blocks, Editable Theme

**Date:** 2026-07-17
**Status:** Approved design — ready for implementation plan

## Goal

Make the site substantially more customizable from the Payload admin without code
changes, in three areas:

1. **Nav dropdowns** — top-level nav items can hold a dropdown of child links
   (e.g. `Commons Programs` → `Commoners Cohort`, matching a
   `/commons-programs/commonerscohort/` structure).
2. **More content blocks** — image+text rows, button/link groups, image galleries,
   plus retrofitting theme-color control onto existing blocks that lack it.
3. **Admin-editable theme** — retune the built-in named color palette *and* add new
   named colors from the admin, plus a small bucket of other global config toggles.

## Current State (as of this spec)

- **Nav:** `Site` global (`src/globals/Site.ts`) → `navLinks` array of flat
  `{ label, href }`. Rendered by `src/components/site/SiteNav.tsx` (desktop) and
  `src/components/site/MobileMenu.tsx` (mobile). No dropdown support.
- **Blocks:** `Hero, Color, RichText, TwoUp, Media, CTA, Quote, Embed`
  (`src/blocks/*`, registered in `src/blocks/index.ts`, used in
  `src/collections/Pages.ts`, rendered by
  `src/components/render/BlockRenderer.tsx`). `RichText` uses the default Lexical
  editor, so **inline links already work** there. `TwoUp` is two image+text columns.
- **Colors:** fixed named palette defined in `src/styles/theme.css` as
  `--color-<slug>` CSS variables (ink, paper, bolt, leaf, marigold, magenta, cobalt,
  sage, mint, sky, periwinkle, butter). Blocks pick a color via a hardcoded `select`
  field, and each render component maps the slug to Tailwind classes via a local
  `palette` object (e.g. `src/components/render/ColorRender.tsx`).

## Architecture Decision: Dynamic colors via CSS vars (Approach A)

Because admins can add custom colors, block color dropdowns can no longer be a
hardcoded `select`. Chosen approach:

- A `Theme` global holds the palette (built-in tokens with editable hex + a
  custom-colors array).
- The site layout injects **all** colors as `--color-<slug>` / `--on-<slug>` CSS
  variables from the DB, overriding the static `@theme` defaults in `theme.css`.
- Blocks store a color **slug** (a `text` value) chosen via a small custom Select
  field component that reads the live theme list.
- Render components apply `background: var(--color-<slug>)` /
  `color: var(--on-<slug>)` and **drop their hardcoded `palette` maps**.

Rejected alternative (B): colors as their own collection referenced by a
`relationship` field. More "native" but changes every block's stored data shape
(id vs slug), requires relationship population in every render path, and a data
migration — more moving parts for the same result.

Backward compatibility: existing blocks already store slugs like `bolt`; those
slugs remain valid because the built-in tokens keep the same slugs.

## Components

### 1. `Theme` global (`src/globals/Theme.ts`)

- `slug: 'theme'`, `access.read: () => true`, `afterChange` hook →
  `revalidate(['/'])` (mirror `Site.ts`).
- Tabs:
  - **Palette (built-ins):** one entry per existing token
    (ink, paper, bolt, leaf, marigold, magenta, cobalt, sage, mint, sky,
    periwinkle, butter), each `{ hex: text, textOn: select(ink|paper) }`,
    pre-seeded with the current `theme.css` values so nothing changes visually.
  - **Custom colors:** array of `{ label, slug, hex, textOn }`. `slug` auto-derived
    from `label` (kebab-case) via a field hook; validated unique and not colliding
    with a built-in slug.
  - **Config:** small bucket of currently-hardcoded globals, e.g.
    `brutalShadow` (on/off), `borderWidth` (px), `cornerRadius` (px),
    `gridPaper` (on/off). Kept intentionally small; expandable later.

### 2. Theme helper (`src/lib/theme.ts`)

- `getThemeColors()` → merges built-ins + custom into a single ordered list
  `[{ slug, label, hex, textOn }]`.
- `getThemeConfig()` → returns the config values with sane fallbacks.
- Both read the `theme` global (cached read via existing payload lib patterns).
  Used by the CSS injector **and** the color dropdown component.

### 3. CSS variable injection (`src/app/(site)/layout.tsx`)

- Read the theme once, render a `<style>` in the layout that emits, for each color:
  `--color-<slug>: <hex>;` and `--on-<slug>: var(--color-<textOn>);`
  plus config-derived vars (e.g. `--shadow-brutal`, `--border-brutal`,
  `--radius-brutal`).
- These override the static `@theme` values; `theme.css` remains the build-time
  fallback so the site still renders if the global is empty.

### 4. Custom color dropdown field (`src/fields/colorField.tsx` + component)

- `colorField(name = 'color', overrides?)` → a `text` field whose admin component is
  a custom Select that fetches the theme color list (via Payload REST/local API from
  the client) and renders swatches next to labels.
- Applied to: **ColorBlock** (replacing its static `select`), and retrofitted onto
  **RichText, Media, TwoUp**, plus the new blocks below.
- Render components resolve the slug to `var(--color-<slug>)` /
  `var(--on-<slug>)`; the per-component `palette` maps are removed.

### 5. Nav dropdowns — one level (`src/globals/Site.ts`, `SiteNav.tsx`, `MobileMenu.tsx`)

- Extend each `navLinks` item: keep `label` + make `href` optional, add a `children`
  array of `{ label, href }`.
- Desktop (`SiteNav`): a parent with children renders a dropdown revealed on
  hover/focus; accessible via keyboard with `aria-expanded` / `aria-haspopup`.
  Parent `href` optional (label-only group is allowed).
- Mobile (`MobileMenu`): parent with children renders as an expand/collapse
  accordion item.
- The shared `NavLink` type gains `children?: NavLink[]`.

### 6. New blocks

Each new block: a config in `src/blocks/`, exported from `src/blocks/index.ts`,
added to `Pages.blocks`, wired into `BlockRenderer.tsx`, with a render component in
`src/components/render/` following existing conventions (PaperPanel, MarkerHeading,
`cn`).

- **ImageTextBlock** (`imageText`) — `{ image (upload), content (richText),
  imageSide: select(left|right), imageWidth: select(e.g. 1/3, 1/2), color (colorField) }`.
- **ButtonGroupBlock** (`buttonGroup`) — `{ items: array of { label, href,
  color (colorField), style: select(solid|outline) } }`.
- **GalleryBlock** (`gallery`) — `{ items: array of { image (upload), caption },
  layout: select(grid|masonry), columns: select(2|3|4) }`.

### 7. Migration & seeding

- Run `pnpm migrate:create` for the new `theme` global + any `navLinks.children` and
  new-block tables.
- Seed the `Theme` global (built-in palette values + default config) via the seed
  script (`src/scripts/seed.ts`) and/or the migration so production has a populated
  palette on first deploy. Existing block color slugs remain valid.

## Data Flow

1. Admin edits `Theme` global → `afterChange` revalidates `/`.
2. Site layout reads `Theme` → injects `--color-*` / `--on-*` / config CSS vars.
3. Page blocks store a color **slug**; render components emit
   `var(--color-<slug>)` — no per-component palette maps.
4. Color dropdown component reads the same theme list so admin choices always match
   what renders.

## Error Handling & Edge Cases

- Empty/absent `Theme` global → helpers fall back to the built-in defaults; site
  renders unchanged (theme.css still applies).
- A block referencing a slug that was deleted from custom colors → render falls back
  to a default token (e.g. `paper`/`ink`) rather than an undefined var.
- Custom color slug collision with a built-in slug → rejected by field validation.
- Nav parent with no `href` and no `children` → treated as a plain non-link label
  (or hidden); parent with `href` and no children behaves like today's flat link.

## Testing

- Unit: `getThemeColors()` merge/fallback behavior; slug derivation & uniqueness
  validation; CSS-var string generation.
- Component: `SiteNav` / `MobileMenu` render dropdown children and are
  keyboard-accessible (`aria-expanded` toggles); new block render components render
  with a given color slug.
- E2E (Playwright, if in scope): admin can add a custom color and it appears in a
  block dropdown and on the rendered page; nav dropdown opens.

## Out of Scope (YAGNI)

- Multi-level / mega-menu nav (explicitly one level only).
- Per-block free-form color pickers (managed named palette only).
- Reworking existing blocks beyond adding the color selector.

## Open Items for Config bucket

Section 1 "Config" tab starts minimal (shadow toggle, border width, radius, grid
paper). Add more only as concrete needs arise.
