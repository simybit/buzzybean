import { useEffect, useRef, useState } from 'react'
import { menuCategories } from '../menuContent'

export function MenuCategoryNav({ label }: { label: string }) {
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.slice(1)
    return menuCategories.some(category => category.id === hash) ? hash : menuCategories[0].id
  })
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    let frame = 0
    const updateActive = () => {
      frame = 0
      const threshold = nav.getBoundingClientRect().bottom + 32
      let current = menuCategories[0].id
      for (const category of menuCategories) {
        const section = document.getElementById(category.id)
        if (section && section.getBoundingClientRect().top <= threshold) current = category.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActive)
    }
    const onHash = () => {
      const hash = window.location.hash.slice(1)
      if (menuCategories.some(category => category.id === hash)) setActive(hash)
    }
    const updateHeight = () => {
      nav.closest<HTMLElement>('.catalog-page')?.style.setProperty('--catalog-nav-height', `${nav.offsetHeight}px`)
    }
    updateHeight()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateHeight)
    observer?.observe(nav)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onHash)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  return (
    <nav className="catalog-category-nav" aria-label={label} ref={navRef}>
      <div className="page-container catalog-category-links">
        {menuCategories.map(category => (
          <a
            key={category.id}
            href={`#${category.id}`}
            aria-current={active === category.id ? 'location' : undefined}
            onClick={() => setActive(category.id)}
          >
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
