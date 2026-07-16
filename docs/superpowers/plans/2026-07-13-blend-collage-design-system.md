# Blend Collage Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a reusable "paper-collage" design-primitive layer that render components compose from, blending the flyer's craft aesthetic (torn paper, marker headlines, notebook-grid texture, cutout photos) onto the existing neo-brutalist structure — with **zero block-schema changes**, so editors keep working uninterrupted while UI evolves.

**Architecture:** All new visual styling lives in shared primitives under `src/components/paper/` plus token additions in `src/styles/theme.css`. Render components (`src/components/render/*`) are refactored to *compose* these primitives instead of hand-rolling classes. Block schemas (`src/blocks/*.ts`) are untouched — the editor↔dev contract stays fixed, so existing content re-renders in the new style automatically. A `docs/MAINTAINING.md` codifies the contract and the additive-schema rule.

**Tech Stack:** Next.js 16, React 19, Payload 3, Tailwind CSS v4 (`@theme` tokens), `next/font/google`, Vitest + @testing-library/react (tests in `tests/unit/`, no jest-dom — assert on `className`/`textContent`).

---

## Design decisions (the "blend")

- **Keep:** hard offset shadows (`--shadow-brutal-lg`), 3px ink borders, black display weights, the existing palette (marigold ≈ flyer yellow, cobalt already present).
- **Add:** paper texture + notebook-grid backgrounds, a hand-lettered *marker* accent font (headlines/eyebrows only; body stays Inter, nav stays Space Grotesk), slight per-panel rotation "jitter", optional torn top edge, rainbow chain divider, glow-outlined photo cutouts.
- **Do NOT:** add editor-facing fields in this plan. Texture/rotation are dev-controlled defaults inside primitives. (Optional additive fields are noted in MAINTAINING.md as a safe future step.)

## File Structure

- `src/styles/theme.css` — MODIFY: add `--font-marker`, texture/rotation tokens.
- `src/app/(site)/globals.css` — MODIFY: add `.paper-grid`, `.paper-texture` background utilities + `@layer base` reduced-motion guard.
- `src/app/(site)/layout.tsx` — MODIFY: load marker font via `next/font/google`, add `--font-marker` variable to `<html>`.
- `src/components/paper/PaperPanel.tsx` — CREATE: panel primitive (texture + shadow + jitter + optional torn edge).
- `src/components/paper/MarkerHeading.tsx` — CREATE: marker-font heading primitive.
- `src/components/paper/GridPaper.tsx` — CREATE: notebook-grid section wrapper.
- `src/components/paper/ChainDivider.tsx` — CREATE: rainbow paper-chain divider (inline SVG).
- `src/components/paper/PhotoCutout.tsx` — CREATE: glow-outlined image cutout.
- `src/components/paper/index.ts` — CREATE: barrel export.
- `src/components/render/HeroRender.tsx` — MODIFY: compose `PaperPanel` + `MarkerHeading` (props unchanged).
- `src/components/render/ColorRender.tsx` — MODIFY: compose `PaperPanel` + `MarkerHeading` (props unchanged).
- `tests/unit/paper.test.tsx` — CREATE: render tests for all primitives.
- `tests/unit/render-blocks.test.tsx` — CREATE: backward-compat tests for Hero/Color render.
- `docs/MAINTAINING.md` — CREATE: editor↔dev contract, restyle path, additive-schema rule, staging workflow.

---

## Task 1: Design tokens (fonts, texture, rotation)

**Files:**
- Modify: `src/styles/theme.css`
- Modify: `src/app/(site)/globals.css`

- [ ] **Step 1: Add tokens to `theme.css`**

Add inside the existing `@theme { ... }` block, after the `--font-body` line:

```css
  --font-marker: 'Permanent Marker', var(--font-display);
```

Add after the `--border-brutal: 3px;` line (still inside `@theme`):

```css
  --paper-grid-line: #cfe0ef;
  --paper-grid-size: 24px;
  --paper-red-margin: #f2a6b3;
```

- [ ] **Step 2: Add background utilities + motion guard to `globals.css`**

Append to `src/app/(site)/globals.css`:

