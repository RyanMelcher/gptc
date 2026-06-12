import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrutalButton } from '@/components/brutal/BrutalButton'

describe('BrutalButton', () => {
  it('renders children and applies brutal shadow class', () => {
    const { getByRole } = render(<BrutalButton>Go</BrutalButton>)
    const btn = getByRole('button')
    expect(btn.textContent).toBe('Go')
    expect(btn.className).toContain('shadow-')
  })
})
