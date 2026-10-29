import heroScene from '../assets/honey-hero-scene.webp'
import type { SiteContent } from '../content'

export function Hero({ content }: { content: SiteContent }) {
  const romanian = content.languageName !== 'English'
  return (
    <section className="honey-hero" id="top" aria-labelledby="hero-title">
      <div className="honey-art">
        <img className="honey-scene" src={heroScene} width="1774" height="887" alt={content.accessibility.heroImageAlt} fetchPriority="high" />
        <div className="honey-bee-float" aria-hidden="true" style={{ backgroundImage: `url(${heroScene})` }} />
        <div className="honey-steam" aria-hidden="true"><i /><i /><i /></div>
        <svg className="honey-flight" viewBox="0 0 300 230" fill="none" aria-hidden="true">
          <path d="M290 170C180 180 60 140 85 80C106 25 167 73 159 105C149 143 37 137 18 220" />
        </svg>
      </div>
      <div className="page-container honey-inner">
        <div className="honey-copy">
          <h1 id="hero-title">
            {romanian ? <><span>Cafea bună,</span>{' '}<span>zile mai <em>frumoase</em></span></> : <><span>Good coffee,</span>{' '}<span><em>sweeter</em> days</span></>}
          </h1>
          <p className="honey-description">{content.hero.description}</p>
        </div>
      </div>
    </section>
  )
}
