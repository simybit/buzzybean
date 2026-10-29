import heroImage from '../assets/coffee-hero-concept.webp'
import heroVideo from '../assets/hero-video.mp4'
import type { SiteContent } from '../content'
import { useRef } from 'react'
import { useAmbientVideo } from '../usePageMotion'
import { menuPageCopy } from '../menuContent'
import { FlightTrail, Sparks, Wave } from './Visuals'

interface HeroProps {
  content: SiteContent
}

export function Hero({ content }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useAmbientVideo(videoRef)
  const [firstLine, secondLine] = content.hero.title.split('. ')
  const referenceLines = content.languageName === 'Română'
  const descriptionLines = referenceLines
    ? content.hero.description.replace(' făcută', '\nfăcută').replace(' și pauze', '\nși pauze').split('\n')
    : [content.hero.description]

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="page-container hero-inner">
        <div className="hero-media media-frame">
          <video
            ref={videoRef}
            src={heroVideo}
            poster={heroImage}
            width="1122"
            height="1402"
            aria-label={content.accessibility.heroImageAlt}
            autoPlay={!reducedMotion}
            preload="metadata"
            muted
            loop
            playsInline
            controls
          />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">
            <Sparks className="hero-sparks-start" />
            <span data-reveal="line">{firstLine}.</span> <span data-reveal="line" data-reveal-delay="90">{secondLine}</span>
            <Sparks className="hero-sparks-end" />
          </h1>
          <div className="hero-description" data-reference-lines={referenceLines} data-reveal="text" data-reveal-delay="120">
            <p>
              {descriptionLines.map((line, index) => (
                <span className="hero-description-line" key={line}>{index > 0 ? ' ' : ''}{line}</span>
              ))}
            </p>
            <svg className="hero-description-sparks" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 28C12 15 17 3 22 6S20 21 12 28ZM28 39C35 24 49 12 53 18S42 34 28 39ZM39 49C50 43 61 43 60 49S48 52 39 49Z" />
            </svg>
            <svg className="hero-description-flourish" viewBox="0 0 450 64" fill="none" aria-hidden="true">
              <g fill="currentColor" stroke="#fff5df" strokeWidth="2">
                <ellipse cx="25" cy="27" rx="19" ry="14" transform="rotate(47 25 27)" />
                <path d="M11 11C29 18 19 30 39 41" />
                <ellipse cx="72" cy="43" rx="20" ry="14" transform="rotate(-23 72 43)" />
                <path d="M54 52C64 36 77 49 90 34" />
              </g>
              <path d="M123 43C231 0 284 91 439 8" stroke="#e5b879" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="hero-actions" data-reveal="text" data-reveal-delay="180">
            <a className="button" href="#story">
              {content.hero.action}
            </a>
            <a className="hero-menu-link" href={`${import.meta.env.BASE_URL}menu/`}>
              {menuPageCopy[referenceLines ? 'ro' : 'en'].fullMenu}
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <FlightTrail className="hero-trail" />
        </div>

      </div>
      <Wave className="wave-to-story" />
    </section>
  )
}
