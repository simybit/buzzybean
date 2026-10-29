import storyImage from '../assets/cafe-interior-selected.jpg'
import storyImageWebp from '../assets/cafe-interior-selected.optimized.webp'
import mascot from '../assets/buzzy-mascot.webp'
import type { SiteContent } from '../content'
import { BrushHeading, FlightTrail, Sparks, Wave } from './Visuals'

interface StoryProps {
  content: SiteContent
}

export function Story({ content }: StoryProps) {
  return (
    <section className="story section" id="story" aria-labelledby="story-title">
      <div className="page-container section-inner story-inner">
        <div className="story-media media-frame" data-reveal="photo">
          <picture>
            <source srcSet={storyImageWebp} type="image/webp" />
            <img
              src={storyImage}
              width="1376"
              height="768"
              alt={content.accessibility.storyImageAlt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="story-copy" data-reveal="text" data-reveal-delay="90">
          <Sparks className="story-sparks" />
          <BrushHeading
            id="story-title"
            title={content.story.title}
            leadingWords={3}
          />
          <p>{content.story.body}</p>
          <FlightTrail className="story-trail" />
        </div>
      </div>
      <img
        className="story-mascot"
        src={mascot}
        width="900"
        height="900"
        alt=""
        loading="lazy"
      />
      <Wave className="wave-to-menu" />
    </section>
  )
}
