import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ClipboardList, House, MapPin } from 'lucide-react'

import { siteContent, type Language, type SiteContent } from '../content'
import { Brand } from './Brand'

interface HeaderProps {
  content: SiteContent
  language: Language
  setLanguage: (language: Language) => void
  onMenuPage?: boolean
}

export function Header({
  content,
  language,
  setLanguage,
  onMenuPage = false,
}: HeaderProps) {
  const homePrefix = onMenuPage ? import.meta.env.BASE_URL : ''
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (onMenuPage) return
    let frame = 0
    const update = () => {
      frame = 0
      const threshold = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + window.innerHeight * 0.25
      let active = ''
      for (const id of ['story', 'menu', 'visit']) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= threshold) active = id
      }
      setActiveSection(active)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onHash = () => {
      const id = window.location.hash.slice(1)
      if (['story', 'menu', 'visit'].includes(id)) setActiveSection(id)
      else schedule()
    }
    update()
    onHash()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', onHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', onHash)
    }
  }, [onMenuPage])

  useEffect(() => {
    if (!menuOpen) return

    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const dismissOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', dismissOnEscape)
    document.addEventListener('pointerdown', dismissOutside)
    return () => {
      document.removeEventListener('keydown', dismissOnEscape)
      document.removeEventListener('pointerdown', dismissOutside)
    }
  }, [menuOpen])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateOffset = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.getBoundingClientRect().height}px`,
      )
    }

    updateOffset()
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(updateOffset)
    observer?.observe(header)

    return () => {
      observer?.disconnect()
      document.documentElement.style.removeProperty('--header-height')
    }
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="page-container header-inner">
        <a
          className="brand-link"
          href={`${homePrefix}#top`}
          aria-label="Buzzy Bean"
          onClick={() => setMenuOpen(false)}
        >
          <Brand />
        </a>

        <button
          className="menu-toggle"
          ref={toggleRef}
          type="button"
          aria-label={
            menuOpen
              ? content.accessibility.closeMenu
              : content.accessibility.openMenu
          }
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div className="header-menu" id="header-menu" data-open={menuOpen}>
          <nav
            className="primary-nav"
            aria-label={content.accessibility.mainNavigation}
            onClick={() => setMenuOpen(false)}
          >
            <a href={`${homePrefix}#story`} aria-current={!onMenuPage && activeSection === 'story' ? 'location' : undefined}>
              <House aria-hidden="true" strokeWidth={1.7} /><span>{content.nav.story}</span>
            </a>
            <a href={`${import.meta.env.BASE_URL}menu/`} aria-current={onMenuPage ? 'page' : activeSection === 'menu' ? 'location' : undefined}>
              <ClipboardList aria-hidden="true" strokeWidth={1.7} /><span>{content.nav.menu}</span>
            </a>
            <a href={`${homePrefix}#visit`} aria-current={!onMenuPage && activeSection === 'visit' ? 'location' : undefined}>
              <MapPin aria-hidden="true" strokeWidth={1.7} /><span>{content.nav.visit}</span>
            </a>
          </nav>

          <div
            className="language-switcher"
            role="group"
            aria-label={content.accessibility.chooseLanguage}
          >
            {(['ro', 'en'] as const).map((option) => {
              const isSelected = language === option
              const optionContent = siteContent[language].accessibility
              const label = `${optionContent.languageOptions[option]} — ${
                isSelected ? optionContent.selected : optionContent.notSelected
              }`

              return (
                <button
                  key={option}
                  type="button"
                  aria-label={label}
                  aria-pressed={isSelected}
                  onClick={() => setLanguage(option)}
                >
                  {option.toUpperCase()}
                </button>
              )
            })}
          </div>

          <a
            className="button button-small header-action"
            href={`${homePrefix}#visit`}
            onClick={() => setMenuOpen(false)}
          >
            {content.nav.primaryAction}
            <ArrowRight aria-hidden="true" strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </header>
  )
}
