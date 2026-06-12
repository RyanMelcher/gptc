import { VideoHero } from '@/components/site/VideoHero'
import { WhatsOnStrip } from '@/components/site/WhatsOnStrip'
import { FeaturedPlayBlock } from '@/components/site/FeaturedPlayBlock'
import { FestivalCallout } from '@/components/site/FestivalCallout'
import { NewsletterStrip } from '@/components/site/NewsletterStrip'
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
      <NewsletterStrip />
    </>
  )
}
