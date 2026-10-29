import { AnimatedMascot } from './AnimatedMascot'
import type { SiteContent } from '../content'
import { BrushHeading, FlightTrail, Sparks, Wave } from './Visuals'

interface VisitProps {
  content: SiteContent
}

export function Visit({ content }: VisitProps) {
  return (
    <section className="visit section" id="visit" aria-labelledby="visit-title">
      <div className="page-container section-inner visit-inner">
        <div className="visit-intro" data-reveal="text">
          <Sparks className="visit-sparks" />
          <BrushHeading
            id="visit-title"
            title={content.visit.title}
            leadingWords={content.visit.title.split(' ').length - 1}
          />
          <div className="visit-mascot">
            <AnimatedMascot labels={content.accessibility} />
          </div>
          <FlightTrail className="visit-trail" />
        </div>
        <div className="visit-details" data-reveal="text" data-reveal-delay="100">
          <p className="location-status">{content.visit.location}</p>
          <dl className="hours-list">
            {content.visit.hours.map((hours) => (
              <div key={hours.label}>
                <dt>{hours.label}</dt>
                <dd>{hours.value}</dd>
              </div>
            ))}
          </dl>
          <a className="email-link" href={`mailto:${content.visit.email}`}>
            {content.visit.email}
          </a>
        </div>
      </div>
      <Wave className="wave-to-footer" />
    </section>
  )
}
