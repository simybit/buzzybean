import type { Language, SiteContent } from '../content'
import { menuCategories, menuPageCopy, type MenuProduct } from '../menuContent'
import { getProductImage } from '../productImages'
import menuPhoto from '../assets/coffee-menu-concept.webp'
import { FlightTrail, Sparks, Wave } from './Visuals'

function ProductArtwork({ product }: { product: MenuProduct }) {
  return (
    <img
      className="product-artwork"
      src={getProductImage(product.id)}
      width="512"
      height="512"
      alt=""
      loading="lazy"
      decoding="async"
    />
  )
}

export function MenuPage({
  language,
  content,
}: {
  language: Language
  content: SiteContent
}) {
  const copy = menuPageCopy[language]

  return (
    <div className="catalog-page">
      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="page-container catalog-hero-inner">
          <div className="catalog-hero-copy">
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
          <div className="catalog-hero-photo media-frame">
            <img
              src={menuPhoto}
              width="1448"
              height="1086"
              alt={content.accessibility.heroImageAlt}
              fetchPriority="high"
            />
          </div>
        </div>
        <Wave className="wave-to-story" />
      </section>

      <nav className="catalog-category-nav" aria-label={copy.categoriesLabel}>
        <div className="page-container catalog-category-links">
          {menuCategories.map((category) => (
            <a key={category.id} href={`#${category.id}`}>
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      {menuCategories.map((category, index) => (
        <section
          className={`catalog-section catalog-section-${category.id}`}
          id={category.id}
          aria-labelledby={`${category.id}-title`}
          key={category.id}
        >
          <div className="page-container">
            <div className="catalog-section-heading">
              <div>
                <h2 id={`${category.id}-title`}>{category.name}</h2>
                <p className="catalog-subtitle">
                  {category.subtitle[language]}
                </p>
              </div>
            </div>
            <ul className="catalog-products">
              {category.products.map((product) => (
                <li className="catalog-product" key={product.id}>
                  <ProductArtwork product={product} />
                  <div className="catalog-product-heading">
                    <h3>{product.name}</h3>
                    <span className="catalog-price">
                      {product.price} <span>lei</span>
                      {product.perPiece && <small>{copy.perPiece}</small>}
                    </span>
                  </div>
                  <p>{product.description[language]}</p>
                </li>
              ))}
            </ul>
          </div>
          <Wave
            className={index % 2 === 0 ? 'wave-to-visit' : 'wave-to-story'}
          />
        </section>
      ))}

      <section className="catalog-contact">
        <div className="page-container catalog-contact-inner">
          <div>
            <h2>{copy.contact}</h2>
            <p>{copy.ingredients}</p>
          </div>
        </div>
        <Wave className="wave-to-footer" />
      </section>
    </div>
  )
}
