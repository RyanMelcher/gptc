import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('[seed] Site global…')
  await payload.updateGlobal({
    slug: 'site',
    data: {
      logoText: 'GPTC',
      tagline: 'New plays. New voices. Great Plains.',
      navLinks: [
        { label: 'Visit', href: '/visit' },
        { label: 'Plays', href: '/plays' },
        { label: 'Productions', href: '/productions' },
        { label: 'Events', href: '/events' },
        { label: 'Artists', href: '/artists' },
        { label: 'News', href: '/news' },
        { label: 'Support', href: '/support' },
      ],
      statusPills: [
        { label: 'Festival 2026 · May 24–28', tone: 'marigold' },
        { label: 'Box office: open', tone: 'leaf' },
      ],
      whatsOn: [
        {
          eyebrow: 'Now Playing',
          title: 'Featured Production',
          body: 'A new work commissioned by GPTC.',
          href: '/productions',
          tone: 'marigold',
        },
        {
          eyebrow: 'Upcoming',
          title: 'Spring Readings',
          body: 'A weekend of new voices.',
          href: '/events',
          tone: 'leaf',
        },
        {
          eyebrow: 'In Development',
          title: 'New Play Lab',
          body: 'Workshopping the future of theatre.',
          href: '/plays',
          tone: 'bolt',
        },
        {
          eyebrow: 'Get Involved',
          title: 'Become a Member',
          body: 'Power new work in the Great Plains.',
          href: '/support',
          tone: 'magenta',
        },
      ],
      footerColumns: [
        {
          heading: 'Visit',
          links: [
            { label: 'Hours', href: '/visit#hours' },
            { label: 'Directions', href: '/visit#directions' },
          ],
        },
        {
          heading: 'Get Involved',
          links: [
            { label: 'Donate', href: '/support#donate' },
            { label: 'Volunteer', href: '/support#volunteer' },
          ],
        },
        {
          heading: 'Info',
          links: [
            { label: 'Press', href: '/press' },
            { label: 'Privacy', href: '/privacy' },
          ],
        },
      ],
      socials: [
        { platform: 'instagram', href: 'https://instagram.com/gptcplays' },
        { platform: 'facebook', href: 'https://facebook.com/gptcplays' },
        { platform: 'youtube', href: 'https://youtube.com/@gptcplays' },
      ],
    },
  })

  console.log('[seed] Homepage global…')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        headline: 'New plays. New voices. Great Plains.',
        subhead: 'A home for writers and audiences hungry for what theatre can become.',
        primaryCta: { label: 'Plan Your Visit', href: '/visit' },
        secondaryCta: { label: "See What's On", href: '/events' },
      },
      callout: {
        eyebrow: 'Festival 2026',
        headline: 'Five days. Twelve readings. One Great Plains.',
        body: 'May 24–28 · Omaha, NE.',
        tone: 'magenta',
        cta: { label: 'Get Festival Passes', href: '/events' },
      },
    },
  })

  console.log('[seed] Sample About page…')
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  const aboutData = {
    title: 'About',
    slug: 'about',
    _status: 'published' as const,
  }
  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: aboutData,
    })
  } else {
    await payload.create({ collection: 'pages', data: aboutData })
  }

  console.log('[seed] done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] failed', err)
  process.exit(1)
})
