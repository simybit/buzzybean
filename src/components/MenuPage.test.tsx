import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import { siteContent } from '../content'
import { menuCategories } from '../menuContent'
import { getProductImage } from '../productImages'
import { MenuPage } from './MenuPage'
import comboReference from '../assets/sweet-combos-reference.png'

describe('reference-inspired menu', () => {
  afterEach(() => window.history.replaceState({}, '', '/'))

  test('preserves all original products and complete descriptions in both languages', () => {
    for (const language of ['ro', 'en'] as const) {
      const view = render(<MenuPage language={language} content={siteContent[language]} />)
      for (const category of menuCategories) {
        const section = view.container.querySelector<HTMLElement>(`#${category.id}`)!
        expect(within(section).getAllByRole('listitem')).toHaveLength(category.products.length)
        for (const product of category.products) {
          const card = within(section).getByRole('heading', { name: product.name }).closest('li')!
          const expectedImage = category.id === 'combos' ? comboReference : getProductImage(product.id)
          expect(within(card).getByRole('img', { name: product.name })).toHaveAttribute('src', expectedImage)
          expect(card.querySelector('.catalog-price')).toHaveTextContent(`${product.price} lei`)
          expect(within(card).getByText(product.description[language])).toBeInTheDocument()
        }
      }
      view.unmount()
    }
  })

  test('shows the active category without losing native navigation or hiding products', () => {
    window.history.replaceState({}, '', '/menu/#combos')
    render(<MenuPage language="ro" content={siteContent.ro} />)
    const nav = screen.getByRole('navigation', { name: 'Categorii din meniu' })
    expect(within(nav).getByRole('link', { name: 'Sweet Combos' })).toHaveAttribute('aria-current', 'location')
    for (const category of menuCategories) {
      const link = within(nav).getByRole('link', { name: category.name })
      expect(link).toHaveAttribute('href', `#${category.id}`)
      link.addEventListener('click', event => event.preventDefault(), { once: true })
      fireEvent.click(link)
      expect(link).toHaveAttribute('aria-current', 'location')
      expect(nav.querySelectorAll('[aria-current="location"]')).toHaveLength(1)
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(25)
    }
  })
})
