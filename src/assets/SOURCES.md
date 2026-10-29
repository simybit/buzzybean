# Image sources

## Menu promotional video — 29 October 2026

- `menu-promo.mp4`: owner-supplied
  `Crearea_unui_videoclip_promoțional_751b5644_1080p.mp4`, copied unchanged.
  1920 × 1080, 9.963 seconds, 3,213,532 bytes. Replaces the coffee photograph
  beside the menu introduction. Native controls, muted inline looping playback;
  automatic playback pauses outside the viewport and for reduced motion.
- `menu-promo-poster.webp`: frame at 0.15 seconds, extracted from that video at
  960 × 540 and encoded to WebP quality 85 for the initial preview.

## Honey Hero — 29 October 2026

- Typography refinement: `fonts/shrikhand.ttf`, Shrikhand regular (Google Fonts,
  SIL OFL, retained in `fonts/shrikhand-OFL.txt`), replaces Fraunces in the Hero
  to better match the reference's heavy, rounded, slanted lettering. Original
  font assets are retained. Copy stays live HTML in both languages.

- `honey-hero-scene.webp`: generated with the built-in imagegen tool from the
  owner's `BuzzyBean Café Honey Welcome.png` reference. This is concept imagery,
  not a photograph of actual premises. No navigation, lettering or buttons are
  baked into the delivered image; these are implemented as accessible HTML.
- Generated original: 1774 × 887 PNG; delivery: 1774 × 887 WebP, quality 88,
  165,842 bytes. The original remains in the image generation library.
- Generation prompt: Create a production website HERO PHOTOGRAPHIC ASSET ONLY,
  landscape 2:1. Use the supplied reference with extremely high composition
  fidelity. Remove all text, logo, navigation, labels, buttons, icons and dotted
  trails; no lettering anywhere. Crop away the header entirely. Reconstruct the
  same cozy golden cafe, wooden tabletop, large speckled cappuccino with latte
  art in the lower right-middle, honey-glazed croissant with nuts and berries
  on a plate in the lower middle, honey jar and dipper, daisies. Keep the same
  adorable fluffy golden bee mascot on the far right holding its small white
  coffee cup, closed eyes, delicate translucent wings; fully visible, no
  distorted limbs. Bee in the rightmost 23 percent, cappuccino at 72 percent x /
  72 percent y, pastry at 54 percent x / 87 percent y. Left 48 percent is smooth
  clean warm ivory #FFF4E8 negative space for an HTML headline. Natural cream
  transition at center, no hard edges, wooden table visible across the bottom.
  Rich warm amber cafe bokeh, realistic appetizing food, polished photographic
  CGI mascot matching the reference. No UI, border, text or watermark.
- `fonts/fraunces-800-italic.ttf`: Fraunces, Google Fonts, italic weight 800,
  optical size 72; used only for the Hero title. SIL Open Font License is
  retained in `fonts/fraunces-OFL.txt`.
- Existing `hero-video.mp4` was inspected and preserved. Its portrait cafe
  exterior is available on demand in a native dialog rather than cropped into
  the new landscape scene; no autoplay or initial video download is required.

## Delivery optimization — 28 October 2026

- Added `cafe-interior-selected.optimized.webp`, `cafe-atmosphere-selected.optimized.webp`
  and `sweet-combos-reference.optimized.webp` as browser delivery variants of the
  existing selected photographs. Canvas WebP encoding at quality 0.94, preserving
  the original dimensions, framing and content; no generation or retouching.
- Original JPG/PNG files remain unchanged and serve as `<picture>` fallbacks.
  The same combo crop coordinates are used for both encodings.
- Combined delivery size: 1,089,112 bytes instead of 3,931,407 bytes, approximately
  72% smaller. All other original product assets remain unchanged.

## Animated Buzzy — owner-supplied video

- Source: `bring-the-photo-to-life-with-subtle-zwrag0k4hf.mp4`, supplied by
  the owner. Original: 960×960, H.264, 30 fps, 5.367 seconds, no alpha.
- Website asset: `buzzy-mascot-animated.webp`, 384×384, 12 fps, 126 frames,
  10.5 seconds, looping RGBA WebP at quality 75. Used only by Visit.
  A forward-and-back traversal reuses the original motion without a hard
  endpoint jump; the return leg intentionally reverses the gestures and steam.
