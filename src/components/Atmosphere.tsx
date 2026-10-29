import atmosphereImage from '../assets/cafe-atmosphere-selected.jpg'
import atmosphereImageWebp from '../assets/cafe-atmosphere-selected.optimized.webp'
import type { SiteContent } from '../content'
import { BrushHeading, FlightTrail, Sparks, Wave } from './Visuals'

interface AtmosphereProps {
  content: SiteContent
}

export function Atmosphere({ content }: AtmosphereProps) {
  return (
    <section className="atmosphere section" aria-labelledby="atmosphere-title">
      <div className="page-container section-inner atmosphere-inner">
        <div className="atmosphere-media media-frame" data-reveal="photo">
          <picture>
            <source srcSet={atmosphereImageWebp} type="image/webp" />
            <img
              src={atmosphereImage}
              width="1376"
              height="768"
              alt={content.accessibility.atmosphereImageAlt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="atmosphere-copy" data-reveal="text" data-reveal-delay="90">
          <Sparks className="atmosphere-sparks" />
          <BrushHeading
            id="atmosphere-title"
            title={content.atmosphere.title}
            leadingWords={2}
          />
          <p>{content.atmosphere.body}</p>
          <FlightTrail className="atmosphere-trail" />
        </div>
      </div>
      <Wave className="wave-to-visit" />
    </section>
  )
}
