# Premium 2BHK Apartment — Rental Website

A modern, responsive, SEO-friendly **static** website to advertise a 2BHK apartment for rent.
Built with plain **HTML + CSS + vanilla JavaScript** — no backend, no build step, no dependencies.
Host it for free on GitHub Pages, Netlify, or Cloudflare Pages.

---

## ✨ Features

- Premium real-estate design — white / dark-blue / gold theme, large hero, modern cards
- Fully responsive (mobile-first) with sticky nav + hamburger menu
- **Dark mode** toggle (remembers your choice)
- Photo **gallery** with fullscreen lightbox (keyboard + swipe-friendly)
- Embedded **video tour**
- Amenities, furniture, facilities, floor plan, nearby places
- Pricing card + FAQ accordion
- Contact form that opens the visitor's **email app** (no backend needed)
- Floating **WhatsApp / Call / Back-to-top** buttons
- Copy phone, copy address, WhatsApp share, native share, **Print / Save-as-PDF** brochure
- SEO: meta tags, Open Graph, Twitter cards, **Schema.org** structured data
- Fast loading: lazy-loaded images, no external libraries, scroll-reveal animations
- Accessibility: semantic HTML, skip link, ARIA, keyboard support, reduced-motion support

---

## 🛠 Editing everything from ONE place

All content lives in a single `CONFIG` object at the **top of `script.js`**.
Open `script.js`, edit the values, save, and the whole site updates.

Everything marked `// EDIT:` is a placeholder you should replace before going live:

| What | Where in CONFIG |
|---|---|
| Owner name, phone, WhatsApp, email, call time | `CONFIG.contact` |
| Rent, deposit, maintenance, brokerage, lease | `CONFIG.pricing` |
| Area, floor, building, locality, availability | `CONFIG.property` |
| Google Map + public URL | `CONFIG.site` |
| Nearby-place distances | `CONFIG.nearby` |
| Photos & captions | `CONFIG.gallery` |

> **WhatsApp number format:** digits only with country code, e.g. `919812345678`.

The furniture, facilities and terms lists are already filled with the real details you provided.

### Google Map
In `CONFIG.site.mapEmbedSrc`, paste the embed URL for your exact address:
Google Maps → search your address → **Share** → **Embed a map** → copy the `src="..."` value.

### Floor plan
Drop your floor-plan image into the `images/` folder named **`floor-plan.png`**
(or change `CONFIG.floorPlan.image`). Until then the Floor Plan section shows a helpful note.

### Photos
Replace the files in `images/` (keep the same names), or edit the `CONFIG.gallery` list to
point at new filenames. The first gallery image is also used as the hero background.

---

## ▶️ Preview locally

Just open `index.html` in a browser. For the map iframe and lazy loading to behave exactly
like production, serve it over HTTP:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

---

## 🚀 Deploy (all free, no server code)

### GitHub Pages
1. Create a repo and push these files to the `main` branch.
2. Repo → **Settings → Pages** → Source: `Deploy from a branch` → `main` / `/root` → Save.
3. Your site: `https://<username>.github.io/<repo>/`.

### Netlify
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually** and drag this folder in
   (or connect the Git repo). Build command: *(none)*. Publish directory: `/`.

### Cloudflare Pages
1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages**.
2. Connect the repo (or **Direct Upload** this folder). Framework preset: **None**. Build output: `/`.

> **After deploying**, update the public URL in three places so SEO/sharing work correctly:
> `CONFIG.site.canonicalUrl` (in `script.js`), `sitemap.xml`, and `robots.txt` (plus the
> `og:url` / `og:image` in `index.html` if you want absolute image URLs for social previews).

---

## 📁 Files

```
index.html      Page markup + SEO head (content hydrated from CONFIG)
style.css       Theme, layout, responsive rules, print/PDF styles
script.js       CONFIG object (edit here) + all behavior
images/         Photos + walkthrough.mp4 (+ your floor-plan.png)
404.html        Branded not-found page
robots.txt      Search-engine directives
sitemap.xml     Sitemap
favicon.svg     Site icon
README.md       This file
```

## ➕ Adding more properties later

The code is structured for growth: `CONFIG.properties` is an array reserved for additional
listings. The current page renders the single primary property; to support multiple listings
you can move each property into that array and extend the rendering in `script.js` (e.g. a
listings grid + per-property pages) without changing the overall architecture.
