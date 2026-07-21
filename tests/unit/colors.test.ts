import { describe, it, expect } from 'vitest'
import { BUILT_IN_COLORS, slugifyColor, isReservedSlug } from '@/lib/colors'

describe('colors', () => {
  it('exposes built-in tokens with slug + hex + textOn', () => {
    const bolt = BUILT_IN_COLORS.find((c) => c.slug === 'bolt')
    expect(bolt).toMatchObject({ slug: 'bolt', hex: '#14a3a3', textOn: 'paper' })
    expect(BUILT_IN_COLORS.find((c) => c.slug === 'marigold')?.textOn).toBe('ink')
  })

  it('slugifies labels to css-safe kebab-case', () => {
    expect(slugifyColor('Deep Sea Blue!')).toBe('deep-sea-blue')
    expect(slugifyColor('')).toBe('')
  })

  it('flags reserved built-in slugs', () => {
    expect(isReservedSlug('bolt')).toBe(true)
    expect(isReservedSlug('custom-thing')).toBe(false)
  })
})
