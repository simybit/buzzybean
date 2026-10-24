import type { Language, SiteContent } from '../content'
import { Brand } from './Brand'

interface FooterProps {
  content: SiteContent
  language: Language
  setLanguage: (language: Language) => void
  onMenuPage?: boolean
}

export function Footer({
  content,
  language,
  setLanguage,
  onMenuPage = false,
}: FooterProps) {
  const homePrefix = onMenuPage ? import.meta.env.BASE_URL : ''
  return (
    <footer className="site-footer">
      <a
        className="footer-brand"
        href={`${homePrefix}#top`}
        aria-label="Buzzy Bean"
      >
        <Brand wordmarkOnly />
      </a>
      <nav aria-label={content.accessibility.footerNavigation}>
        <a href={`${homePrefix}#story`}>{content.nav.story}</a>
        <a href={`${import.meta.env.BASE_URL}menu/`} aria-current={onMenuPage ? 'page' : undefined}>
          {content.nav.menu}
        </a>
        <a href={`${homePrefix}#visit`}>{content.nav.visit}</a>
      </nav>
      <div className="footer-contact">
        <span className="footer-domain">{content.footer.domain}</span>
        <a href={`mailto:${content.visit.email}`}>{content.visit.email}</a>
      </div>
      <div
        className="footer-languages"
        aria-label={content.accessibility.chooseLanguage}
      >
        <button
          type="button"
          aria-pressed={language === 'ro'}
          onClick={() => setLanguage('ro')}
        >
          RO
        </button>
        <span aria-hidden="true">/</span>
        <button
          type="button"
          aria-pressed={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
      </div>
    </footer>
  )
}
