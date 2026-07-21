import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteNav } from '@/components/site/SiteNav'

describe('SiteNav', () => {
  const links = [
    { label: 'Plays', href: '/plays' },
    {
      label: 'Commons Programs',
      href: '/commons-programs',
      children: [{ label: 'Commoners Cohort', href: '/commons-programs/commonerscohort' }],
    },
  ]

  it('renders a top-level link and a dropdown trigger with its child', () => {
    render(<SiteNav logoText="GPTC" links={links as never} />)
    expect(screen.getByRole('link', { name: 'Plays' })).toBeDefined()
    const trigger = screen.getByRole('button', { name: /commons programs/i })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(screen.getByRole('link', { name: 'Commoners Cohort' })).toBeDefined()
  })
})
