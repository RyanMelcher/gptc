import { revalidatePath } from 'next/cache'

type Doc = { slug?: string | null }

export function revalidate(paths: string[]) {
  for (const p of paths) {
    try {
      revalidatePath(p)
    } catch (err) {
      console.error(`[revalidate] failed for ${p}`, err)
    }
  }
}

export function pagesPaths(doc: Doc, previous?: Doc): string[] {
  const out = new Set<string>()
  if (doc.slug) out.add(`/${doc.slug}`)
  if (previous?.slug && previous.slug !== doc.slug) out.add(`/${previous.slug}`)
  return [...out]
}

export function detailPaths(prefix: string, doc: Doc, previous?: Doc): string[] {
  const out = new Set<string>([prefix])
  if (doc.slug) out.add(`${prefix}/${doc.slug}`)
  if (previous?.slug && previous.slug !== doc.slug) out.add(`${prefix}/${previous.slug}`)
  return [...out]
}
