/* ==========================================================================
   Premium 2BHK Rental Website — script.js
   --------------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH:
   Edit the CONFIG object below to update the ENTIRE website from one place.
   Anything marked  // EDIT:  is a placeholder you should replace with your
   real details before going live. Everything else is real info supplied by
   the owner and can be left as-is.

   The site is 100% static (no backend). All rendering happens in the browser
   from this CONFIG object on page load.
   ========================================================================== */

const CONFIG = {
  /* ---- Site-level settings ---------------------------------------------- */
  site: {
    brandName: "2BHK Rentals",
    // EDIT: set this to your final public URL after you deploy (used for SEO/sharing)
    canonicalUrl: "https://pune-house-rent-chandannagar-kharadi.punehomes.workers.dev/",
    // EDIT: paste a Google Maps "Embed a map" iframe SRC for your exact address.
    // (Google Maps -> Share -> Embed a map -> copy the src="..." value)
    // The default below points to Pune city as a safe placeholder.
    mapEmbedSrc:
      "https://www.google.com/maps?q=18.5601622,73.9288792&z=16&output=embed",
  },

  /* ---- Core property info ----------------------------------------------- */
  property: {
    title: "2BHK Apartment for Rent",
    subheadline:
      "A bright, fully furnished 2BHK home — move-in ready with modular kitchen, wardrobes and reserved car parking.",
    city: "Pune, Maharashtra",
    locality: "Sai Nagari, Chandan Nagar, Kharadi", // EDIT
    address: "Amruta Makeup Studio & Academy, Lane No. 13, behind Satav Auto Garage, Sai Nagari, Chandan Nagar, Kharadi, Pune, Maharashtra 411014",
    furnishing: "Fully Furnished",
    areaSqft: "950", // carpet/built-up area in sq.ft
    floor: "1st Floor",
    building: "Near Amruta Makeup Studio & Academy", // EDIT
    bedrooms: 2,
    bathrooms: 1,
    toilets: 1,
    availability: "Available Now", // EDIT if needed
  },

  /* ---- Owner / contact details (ALL placeholders — replace these) ------- */
  contact: {
    ownerName: "Alok",
    phone: "+91 98814 16624", // EDIT: real phone (used for Call button)
    whatsapp: "919881416624", // EDIT: country code + number, digits only (e.g. 919812345678)
    callTime: "10:00 AM – 8:00 PM", // EDIT: preferred call time
  },

  /* ---- Pricing (placeholders — replace the numbers) --------------------- */
  pricing: {
    rent: "₹ 25,000 / month", // EDIT
    deposit: "₹ 75,000", // EDIT
    maintenance: "₹ 500 / month", // EDIT (or "Included")
    brokerage: "No Brokerage", // EDIT
    availableFrom: "Immediate", // EDIT
    leaseDuration: "11 Months (renewable)", // EDIT
    negotiable: true, // shows a "Negotiable" badge when true
  },

  /* ---- Facilities (REAL — supplied by owner) ---------------------------- */
  facilities: [
    "Solar hot water (as per availability)",
    "Internet setup available (tenant recharges the plan)",
    "RO water purifier provided (tenant maintains it)",
    "Reserved car parking available",
  ],

  /* ---- Furniture included (REAL — supplied by owner) -------------------- */
  furniture: [
    "TV unit",
    "Sofa",
    "Complete kitchen setup",
    "2 Wardrobes",
    "1 Dressing table",
    "1 Bed",
    "Store unit in dry balcony",
    "Shoe rack",
  ],

  /* ---- Charges / terms to note (REAL — supplied by owner) --------------- */
  terms: [
    "Electricity (light) bill is billed separately",
    "Shared staircase-area cleaning charge (staircase between the two flats)",
  ],

  /* ---- Photo gallery ----------------------------------------------------- */
  gallery: [
    { src: "images/living-room-1.jpg", caption: "Living Room", alt: "Spacious living room with wooden false ceiling and seating" },
    { src: "images/living-room-2.jpg", caption: "Living Room", alt: "Living room with wooden TV panel wall and diwan" },
    { src: "images/bedroom-1.jpg", caption: "Bedroom 1", alt: "Bedroom 1 with bed, window and corner glass shelf" },
    { src: "images/bedroom-1-wardrobe.jpg", caption: "Bedroom 1", alt: "Bedroom 1 with full-height built-in wardrobe" },
    { src: "images/bedroom-2.jpg", caption: "Bedroom 2", alt: "Bedroom 2 with wardrobe, mirror and ceiling fan" },
    { src: "images/kitchen-1.jpg", caption: "Kitchen", alt: "Modular kitchen with sink, granite counter and RO purifier" },
    { src: "images/kitchen-2.jpg", caption: "Kitchen", alt: "Kitchen counter with overhead cabinets and balcony access" },
    { src: "images/kitchen-3.jpg", caption: "Kitchen", alt: "Kitchen crockery unit and extra storage cabinets" },
    { src: "images/bathroom.jpg", caption: "Bathroom", alt: "Tiled bathroom with overhead shower, mixer tap and window" },
    { src: "images/toilet.jpg", caption: "Toilet", alt: "Separate toilet with cistern, tiled walls and window" },
    { src: "images/utility-area.jpg", caption: "Utility Area", alt: "Dry balcony utility area with storage and drying hooks" },
    { src: "images/entrance.jpg", caption: "Entrance", alt: "Flat entrance door and shared landing with shoe unit" },
    { src: "images/building-lobby.jpg", caption: "Building", alt: "Building entrance at street level with covered two-wheeler space" },
    { src: "images/parking.jpg", caption: "Parking", alt: "Reserved car parking in the gated compound" },
  ],

  /* ---- Video walkthrough ------------------------------------------------- */
  video: {
    src: "images/walkthrough.mp4",
    poster: "images/living-room-1.jpg",
  },

  /* ---- Future ready: additional properties ------------------------------
     To list another property later, push another object shaped like the
     `property` block into this array and extend the rendering as needed.    */
  properties: [],
};

