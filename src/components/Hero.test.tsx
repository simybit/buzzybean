import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { siteContent } from '../content'
import { Hero } from './Hero'

test('renders reference copy and three working links in both languages', () => {
  for (const language of ['ro', 'en'] as const) {
    const content = siteContent[language]
    const view = render(<Hero content={content} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.hero.title)
    expect(screen.getByText(content.hero.description)).toBeVisible()
    const actions = within(view.container.querySelector('.honey-actions') as HTMLElement)
    expect(actions.getByRole('link', { name: content.nav.story })).toHaveAttribute('href', '#story')
    expect(actions.getByRole('link', { name: content.nav.menu })).toHaveAttribute('href', '/menu/')
    expect(actions.getByRole('link', { name: content.nav.visit })).toHaveAttribute('href', '#visit')
    expect(view.container.querySelector('.honey-scene')).toHaveAttribute('fetchpriority', 'high')
    view.unmount()
  }
})

test('keeps Buzzy video available on demand with playback controls', () => {
  const show = vi.fn(function (this: HTMLDialogElement) { this.open = true })
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { value: show, configurable: true })
  render(<Hero content={siteContent.ro} />)
  expect(document.querySelector('video')).not.toHaveAttribute('autoplay')
  fireEvent.click(screen.getByRole('button', { name: 'Vezi-l pe Buzzy' }))
  expect(show).toHaveBeenCalled()
  expect(document.querySelector('video')).toHaveAttribute('controls')
  expect(document.querySelector('video')).toHaveAttribute('preload', 'none')
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
})
