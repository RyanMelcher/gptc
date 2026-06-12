import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import type { Metadata } from 'next'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const body = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Great Plains Theatre Commons',
  description: 'New plays. New voices. Great Plains.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
