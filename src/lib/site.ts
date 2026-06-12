import { payload } from './payload'

export async function getSite() {
  const p = await payload()
  return p.findGlobal({ slug: 'site', depth: 2 })
}

export async function getHomepage() {
  const p = await payload()
  return p.findGlobal({ slug: 'homepage', depth: 2 })
}
