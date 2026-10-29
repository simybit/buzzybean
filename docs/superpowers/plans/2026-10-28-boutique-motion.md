# Buzzy Bean boutique refinement

Goal: refine the existing home and full menu with restrained motion and clearer visual hierarchy, preserving every asset, text, product, price, route and language control.

Direction: keep the cream, espresso and honey palette and original lettering. The bee film remains the opening focal point; the invitation beneath becomes an editorial two-column composition with a direct menu action. Story photographs settle gently into place; menu products arrive in short staggered groups. Avoid looping decoration, scroll hijacking and new runtime libraries.

Implementation uses the current React/CSS stack. Work directly in this checkout as requested, retaining pre-existing user edits. No publishing or asset replacement.

- [x] Add and run failing tests for one-shot reveal, live reduced-motion changes, offscreen video suspension and manual playback choices.
- [x] Implement a scoped IntersectionObserver/Web Animations hook with visible defaults and cleanup. Implement preference-aware video lifecycle without scroll-driven React renders.
- [x] Mark existing section content for motion; refine hero composition, photo/card surfaces, control feedback and mobile menu transitions in a dedicated stylesheet. Preserve all original photo sources and crops.
- [x] Run the full tests and production build. Exercise both routes at 1440, 768, 390 and 320 pixels, both languages, keyboard/mobile navigation, deep links, product hover/touch and reduced motion. Inspect screenshots after scrolling every lazy image into view.

Review focus: no permanently hidden content when browser APIs fail; user-paused video stays paused; live preference changes stop active motion; no animation crop drift in combo reference photos; sticky category navigation and mobile menus preserve anchor offsets and keyboard access.

Baseline: 28 tests pass; production build passes. Browser plugin not available; use installed Playwright with Chrome. Public site inspected at https://simybit.github.io/buzzybean/. Baseline screenshots live in tmp/boutique-qa.

## Verification and review

- Final automated suite: 33 passing tests across 8 files; TypeScript and Vite production build pass; git diff whitespace check passes.
- Playwright: both routes at 1440, 768, 390 and 320; no horizontal overflow, undecoded images, hidden reveal content or console errors. RO/EN, 25 menu entries, menu Escape/focus, sticky category/deep-link offsets and photo zoom checked.
- Reduced motion: no autoplay, no active CSS/WAAPI loops; original video remains manually playable. Native playback suspends offscreen and resumes only when not manually paused. Extra failing-then-passing regression test covers queued automatic pause events after rapid scroll return.
- Existing source photography retained byte-for-byte. Added quality-0.94 WebP delivery copies at identical dimensions; originals remain picture fallbacks. Browser currentSrc confirms the WebP sources are used. Delivery weight for these three assets reduced by approximately 72%.
- Independent read-only code review: no critical or important issues; its minor queued-media-event observation was reproduced in a test and fixed.
- Taste inspector final: zero failures with explicit allowances for the original multi-line atmosphere heading, existing practical-information separators and one-shot WAAPI motion (the inspector samples after these finish). These preserve the brief's content and restrained-motion requirements; no extra animation was added to satisfy a motion-count heuristic. Remaining stylistic warnings concern the retained cream palette, original font families/scale, small logo lettering and full-bleed image margins.
- Local implementation only; no commit, push or GitHub Pages deployment performed.
