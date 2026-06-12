import Link from 'next/link'

type Social = { id?: string | null; platform: string; href: string }
type FooterCol = {
  id?: string | null
  heading: string
  links?: { id?: string | null; label: string; href: string }[] | null
}

const socialLabel: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

export function SiteFooter({
  columns,
  socials,
  tagline,
  logoText,
}: {
  columns?: FooterCol[] | null
  socials?: Social[] | null
  tagline?: string | null
  logoText?: string | null
}) {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] py-16">
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        <div className="grid gap-10 md:grid-cols-4">
          {columns?.map((col, i) => (
            <div key={col.id ?? i}>
              <h3 className="font-display uppercase tracking-widest text-sm mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links?.map((l, j) => (
                  <li key={l.id ?? j}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {socials && socials.length > 0 && (
            <div>
              <h3 className="font-display uppercase tracking-widest text-sm mb-4">Follow</h3>
              <ul className="space-y-2">
                {socials.map((s, i) => (
                  <li key={s.id ?? i}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {socialLabel[s.platform] || s.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="border-t-[3px] border-[var(--color-paper)] pt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="font-display text-4xl md:text-6xl font-black tracking-tight">
            {logoText || 'GPTC'}
          </p>
          {tagline && (
            <p className="font-display uppercase tracking-widest text-sm max-w-md">
              {tagline}
            </p>
          )}
        </div>
        <p className="text-xs opacity-60">
          &copy; {new Date().getFullYear()} Great Plains Theatre Commons. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