```css
@layer components {
  /* Notebook-grid paper: faint blue grid + a red margin rule on the left */
  .paper-grid {
    background-color: var(--color-paper);
    background-image:
      linear-gradient(var(--paper-grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--paper-grid-line) 1px, transparent 1px);
    background-size: var(--paper-grid-size) var(--paper-grid-size);
  }
  /* Subtle off-white paper grain via layered radial gradients (no asset needed) */
  .paper-texture {
    background-image:
      radial-gradient(rgba(10, 10, 10, 0.035) 1px, transparent 1px),
      radial-gradient(rgba(10, 10, 10, 0.025) 1px, transparent 1px);
    background-size: 6px 6px, 9px 9px;
    background-position: 0 0, 3px 4px;
  }
}

@layer base {
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
}
```

- [ ] **Step 3: Verify build compiles the new CSS**

Run: `pnpm build`
Expected: build succeeds; no PostCSS/Tailwind errors mentioning `paper-grid` or `paper-texture`.

- [ ] **Step 4: Commit**

```bash
git add src/styles/theme.css "src/app/(site)/globals.css"
git commit -m "feat(design): add marker font + paper texture/grid tokens"
```

---

## Task 2: `PaperPanel` primitive

**Files:**
- Create: `src/components/paper/PaperPanel.tsx`
- Test: `tests/unit/paper.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/paper.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PaperPanel } from '@/components/paper/PaperPanel'

describe('PaperPanel', () => {
  it('renders children and applies brutal shadow + paper texture', () => {
    const { getByText, container } = render(<PaperPanel>content</PaperPanel>)
    expect(getByText('content').textContent).toBe('content')
    const el = container.querySelector('section')!
    expect(el.className).toContain('shadow-')
    expect(el.className).toContain('paper-texture')
  })

  it('renders a torn top edge when torn is set', () => {
    const { container } = render(<PaperPanel torn>x</PaperPanel>)
    expect(container.querySelector('[data-torn-edge]')).not.toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: FAIL — cannot resolve `@/components/paper/PaperPanel`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/paper/PaperPanel.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

export type PaperPanelProps = {
  as?: React.ElementType
  /** small rotation for hand-placed collage feel; degrees */
  jitter?: number
  /** render a torn top edge */
  torn?: boolean
} & React.HTMLAttributes<HTMLElement>

export function PaperPanel({
  as: Tag = 'section',
  jitter = 0,
  torn = false,
  className,
  style,
  children,
  ...props
}: PaperPanelProps) {
  return (
    <Tag
      className={cn(
        'relative paper-texture border-[3px] border-[var(--color-ink)] p-8',
        'shadow-[8px_8px_0_var(--color-ink)]',
        className,
      )}
      style={{ rotate: jitter ? `${jitter}deg` : undefined, ...style }}
      {...props}
    >
      {torn && (
        <span
          data-torn-edge
          aria-hidden
          className="pointer-events-none absolute -top-3 left-0 right-0 h-3"
          style={{
            background: 'inherit',
            clipPath:
              'polygon(0 100%, 4% 20%, 8% 90%, 14% 15%, 20% 85%, 27% 25%, 34% 95%, 41% 20%, 48% 80%, 55% 15%, 62% 90%, 69% 25%, 76% 85%, 83% 20%, 90% 95%, 96% 30%, 100% 100%)',
          }}
        />
      )}
      {children}
    </Tag>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/paper/PaperPanel.tsx tests/unit/paper.test.tsx
git commit -m "feat(paper): add PaperPanel primitive"
```

---

## Task 3: `MarkerHeading` primitive

**Files:**
- Create: `src/components/paper/MarkerHeading.tsx`
- Test: `tests/unit/paper.test.tsx` (append)

- [ ] **Step 1: Write the failing test**

Append to `tests/unit/paper.test.tsx`:

```tsx
import { MarkerHeading } from '@/components/paper/MarkerHeading'

describe('MarkerHeading', () => {
  it('renders the requested heading level with marker font', () => {
    const { getByRole } = render(<MarkerHeading level={2}>Title</MarkerHeading>)
    const h = getByRole('heading', { level: 2 })
    expect(h.textContent).toBe('Title')
    expect(h.className).toContain('font-marker')
  })

  it('defaults to h2', () => {
    const { getByRole } = render(<MarkerHeading>Hi</MarkerHeading>)
    expect(getByRole('heading', { level: 2 }).textContent).toBe('Hi')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: FAIL — cannot resolve `@/components/paper/MarkerHeading`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/paper/MarkerHeading.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

type Level = 1 | 2 | 3

export type MarkerHeadingProps = {
  level?: Level
} & React.HTMLAttributes<HTMLHeadingElement>

export function MarkerHeading({
  level = 2,
  className,
  ...props
}: MarkerHeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag
      className={cn('font-marker leading-[0.95] tracking-normal', className)}
      {...props}
    />
  )
}
```

