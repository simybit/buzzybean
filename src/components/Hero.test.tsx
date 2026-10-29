import { render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { siteContent } from '../content'
import { Hero } from './Hero'

test('renders reference copy and three CTA links beneath the description in both languages', () => {
  for (const language of ['ro', 'en'] as const) {
    const content = siteContent[language]
    const view = render(<Hero content={content} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.hero.title)
    expect(screen.getByText(content.hero.description)).toBeVisible()
    const actions = view.container.querySelector('.honey-actions') as HTMLElement
    expect(actions).not.toBeNull()
    expect(actions.previousElementSibling).toHaveTextContent(content.hero.description)
    expect(within(actions).getAllByRole('link')).toHaveLength(3)
    expect(within(actions).getByRole('link', { name: content.nav.story })).toHaveAttribute('href', '#story')
    expect(within(actions).getByRole('link', { name: content.nav.menu })).toHaveAttribute('href', '/menu/')
    expect(within(actions).getByRole('link', { name: content.nav.visit })).toHaveAttribute('href', '#visit')
    expect(view.container.querySelector('.honey-scene')).toHaveAttribute('fetchpriority', 'high')
    view.unmount()
  }
})

test('does not render a video or playback control', () => {
  const { container } = render(<Hero content={siteContent.ro} />)
  expect(container.querySelector('video')).toBeNull()
  expect(container.querySelector('dialog')).toBeNull()
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})
