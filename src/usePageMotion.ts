import { useEffect, useState, type RefObject } from 'react'

const motionQuery = '(prefers-reduced-motion: reduce)'
const preference = () => window.matchMedia?.(motionQuery)

/** Animate only elements that enter view; the unenhanced DOM is always visible. */
export function usePageMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return

    const media = preference()
    const revealed = new WeakSet<Element>()
    const animations = new Set<Animation>()
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || revealed.has(target) || media?.matches) continue
        revealed.add(target)
        observer.unobserve(target)
        const element = target as HTMLElement
        const picture = element.dataset.reveal === 'photo'
        const animation = element.animate(
          picture
            ? [{ opacity: 0.45, scale: '0.975' }, { opacity: 1, scale: '1' }]
            : [{ opacity: 0, translate: '0 18px' }, { opacity: 1, translate: '0 0' }],
          {
            duration: picture ? 750 : 600,
            delay: Math.min(Number(element.dataset.revealDelay) || 0, 180),
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'backwards',
            // No persistent styles; a failed/cancelled animation exposes the content.
          },
        )
        animations.add(animation)
        void animation.finished.then(
          () => animations.delete(animation),
          () => animations.delete(animation),
        )
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

    const update = () => {
      if (media?.matches) {
        observer.disconnect()
        animations.forEach(animation => animation.cancel())
        animations.clear()
      } else {
        targets.forEach(target => { if (!revealed.has(target)) observer.observe(target) })
      }
    }
    update()
    media?.addEventListener('change', update)
    return () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      media?.removeEventListener('change', update)
    }
  }, [ref])
}

/** Keep the original controls and respect manual pauses, visibility and motion preferences. */
export function useAmbientVideo(ref: RefObject<HTMLVideoElement | null>) {
  const [reducedMotion, setReducedMotion] = useState(() => preference()?.matches ?? false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const media = preference()
    let visible = true
    let userPaused = false
    let automaticPauses = 0

    const sync = () => {
      if (!visible || document.hidden || media?.matches) {
        if (!video.paused) automaticPauses += 1
        video.pause()
      } else if (!userPaused) {
        void video.play()?.catch(() => { /* Native controls remain usable if autoplay is blocked. */ })
      }
    }
    const onPause = () => {
      // Media events are queued: visibility may have changed again before this fires.
      if (automaticPauses > 0) {
        automaticPauses -= 1
        return
      }
      if (visible && !document.hidden && !media?.matches) userPaused = true
    }
    const onPlay = () => { userPaused = false }
    const onPreference = () => {
      setReducedMotion(media?.matches ?? false)
      sync()
    }
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false
      sync()
    }, { threshold: 0 })

    video.addEventListener('pause', onPause)
    video.addEventListener('play', onPlay)
    document.addEventListener('visibilitychange', sync)
    media?.addEventListener('change', onPreference)
    observer?.observe(video)
    if (media?.matches) video.pause()
    return () => {
      observer?.disconnect()
      video.removeEventListener('pause', onPause)
      video.removeEventListener('play', onPlay)
      document.removeEventListener('visibilitychange', sync)
      media?.removeEventListener('change', onPreference)
    }
  }, [ref])

  return reducedMotion
}