> Note: `font-marker` is generated by Tailwind v4 from the `--font-marker` theme token added in Task 1. The actual loaded font is wired in Task 6.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: PASS (4 tests total).

- [ ] **Step 5: Commit**

```bash
git add src/components/paper/MarkerHeading.tsx tests/unit/paper.test.tsx
git commit -m "feat(paper): add MarkerHeading primitive"
```

---

## Task 4: `GridPaper` + `ChainDivider` primitives

**Files:**
- Create: `src/components/paper/GridPaper.tsx`
- Create: `src/components/paper/ChainDivider.tsx`
- Test: `tests/unit/paper.test.tsx` (append)

- [ ] **Step 1: Write the failing test**

Append to `tests/unit/paper.test.tsx`:

```tsx
import { GridPaper } from '@/components/paper/GridPaper'
import { ChainDivider } from '@/components/paper/ChainDivider'

describe('GridPaper', () => {
  it('wraps children in a paper-grid section', () => {
    const { getByText, container } = render(<GridPaper>inside</GridPaper>)
    expect(getByText('inside').textContent).toBe('inside')
    expect(container.querySelector('.paper-grid')).not.toBeNull()
  })
})

describe('ChainDivider', () => {
  it('renders an aria-hidden decorative svg with links', () => {
    const { container } = render(<ChainDivider links={5} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.querySelectorAll('ellipse').length).toBe(5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: FAIL — cannot resolve `@/components/paper/GridPaper`.

- [ ] **Step 3: Write minimal implementations**

Create `src/components/paper/GridPaper.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

export function GridPaper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('paper-grid', className)} {...props}>
      {children}
    </div>
  )
}
```

Create `src/components/paper/ChainDivider.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

const CHAIN_COLORS = [
  'var(--color-magenta)',
  'var(--color-marigold)',
  'var(--color-bolt)',
  'var(--color-leaf)',
  'var(--color-cobalt)',
  'var(--color-periwinkle)',
]

export type ChainDividerProps = {
  links?: number
  className?: string
}

