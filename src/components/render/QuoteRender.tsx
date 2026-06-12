export type QuoteRenderProps = {
  quote: string
  attribution?: string | null
  source?: string | null
}

export function QuoteRender({ quote, attribution, source }: QuoteRenderProps) {
  return (
    <blockquote className="border-l-[6px] border-[var(--color-magenta)] pl-6 max-w-3xl mx-auto">
      <p className="font-display text-3xl md:text-4xl font-black leading-tight">
        &ldquo;{quote}&rdquo;
      </p>
      {(attribution || source) && (
        <footer className="mt-4 font-display uppercase tracking-widest text-sm">
          {attribution}
          {attribution && source && ' · '}
          {source && <span className="italic">{source}</span>}
        </footer>
      )}
    </blockquote>
  )
}
