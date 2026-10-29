import { useRef } from 'react'
import { ArrowRight, ClipboardList, House, MapPin, Play, X } from 'lucide-react'
import heroScene from '../assets/honey-hero-scene.webp'
import heroVideo from '../assets/hero-video.mp4'
import type { SiteContent } from '../content'

export function Hero({ content }: { content: SiteContent }) {
  const romanian = content.languageName !== 'English'
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeVideo = () => {
    videoRef.current?.pause()
    dialogRef.current?.close()
  }
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
          <div className="honey-actions">
            <a className="honey-cta" href="#story"><House aria-hidden="true" /><span>{content.nav.story}</span><ArrowRight aria-hidden="true" /></a>
            <a className="honey-cta honey-cta-primary" href={`${import.meta.env.BASE_URL}menu/`}><ClipboardList aria-hidden="true" /><span>{content.nav.menu}</span><ArrowRight aria-hidden="true" /></a>
            <a className="honey-cta" href="#visit"><MapPin aria-hidden="true" /><span>{content.nav.visit}</span><ArrowRight aria-hidden="true" /></a>
          </div>
          <p className="honey-eyebrow">Café &amp; Bistro</p>
          <h1 id="hero-title">
            {romanian ? <><span>Cafea bună,</span>{' '}<span>zile mai <em>frumoase</em></span></> : <><span>Good coffee,</span>{' '}<span><em>sweeter</em> days</span></>}
          </h1>
          <p className="honey-description">{content.hero.description}</p>
          <button type="button" className="honey-watch" onClick={() => dialogRef.current?.showModal()}><Play aria-hidden="true" />{romanian ? 'Vezi-l pe Buzzy' : 'Meet Buzzy'}</button>
        </div>
      </div>
      <dialog className="honey-film" ref={dialogRef} aria-label={romanian ? 'Buzzy la cafenea' : 'Buzzy at the café'} onClose={() => videoRef.current?.pause()} onClick={event => { if (event.target === event.currentTarget) closeVideo() }}>
        <button className="honey-film-close" type="button" onClick={closeVideo} aria-label={romanian ? 'Închide videoclipul' : 'Close video'}><X aria-hidden="true" /></button>
        <video ref={videoRef} src={heroVideo} controls playsInline preload="none" aria-label={romanian ? 'Buzzy la cafenea' : 'Buzzy at the café'} />
      </dialog>
    </section>
  )
}
