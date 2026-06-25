'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

type NavLink = { id?: string | null; label: string; href: string }

export function MobileMenu({ links }: { links?: NavLink[] | null }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center w-11 h-11 border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]"
      >
        <span aria-hidden className="flex flex-col items-center" style={{ gap: 5 }}>
          <span style={{ display: 'block', width: 20, height: 3, background: 'var(--color-ink)' }} />
          <span style={{ display: 'block', width: 20, height: 3, background: 'var(--color-ink)' }} />
          <span style={{ display: 'block', width: 20, height: 3, background: 'var(--color-ink)' }} />
        </span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 60 }}
            className="bg-[var(--color-paper)] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-[var(--color-ink)]">
              <span className="font-display text-2xl font-black tracking-tight">GPTC</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-[var(--color-ink)] bg-[var(--color-marigold)] font-display uppercase text-sm tracking-widest"
              >
                <span aria-hidden className="text-xl leading-none">×</span>
                Close
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto flex flex-col font-display uppercase text-lg tracking-widest">
              {links?.map((l, i) => (
                <li key={l.id ?? i} className="border-b-[3px] border-[var(--color-ink)]">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  )
}