- `scripts/prepare-buzzy-animation.py` removes boundary-connected near-white
  background while retaining enclosed pale details. Buzzy-specific component
  bounds remove the cup-handle and elbow background pockets. Edge alpha and
  colour decontamination reduce white fringes. No scene regeneration is used.
- Source-video processing and transparent WebM/PNG alternatives are retained
  locally in `/Users/gunnar/Documents/ChatGPT/edit/buzzy-alpha-preview-v4/`.
  The web loop is packaged by `scripts/package-buzzy-loop.py` and retained in
  `/Users/gunnar/Documents/ChatGPT/edit/buzzy-alpha-optimised-12fps/` (2.80 MB),
  27% smaller than the approved 3.82 MB preview at the same resolution.
  Source remains unchanged. There is no audio track.
- Animated WebP avoids depending on WebM alpha support for website playback.
  The original static mascot is retained for reduced motion, the pause control,
  load failures, and every other existing mascot placement.
- Pausing displays the original still; restarting begins the animation again.

## Interior replacement — owner supplied

- Selected source: `images/kling_20261022_IMAGE_Interior_p_1574_1.png`.
  The owner supplied three new interior candidates and preferred this angle.
  Its window light, white brick, plants, and wooden furniture complement
  the selected `cafe-friends-natural.webp` atmosphere scene.
- Shipped asset: `cafe-interior-natural.webp`, 1600×1109, WebP quality 86.
- Processing: deterministic crop `(0, 0, 2368, 1640)` from the 2368×1760
  source removes the lower watermark strip, followed by proportional resize.
  The scene was not regenerated or retouched.
- Originals remain unchanged in the owner's ignored `images/` folder.
  The previous `cafe-interior-concept.webp` is retained but no longer used by
  the story component. Existing presentation exports remain unchanged.
- This is generated concept imagery, not a photograph of actual premises.

## Atmosphere replacement — owner supplied

- Selected source: `images/kling_20261022_IMAGE_Candid_doc_1501_3.png`.
  The owner supplied three Kling-generated candidates; the selected image
  shows three women and one man sharing coffee and pastry.
- Shipped asset: `cafe-friends-natural.webp`, 1600×1109, WebP quality 86.
- Processing: deterministic crop `(0, 0, 2368, 1640)` from the 2368×1760
  source removes the lower watermark strip, followed by proportional resize.
  No people, expressions, or other scene elements were regenerated or retouched.
- The original files remain unchanged in the owner's ignored `images/` folder.
  The previous `cafe-friends-concept.webp` is retained but no longer used by
  the atmosphere component. Existing presentation exports remain unchanged.
- This remains generated concept imagery, not a photograph of actual Buzzy
  Bean customers or premises.

## Full menu poster — owner supplied

- Source: `WhatsApp Image 2026-10-21 at 18.35.12.jpeg`, supplied by the owner
  for the menu expansion on 21 October 2026.
- The owner approved using its 25 product names, Romanian descriptions, and
  prices for the bilingual menu. English descriptions are translations.
- Reference asset: `menu-poster.webp`, 1024×1536, WebP quality 92. The
  original poster is preserved for provenance, but is not rendered on the site.
- The 25 standalone assets in `products/` were recreated with built-in OpenAI
  Image Gen, using the owner's poster as a visual reference. They are
  illustrative product images, not photographs of actual served dishes.
- Each asset is a text-free, transparent 512×512 WebP (quality 88). Original
  generated PNGs are retained in the local generation output directory.
  Exact prompts are recorded in `design/product-image-prompts.json`.
- All menu text is separately rendered as selectable, accessible HTML.
- Each product and its shared price is defined once in `src/menuContent.ts`.
- The supplied poster does not specify portion weights, complete allergen
  declarations, or dietary certifications; none have been invented.

## Concept fidelity assets — 21 October 2026

The live page now uses the following concept-directed assets. The original
photographs below remain in the repository for reference but are no longer
imported by the site. The new scenes are illustrative generated imagery, not
photographs of an existing Buzzy Bean premises or its customers.

All five assets were created with the built-in OpenAI Image Gen tool. The
approved images in `design/` were supplied as visual references. The supplied
logo was the edit target for the mascot isolation. Each output was inspected
before being converted to local WebP; original source assets were retained.

