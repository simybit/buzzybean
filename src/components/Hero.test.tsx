import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { siteContent } from '../content'
import { Hero } from './Hero'

test('shows the playable video first, followed by the hero copy without a coffee photograph', () => {
  for (const language of ['ro', 'en'] as const) {
    const view = render(<Hero content={siteContent[language]} />)
    const video = view.container.querySelector('video')!
    expect(view.container.querySelector('.hero-inner')?.firstElementChild).toContainElement(video)
    expect(screen.queryByRole('img', { name: /^Cappuccino/ })).not.toBeInTheDocument()
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('autoplay')
    expect(view.container.querySelector('.hero-description p')).toHaveTextContent(siteContent[language].hero.description)
    expect(screen.getByRole('link', { name: siteContent[language].hero.action })).toHaveAttribute('href', '#story')
    view.unmount()
  }
})
