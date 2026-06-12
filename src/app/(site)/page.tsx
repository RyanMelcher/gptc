import { Block } from '@/components/brutal/Block'
import { BrutalButton } from '@/components/brutal/BrutalButton'
import { BrutalCard } from '@/components/brutal/BrutalCard'

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 p-8">
      <Block className="bg-[var(--color-marigold)]">
        <h1 className="text-6xl font-black">GREAT PLAINS THEATRE COMMONS</h1>
        <p className="mt-4 text-xl">New plays. New voices. Great Plains.</p>
        <BrutalButton variant="ink" className="mt-6">
          Explore
        </BrutalButton>
      </Block>
      <div className="grid gap-6 md:grid-cols-3">
        <BrutalCard>
          <h3 className="text-2xl">Plays</h3>
        </BrutalCard>
        <BrutalCard>
          <h3 className="text-2xl">Productions</h3>
        </BrutalCard>
        <BrutalCard>
          <h3 className="text-2xl">Events</h3>
        </BrutalCard>
      </div>
    </main>
  )
}
