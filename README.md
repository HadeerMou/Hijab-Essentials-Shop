# Hijab Essentials — storefront

Frontend for the Hijab Essentials online shop: hijabs and hijab essentials,
made in Cairo, shipped worldwide. **Frontend only** — there is no backend, no
database and no payment integration. Everything that would normally come from a
commerce API is served from a single typed data file so it can be swapped out
later without touching the UI.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and
**Tailwind CSS 3**.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Node 18.18+ required.

---

## What is in here

### Shop flow

| Route | What it does |
| --- | --- |
| `/` | Home — hero, categories, new in, story, bestsellers, campaign band, styling steps, gift sets, reviews, community grid |
| `/shop` | Collection grid with category, fabric, colour and price filters, five sort orders, mobile filter drawer |
| `/shop?category=hijabs` | Same page, pre-filtered — the category is in the URL so it is shareable |
| `/product/[slug]` | Product page — stacked gallery (swipe carousel on mobile), colour and size selectors, size & fabric guide modal, accordions, related products |
| `/checkout` | Three-step checkout (contact → delivery → payment) with live order summary, shipping zones, discount code and a confirmation state |

The bag itself is a slide-in drawer, available from every page, with a
free-shipping progress meter and quantity controls.

### Brand pages

| Route | What it does |
| --- | --- |
| `/about` | Founding story, numbers, values, six-year timeline |
| `/styling` | Three step-by-step looks, a six-fabric comparison guide (`/styling#fabrics`), troubleshooting, recommended kit |
| `/contact` | WhatsApp / email / Instagram, studio address, order tracking, wholesale, contact form |
| `/faq` | Four accordion groups — choosing, care, orders & delivery, returns |
| `/shipping-returns` | Delivery rate table, customs guidance by region, returns process |

Plus a branded `404`.

### Behaviour

- **Currency switching** — prices are stored once in EGP and converted for
  display. EGP / USD toggle lives in the header, footer and mobile menu, and
  the choice persists in `localStorage`.
- **Cart** — client-side reducer with `localStorage` persistence, quantity
  merging per colour + size combination, and a free-shipping threshold.
- **Search** — full-screen overlay searching name, fabric, colour and category.
- **Motion** — scroll reveals, hover image swaps on product cards, a marquee
  announcement bar, and a header that turns transparent over dark heroes. All
  of it respects `prefers-reduced-motion`.

---

## Design language

Taken from the brand's own logo: black ink on paper, nothing else.

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#101010` | Text, buttons, dark sections |
| `paper` | `#FBFAF8` | Page background |
| `bone` | `#F1EEE9` | Alternate section background |
| `mist` | `#DCD8D2` | Hairline rules and borders |
| `smoke` / `ash` | `#6E6A65` / `#A5A09A` | Body copy, secondary labels |

Type is three faces, self-hosted through Fontsource so nothing is requested
from Google at runtime:

- **Cormorant Garamond** — display headings
- **Jost** — UI, labels, body
- **Parisienne** — the script accent, echoing the "Hijab" in the logo

Shared classes (`.shell`, `.label`, `.h-display`, `.btn-solid`, `.link-sweep`
and so on) live in `src/app/globals.css`. Colours, fonts and easing curves are
in `tailwind.config.ts`.

---

## Project layout

```
src/
  app/
    layout.tsx              root layout, providers, fonts, metadata
    globals.css             design tokens + shared component classes
    page.tsx                home
    shop/, product/[slug]/, checkout/
    about/, styling/, contact/, faq/, shipping-returns/
    not-found.tsx
  components/
    Header, Footer, MobileNav, SearchOverlay, CartDrawer
    ProductCard, ProductDetail, ShopClient, CheckoutClient
    Accordion, SizeGuide, SectionHead, PageHero, Reveal
    CurrencySwitcher, ContactForm, Logo, Icons
  lib/
    products.ts             catalogue, colours, categories, helpers
    cart.tsx                cart context + reducer
    currency.tsx            EGP/USD display conversion
    nav.ts                  navigation and announcement copy
public/
  brand/                    logo (ink + paper cuts) and circular mark
  products/                 product imagery
  editorial/                hero and editorial plates
tools/
  generate_images.py        regenerates the placeholder imagery
  shot.mjs, flow.mjs        screenshot + end-to-end flow helpers
```

---

## Before this goes live

1. **Replace the imagery.** Everything in `public/products` and
   `public/editorial` is procedurally generated placeholder fabric art
   (`tools/generate_images.py`). Real photography drops straight in — keep the
   `slug-colour-a.jpg` / `slug-colour-b.jpg` naming and the 4:5 crop and no
   code changes are needed. The logo files in `public/brand` are extracted from
   the brand's own artwork and can stay.
2. **Wire a backend.** `src/lib/products.ts` is the only place the catalogue is
   defined; point its helpers at Shopify, Medusa or a custom API and every page
   follows. `src/lib/cart.tsx` is where cart mutations become network calls.
3. **Real rates.** Currency conversion (`src/lib/currency.tsx`) and shipping
   zones (`src/components/CheckoutClient.tsx`) are hard-coded — move both
   server-side.
4. **Payments.** The checkout form collects card details but does nothing with
   them. Swap in Paymob, Stripe or Fawry before accepting a single order.
5. **Copy and policy.** Product descriptions, the founding story, reviews and
   the shipping and returns policies are written as realistic placeholders.
   Replace them with the shop's own before publishing.
6. **Contact details.** Phone number, email, address and social links are
   placeholders in `src/lib/nav.ts`, `src/components/Footer.tsx` and
   `src/app/contact/page.tsx`.

---

## Notes

- Fully responsive from 360 px up; tested at 390, 768, 1024 and 1440.
- Keyboard accessible throughout — skip link, focus rings, `aria-pressed` on
  swatches and filters, labelled icon buttons, Escape closes every overlay.
- No external network requests at runtime: fonts are bundled and imagery is
  local.
