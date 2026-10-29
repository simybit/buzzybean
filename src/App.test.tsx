import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'

import App from './App'

describe('Buzzy Bean landing page', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  test('renders the complete Romanian page with semantic landmarks', () => {
    const { container } = render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Cafea bună, zile mai frumoase',
    )
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
    expect(container.querySelector('section#story')).toBeInTheDocument()
    expect(container.querySelector('section#story a')).toBeNull()
    expect(container.querySelector('#menu .full-menu-action')).toHaveAttribute(
      'href',
      '/menu/',
    )
    expect(container.querySelector('section#menu')).toBeInTheDocument()
    expect(container.querySelector('section#visit')).toBeInTheDocument()
  })

  test('provides usable section navigation and contact links', () => {
    const { container } = render(<App />)

    const navigation = screen.getByRole('navigation', {
      name: 'Navigare principală',
    })
    expect(
      within(navigation).getByRole('link', { name: 'Poveste' }),
    ).toHaveAttribute('href', '#story')
    expect(
      within(navigation).getByRole('link', { name: 'Meniu' }),
    ).toHaveAttribute('href', '/menu/')
    expect(
      within(navigation).getByRole('link', { name: 'Vizitează-ne' }),
    ).toHaveAttribute('href', '#visit')
    expect(
      screen.getAllByRole('link', { name: 'coffee@buzzybean.ro' })[0],
    ).toHaveAttribute('href', 'mailto:coffee@buzzybean.ro')

    const footer = container.querySelector('footer')
    expect(footer).not.toBeNull()
    expect(within(footer!).getByText('buzzybean.ro')).not.toHaveAttribute(
      'href',
    )
    expect(
      within(footer!).getByRole('link', { name: 'coffee@buzzybean.ro' }),
    ).toHaveAttribute('href', 'mailto:coffee@buzzybean.ro')
  })

  test('renders all menu categories, hero video, and descriptive photography', () => {
    render(<App />)

    for (const category of [
      'Honey Pastries',
      'Honey Specials',
      'Buzzy Brews',
      'Sweet Combos',
    ]) {
      expect(
        screen.getByRole('heading', { name: category }),
      ).toBeInTheDocument()
    }

    expect(
      screen.getByAltText(
        'Cappuccino, croissant cu miere și albinuța Buzzy într-o cafenea primitoare',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(
        'Prieteni savurând cafea împreună într-o cafenea luminoasă',
      ),
    ).toBeInTheDocument()
  })

  test('toggles mobile navigation and dismisses it with Escape or a section link', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Deschide navigarea' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'header-menu')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Închide navigarea')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()

    fireEvent.click(toggle)
    const navigation = screen.getByRole('navigation', {
      name: 'Navigare principală',
    })
    const menuLink = within(navigation).getByRole('link', { name: 'Meniu' })
    menuLink.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    })
    fireEvent.click(menuLink)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('localizes the mobile toggle and closes the menu on outside interaction', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Deschide navigarea' }))
    fireEvent.click(
      screen.getByRole('button', { name: /English.*neselectată/ }),
    )
    const toggle = screen.getByRole('button', { name: 'Close navigation' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.pointerDown(document.body)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAccessibleName('Open navigation')
  })

  test('communicates language selection without relying on colour', () => {
    render(<App />)

    const romanianButton = screen.getByRole('button', {
      name: /Română.*selectată/,
    })
    const englishButton = screen.getByRole('button', {
      name: /English.*neselectată/,
    })

    expect(romanianButton).toHaveAttribute('aria-pressed', 'true')
    expect(englishButton).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(englishButton)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Good coffee, sweeter days',
    )
    expect(
      screen.getByRole('button', { name: /English.*selected/ }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  test('links the homepage highlights to the full menu and its categories', () => {
    render(<App />)
    const menuLinks = screen.getAllByRole('link', { name: 'Vezi meniul complet' })
    expect(menuLinks).toHaveLength(1)
    for (const link of menuLinks) expect(link).toHaveAttribute('href', '/menu/')
    expect(
      screen.getByRole('link', { name: 'Honey Pastries' }),
    ).toHaveAttribute('href', '/menu/#pastries')
  })

  test('presents menu categories without numbering or an implied sequence', () => {
    const { container } = render(<App />)
    const categories = container.querySelector('#menu .menu-list')!
    expect(categories.tagName).toBe('UL')
    expect(
      within(categories as HTMLElement).getAllByRole('listitem'),
    ).toHaveLength(4)
    expect(categories.querySelector('.menu-number')).toBeNull()
    expect(categories).not.toHaveTextContent(/\b0[1-4]\b/)
  })

  test('renders a directly addressable menu with all products and home navigation', () => {
    window.history.replaceState({}, '', '/menu/')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Un strop de miere. O mulțime de bun.',
    )
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(25)
    expect(
      screen.getByRole('heading', { name: 'Buzzy Bee Sandwich' }),
    ).toBeInTheDocument()
    const navigation = screen.getByRole('navigation', {
      name: 'Navigare principală',
    })
    expect(
      within(navigation).getByRole('link', { name: 'Poveste' }),
    ).toHaveAttribute('href', '/#story')
    expect(
      within(navigation).getByRole('link', { name: 'Meniu' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      screen.getByRole('navigation', { name: 'Categorii din meniu' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('/ buc.')).toHaveLength(2)
  })

  test('translates the full menu without changing prices or product names', () => {
    window.history.replaceState({}, '', '/menu')
    render(<App />)
    const beforePrices = [...document.querySelectorAll('.catalog-price')].map(
      (price) => price.firstChild?.textContent,
    )
    fireEvent.click(
      screen.getByRole('button', { name: /English.*neselectată/ }),
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'A little honey. A whole lot of good.',
    )
    expect(
      screen.getByText(
        'Twisted croissant with honey, cinnamon, and caramelised walnuts.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Honey Twist' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('/ piece')).toHaveLength(2)
    expect(
      [...document.querySelectorAll('.catalog-price')].map(
        (price) => price.firstChild?.textContent,
      ),
    ).toEqual(beforePrices)
  })

  test('provides stable, shared styling hooks for responsive presentation', () => {
    const { container } = render(<App />)

    expect(
      screen.getByRole('link', { name: 'Sari la conținut' }),
    ).toHaveAttribute('href', '#main-content')
    expect(
      screen.getByRole('button', { name: /Română.*selectată/ }),
    ).toHaveTextContent('RO')
    expect(
      screen.getByRole('button', { name: /English.*neselectată/ }),
    ).toHaveTextContent('EN')

    for (const image of screen.getAllByRole('img')) {
      expect(Number(image.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(image.getAttribute('height'))).toBeGreaterThan(0)
    }

    expect(container.querySelectorAll('.section-inner')).toHaveLength(4)
    expect(
      container.querySelector('.honey-hero > .page-container'),
    ).toBeInTheDocument()
  })
})
