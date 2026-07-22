# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-property rental listing website ("Premium 2BHK Apartment for Rent", Kharadi, Pune) built as a
**100% static site — vanilla HTML/CSS/JS, no framework, no build step, no backend, no dependencies**.
It is hosted free on **GitHub Pages** and is live at **https://alokdhavale.github.io/2BHK/**
(repo `alokdhavale/2BHK`, served from `main` branch root). There is nothing to `npm install`, compile, or transpile.

## Core architecture: CONFIG is the single source of truth

All editable content lives in **one `CONFIG` object at the top of `script.js`** (roughly lines 14–97).
`index.html` ships with mostly *empty* container elements (identified by `id`), and on
`DOMContentLoaded` → `renderAll()` (script.js:169) injects the content by reading `CONFIG`.

Consequence: **to change any listing detail (rent, photos, address, contact, pricing, terms), edit
`CONFIG` only** — do not hand-edit the rendered HTML. Values still needing real data are marked with
`// EDIT:` comments. The flow is:

```
CONFIG (script.js)  ──renderAll()──►  fills #hero-*, #gallery-grid, #details-table,
                                       #pricing-body, #contact-card, #ld-json, etc.
```

Other `script.js` structure worth knowing before editing:
- `ICONS` — an inline SVG path set + `svgIcon(name)` helper. No icon library/network; add new icons here.
- Behaviour is split into small `init*()` functions (theme, nav, reveal, lightbox, copy, share, print,
  contact form, back-to-top) all wired up in the final `DOMContentLoaded` handler (script.js:503).
- `renderAll()` also **drives SEO at runtime**: it sets `document.title`, the meta description,
  the canonical link, and rebuilds the Schema.org JSON-LD (`#ld-json`) from `CONFIG`.

## SEO is dual-sourced — keep both in sync

- **Static** tags in `index.html <head>` (title, description, Open Graph, Twitter card) exist so crawlers
  and WhatsApp/Facebook link-preview scrapers (which don't run JS) see real content.
- **Runtime** copies are re-derived from `CONFIG` by `renderAll()`.
- When the property title/description/URL changes, update **both** the `CONFIG` values *and* the static
  `<head>` tags in `index.html`. `og:image` / `twitter:image` **must be absolute URLs**
  (`https://alokdhavale.github.io/2BHK/images/...`) or previews break.

## Content sections (current)

Nav/sections, in order: **Home (hero) · Gallery · Video Tour · Property Details · Location · Pricing · Contact**.
Earlier builds also had Highlights, Amenities, Floor Plan, Nearby Places, and FAQ — these were removed on
request. If asked to remove/add a section, it must be cleaned/added in **all four places**: the `index.html`
section block, the nav + footer links, the `renderAll()` render code, the `CONFIG` data, and its CSS.

## Images

`images/` holds room photos with descriptive names (`living-room-1.jpg`, `bedroom-1.jpg`, `kitchen-1.jpg`,
`walkthrough.mp4`, …). The gallery order and captions come from `CONFIG.gallery`. The original
camera files (UUID-named `.jpg`/`.mp4` in the repo root) are the source copies and are **git-ignored**
(see `.gitignore`) so they don't bloat the deploy — don't commit them.

## Non-obvious conventions / gotchas

- **Progressive enhancement for reveal animations:** `.reveal` elements are only hidden (`opacity:0`) under
  a `.js` class that `script.js` adds to `<html>` at startup. Without JS, everything is visible (SEO/no-JS
  safe). There is also a 2.5s safety-net timer that force-reveals content if the IntersectionObserver never fires.
- **`[hidden] { display:none !important }`** in `style.css` is load-bearing: the lightbox uses `#lightbox`
  with `display:grid`, which would otherwise override the `hidden` attribute and show it on page load.
- **The enquiry form has no backend** — it opens **WhatsApp** (`wa.me`) with the message pre-filled
  (`initContactForm`). Phone/WhatsApp come from `CONFIG.contact` (`whatsapp` = country code + number, digits only).
- **Theme** (light/dark) is persisted in `localStorage` and respects `prefers-color-scheme`.
- The `github.io` URL path is **case-sensitive**: it is `/2BHK/` (matching the repo name), not `/2bhk/`.

## Commands

Preview locally (serve over HTTP so the map iframe and lazy-loading behave like production):
```bash
python -m http.server 8123    # then open http://127.0.0.1:8123/
```

Sanity-check the JS (no test suite exists):
```bash
node --check script.js
```

Headless render check (verifies JS hydration + captures a screenshot; Chrome path is Windows-specific):
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-sandbox \
  --dump-dom --virtual-time-budget=3000 "http://127.0.0.1:8123/index.html"
```

Deploy an update (GitHub Pages rebuilds automatically ~1 min after push):
```bash
git add -A && git commit -m "update listing" && git push
```

Hosting notes: free GitHub Pages **requires the repo to be public**. Pages is enabled via the API against
`repos/alokdhavale/2BHK/pages` (source: `main` / `/`). `robots.txt`, `sitemap.xml`, and the `<head>` canonical
URL all hard-code the live URL — update them if the repo/host/URL ever changes.
