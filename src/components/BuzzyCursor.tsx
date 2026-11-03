import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import mascot from '../assets/buzzy-mascot.webp'

const nativeTargets = 'input, textarea, select, option, [contenteditable]:not([contenteditable="false"]), [role="textbox"], iframe, video, [data-native-cursor]'
const interactiveTargets = 'a[href], button:not(:disabled), [role="button"], summary, label, [tabindex]:not([tabindex="-1"])'

export function BuzzyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const image = imageRef.current
    if (!cursor || !image || !window.matchMedia) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let loaded = image.complete && image.naturalWidth > 0
    let frame = 0
    let x = 0
    let y = 0
    let target: Element | null = null
    let mousePresent = false
    let pressed = false

    const hide = () => {
      cursor.hidden = true
      document.documentElement.classList.remove('buzzy-cursor-active')
    }
    const draw = () => {
      frame = 0
      if (!fine.matches || reduced.matches || !loaded || !mousePresent || pressed || document.hidden || target?.closest(nativeTargets)) {
        hide()
        return
      }
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cursor.dataset.interactive = String(Boolean(target?.closest(interactiveTargets)))
      cursor.hidden = false
      document.documentElement.classList.add('buzzy-cursor-active')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw) }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') { mousePresent = false; hide(); return }
      x = event.clientX
      y = event.clientY
      target = event.target instanceof Element ? event.target : null
      mousePresent = true
      pressed = event.buttons > 0
      schedule()
    }
    const leave = () => { mousePresent = false; hide() }
    const out = (event: PointerEvent) => { if (!event.relatedTarget) leave() }
    const down = () => { pressed = true; hide() }
    const up = () => { pressed = false; schedule() }
    const scroll = () => { target = document.elementFromPoint(x, y); schedule() }
    const onLoad = () => { loaded = true }
    const onError = () => { loaded = false; hide() }
    const preferences = () => { hide(); mousePresent = false }

    image.addEventListener('load', onLoad)
    image.addEventListener('error', onError)
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', out, { passive: true })
    document.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerup', up, { passive: true })
    document.addEventListener('pointercancel', leave, { passive: true })
    document.addEventListener('visibilitychange', leave)
    window.addEventListener('blur', leave)
    window.addEventListener('scroll', scroll, { passive: true, capture: true })
    fine.addEventListener('change', preferences)
    reduced.addEventListener('change', preferences)
    return () => {
      cancelAnimationFrame(frame)
      hide()
      image.removeEventListener('load', onLoad)
      image.removeEventListener('error', onError)
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', out)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.removeEventListener('pointercancel', leave)
      document.removeEventListener('visibilitychange', leave)
      window.removeEventListener('blur', leave)
      window.removeEventListener('scroll', scroll, true)
      fine.removeEventListener('change', preferences)
      reduced.removeEventListener('change', preferences)
    }
  }, [])

  return createPortal(
    <div className="buzzy-cursor" ref={cursorRef} hidden aria-hidden="true">
      <span className="buzzy-cursor-point" />
      <img ref={imageRef} src={mascot} width="36" height="36" alt="" draggable={false} />
    </div>,
    document.body,
  )
}
