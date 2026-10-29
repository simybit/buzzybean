import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { siteContent } from '../content'
import { Hero } from './Hero'

test('renders reference copy without duplicate navigation in both languages', () => {
  for (const language of ['ro', 'en'] as const) {
    const content = siteContent[language]
    const view = render(<Hero content={content} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.hero.title)
    expect(screen.getByText(content.hero.description)).toBeVisible()
    expect(view.container.querySelector('.honey-actions')).toBeNull()
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