| Shipped asset | Reference | Prompt brief | Processing |
| --- | --- | --- | --- |
| `coffee-hero-concept.webp` | `design/buzzy-bean-hero-concept.png` | Standalone close-up photograph: large speckled cream ceramic latte and saucer with rosetta art, croissant sandwich behind to the right, oak table, sunlit café window and leafy plants. Portrait 4:5; no words, logos, masks, or borders. | 1122×1402, WebP quality 85 |
| `cafe-interior-concept.webp` | `design/buzzy-bean-story-concept.png` | Standalone café interior photograph: honey oak round tables, woven chairs, caramel banquette, black pendant lamps, abundant plants, black-framed windows, and espresso counter. Golden sunlight, no people, no text or logos. | 1448×1086, WebP quality 85 |
| `cafe-friends-concept.webp` | `design/buzzy-bean-atmosphere-concept.png` | Standalone candid photograph: four adult friends with ceramic cappuccinos and croissants at an oak café table, cream, olive, and rust knitwear, warm sunlit windows and plants, natural anatomy; no words, logos, or graphic masks. | 1448×1086, WebP quality 85 |
| `coffee-menu-concept.webp` | `design/buzzy-bean-sections-concept.png` | Standalone overhead photograph: speckled latte and saucer on the left, golden croissant on a ceramic plate upper right, oak table, linen, and a corner of greenery. Golden natural light; no words, branding, masks, or borders. | 1448×1086, WebP quality 85 |
| `buzzy-mascot.webp` | Supplied transparent logo | Isolate the full coffee-bean bee, wings, antennae, face, gloves, shoes, cup, and steam. Preserve expression, proportions, brown outlines, amber shading, and cream details. Remove lettering, yellow background circle, dashed trails, and surrounding heart. Transparent square canvas; no redesign. | 900×900, WebP quality 95, preserved alpha |

The horizontal brand lockup uses the isolated mascot and live typographic
lettering, following the approved header and footer concepts. The original
supplied logo is preserved as `buzzy-bean-logo.png`.

## Buzzy Bean logo

- Source: supplied by the project owner on 21 October 2026.
- Processing: the outer background was removed with OpenAI Image Gen using the `background-extraction` workflow. The foreground artwork remains the supplied brand identity.

## Hero coffee and pastry

- Photographer: Esra Afşar
- Source: https://unsplash.com/photos/w_1fJQSU1Gw
- Licence: Unsplash License — https://unsplash.com/license
- Local processing: downloaded at 2400 px width and converted to WebP at quality 84.

## Café atmosphere

- Photographer: Brooke Cagle
- Source: https://unsplash.com/photos/PCCpwQWoCL4
- Licence: Unsplash License — https://unsplash.com/license
- Local processing: downloaded at 2400 px width and converted to WebP at quality 84.

## Café interior

- Photographer: Monaz Nazary
- Source: https://unsplash.com/photos/zqVoqDAWZeg
- Licence: Unsplash License — https://unsplash.com/license
- Local processing: downloaded at 2400 px width and converted to WebP at quality 84.

The Unsplash License permits free commercial and non-commercial use. Attribution is not required, but is recorded here for provenance and credit.

## Sweet Combos reference photographs

- `sweet-combos-reference.png`: user-supplied `Buzzy Bean Honey Café Menu.png`,
  provided on 2026-10-25. The user approved using its four photographs for
  Morning Buzz, Little Bee, Honey Delight, and Afternoon Treat.
- The source image is unchanged. `MenuPage.tsx` and `menu.css` frame each
  photograph separately, without displaying the reference's product text.
- All original individual product assets remain in `products/`.

## Typography

- Hero description: Quicksand variable, used locally for the rounded reference
  lettering. Downloaded from Google Fonts on 2026-10-25:
  https://github.com/google/fonts/tree/main/ofl/quicksand
  SIL Open Font License; the licence is stored in `fonts/quicksand-OFL.txt`.

- Current display face: Agbalumo, regular — Google Fonts / Tiro Typeworks,
  licensed under the SIL Open Font License 1.1. Source:
  https://github.com/google/fonts/tree/main/ofl/agbalumo
- `fonts/agbalumo-latin.woff2` retains Latin, Latin Extended (including Romanian
  diacritics), and general punctuation; converted with FontTools and Brotli.
  The original TTF and licence are preserved beside the webfont.
- Baloo 2, weight 800 — Google Fonts, licensed under the SIL Open Font License 1.1.
- DM Sans, weights 400, 600, and 700 — Google Fonts, licensed under the SIL Open Font License 1.1.
- Font source: https://fonts.google.com/
- Licence: https://openfontlicense.org/
