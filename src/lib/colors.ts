export type TextOn = 'ink' | 'paper'

export type ThemeColor = {
  slug: string
  label: string
  hex: string
  textOn: TextOn
}

// Mirrors src/styles/theme.css. This is the seed/default palette; the Theme
// global may override hex + textOn per slug and add more colors.
export const BUILT_IN_COLORS: ThemeColor[] = [
  { slug: 'ink', label: 'Ink', hex: '#0a0a0a', textOn: 'paper' },
  { slug: 'paper', label: 'Paper', hex: '#fffaf3', textOn: 'ink' },
  { slug: 'bolt', label: 'Bolt (Teal)', hex: '#14a3a3', textOn: 'paper' },
  { slug: 'leaf', label: 'Leaf (Olive)', hex: '#6b8d3a', textOn: 'paper' },
  { slug: 'marigold', label: 'Marigold', hex: '#efce3a', textOn: 'ink' },
  { slug: 'magenta', label: 'Magenta', hex: '#ff4da6', textOn: 'paper' },
  { slug: 'cobalt', label: 'Cobalt', hex: '#1d4ed8', textOn: 'paper' },
  { slug: 'sage', label: 'Sage', hex: '#a8c98b', textOn: 'ink' },
  { slug: 'mint', label: 'Mint', hex: '#c5e3ca', textOn: 'ink' },
  { slug: 'sky', label: 'Sky', hex: '#b6d2e6', textOn: 'ink' },
  { slug: 'periwinkle', label: 'Periwinkle', hex: '#8e9dc4', textOn: 'ink' },
  { slug: 'butter', label: 'Butter', hex: '#efe89e', textOn: 'ink' },
]

const RESERVED = new Set(BUILT_IN_COLORS.map((c) => c.slug))

export function isReservedSlug(slug: string): boolean {
  return RESERVED.has(slug)
}

/** Lowercase, ASCII, non-alphanumerics collapsed to single dashes, trimmed. */
export function slugifyColor(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritical marks
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
