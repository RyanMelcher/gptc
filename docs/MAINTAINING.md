# Maintaining GTCP — content vs. UI

## Two substrates that never collide

- **Content** lives in Postgres (blocks stored as JSON). Owned by editors via `/admin`.
- **UI** lives in Git (`src/components/paper/*`, `src/components/render/*`, `src/styles/theme.css`). Owned by developers, shipped by deploy.

Editors editing content and developers restyling UI cannot merge-conflict — different stores. Content changes re-render on save (`afterChange` → `revalidatePath`, see `src/lib/revalidate.ts`); UI changes re-render on deploy. Same output, independent triggers.

## The one contract: block schemas

`src/blocks/*.ts` fields are a promise to both sides. Editors fill them and pick constrained options (e.g. `background: 'marigold'`, not a raw hex). Developers consume them in `src/components/render/*`.

**Rule: UI changes must be backward-compatible with existing content.**

- ✅ Restyle a render component, add a primitive, change a token → safe, editors unaffected.
- ✅ Add a NEW block field with a `defaultValue` + defensive rendering → additive, safe.
- ❌ Rename or remove a block field without a Payload migration → breaks live content.

The render-component refactor onto paper primitives is the reference example: the entire visual language changed while every `src/blocks/*.ts` schema — and each component's prop types and token maps (`Bg`/`Color`/`Tone`, `bgClass`/`palette`/`toneClass`) — stayed byte-for-byte identical. Existing content re-renders in the new style automatically. (Verify any time with `git diff -- src/blocks/`, which should stay empty.)

## Cohesion, not uniformity

All block render components share ONE foundation — the `PaperPanel` primitive and the design tokens (ink border, `shadow-brutal`/`shadow-brutal-lg`, `paper-texture`, color tokens). Variety comes from *props*, not from divergent one-off markup:

- **Flashy blocks** (`HeroRender`, `ColorRender`) use the marker font (`MarkerHeading`) + `torn` + `jitter`.
- **Calm blocks** (`CTARender`, `TwoUpRender`, `MediaRender`, `EmbedRender`, `QuoteRender`) use the same foundation with quieter `font-display` type and no torn/jitter. `QuoteRender` is a deliberate accent variant (magenta rule).
- Site listing cards share the foundation via `BrutalCard` (texture + `shadow-brutal`).

Because everyone composes the same primitives/tokens, a change to `PaperPanel` or a token ripples consistently across flashy and calm blocks alike — that's the cohesion lever. Add a new block? Build it from these primitives, not fresh markup.

## Design system layer

Semantic tokens in `src/styles/theme.css` (`@theme`) are the single source of truth (colors, `--font-marker`, `--paper-grid-*`, shadows, borders). Render components compose shared primitives in `src/components/paper/`:

- `PaperPanel` — textured panel with brutal shadow, optional torn top edge + rotation jitter
- `MarkerHeading` — hand-lettered marker-font heading (levels 1–3)
- `GridPaper` — notebook-grid background wrapper
- `ChainDivider` — rainbow paper-chain divider (decorative SVG)
- `PhotoCutout` — glow-outlined cutout image

A UI request ("rougher panels", "different marker font", "new palette") changes ONE primitive or token and ripples consistently — touching zero schemas, so editors are never disturbed.

To swap the marker face: change only the `Permanent_Marker` import in `src/app/(site)/layout.tsx`. To restyle panels: edit `PaperPanel`. To re-skin a color: remap the token in `theme.css`; editor-selected values (`marigold`, `bolt`, …) stay valid.

## Restyle workflow (won't disturb editors)

1. Branch. Change primitives / tokens / render components only.
2. Restore a snapshot of prod content locally to verify against REAL editor content, not lorem ipsum:
   ```
   FILE=backups/<dump>.sql pnpm db:restore
   ```
   (Snapshots come from `pnpm db:dump`; see `package.json` scripts.)
3. Run the gate: `pnpm test && pnpm typecheck && pnpm lint && pnpm build`.
4. Deploy. Existing content re-renders in the new style automatically; editors keep working in `/admin` the whole time.

## Tests

Unit tests live in `tests/unit/*.test.tsx` (Vitest + @testing-library/react, jsdom). RTL cleanup is wired globally in `vitest.setup.ts` — no per-file `afterEach(cleanup)` needed. Primitive tests assert on `className` / `textContent` / `getByRole` (no jest-dom). Render-component tests (`render-blocks.test.tsx`) are **backward-compatibility contracts**: they encode the behavior editors depend on, so a future restyle that breaks the contract fails loudly.