/* ==========================================================================
   Inline SVG icon set (no external icon library — keeps it fast & offline)
   ========================================================================== */
const ICONS = {
  bed: '<path d="M2 9V6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3"/><path d="M2 12h20v6"/><path d="M4 18v2M20 18v2"/><path d="M6 9V7h5v2M13 9V7h5v2"/>',
  bath: '<path d="M4 12V6a2 2 0 0 1 2-2h1"/><path d="M2 12h20v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><path d="M6 18v2M18 18v2"/><circle cx="8" cy="6" r="1.2"/>',
  sofa: '<path d="M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/><path d="M2 12a2 2 0 0 1 2 2v2h16v-2a2 2 0 0 1 2-2"/><path d="M4 18v2M20 18v2"/>',
  kitchen: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M4 9h16"/><path d="M8 5v2M12 5v2"/><path d="M8 13v4"/>',
  balcony: '<path d="M4 10h16v11H4z"/><path d="M4 14h16M9 14v7M15 14v7"/><path d="M8 10V6h8v4"/>',
  parking: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  lift: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M12 3v18"/><path d="M8.5 9l1.5-2 1.5 2M8.5 15l1.5 2 1.5-2"/>',
  power: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  water: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  furnished: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 20v-6"/>',
  area: '<path d="M3 3h18v18H3z"/><path d="M3 9h6V3M21 15h-6v6"/>',
  floor: '<path d="M4 21V8l8-5 8 5v13"/><path d="M4 13h16M4 17h16"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2"/><path d="M10 22v-4h4v4"/>',
  gym: '<path d="M6.5 6.5l11 11M4 8l2-2 3 3-2 2zM20 16l-2 2-3-3 2-2z"/><path d="M2 10l2-2M22 14l-2 2"/>',
  pool: '<path d="M2 18c2 0 2 1.5 4 1.5S8 18 10 18s2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 14c2 0 2 1.5 4 1.5S8 14 10 14"/><path d="M7 12V5a2 2 0 0 1 4 0v9M15 12V5a2 2 0 0 1 4 0"/>',
  garden: '<path d="M12 20v-6"/><path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5zM12 14c3 0 5-2 5-5-3 0-5 2-5 5z"/><path d="M6 20h12"/>',
  play: '<circle cx="12" cy="5" r="2"/><path d="M12 7v6M8 20l4-7 4 7M5 11l7-2 7 2"/>',
  club: '<path d="M3 21V10l9-6 9 6v11z"/><path d="M9 21v-6h6v6"/>',
  cctv: '<path d="M3 7l14-3 1 4-14 3z"/><path d="M4 8l1 4M17 8v5a3 3 0 0 1-3 3H8"/>',
  intercom: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M9 6h6M9 10h6"/><circle cx="12" cy="16" r="1.5"/>',
  gas: '<path d="M12 2c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 1-1 1 1a5 5 0 1 1-8 3c0-5 5-6 5-11z"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0"/><circle cx="12" cy="19" r="1.2"/>',
  pet: '<circle cx="5.5" cy="12" r="1.6"/><circle cx="9.5" cy="8" r="1.6"/><circle cx="14.5" cy="8" r="1.6"/><circle cx="18.5" cy="12" r="1.6"/><path d="M12 12c-2.5 0-4 2-4 4a3 3 0 0 0 8 0c0-2-1.5-4-4-4z"/>',
  school: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c0 1 2 2 5 2s5-1 5-2v-5"/><path d="M21 9v5"/>',
  hospital: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 7v6M9 10h6"/>',
  metro: '<rect x="5" y="3" width="14" height="13" rx="2"/><path d="M5 10h14"/><path d="M7 19l-1.5 2M17 19l1.5 2"/><circle cx="8.5" cy="13" r="1"/><circle cx="15.5" cy="13" r="1"/>',
  bus: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M4 11h16"/><path d="M6 20l1-4M18 20l-1-4"/><circle cx="8" cy="13.5" r="0.8"/><circle cx="16" cy="13.5" r="0.8"/>',
  mall: '<path d="M4 8h16l-1 12H5z"/><path d="M8 8a4 4 0 0 1 8 0"/>',
  market: '<path d="M4 8h16l-1 4H5z"/><path d="M5 12v8h14v-8"/><path d="M9 20v-5h6v5"/>',
  pharmacy: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  bank: '<path d="M3 10l9-6 9 6z"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  airport: '<path d="M2 16l20-6-3-2-6 2-5-6-2 1 2 6-4 1-2-2-1 1z"/>',
  train: '<rect x="6" y="3" width="12" height="14" rx="2"/><path d="M6 11h12"/><path d="M8 20l-2 2M16 20l2 2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
};

