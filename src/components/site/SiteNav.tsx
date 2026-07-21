'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MobileMenu } from './MobileMenu'

export type NavChild = { id?: string | null; label: string; href: string }
export type NavLink = {
  id?: string | null
  label: string
  href?: string | null
  children?: NavChild[] | null
}

function DropdownItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false)
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 border-b-[3px] border-transparent hover:border-[var(--color-ink)] pb-1 uppercase"
      >
        {link.label}
        <span aria-hidden>▾</span>
      </button>
      <ul
        className={`${open ? 'block' : 'hidden'} absolute left-0 top-full z-50 min-w-[12rem] border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] shadow-brutal`}
      >
        {link.href && (
          <li>
            <Link href={link.href} className="block px-4 py-3 hover:bg-[var(--color-marigold)]">
              {link.label}
            </Link>
          </li>
        )}
        {link.children?.map((c, i) => (
          <li key={c.id ?? i}>
            <Link href={c.href} className="block px-4 py-3 hover:bg-[var(--color-marigold)]">
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function SiteNav({
  logoText,
  links,
}: {
  logoText?: string | null
  links?: NavLink[] | null
}) {
  return (
    <header className="border-b-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl md:text-3xl font-black tracking-tight">
          {logoText || 'GPTC'}
        </Link>
        <nav>
          <ul className="hidden md:flex items-center gap-7 font-display uppercase text-sm tracking-widest">
            {links?.map((l, i) => {
              const key = l.id ?? i
              if (l.children?.length) return <DropdownItem key={key} link={l} />
              return (
                <li key={key}>
                  <Link
                    href={l.href || '#'}
                    className="border-b-[3px] border-transparent hover:border-[var(--color-ink)] pb-1"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <MobileMenu links={links} />
      </div>
    </header>
  )
}
