import heroImage from '../assets/coffee-hero-concept.webp'
import heroVideo from '../assets/hero-video.mp4'
import type { SiteContent } from '../content'
import { FlightTrail, Sparks, Wave } from './Visuals'

interface HeroProps {
  content: SiteContent
}

export function Hero({ content }: HeroProps) {
  const [firstLine, secondLine] = content.hero.title.split('. ')

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="page-container hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title">
            <Sparks className="hero-sparks-start" />
            <span>{firstLine}.</span> <span>{secondLine}</span>
            <Sparks className="hero-sparks-end" />
          </h1>
          <p>{content.hero.description}</p>
          <a className="button" href="#story">
            {content.hero.action}
          </a>
          <FlightTrail className="hero-trail" />
        </div>
        <div className="hero-media media-frame">
          <video
            src={heroVideo}
            poster={heroImage}
            width="1122"
            height="1402"
            aria-label={content.accessibility.heroImageAlt}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        </div>
      </div>
      <Wave className="wave-to-story" />
    </section>
  )
}
