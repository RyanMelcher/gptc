import { BrutalButton } from '@/components/brutal/BrutalButton'

export function NewsletterStrip() {
  return (
    <section className="bg-[var(--color-paper)] border-b-[3px] border-[var(--color-ink)] py-16">
      <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
        <h2 className="font-display text-4xl md:text-5xl font-black">
          Stay in the loop.
        </h2>
        <p className="text-lg">
          New plays, festival updates, and reading invites in your inbox.
        </p>
        <form
          action="/api/newsletter/subscribe"
          method="post"
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="flex-1 border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-4 py-3 font-body text-lg shadow-[4px_4px_0_var(--color-ink)] focus:outline-none focus:bg-[var(--color-leaf)]"
          />
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
          <BrutalButton type="submit" variant="magenta">
            Subscribe
          </BrutalButton>
        </form>
      </div>
    </section>
  )
}
