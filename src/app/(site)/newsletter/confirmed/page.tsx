import { Block } from '@/components/brutal/Block'

export const metadata = { title: 'Subscription Confirmed' }

export default function ConfirmedPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Block className="bg-[var(--color-leaf)]">
        <h1 className="text-5xl font-black">You&rsquo;re in.</h1>
        <p className="mt-4 text-lg">Thanks for confirming. Watch your inbox for news from GPTC.</p>
      </Block>
    </main>
  )
}
