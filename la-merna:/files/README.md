# La Merna DC — Website

## File Structure

```
la-merna/
├── index.html
├── styles.css
├── main.js
├── README.md
└── assets/
    ├── logo.svg          ← Brand mark SVG (swap into hero once confirmed)
    ├── favicon.svg       ← Favicon — works natively in modern browsers
    ├── og-image.svg      ← Export to og-image.jpg (1200×630) for social share
    ├── hero-bg.svg       ← REPLACE: 1920×1080 atmosphere/interior photo → hero-bg.jpg
    ├── about-photo.svg   ← REPLACE: 800×1067 portrait photo → about-photo.jpg
    ├── food-01.svg       ← REPLACE: 800×600 dish photo → food-01.jpg
    ├── food-02.svg       ← REPLACE: 800×600 dish photo → food-02.jpg
    └── food-03.svg       ← REPLACE: 800×600 dish photo → food-03.jpg
```

---

## TODOs (search for `TODO:` in index.html)

| # | What | Where |
|---|------|-------|
| 1 | Swap logo SVG placeholder div → `<img src="assets/logo.svg">` | `index.html` hero section |
| 2 | Export `og-image.svg` → `og-image.jpg` and upload to server | `index.html` `<meta og:image>` |
| 3 | Replace `about-photo.svg` with real interior/team photo | `index.html` about section |
| 4 | Add real Resy / OpenTable reservation URL | `index.html` contact section + nav button |
| 5 | Update events email (`events@lamernadc.com`) | `index.html` events section |
| 6 | Update general email (`hello@lamernadc.com`) | `index.html` contact section |
| 7 | Replace Google Maps placeholder div with real embed iframe | `index.html` contact section |
| 8 | Wire up newsletter form to Mailchimp / Klaviyo / etc. | `main.js` — marked with TODO comment |
| 9 | Replace placeholder menu items with real menu | `index.html` menu section |
| 10 | Add real food photos (food-01/02/03.jpg) when available | Future gallery section |

---

## OG Image Export

The `og-image.svg` is 1200×630. To convert to JPG for social sharing:

```bash
# Using Inkscape (CLI)
inkscape assets/og-image.svg --export-filename=assets/og-image.jpg --export-width=1200

# Using ImageMagick
convert assets/og-image.svg assets/og-image.jpg

# Or open in Figma/Sketch and export manually
```

---

## Favicon

The `favicon.svg` works natively in all modern browsers (Chrome 80+, Firefox, Safari 12+).
For legacy IE/Edge support, convert to `.ico` using https://favicon.io or similar.

---

## Fonts

Loaded from Google Fonts CDN:
- **Cormorant Garamond** (display / headings)
- **Jost** (body / UI)

For production, consider self-hosting via `@font-face` to avoid the Google Fonts request.

---

## JS Dependencies

None. Vanilla JS only. No build step required.

---

## Reservations

When you choose a platform, update these two places:
1. `<a href="#" class="nav-reserve">` in the nav
2. `<a href="#" class="btn btn--primary contact-reserve-btn">` in the contact section

Both accept a direct Resy/OpenTable booking URL, or you can swap for their embed widget.
