import { VideoHero } from '@/components/site/VideoHero'
import { WhatsOnStrip } from '@/components/site/WhatsOnStrip'
import { UpcomingShowCard } from '@/components/site/UpcomingShowCard'
import { FeaturedPlayBlock } from '@/components/site/FeaturedPlayBlock'
import { FestivalCallout } from '@/components/site/FestivalCallout'
import { NewsletterStrip } from '@/components/site/NewsletterStrip'
import { SponsorsStrip } from '@/components/site/SponsorsStrip'
import { getHomepage, getSite } from '@/lib/site'

export default async function Home() {
  const [homepage, site] = await Promise.all([getHomepage(), getSite()])
  return (
    <>
      <VideoHero
        eyebrow={homepage.hero?.eyebrow}
        headline={homepage.hero?.headline || 'New plays. New voices. Great Plains.'}
        subhead={homepage.hero?.subhead}
        video={homepage.hero?.video}
        poster={homepage.hero?.poster}
        primaryCta={homepage.hero?.primaryCta}
        secondaryCta={homepage.hero?.secondaryCta}
      />
      <UpcomingShowCard
        eyebrow={homepage.upcomingShow?.eyebrow}
        event={homepage.upcomingShow?.event}
        poster={homepage.upcomingShow?.poster}
        ctaLabel={homepage.upcomingShow?.ctaLabel}
      />
      <WhatsOnStrip cards={site.whatsOn} />
      {homepage.featuredPlay?.play && (
        <FeaturedPlayBlock
          eyebrow={homepage.featuredPlay.eyebrow}
          play={homepage.featuredPlay.play}
          image={homepage.featuredPlay.image}
        />
      )}
      <FestivalCallout
        eyebrow={homepage.callout?.eyebrow}
        headline={homepage.callout?.headline}
        body={homepage.callout?.body}
        tone={homepage.callout?.tone}
        cta={homepage.callout?.cta}
      />
      <SponsorsStrip
        heading={site.sponsors?.heading}
        subheading={site.sponsors?.subheading}
        items={site.sponsors?.items}
      />
      <NewsletterStrip />
    </>
  )
}
