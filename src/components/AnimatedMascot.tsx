import { useEffect, useRef, useState } from 'react'
import animation from '../assets/buzzy-mascot-animated.webp'
import mascot from '../assets/buzzy-mascot.webp'
import type { SiteContent } from '../content'

export function AnimatedMascot({
  labels,
}: {
  labels: SiteContent['accessibility']
}) {
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const [suspended, setSuspended] = useState(false)
  const pictureRef = useRef<HTMLPictureElement>(null)

  useEffect(() => {
    const picture = pictureRef.current
    if (!picture || typeof IntersectionObserver === 'undefined') return
    let inView = true
    const update = () => setSuspended(!inView || document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    observer.observe(picture)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])
  const label = paused
    ? labels.playMascotAnimation
    : labels.pauseMascotAnimation

  return (
    <>
      <picture aria-hidden="true" ref={pictureRef}>
        <source media="(prefers-reduced-motion: reduce)" srcSet={mascot} />
        <img
          src={paused || failed || suspended ? mascot : animation}
          width="384"
          height="384"
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      </picture>
      {!failed && (
        <button
          type="button"
          className="mascot-motion-toggle"
          aria-label={label}
          title={label}
          onClick={() => setPaused((value) => !value)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            {paused ? (
              <path d="m8 5 11 7-11 7Z" fill="currentColor" />
            ) : (
              <path d="M6 5h4v14H6Zm8 0h4v14h-4Z" fill="currentColor" />
            )}
          </svg>
        </button>
      )}
    </>
  )
}
