import { describe, it, expect } from 'vitest'
import { mergeColors, themeCss } from '@/lib/theme'

describe('theme helpers', () => {
  it('merges custom colors over/after built-ins by slug', () => {
    const merged = mergeColors(
      [{ slug: 'bolt', label: 'Bolt', hex: '#000000', textOn: 'paper' }],
      [{ slug: 'ocean', label: 'Ocean', hex: '#0066ff', textOn: 'paper' }],
    )
    expect(merged.find((c) => c.slug === 'bolt')?.hex).toBe('#000000')
    expect(merged.find((c) => c.slug === 'ocean')?.hex).toBe('#0066ff')
  })

  it('falls back to built-in defaults when theme is empty', () => {
    const merged = mergeColors([], [])
    expect(merged.find((c) => c.slug === 'marigold')?.hex).toBe('#efce3a')
  })

  it('emits css vars for every color plus config vars', () => {
    const css = themeCss([{ slug: 'bolt', label: 'Bolt', hex: '#14a3a3', textOn: 'paper' }], {
      brutalShadow: true,
    })
    expect(css).toContain('--color-bolt: #14a3a3;')
    expect(css).toContain('--on-bolt: var(--color-paper);')
    expect(css).toContain('--shadow-brutal: 4px 4px 0 var(--color-ink);')
    expect(css).toContain('--shadow-brutal-lg: 8px 8px 0 var(--color-ink);')
  })

  it('disables shadow when brutalShadow is false', () => {
    const css = themeCss([], { brutalShadow: false })
    expect(css).toContain('--shadow-brutal: none;')
  })
})
