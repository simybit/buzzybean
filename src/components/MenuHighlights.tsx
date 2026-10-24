import type { Language, SiteContent } from '../content'
import { menuCategories, menuPageCopy } from '../menuContent'
import menuPhoto from '../assets/coffee-menu-concept.webp'
import { BrushHeading, Sparks, Wave } from './Visuals'

interface MenuHighlightsProps {
  content: SiteContent
  language: Language
}

export function MenuHighlights({ content, language }: MenuHighlightsProps) {
  return (
    <section className="menu section" id="menu" aria-labelledby="menu-title">
      <div className="page-container section-inner menu-inner">
        <div className="menu-heading-row">
          <Sparks className="menu-sparks" />
          <BrushHeading
            id="menu-title"
            title={content.menu.title}
            leadingWords={content.languageName === 'Română' ? 2 : 3}
          />
          <div className="menu-photo media-frame" aria-hidden="true">
            <img
              src={menuPhoto}
              width="1448"
              height="1086"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
        <ul className="menu-list" role="list">
          {menuCategories.map((category) => (
            <li key={category.id}>
              <h3>
                <a href={`/menu/#${category.id}`}>{category.name}</a>
              </h3>
            </li>
          ))}
        </ul>
        <a className="button full-menu-action" href="/menu/">
          {menuPageCopy[language].fullMenu}
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <Wave className="wave-to-atmosphere" />
    </section>
  )
}
