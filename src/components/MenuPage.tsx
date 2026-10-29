import { useRef, type CSSProperties } from 'react'
import type { Language, SiteContent } from '../content'
import { menuCategories, menuPageCopy, type MenuProduct } from '../menuContent'
import { getProductImage } from '../productImages'
import menuPhoto from '../assets/menu-promo-poster.webp'
import menuPromo from '../assets/menu-promo.mp4'
import { useAmbientVideo } from '../usePageMotion'
import comboReference from '../assets/sweet-combos-reference.png'
import comboReferenceWebp from '../assets/sweet-combos-reference.optimized.webp'
import { FlightTrail, Sparks, Wave } from './Visuals'
import { MenuCategoryNav } from './MenuCategoryNav'

// Display the four approved photographs directly from the supplied reference.
// The source stays intact; CSS frames only each photograph, excluding menu text.
const comboPhotos: Record<string, { x: number; y: number; width: number }> = {
  'morning-buzz': { x: 43, y: 344, width: 458 },
  'little-bee': { x: 530, y: 344, width: 455 },
  'honey-delight': { x: 43, y: 918, width: 458 },
  'afternoon-treat': { x: 530, y: 918, width: 455 },
}

function ProductArtwork({ product }: { product: MenuProduct }) {
  const photo = comboPhotos[product.id]
  const cropStyle = photo ? {
    '--photo-width': `${1024 / photo.width * 100}%`,
    '--photo-left': `${-photo.x / photo.width * 100}%`,
    '--photo-top': `${-photo.y / (photo.width / 1.53) * 100}%`,
  } as CSSProperties : undefined

  return (
    <div className={`catalog-product-image${photo ? ' catalog-reference-photo' : ''}`} style={cropStyle}>
      <div className="product-image-inner">
        <picture>
          {photo && <source srcSet={comboReferenceWebp} type="image/webp" />}
          <img
            className="product-artwork"
            src={photo ? comboReference : getProductImage(product.id)}
            width={photo ? 1024 : 512}
            height={photo ? 1536 : 512}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  )
}

function CardAccent({ index }: { index: number }) {
  const paths = [
    'M23 51c-8-3-10-13-6-20s13-9 18-3 0 21-12 23Zm-7-7c8-1 10-8 14-14M48 65c-8-3-10-13-6-20s13-9 18-3 0 21-12 23Zm-7-7c8-1 10-8 14-14',
    'M23 59c-9-21-2-33 4-27 4 4 2 12 2 12s9-13 15-7-5 18-17 25m20-4 10-4',
    'M26 25 39 18 52 25v15l-13 8-13-8Zm-13 23 13-8 13 8v15l-13 8-13-8Zm26 0 13-8 13 8v15l-13 8-13-8Z',
  ]
  return (
    <svg className="catalog-card-accent" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[index % paths.length]} />
    </svg>
  )
}

export function MenuPage({
  language,
}: {
  language: Language
  content: SiteContent
}) {
  const copy = menuPageCopy[language]
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useAmbientVideo(videoRef)

  return (
    <div className="catalog-page">
      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="page-container catalog-hero-inner">
          <div className="catalog-hero-copy" data-reveal="text">
            <a className="catalog-back" href={import.meta.env.BASE_URL}>
              <span aria-hidden="true">←</span>
              {copy.backHome}
            </a>
            <h1 id="catalog-title">
              {copy.title} <span>{copy.accent}</span>
              <Sparks />
            </h1>
            <p>{copy.introduction}</p>
            <FlightTrail />
          </div>
          <div className="catalog-hero-photo media-frame" data-reveal="photo">
            <video
              ref={videoRef}
              src={menuPromo}
              poster={menuPhoto}
              width="1920"
              height="1080"
              aria-label={language === 'ro' ? 'Video promoțional Buzzy Bean' : 'Buzzy Bean promotional video'}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </div>
        <Wave className="wave-to-story" />
      </section>

      <MenuCategoryNav label={copy.categoriesLabel} />

      {menuCategories.map((category) => (
        <section
          className={`catalog-section catalog-section-${category.id}`}
          id={category.id}
          aria-labelledby={`${category.id}-title`}
          key={category.id}
        >
          <div className="page-container">
            <div className="catalog-section-heading" data-reveal="text">
              <div>
                <h2 id={`${category.id}-title`}>{category.name}</h2>
                <p className="catalog-subtitle">
                  {category.subtitle[language]}
                </p>
              </div>
            </div>
            <ul className="catalog-products">
              {category.products.map((product, index) => (
                <li className="catalog-product" key={product.id} data-reveal="product" data-reveal-delay={(index % 3) * 60}>
                  <ProductArtwork product={product} />
                  <div className="catalog-product-copy">
                    <h3>{product.name}</h3>
                    <span className="catalog-price">
                      {product.price} <span>lei</span>
                      {product.perPiece && <small>{copy.perPiece}</small>}
                    </span>
                    <p>{product.description[language]}</p>
                    <CardAccent index={index} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

    </div>
  )
}
