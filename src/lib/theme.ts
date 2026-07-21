import { BUILT_IN_COLORS, type ThemeColor, type TextOn } from './colors'

export type ThemeConfig = {
  brutalShadow: boolean
}

const DEFAULT_CONFIG: ThemeConfig = {
  brutalShadow: true,
}

/** Built-ins (optionally overridden by DB rows) followed by custom colors. */
export function mergeColors(builtIns: ThemeColor[], customColors: ThemeColor[]): ThemeColor[] {
  const overrides = new Map(builtIns.map((c) => [c.slug, c]))
  const base = BUILT_IN_COLORS.map((c) => overrides.get(c.slug) ?? c)
  return [...base, ...customColors]
}

function escapeHex(hex: string): string {
  return /^#[0-9a-fA-F]{3,8}$/.test(hex.trim()) ? hex.trim() : '#000000'
}

export function themeCss(colors: ThemeColor[], config: ThemeConfig): string {
  const merged = colors.length ? colors : BUILT_IN_COLORS
  const colorVars = merged
    .flatMap((c) => [`  --color-${c.slug}: ${escapeHex(c.hex)};`, `  --on-${c.slug}: var(--color-${c.textOn});`])
    .join('\n')
  const shadow = config.brutalShadow ? '4px 4px 0 var(--color-ink)' : 'none'
  const shadowLg = config.brutalShadow ? '8px 8px 0 var(--color-ink)' : 'none'
  const configVars = [
    `  --shadow-brutal: ${shadow};`,
    `  --shadow-brutal-lg: ${shadowLg};`,
  ].join('\n')
  return `:root {\n${colorVars}\n${configVars}\n}`
}

type ThemeRow = { slug?: string | null; label?: string | null; hex?: string | null; textOn?: string | null }

function toColors(rows: ThemeRow[] | null | undefined): ThemeColor[] {
  if (!rows?.length) return []
  return rows
    .filter((r) => r.slug && r.hex)
    .map((r) => ({
      slug: String(r.slug),
      label: r.label ? String(r.label) : String(r.slug),
      hex: String(r.hex),
      textOn: (r.textOn === 'paper' ? 'paper' : 'ink') as TextOn,
    }))
}

async function getTheme() {
  // Dynamically imported so this module (and its pure helpers) can be loaded in
  // unit tests without pulling in payload.config.ts's DB adapter / env requirements.
  const { payload } = await import('./payload')
  const p = await payload()
  return p.findGlobal({ slug: 'theme', depth: 0 })
}

// Single read that feeds both the CSS injector and anything else that needs the
// full theme, so a page render does one findGlobal instead of two.
export async function getThemeData(): Promise<{ colors: ThemeColor[]; config: ThemeConfig }> {
  const theme = await getTheme()
  return {
    colors: mergeColors(toColors(theme?.builtIns as ThemeRow[]), toColors(theme?.customColors as ThemeRow[])),
    config: {
      brutalShadow: theme?.brutalShadow ?? DEFAULT_CONFIG.brutalShadow,
    },
  }
}
