import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Header } from './Header'
import { siteContent } from '../content'

afterEach(() => window.history.replaceState({}, '', '/'))

test('updates active navigation when the section hash changes and clears it on the menu page', () => {
  window.history.replaceState({}, '', '/#story')
  const props = { content: siteContent.ro, language: 'ro' as const, setLanguage: () => {} }
  const { rerender } = render(<Header {...props} />)
  const nav = within(screen.getByRole('navigation'))
  expect(nav.getByRole('link', { name: 'Poveste' })).toHaveAttribute('aria-current', 'location')
  act(() => {
    window.history.replaceState({}, '', '/#visit')
    fireEvent(window, new HashChangeEvent('hashchange'))
  })
  expect(nav.getByRole('link', { name: 'Poveste' })).not.toHaveAttribute('aria-current')
  expect(nav.getByRole('link', { name: 'Vizitează-ne' })).toHaveAttribute('aria-current', 'location')
  rerender(<Header {...props} onMenuPage />)
  expect(nav.getByRole('link', { name: 'Meniu' })).toHaveAttribute('aria-current', 'page')
  expect(nav.getByRole('link', { name: 'Vizitează-ne' })).not.toHaveAttribute('aria-current')
})
