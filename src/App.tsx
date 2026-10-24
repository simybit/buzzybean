import { Atmosphere } from './components/Atmosphere'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuHighlights } from './components/MenuHighlights'
import { MenuPage } from './components/MenuPage'
import { Story } from './components/Story'
import { Visit } from './components/Visit'
import { PhotoShapes } from './components/Visuals'
import { siteContent } from './content'
import { useLanguage } from './useLanguage'

export default function App() {
  const { language, setLanguage } = useLanguage()
  const content = siteContent[language]
  const onMenuPage = /^\/menu(?:\/(?:index\.html)?)?$/.test(
    window.location.pathname.slice(import.meta.env.BASE_URL.length - 1),
  )

  useEffect(() => {
    document.title = onMenuPage
      ? `${language === 'ro' ? 'Meniu' : 'Menu'} — Buzzy Bean Café & Bistro`
      : 'Buzzy Bean Café & Bistro'
  }, [language, onMenuPage])

  return (
    <div className="site-shell">
      <PhotoShapes />
      <a className="skip-link" href="#main-content">
        {content.accessibility.skipToContent}
      </a>
      <Header
        content={content}
        language={language}
        setLanguage={setLanguage}
        onMenuPage={onMenuPage}
      />
      <main id="main-content">
        {onMenuPage ? (
          <MenuPage content={content} language={language} />
        ) : (
          <>
            <Hero content={content} />
            <Story content={content} />
            <MenuHighlights content={content} language={language} />
            <Atmosphere content={content} />
            <Visit content={content} />
          </>
        )}
      </main>
      <Footer
        content={content}
        language={language}
        setLanguage={setLanguage}
        onMenuPage={onMenuPage}
      />
    </div>
  )
}
import { useEffect } from 'react'
