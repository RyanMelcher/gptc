import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { HeroRender } from '@/components/render/HeroRender'
import { ColorRender } from '@/components/render/ColorRender'
import { CTARender } from '@/components/render/CTARender'

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

describe('CTARender (migrated onto shared foundation)', () => {
  it('renders headline, body, CTA link and applies the tone token', () => {
    const { getByRole, getByText, container } = render(
      <CTARender
        headline="Become a Member"
        body="Power new work."
        tone="bolt"
        cta={{ label: 'Join', href: '/join' }}
      />,
    )
    expect(getByRole('heading', { level: 2 }).textContent).toBe('Become a Member')
    expect(getByText('Power new work.').textContent).toBe('Power new work.')
    expect(getByRole('link').getAttribute('href')).toBe('/join')
    expect(container.querySelector('section')!.className).toContain('bg-[var(--color-bolt)]')
  })

  it('shares the PaperPanel foundation (paper texture) for cohesion', () => {
    const { container } = render(
      <CTARender headline="X" tone="sky" cta={{ label: 'Go', href: '/go' }} />,
    )
    expect(container.querySelector('section')!.className).toContain('paper-texture')
  })
})
