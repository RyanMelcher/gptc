import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PaperPanel } from '@/components/paper/PaperPanel'
import { MarkerHeading } from '@/components/paper/MarkerHeading'
import { GridPaper } from '@/components/paper/GridPaper'
import { ChainDivider } from '@/components/paper/ChainDivider'
import { PhotoCutout } from '@/components/paper/PhotoCutout'

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

  it('drops the top border when torn so it does not show through the notches', () => {
    const { container } = render(<PaperPanel torn>x</PaperPanel>)
    expect(container.querySelector('section')!.className).toContain('border-t-0')
  })

  it('keeps the full border when not torn', () => {
    const { container } = render(<PaperPanel>x</PaperPanel>)
    expect(container.querySelector('section')!.className).not.toContain('border-t-0')
  })
})

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

describe('GridPaper', () => {
  it('wraps children in a paper-grid section', () => {
    const { getByText, container } = render(<GridPaper>inside</GridPaper>)
    expect(getByText('inside').textContent).toBe('inside')
    expect(container.querySelector('.paper-grid')).not.toBeNull()
  })

  it('insets content past the red margin rule by default', () => {
    const { container } = render(<GridPaper>inside</GridPaper>)
    // left padding derived from --paper-grid-margin so text clears the red rule
    expect(container.querySelector('.paper-grid')!.className).toContain(
      'pl-[calc(var(--paper-grid-margin)+1rem)]',
    )
  })
})

describe('ChainDivider', () => {
  it('renders an aria-hidden decorative svg with the requested number of links', () => {
    const { container } = render(<ChainDivider links={5} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.querySelectorAll('[data-chain-link]').length).toBe(5)
  })
})

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
