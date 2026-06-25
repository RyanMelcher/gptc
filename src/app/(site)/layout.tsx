import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { StatusBar } from '@/components/site/StatusBar'
import { SiteNav } from '@/components/site/SiteNav'
import { SiteFooter } from '@/components/site/SiteFooter'
import { getSite } from '@/lib/site'

// CMS content renders at request time; the build has no database (migrations run
// on container start), so nothing under (site) may be prerendered at build.
export const dynamic = 'force-dynamic'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const body = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Great Plains Theatre Commons',
  description: 'New plays. New voices. Great Plains.',
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite()
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <StatusBar pills={site.statusPills} />
        <SiteNav logoText={site.logoText} links={site.navLinks} />
        {children}
        <SiteFooter
          columns={site.footerColumns}
          socials={site.socials}
          tagline={site.tagline}
          logoText={site.logoText}
        />
      </body>
    </html>
  )
}
