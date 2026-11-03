import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { BuzzyCursor } from './BuzzyCursor'

afterEach(() => { vi.unstubAllGlobals(); document.documentElement.classList.remove('buzzy-cursor-active') })

function media(fine = true, reduced = false) {
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduced-motion') ? reduced : fine, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
}

test('keeps native cursor on touch devices and for reduced motion', () => {
  for (const [fine, reduced] of [[false, false], [true, true]]) {
    media(fine, reduced)
    const view = render(<BuzzyCursor />)
    fireEvent.load(document.querySelector('.buzzy-cursor img')!)
    fireEvent.pointerMove(document.body, { pointerType: 'mouse', clientX: 100, clientY: 120 })
    expect(document.documentElement).not.toHaveClass('buzzy-cursor-active')
    view.unmount()
  }
})

test('activates only after image loads, preserves editing and falls back on image failure', () => {
  media()
  let frame: FrameRequestCallback | undefined
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frame = callback; return 1 })
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
  const view = render(<><BuzzyCursor /><input aria-label="Message" /><a href="#story">Story</a></>)
  const mascot = document.querySelector('.buzzy-cursor img')!
  const move = (target: Element) => {
    fireEvent.pointerMove(target, { pointerType: 'mouse', clientX: 100, clientY: 120 })
    act(() => { frame?.(0); frame = undefined })
  }
  move(document.body)
  expect(document.documentElement).not.toHaveClass('buzzy-cursor-active')
  fireEvent.load(mascot)
  move(document.querySelector('a')!)
  expect(document.documentElement).toHaveClass('buzzy-cursor-active')
  expect(document.querySelector('.buzzy-cursor')).toHaveAttribute('data-interactive', 'true')
  move(document.querySelector('input')!)
  expect(document.documentElement).not.toHaveClass('buzzy-cursor-active')
  move(document.body)
  fireEvent.error(mascot)
  expect(document.documentElement).not.toHaveClass('buzzy-cursor-active')
  view.unmount()
})