function svgIcon(name, cls = "icon") {
  const body = ICONS[name] || ICONS.check;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* ==========================================================================
   Small helpers
   ========================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const el = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function waLink(number, text) {
  const digits = String(number).replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
function telLink(phone) {
  return "tel:" + String(phone).replace(/[^\d+]/g, "");
}

/* ==========================================================================
   Rendering
   ========================================================================== */
function renderAll() {
  const p = CONFIG.property;
  const c = CONFIG.contact;
  const enquiryText = `Hi, I'm interested in the "${p.title}" (${p.city}). Is it still available?`;

  // ---- SEO sync (title / meta / canonical) ----
  document.title = `${p.title} · ${p.city} | ${CONFIG.site.brandName}`;
  const metaDesc = $('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${p.title} in ${p.city}. ${p.subheadline} Rent ${CONFIG.pricing.rent}. ${p.furnishing}.`);
  const canonical = $('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", CONFIG.site.canonicalUrl);

  // ---- Brand ----
  $$(".brand-name").forEach((n) => (n.textContent = CONFIG.site.brandName));
  $("#year").textContent = "2024–2026"; // static range; harmless if left

  // ---- Hero ----
  $("#hero-title").textContent = p.title;
  $("#hero-sub").textContent = p.subheadline;
  $("#hero-meta").innerHTML = `
    <span>${svgIcon("floor", "icon-sm")} ${esc(p.city)}</span>
    <span>${svgIcon("power", "icon-sm")} ${esc(CONFIG.pricing.rent)}</span>
    <span>${svgIcon("check", "icon-sm")} ${esc(p.availability)}</span>`;
  $("#hero").style.setProperty("--hero-img", `url("${CONFIG.gallery[0].src}")`);

  // Hero + floating + contact action buttons
  const callHref = telLink(c.phone);
  const waHref = waLink(c.whatsapp, enquiryText);
  $$('[data-action="call"]').forEach((a) => (a.href = callHref));
  $$('[data-action="whatsapp"]').forEach((a) => (a.href = waHref));

  // ---- Gallery ----
  $("#gallery-grid").innerHTML = CONFIG.gallery
    .map(
      (g, i) => `
      <figure class="gallery-item reveal" data-index="${i}">
        <img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" width="600" height="400">
        <figcaption>${esc(g.caption)}</figcaption>
      </figure>`
    )
    .join("");

  // ---- Video ----
  const v = $("#video");
  v.poster = CONFIG.video.poster;
  $("#video-src").src = CONFIG.video.src;
  v.load();

  // ---- Property details table ----
  $("#details-table").innerHTML = [
    ["Configuration", `${p.bedrooms} BHK`],
    ["Bedrooms", p.bedrooms],
    ["Bathrooms", p.bathrooms],
    ["Toilets", p.toilets],
    ["Furnishing", p.furnishing],
    ["Area", p.areaSqft + " sq.ft"],
    ["Floor", p.floor],
    ["Building", p.building],
    ["Locality", p.locality],
    ["City", p.city],
    ["Availability", p.availability],
  ]
    .map(([k, val]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(val)}</td></tr>`)
    .join("");

  // ---- Facilities + Furniture ----
  $("#facilities-list").innerHTML = CONFIG.facilities
    .map((f) => `<li>${svgIcon("check", "icon-sm")}<span>${esc(f)}</span></li>`)
    .join("");
  $("#furniture-list").innerHTML = CONFIG.furniture
    .map((f) => `<li>${svgIcon("check", "icon-sm")}<span>${esc(f)}</span></li>`)
    .join("");

  // ---- Location ----
  $("#map-frame").src = CONFIG.site.mapEmbedSrc;
  $("#address-text").textContent = p.address || `${p.building}, ${p.locality}, ${p.city}`;

  // ---- Pricing ----
  const pr = CONFIG.pricing;
  $("#pricing-body").innerHTML = [
    ["Monthly Rent", pr.rent],
    ["Security Deposit", pr.deposit],
    ["Maintenance", pr.maintenance],
    ["Brokerage", pr.brokerage],
    ["Available From", pr.availableFrom],
    ["Lease Duration", pr.leaseDuration],
  ]
    .map(([k, val]) => `<div class="price-row"><span>${esc(k)}</span><strong>${esc(val)}</strong></div>`)
    .join("");
  $("#pricing-negotiable").hidden = !pr.negotiable;
  $("#terms-list").innerHTML = CONFIG.terms.map((t) => `<li>${svgIcon("check", "icon-sm")}<span>${esc(t)}</span></li>`).join("");

  // ---- Contact card ----
  $("#contact-card").innerHTML = `
    <h3>${esc(c.ownerName)}</h3>
    <p class="muted">Owner</p>
    <ul class="contact-lines">
      <li>${svgIcon("intercom", "icon-sm")} <a href="${callHref}" id="phone-link">${esc(c.phone)}</a>
        <button class="copy-btn" data-copy="${esc(c.phone)}" aria-label="Copy phone number">Copy</button></li>
      <li>${svgIcon("check", "icon-sm")} Preferred call time: ${esc(c.callTime)}</li>
    </ul>
    <div class="contact-actions">
      <a class="btn btn-primary" data-action="call" href="${callHref}">${svgIcon("intercom", "icon-sm")} Call</a>
      <a class="btn btn-whatsapp" data-action="whatsapp" href="${waHref}" target="_blank" rel="noopener">WhatsApp</a>
    </div>`;

  // ---- JSON-LD (structured data) ----
  const ld = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: p.title,
    description: p.subheadline,
    numberOfRooms: p.bedrooms,
    numberOfBathroomsTotal: p.bathrooms,
    floorSize: { "@type": "QuantitativeValue", unitText: "SqFt", value: p.areaSqft },
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
    image: CONFIG.gallery.map((g) => g.src),
    telephone: c.phone,
  };
  $("#ld-json").textContent = JSON.stringify(ld, null, 2);
}

/* ==========================================================================
   Behaviors
   ========================================================================== */

// ---- Dark mode (persisted) ----
function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggle(theme);
}
function updateThemeToggle(theme) {
  const btn = $("#theme-toggle");
  if (!btn) return;
  btn.setAttribute("aria-pressed", theme === "dark");
  btn.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeToggle(next);
}

// ---- Mobile nav ----
function initNav() {
  const toggle = $("#nav-toggle");
  const menu = $("#nav-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#nav-menu a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
  // sticky shadow
  const header = $("#site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---- Scroll reveal ----
function initReveal() {
  const items = $$(".reveal");
  const revealAll = () => items.forEach((r) => r.classList.add("visible"));

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    revealAll();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((r) => io.observe(r));
  // Safety net: never leave content hidden if the observer doesn't fire.
  setTimeout(revealAll, 2500);
}

// ---- Lightbox ----
const Lightbox = {
  index: 0,
  open(i) {
    this.index = i;
    this.lastFocus = document.activeElement;
    this.render();
    const lb = $("#lightbox");
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
    document.addEventListener("keydown", this.onKey);
  },
  close() {
    $("#lightbox").hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.onKey);
    if (this.lastFocus) this.lastFocus.focus();
  },
  next() { this.index = (this.index + 1) % CONFIG.gallery.length; this.render(); },
  prev() { this.index = (this.index - 1 + CONFIG.gallery.length) % CONFIG.gallery.length; this.render(); },
  render() {
    const g = CONFIG.gallery[this.index];
    $("#lb-img").src = g.src;
    $("#lb-img").alt = g.alt;
    $("#lb-caption").textContent = `${g.caption} (${this.index + 1}/${CONFIG.gallery.length})`;
  },
  onKey(e) {
    if (e.key === "Escape") Lightbox.close();
    else if (e.key === "ArrowRight") Lightbox.next();
    else if (e.key === "ArrowLeft") Lightbox.prev();
    else if (e.key === "Tab") {
      // simple focus trap
      const f = $$("#lightbox button");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  },
};
function initLightbox() {
  $("#gallery-grid").addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) Lightbox.open(Number(item.dataset.index));
  });
  $("#lb-close").addEventListener("click", () => Lightbox.close());
  $("#lb-next").addEventListener("click", () => Lightbox.next());
  $("#lb-prev").addEventListener("click", () => Lightbox.prev());
  $("#lightbox .lb-backdrop").addEventListener("click", () => Lightbox.close());
}

// ---- Toast ----
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---- Copy buttons + copy address ----
async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    toast(label + " copied!");
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast(label + " copied!"); }
    catch { toast("Copy failed"); }
    ta.remove();
  }
}
function initCopy() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (btn) copyText(btn.dataset.copy, "Phone number");
  });
  $("#copy-address").addEventListener("click", () =>
    copyText($("#address-text").textContent, "Address")
  );
}

// ---- Sharing ----
function initShare() {
  const shareData = () => ({
    title: CONFIG.property.title,
    text: `${CONFIG.property.title} in ${CONFIG.property.city}`,
    url: CONFIG.site.canonicalUrl,
  });
  $("#share-btn").addEventListener("click", async () => {
    if (navigator.share) {
      try { await navigator.share(shareData()); } catch { /* cancelled */ }
    } else {
      copyText(CONFIG.site.canonicalUrl, "Link");
    }
  });
  // Generic WhatsApp share (no fixed recipient — opens contact picker)
  $("#share-wa").href = `https://wa.me/?text=${encodeURIComponent(
    `${CONFIG.property.title} in ${CONFIG.property.city} — ${CONFIG.site.canonicalUrl}`
  )}`;
}

// ---- Print / Save-as-PDF brochure ----
function initPrint() {
  $$('[data-action="print"]').forEach((b) =>
    b.addEventListener("click", () => window.print())
  );
}

// ---- Contact form -> WhatsApp ----
function initContactForm() {
  const form = $("#contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const text =
      `Enquiry about ${CONFIG.property.title} (${CONFIG.property.city})\n\n` +
      `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`;
    window.open(waLink(CONFIG.contact.whatsapp, text), "_blank", "noopener");
    toast("Opening WhatsApp…");
  });
}

// ---- Back to top ----
function initBackToTop() {
  const btn = $("#back-to-top");
  const onScroll = () => btn.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  onScroll();
}

/* ==========================================================================
   Init
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js"); // enables scroll-reveal styling
  initTheme();
  renderAll();
  initNav();
  initReveal();
  initLightbox();
  initCopy();
  initShare();
  initPrint();
  initContactForm();
  initBackToTop();
  $("#theme-toggle").addEventListener("click", toggleTheme);
});
