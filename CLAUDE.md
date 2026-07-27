# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-property rental listing website ("2BHK Apartment for Rent", Chandan Nagar / Kharadi, Pune)
built as a **100% static site — vanilla HTML/CSS/JS, no framework, no build step, no backend, no
dependencies**. Nothing to `npm install`, compile, or transpile.

## Deployment: dual-hosted, Cloudflare is primary

The repo (`alokdhavale/2BHK`, public) deploys to **two** places from the `main` branch:
- **Cloudflare Worker (primary, the URL that's shared):**
  **https://pune-house-rent-chandannagar-kharadi.punehomes.workers.dev**
  Git-connected via Cloudflare "Workers Builds": Build command *None*, **Deploy command `npx wrangler
  deploy`**, root `/`. Every push to `main` auto-publishes. (`punehomes` is the account's chosen
  workers.dev subdomain — it replaced an auto-generated one to keep the owner's name out of the URL.)
- **GitHub Pages (still live, legacy):** https://alokdhavale.github.io/2BHK/ — served from `main`/root.

The site's canonical URL, Open Graph / Twitter preview image, `sitemap.xml`, and `robots.txt` all
hard-code the **workers.dev** URL. If the primary URL ever changes, update all of those together.

**Deploy = just push.** `git add -A && git commit -m "…" && git push` — both hosts rebuild in ~1 min.

### Cloudflare constraints that will bite you (learned the hard way)
- **25 MiB per-file asset limit.** `images/walkthrough.mp4` was 25.6 MiB and *failed* the Cloudflare
  deploy (GitHub Pages allowed it at its 100 MB limit). It was re-encoded with ffmpeg to **11 MiB**
  (`libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart`). **Keep every file < 25 MiB.**
  If you add/replace media, compress first.
- **`.assetsignore`** (repo root) lists paths Cloudflare must NOT serve as public website assets
  (`.git`, `.wrangler`, `node_modules`, `*.md`, etc.). Without it, the git-connected build served the
  whole cloned repo — including `.git/…` — at public URLs. Keep this file; add to it if new non-site
  files land at the repo root.

## Core architecture: CONFIG is the single source of truth

All editable content lives in **one `CONFIG` object at the top of `script.js`** (~lines 14–117).
`index.html` ships with mostly *empty* container elements (identified by `id`); on `DOMContentLoaded`
→ `renderAll()` (script.js ~line 175) injects the content by reading `CONFIG`.

**To change any listing detail (rent, photos, address, contact, pricing, facilities, furniture, terms),
edit `CONFIG` only** — do not hand-edit the rendered HTML. Values still needing real data are marked
`// EDIT:`. `renderAll()` also drives SEO at runtime: it sets `document.title`, the meta description,
the canonical link, and rebuilds the Schema.org JSON-LD (`#ld-json`) from `CONFIG`.

Other `script.js` structure:
- `ICONS` — inline SVG path set + `svgIcon(name)` helper. No icon library/network; add new icons here.
- Behaviour is split into small `init*()` functions (theme, nav, reveal, lightbox, copy, share, print,
  contact form, back-to-top) wired up in the final `DOMContentLoaded` handler.

## SEO is dual-sourced — keep both in sync

- **Static** tags in `index.html <head>` (title, description, Open Graph, Twitter) exist so crawlers and
  WhatsApp/Facebook link-preview scrapers (which don't run JS) see real content.
- **Runtime** copies are re-derived from `CONFIG` by `renderAll()`.
- When the title/description/URL changes, update **both** the `CONFIG` values **and** the static `<head>`
  tags. `og:image` / `twitter:image` **must be absolute URLs** or previews break.

## Content sections (current, in order)

**Home (hero) · Gallery · Video Tour · Property Details · Facilities & Furniture · Location · Pricing · Contact.**
Earlier builds also had Highlights, Amenities, Floor Plan, Nearby Places, and FAQ — these were removed;
"Facilities & Furniture" was later re-added. **Adding/removing a section means touching all of:** the
`index.html` section block, the nav **and** footer links, the `renderAll()` render code, the `CONFIG`
data, and the CSS.

## Images

`images/` holds room photos with descriptive names (`living-room-1.jpg`, `bedroom-1.jpg`, …) plus
`walkthrough.mp4`. Gallery order and captions come from `CONFIG.gallery` — captions repeat on purpose
(two "Living Room", two "Bedroom 1", three "Kitchen"), so the file name and the caption don't always
match one-to-one.

Current set (Jul 2026 refresh, sourced from `../2bhk-updated_files/2bhk/`) covers the living room,
bedrooms, kitchen, utility area and entrance. The **bathroom, toilet, building and parking** shots have
no equivalent in that refresh — they are the older photos, kept on and restored from git history
(commit `cb011d5`) after the refresh initially dropped them. Don't delete them again when new media
lands unless the new set actually replaces them.

The owner supplies iPhone
**`.HEIC`** stills and a **`.MOV`** tour, which must be transcoded before they can go in `images/` —
browsers won't render HEIC. ffmpeg reads HEIC but the tiled iPhone files come through as a *complex*
filtergraph, so `-vf scale=…` in the same command fails ("Simple and complex filtering cannot be used
together"). **Convert in two passes:**
```bash
ffmpeg -i in.HEIC -q:v 2 -update 1 -frames:v 1 tmp.jpg                       # 1) decode at full size
ffmpeg -i tmp.jpg -vf "scale='if(gt(iw,ih),1600,-2)':'if(gt(iw,ih),-2,1600)'" \
       -q:v 4 -update 1 -frames:v 1 out.jpg                                  # 2) then downscale
```
The HEICs carry no EXIF rotation (they decode upright); the `.MOV` does carry `rotation=-90`, which
ffmpeg auto-applies, so the output is correctly portrait.

The older UUID-named camera files that used to sit in the repo root were the previous source copies —
they were git-ignored and have been moved out to `../_old-originals-backup/`. The `.gitignore` patterns
for them are kept in case new camera dumps land at the root; don't commit such files.

## Non-obvious conventions / gotchas

- **No email anywhere.** Contact is phone + WhatsApp only. The enquiry form has **no backend** — it opens
  **WhatsApp** (`wa.me`) with the message pre-filled (`initContactForm`). `CONFIG.contact.whatsapp` is
  country code + number, digits only.
- **Progressive-enhancement reveal:** `.reveal` elements are hidden (`opacity:0`) only under a `.js` class
  that `script.js` adds to `<html>` at startup, so no-JS/SEO sees everything. A 2.5s safety-net timer
  force-reveals content if the IntersectionObserver never fires.
- **`[hidden] { display:none !important }`** in `style.css` is load-bearing: `#lightbox` uses
  `display:grid`, which would otherwise override the `hidden` attribute and show it on page load.
- **Theme** (light/dark) is persisted in `localStorage` and respects `prefers-color-scheme`.

## Commands

```bash
python -m http.server 8123          # local preview at http://127.0.0.1:8123/ (serve over HTTP so
                                    # the map iframe + lazy-loading behave like production)
node --check script.js              # sanity-check the JS (no test suite exists)
git add -A && git commit -m "…" && git push   # deploy (auto-publishes to Cloudflare + GitHub Pages)
```

Headless render/verify check (Chrome path is Windows-specific; the corporate network here may block
`*.workers.dev`/`*.pages.dev`, so verify the live URL from a phone/other network, not this machine):
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-sandbox \
  --dump-dom --virtual-time-budget=3000 "http://127.0.0.1:8123/index.html"
```

Compress a video before committing (needs ffmpeg; installed via `winget install Gyan.FFmpeg`):
```bash
ffmpeg -i in.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart out.mp4
```