export function ChainDivider({ links = 8, className }: ChainDividerProps) {
  const linkW = 34
  const width = links * (linkW * 0.7) + linkW
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox={`0 0 ${width} 44`}
      className={cn('h-8 w-full', className)}
      preserveAspectRatio="none"
    >
      {Array.from({ length: links }).map((_, i) => (
        <ellipse
          key={i}
          cx={linkW / 2 + i * (linkW * 0.7)}
          cy={22}
          rx={linkW / 2}
          ry={16}
          fill="none"
          stroke={CHAIN_COLORS[i % CHAIN_COLORS.length]}
          strokeWidth={7}
        />
      ))}
    </svg>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: PASS (6 tests total).

- [ ] **Step 5: Commit**

```bash
git add src/components/paper/GridPaper.tsx src/components/paper/ChainDivider.tsx tests/unit/paper.test.tsx
git commit -m "feat(paper): add GridPaper + ChainDivider primitives"
```

---

## Task 5: `PhotoCutout` primitive + barrel export

**Files:**
- Create: `src/components/paper/PhotoCutout.tsx`
- Create: `src/components/paper/index.ts`
- Test: `tests/unit/paper.test.tsx` (append)

- [ ] **Step 1: Write the failing test**

Append to `tests/unit/paper.test.tsx`:

```tsx
import { PhotoCutout } from '@/components/paper/PhotoCutout'

describe('PhotoCutout', () => {
  it('renders an img with alt and a glow outline wrapper', () => {
    const { getByRole, container } = render(
      <PhotoCutout src="/media/x.jpg" alt="a person" />,
    )
    const img = getByRole('img') as HTMLImageElement
    expect(img.getAttribute('alt')).toBe('a person')
    expect(container.querySelector('[data-cutout]')).not.toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: FAIL — cannot resolve `@/components/paper/PhotoCutout`.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/paper/PhotoCutout.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/cn'

export type PhotoCutoutProps = {
  src: string
  alt: string
  /** outline glow color token, e.g. var(--color-bolt) */
  glow?: string
} & React.HTMLAttributes<HTMLSpanElement>

export function PhotoCutout({
  src,
  alt,
  glow = 'var(--color-bolt)',
  className,
  ...props
}: PhotoCutoutProps) {
  return (
    <span
      data-cutout
      className={cn('inline-block', className)}
      style={{ filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 2px ${glow})` }}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block max-w-full" />
    </span>
  )
}
```

Create `src/components/paper/index.ts`:

```ts
export { PaperPanel } from './PaperPanel'
export { MarkerHeading } from './MarkerHeading'
export { GridPaper } from './GridPaper'
export { ChainDivider } from './ChainDivider'
export { PhotoCutout } from './PhotoCutout'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/paper.test.tsx`
Expected: PASS (7 tests total).

- [ ] **Step 5: Commit**

```bash
git add src/components/paper/PhotoCutout.tsx src/components/paper/index.ts tests/unit/paper.test.tsx
git commit -m "feat(paper): add PhotoCutout primitive + barrel export"
```

---

## Task 6: Load the marker font

**Files:**
- Modify: `src/app/(site)/layout.tsx`

- [ ] **Step 1: Add the font import**

In `src/app/(site)/layout.tsx`, change the font import line:

```tsx
import { Space_Grotesk, Inter, Permanent_Marker } from 'next/font/google'
```

- [ ] **Step 2: Instantiate the font**

After the `const body = Inter(...)` line, add:

```tsx
const marker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
})
```

- [ ] **Step 3: Add the variable to `<html>`**

Change the `<html>` className:

```tsx
    <html lang="en" className={`${display.variable} ${body.variable} ${marker.variable}`}>
```

- [ ] **Step 4: Verify build + font wiring**

Run: `pnpm build`
Expected: build succeeds; no "Unknown font" error from `next/font/google`.

> Manual check (during execution review): run `pnpm dev`, load `/`, confirm the `--font-marker` CSS var is set on `<html>` and `font-marker` utility resolves to Permanent Marker. To swap fonts later, change only the `Permanent_Marker` import here — no other file changes.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/layout.tsx"
git commit -m "feat(design): load Permanent Marker as --font-marker"
```

---

## Task 7: Refactor `HeroRender` to compose primitives

**Files:**
- Modify: `src/components/render/HeroRender.tsx`
- Test: `tests/unit/render-blocks.test.tsx`

- [ ] **Step 1: Write the backward-compat test (must hold across refactor)**

Create `tests/unit/render-blocks.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { HeroRender } from '@/components/render/HeroRender'

describe('HeroRender (backward compatible)', () => {
  it('renders headline, eyebrow, subhead and CTA link', () => {
    const { getByRole, getByText } = render(
      <HeroRender
        eyebrow="Now Playing"
        headline="Commoners Reception"
        subhead="A fond farewell"
        background="marigold"
        cta={{ label: 'RSVP', href: '/rsvp' }}
      />,
    )
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Commoners Reception')
    expect(getByText('Now Playing').textContent).toBe('Now Playing')
    expect(getByText('A fond farewell').textContent).toBe('A fond farewell')
    const link = getByRole('link')
    expect(link.getAttribute('href')).toBe('/rsvp')
  })

  it('applies the selected background color token', () => {
    const { container } = render(<HeroRender headline="X" background="bolt" />)
    expect(container.querySelector('section')!.className).toContain('bg-[var(--color-bolt)]')
  })
})
```

- [ ] **Step 2: Run test to verify it passes against current implementation**

Run: `pnpm vitest run tests/unit/render-blocks.test.tsx`
Expected: PASS (2 tests) — establishes the behavior contract before refactor.

- [ ] **Step 3: Refactor to compose primitives (keep props + behavior identical)**

Replace the body of `src/components/render/HeroRender.tsx` (keep the `Bg` type, `HeroProps`, and `bgClass` map exactly as they are). Change imports and the component:

```tsx
import { PaperPanel } from '@/components/paper/PaperPanel'
import { MarkerHeading } from '@/components/paper/MarkerHeading'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { cn } from '@/lib/cn'
```

