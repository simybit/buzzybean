import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { useRef } from 'react'
import { usePageMotion, useAmbientVideo } from './usePageMotion'

let reduced = false
let intersect: IntersectionObserverCallback
let preferenceChanged: () => void
const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()
const cancel = vi.fn()
const animate = vi.fn(() => ({ cancel, finished: Promise.resolve() }))
const entries = (target: Element, visible = true): IntersectionObserverEntry[] => [{
  target,
  isIntersecting: visible,
  intersectionRatio: visible ? 1 : 0,
  boundingClientRect: target.getBoundingClientRect(),
  intersectionRect: target.getBoundingClientRect(),
  rootBounds: null,
  time: 0,
}]

beforeEach(() => {
  reduced = false
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback }
    observe = observe
    unobserve = unobserve
    disconnect = disconnect
  })
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return reduced },
    addEventListener: (_: string, fn: () => void) => { preferenceChanged = fn },
    removeEventListener: vi.fn(),
  })))
  vi.stubGlobal('Animation', class {})
  Element.prototype.animate = animate as unknown as Element['animate']
})
afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks() })

function Scene() {
  const ref = useRef<HTMLDivElement>(null)
  usePageMotion(ref)
  return <div ref={ref}><p data-reveal="text">Always available</p></div>
}

test('reveals visible content once and releases the observer target', async () => {
  const view = render(<Scene />)
  const target = view.getByText('Always available')
  expect(target).toBeVisible()
  await act(async () => intersect(entries(target), {} as IntersectionObserver))
  expect(animate).toHaveBeenCalledTimes(1)
  expect(unobserve).toHaveBeenCalledWith(target)
  await act(async () => intersect(entries(target), {} as IntersectionObserver))
  expect(animate).toHaveBeenCalledTimes(1)
  view.unmount()
  expect(disconnect).toHaveBeenCalled()
})

test('keeps content visible with reduced motion and cancels motion on a live preference change', () => {
  reduced = true
  const view = render(<Scene />)
  expect(view.getByText('Always available')).toBeVisible()
  expect(observe).not.toHaveBeenCalled()
  reduced = false
  act(() => preferenceChanged())
  expect(observe).toHaveBeenCalled()
  const target = view.getByText('Always available')
  act(() => intersect(entries(target), {} as IntersectionObserver))
  reduced = true
  act(() => preferenceChanged())
  expect(cancel).toHaveBeenCalled()
  expect(target).toBeVisible()
})

function Film() {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useAmbientVideo(ref)
  return <video ref={ref} autoPlay={!reduce} controls />
}

test('suspends offscreen playback and preserves a visitor pause when returning', () => {
  let paused = false
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    paused = true; this.dispatchEvent(new Event('pause'))
  })
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
    paused = false; this.dispatchEvent(new Event('play')); return Promise.resolve()
  })
  vi.spyOn(HTMLMediaElement.prototype, 'paused', 'get').mockImplementation(() => paused)
  const view = render(<Film />)
  const target = view.container.querySelector('video')!
  const entry = (visible: boolean) => act(() => intersect(entries(target, visible), {} as IntersectionObserver))
  entry(false)
  expect(pause).toHaveBeenCalled()
  entry(true)
  expect(play).toHaveBeenCalledTimes(1)
  act(() => target.pause())
  entry(false)
  entry(true)
  expect(play).toHaveBeenCalledTimes(1)
  view.unmount()
  vi.restoreAllMocks()
})

test('does not autoplay the film under reduced motion', () => {
  reduced = true
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
  const view = render(<Film />)
  expect(view.container.querySelector('video')).not.toHaveAttribute('autoplay')
  expect(play).not.toHaveBeenCalled()
  expect(pause).toHaveBeenCalled()
  vi.restoreAllMocks()
})

test('does not mistake a queued automatic pause for a visitor pause after a fast return', () => {
  let paused = false
  const queued: (() => void)[] = []
  vi.spyOn(HTMLMediaElement.prototype, 'paused', 'get').mockImplementation(() => paused)
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    if (!paused) queued.push(() => this.dispatchEvent(new Event('pause')))
    paused = true
  })
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
    paused = false; this.dispatchEvent(new Event('play')); return Promise.resolve()
  })
  const view = render(<Film />)
  const target = view.container.querySelector('video')!
  const entry = (visible: boolean) => act(() => intersect(entries(target, visible), {} as IntersectionObserver))
  entry(false)
  entry(true)
  act(() => queued.shift()?.())
  entry(false)
  act(() => queued.shift()?.())
  entry(true)
  expect(play).toHaveBeenCalledTimes(2)
  view.unmount()
  vi.restoreAllMocks()
})
