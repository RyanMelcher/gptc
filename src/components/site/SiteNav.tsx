import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

type NavLink = { id?: string | null; label: string; href: string }

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
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl font-black tracking-tight"
        >
          {logoText || 'GPTC'}
        </Link>
        <nav>
          <ul className="hidden md:flex items-center gap-7 font-display uppercase text-sm tracking-widest">
            {links?.map((l, i) => (
              <li key={l.id ?? i}>
                <Link
                  href={l.href}
                  className="border-b-[3px] border-transparent hover:border-[var(--color-ink)] pb-1"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu links={links} />
      </div>
    </header>
  )
}