```tsx
export function HeroRender({ eyebrow, headline, subhead, background = 'marigold', cta }: HeroProps) {
  return (
    <PaperPanel torn jitter={-1} className={cn(bgClass[background ?? 'marigold'])}>
      {eyebrow && (
        <p className="font-marker uppercase tracking-widest text-sm">{eyebrow}</p>
      )}
      <MarkerHeading level={1} className="text-5xl md:text-7xl mt-2">
        {headline}
      </MarkerHeading>
      {subhead && <p className="mt-4 text-lg md:text-xl max-w-2xl">{subhead}</p>}
      {cta?.label && cta?.href && (
        <a href={cta.href} className="inline-block mt-6">
          <BrutalButton variant="ink">{cta.label}</BrutalButton>
        </a>
      )}
    </PaperPanel>
  )
}
```

> `PaperPanel` renders a `<section>` and applies the `8px 8px 0` shadow itself, so the old `shadow-[8px_8px_0...]` and `BrutalBlock` usage are removed. Background color still comes from `bgClass`, preserving the editor-selected token.

- [ ] **Step 4: Run test to verify it still passes**

Run: `pnpm vitest run tests/unit/render-blocks.test.tsx`
Expected: PASS (2 tests) — same behavior, new styling.

- [ ] **Step 5: Commit**

```bash
git add src/components/render/HeroRender.tsx tests/unit/render-blocks.test.tsx
git commit -m "refactor(render): HeroRender composes paper primitives (no schema change)"
```

---

## Task 8: Refactor `ColorRender` to compose primitives

**Files:**
- Modify: `src/components/render/ColorRender.tsx`
- Test: `tests/unit/render-blocks.test.tsx` (append)

- [ ] **Step 1: Write the backward-compat test**

Append to `tests/unit/render-blocks.test.tsx`:

```tsx
import { ColorRender } from '@/components/render/ColorRender'

describe('ColorRender (backward compatible)', () => {
  it('renders headline + body and applies color token', () => {
    const { getByRole, getByText, container } = render(
      <ColorRender headline="Sips & Snacks" body="Provided" color="magenta" align="center" />,
    )
    expect(getByRole('heading', { level: 2 }).textContent).toBe('Sips & Snacks')
    expect(getByText('Provided').textContent).toBe('Provided')
    const section = container.querySelector('section')!
    expect(section.className).toContain('bg-[var(--color-magenta)]')
    expect(section.className).toContain('text-center')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/render-blocks.test.tsx`
Expected: FAIL — current `ColorRender` renders `text-center` correctly but this test also asserts nothing new yet; if it passes, that's fine. If it FAILS it will be because heading/section assertions differ. Proceed to Step 3 regardless to complete the refactor.

> If Step 2 already PASSES against the current implementation, treat this as the pre-refactor contract (same as Task 7 Step 2) and continue.

- [ ] **Step 3: Refactor to compose primitives (keep `Color` type, `ColorProps`, `palette` map exactly)**

Change imports and the component in `src/components/render/ColorRender.tsx`:

```tsx
import { PaperPanel } from '@/components/paper/PaperPanel'
import { MarkerHeading } from '@/components/paper/MarkerHeading'
import { cn } from '@/lib/cn'
```

```tsx
export function ColorRender({ headline, body, color = 'bolt', align = 'left' }: ColorProps) {
  return (
    <PaperPanel
      jitter={1}
      className={cn('py-16', palette[color ?? 'bolt'], align === 'center' && 'text-center')}
    >
      <MarkerHeading level={2} className="text-4xl md:text-6xl">
        {headline}
      </MarkerHeading>
      {body && <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{body}</p>}
    </PaperPanel>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/render-blocks.test.tsx`
Expected: PASS (3 tests total).

- [ ] **Step 5: Commit**

```bash
git add src/components/render/ColorRender.tsx tests/unit/render-blocks.test.tsx
git commit -m "refactor(render): ColorRender composes paper primitives (no schema change)"
```

---

## Task 9: Full test + typecheck + build gate

**Files:** none (verification task)

- [ ] **Step 1: Run the full unit suite**

Run: `pnpm test`
Expected: PASS — all suites including `paper.test.tsx`, `render-blocks.test.tsx`, existing `brutal.test.tsx`, `env`, `rate-limit`, `health`.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: no errors (the `no-img-element` disable comment in PhotoCutout must silence that rule).

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Commit (only if any lint autofix touched files)**

