import { Block } from '@/components/brutal/Block'

export const metadata = { title: 'Invalid Confirmation Link' }

export default function InvalidPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Block className="bg-[var(--color-marigold)]">
        <h1 className="text-5xl font-black">Link expired.</h1>
        <p className="mt-4 text-lg">
          That confirmation link isn&rsquo;t valid. Try subscribing again.
        </p>
      </Block>
    </main>
  )
}
