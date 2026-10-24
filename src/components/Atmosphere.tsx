import atmosphereImage from '../assets/cafe-atmosphere-selected.jpg'
import type { SiteContent } from '../content'
import { BrushHeading, FlightTrail, Sparks, Wave } from './Visuals'

interface AtmosphereProps {
  content: SiteContent
}

export function Atmosphere({ content }: AtmosphereProps) {
  return (
    <section className="atmosphere section" aria-labelledby="atmosphere-title">
      <div className="page-container section-inner atmosphere-inner">
        <div className="atmosphere-media media-frame">
          <img
            src={atmosphereImage}
            width="1376"
            height="768"
            alt={content.accessibility.atmosphereImageAlt}
            loading="lazy"
          />
        </div>
        <div className="atmosphere-copy">
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