```bash
git add -A
git commit -m "chore: lint/typecheck pass for paper design system"
```

---

## Task 10: Document the editor↔dev contract

**Files:**
- Create: `docs/MAINTAINING.md`

- [ ] **Step 1: Write the doc**

Create `docs/MAINTAINING.md`:

```markdown
# Maintaining GTCP — content vs. UI

## Two substrates that never collide
- **Content** lives in Postgres (blocks stored as JSON). Owned by editors via `/admin`.
- **UI** lives in Git (`src/components/paper/*`, `src/components/render/*`, `src/styles/theme.css`). Owned by developers, shipped by deploy.

Editors editing content and developers restyling UI cannot merge-conflict — different stores. Content changes re-render on save (`afterChange` → `revalidatePath`, see `src/lib/revalidate.ts`); UI changes re-render on deploy.

## The one contract: block schemas
`src/blocks/*.ts` fields are a promise to both sides. Editors fill them and pick constrained options (e.g. `background: 'marigold'`). Developers consume them in `src/components/render/*`.

**Rule: UI changes must be backward-compatible with existing content.**
- ✅ Restyle a render component, add a primitive, change a token → safe, editors unaffected.
- ✅ Add a NEW block field with a `defaultValue` + defensive rendering → additive, safe.
- ❌ Rename or remove a block field without a Payload migration → breaks live content.

## Design system layer
Semantic tokens in `src/styles/theme.css` (`@theme`) are the single source of truth. Render components compose shared primitives in `src/components/paper/`:
`PaperPanel`, `MarkerHeading`, `GridPaper`, `ChainDivider`, `PhotoCutout`.
A UI request ("rougher panels", "different marker font") changes ONE primitive/token and ripples consistently — touching zero schemas.

## Restyle workflow (won't disturb editors)
1. Branch. Change primitives/tokens/render components only.
2. Restore a snapshot of prod content locally: `FILE=backups/<dump>.sql pnpm db:restore` — verify the new style against REAL editor content, not lorem ipsum.
3. Run `pnpm test && pnpm typecheck && pnpm build`.
4. Deploy. Existing content re-renders in the new style automatically; editors keep working in `/admin` the whole time.
```

- [ ] **Step 2: Verify the doc renders as valid markdown (visual skim)**

Run: `git add docs/MAINTAINING.md && git diff --cached --stat`
Expected: `docs/MAINTAINING.md` staged.

- [ ] **Step 3: Commit**

```bash
git commit -m "docs: add editor/dev contract + restyle workflow"
```

---

## Self-Review

**Spec coverage:**
- "Blend the two aesthetics" → Tasks 1–8 (keep shadows/borders/palette; add marker font, texture, torn edge, chain, cutouts).
- "Maintainable / reusable design layer" → `src/components/paper/*` primitives (Tasks 2–5), tokens (Task 1).
- "UI changes won't mess up editors' concurrent work" → schema untouched (Tasks 7–8 preserve props/types/maps), contract documented (Task 10), backward-compat tests (render-blocks).
- "How UI updates work with backend data" → documented in MAINTAINING.md (revalidate flow) + demonstrated by refactor leaving schemas fixed.

**Placeholder scan:** none — every code step contains full source; every command has expected output.

**Type consistency:** `PaperPanel` (props `as/jitter/torn`), `MarkerHeading` (`level`), `GridPaper`, `ChainDivider` (`links`), `PhotoCutout` (`src/alt/glow`) are defined in Tasks 2–5 and consumed with matching signatures in Tasks 7–8. The `Bg`/`Color` types, `bgClass`/`palette` maps in the render components are explicitly preserved. `--font-marker` token (Task 1) → `font-marker` utility (Tasks 3,7) → loaded font (Task 6) are consistent.

---

## Notes for the executor
- **Do not commit** unless the user runs commits themselves — per project convention, tell any subagent to skip commit steps and leave changes staged instead. (Commit commands above are for reference / for the human to run.)
- Tailwind v4 generates the `font-marker` utility from the `--font-marker` `@theme` token; the runtime font value is overridden on `<html>` by `next/font` exactly like the existing `--font-display`/`--font-body` pattern.
```
