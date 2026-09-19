/**
 * Catalogue data for the storefront.
 *
 * This is a static stand-in for whatever the shop eventually runs on
 * (Shopify, Medusa, a custom API). Every component reads through the helpers
 * at the bottom of this file, so swapping the source later means rewriting
 * this module only.
 *
 * Prices are stored in EGP — the base currency of the business. Display
 * conversion happens in `src/lib/currency.tsx`.
 */

export type CategorySlug = 'hijabs' | 'essentials' | 'sets';

export type Colour = {
  key: string;
  name: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: CategorySlug;
  fabric: string;
  /** Price in Egyptian pounds. */
  price: number;
  /** Was-price in EGP, when the item is on offer. */
  compareAt?: number;
  colours: string[];
  sizes?: { label: string; note?: string }[];
  rating: number;
  reviews: number;
  description: string;
  details: string[];
  care: string[];
  bestseller?: boolean;
  isNew?: boolean;
  featured?: boolean;
  lowStock?: boolean;
};

export const COLOURS: Record<string, Colour> = {
  black: { key: 'black', name: 'Black', hex: '#1A1A1B' },
  charcoal: { key: 'charcoal', name: 'Charcoal', hex: '#3A3A3C' },
  ash: { key: 'ash', name: 'Ash', hex: '#92918E' },
  pearl: { key: 'pearl', name: 'Pearl', hex: '#E9E6E0' },
  ivory: { key: 'ivory', name: 'Ivory', hex: '#F1ECE3' },
  sand: { key: 'sand', name: 'Sand', hex: '#CEC0AE' },
  camel: { key: 'camel', name: 'Camel', hex: '#B09170' },
  mocha: { key: 'mocha', name: 'Mocha', hex: '#7C6556' },
  espresso: { key: 'espresso', name: 'Espresso', hex: '#4A3A31' },
  blush: { key: 'blush', name: 'Blush', hex: '#D6BBB6' },
  rosewood: { key: 'rosewood', name: 'Rosewood', hex: '#9B7473' },
  sage: { key: 'sage', name: 'Sage', hex: '#9EA594' },
  olive: { key: 'olive', name: 'Olive', hex: '#6C6F58' },
  navy: { key: 'navy', name: 'Navy', hex: '#2E374C' },
  denim: { key: 'denim', name: 'Denim', hex: '#68798C' },
  plum: { key: 'plum', name: 'Plum', hex: '#5E4854' },
  stone: { key: 'stone', name: 'Stone', hex: '#B2ACA2' },
};

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
}[] = [
  {
    slug: 'hijabs',
    name: 'Hijabs',
    blurb: 'Jersey, chiffon, crinkle cotton and silk — cut long, hemmed by hand.',
    image: '/editorial/category-hijabs.jpg',
  },
  {
    slug: 'essentials',
    name: 'Essentials',
    blurb: 'Undercaps, pins, volumisers. The quiet half of a good drape.',
    image: '/editorial/category-essentials.jpg',
  },
  {
    slug: 'sets',
    name: 'Sets & Gifting',
    blurb: 'Curated edits, boxed and ribboned, ready to send anywhere.',
    image: '/editorial/category-sets.jpg',
  },
];

const HIJAB_SIZES = [
  { label: 'Standard', note: '180 × 70 cm' },
  { label: 'Maxi', note: '200 × 75 cm' },
];

const CAP_SIZES = [
  { label: 'S / M', note: '54 – 56 cm' },
  { label: 'L / XL', note: '57 – 60 cm' },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'signature-jersey-hijab',
    name: 'Signature Jersey Hijab',
    tagline: 'The one you reach for every morning',
    category: 'hijabs',
    fabric: 'Cotton Jersey',
    price: 450,
    colours: ['black', 'ivory', 'ash', 'mocha', 'sage', 'navy'],
    sizes: HIJAB_SIZES,
    rating: 4.9,
    reviews: 412,
    bestseller: true,
    featured: true,
    description:
      'Our house jersey, knitted to a weight that holds a wrap without a single pin. It has enough stretch to shape around the face and enough body to fall clean at the shoulder — the reason most of our customers start here and keep coming back for another colour.',
    details: [
      'Mid-weight cotton jersey with 5% elastane',
      'Non-slip surface — styles securely without pins',
      'Hand-finished rolled hem on all four sides',
      'Opaque in every colourway, including ivory',
      'Pre-washed so it will not shrink on you',
    ],
    care: ['Machine wash cold on a gentle cycle', 'Do not bleach', 'Hang to dry away from direct sun', 'Warm iron if needed'],
  },
  {
    slug: 'premium-chiffon-hijab',
    name: 'Premium Chiffon Hijab',
    tagline: 'Weightless, with a soft matte finish',
    category: 'hijabs',
    fabric: 'Matte Chiffon',
    price: 380,
    compareAt: 440,
    colours: ['blush', 'black', 'pearl', 'rosewood', 'sand'],
    sizes: HIJAB_SIZES,
    rating: 4.7,
    reviews: 268,
    bestseller: true,
    description:
      'A chiffon with no shine and no slip — we spent a long time finding it. It layers beautifully over an undercap, takes a pleat at the crown, and stays put through a full day of wear.',
    details: [
      'Matte-finish georgette chiffon, 60 gsm',
      'Lightly textured surface grips pins without snagging',
      'Semi-sheer — layer over an undercap for full coverage',
      'Laser-cut edge, no fraying',
    ],
    care: ['Hand wash cold', 'Do not wring', 'Line dry in shade', 'Cool iron on reverse'],
  },
  {
    slug: 'crinkle-cotton-hijab',
    name: 'Crinkle Cotton Hijab',
    tagline: 'Texture that does the styling for you',
    category: 'hijabs',
    fabric: 'Crinkle Cotton',
    price: 420,
    colours: ['ivory', 'olive', 'denim', 'camel'],
    sizes: HIJAB_SIZES,
    rating: 4.8,
    reviews: 191,
    isNew: true,
    description:
      'Woven cotton, crinkle-set so it holds volume on its own. It never needs ironing — the texture is the point — and it breathes in a way jersey cannot, which makes it our answer to a Cairo summer.',
    details: [
      '100% breathable woven cotton',
      'Permanent crinkle finish — never needs pressing',
      'Holds volume at the crown without a scrunchie',
      'Gets softer with every wash',
    ],
    care: ['Machine wash cold', 'Do not iron — pressing removes the crinkle', 'Line dry', 'Scrunch while damp to reset texture'],
  },
  {
    slug: 'silk-satin-hijab',
    name: 'Silk Satin Hijab',
    tagline: 'For the evenings that matter',
    category: 'hijabs',
    fabric: '19mm Mulberry Silk',
    price: 950,
    colours: ['black', 'pearl', 'plum', 'espresso'],
    sizes: HIJAB_SIZES,
    rating: 5.0,
    reviews: 87,
    featured: true,
    lowStock: true,
    description:
      'Nineteen-momme mulberry silk with a satin face and a matte reverse, so you can wear it either way. Cool against the skin, kind to hair, and the only hijab in the collection we hem by hand one at a time.',
    details: [
      '19mm Grade 6A mulberry silk',
      'Satin face, matte reverse — reversible by design',
      'Hand-rolled hem, finished individually',
      'Naturally temperature regulating',
      'Arrives in a reusable dust bag',
    ],
    care: ['Dry clean, or hand wash cold with silk detergent', 'Never wring', 'Dry flat away from sunlight', 'Steam rather than iron'],
  },
  {
    slug: 'modal-everyday-hijab',
    name: 'Modal Everyday Hijab',
    tagline: 'Soft enough to forget you are wearing it',
    category: 'hijabs',
    fabric: 'Bamboo Modal',
    price: 390,
    colours: ['stone', 'charcoal', 'blush', 'sage'],
    sizes: HIJAB_SIZES,
    rating: 4.8,
    reviews: 334,
    bestseller: true,
    description:
      'Bamboo-derived modal with a cool, fluid hand. It drapes closer to the body than jersey and resists creasing through a commute, a workday and everything after.',
    details: [
      'Bamboo modal blend, 95% modal / 5% elastane',
      'Naturally antibacterial and moisture-wicking',
      'Crease-resistant — packs flat, unpacks ready',
      'Fluid drape with a subtle matte finish',
    ],
    care: ['Machine wash cold', 'Tumble dry low or hang', 'Warm iron if needed'],
  },
  {
    slug: 'georgette-hijab',
    name: 'Georgette Hijab',
    tagline: 'Structure, without the stiffness',
    category: 'hijabs',
    fabric: 'Poly Georgette',
    price: 350,
    colours: ['navy', 'ivory', 'rosewood'],
    sizes: HIJAB_SIZES,
    rating: 4.6,
    reviews: 143,
    description:
      'Georgette holds a shape the way chiffon cannot. Pleat it, pin it, build a turban with it — it keeps the line you gave it from morning until night.',
    details: [
      'Fine-grain georgette with a dry hand',
      'Holds pleats and folds all day',
      'Pin-friendly weave',
      'Machine washable',
    ],
    care: ['Machine wash cold on delicate', 'Line dry', 'Cool iron on reverse'],
  },
  {
    slug: 'instant-slip-on-hijab',
    name: 'Instant Slip-On Hijab',
    tagline: 'Ready in four seconds flat',
    category: 'hijabs',
    fabric: 'Jersey Knit',
    price: 520,
    colours: ['black', 'mocha', 'ash'],
    sizes: CAP_SIZES,
    rating: 4.7,
    reviews: 205,
    isNew: true,
    description:
      'A sewn-in cap and a pre-shaped drape, so the whole thing goes on in one movement. Built for school runs, airport queues and the mornings that got away from you.',
    details: [
      'Integrated jersey undercap — no separate cap needed',
      'Pre-draped and stitched to hold its shape',
      'Zero pins required',
      'Two-way stretch band for a snug fit',
    ],
    care: ['Machine wash cold in a laundry bag', 'Reshape while damp', 'Hang to dry'],
  },
  {
    slug: 'sport-jersey-hijab',
    name: 'Sport Jersey Hijab',
    tagline: 'Stays put through the last rep',
    category: 'hijabs',
    fabric: 'Performance Knit',
    price: 560,
    colours: ['black', 'charcoal', 'olive'],
    sizes: CAP_SIZES,
    rating: 4.8,
    reviews: 128,
    description:
      'A close-fitting performance knit that wicks, breathes and does not shift when you move. Cut shorter at the back so it sits under a collar cleanly.',
    details: [
      'Moisture-wicking performance knit',
      'Four-way stretch, flatlock seams — no chafing',
      'Shortened drape designed for movement',
      'Quick-dry: ready again in under an hour',
    ],
    care: ['Machine wash cold', 'No fabric softener — it coats the fibres', 'Hang to dry'],
  },
  {
    slug: 'printed-modal-hijab',
    name: 'Printed Modal Hijab',
    tagline: 'A quiet print, drawn in Cairo',
    category: 'hijabs',
    fabric: 'Printed Modal',
    price: 470,
    colours: ['sand', 'plum', 'sage'],
    sizes: HIJAB_SIZES,
    rating: 4.7,
    reviews: 96,
    isNew: true,
    description:
      'Our in-house prints, drawn here in the studio and screened in small runs. Tonal rather than loud, so they sit under a coat as easily as they stand on their own.',
    details: [
      'Studio-drawn print, screened in limited runs',
      'Bamboo modal base with a fluid drape',
      'Colour-fast inks — no bleeding in the wash',
      'Each run retired once it sells out',
    ],
    care: ['Hand wash cold, separately for the first wash', 'Line dry in shade', 'Cool iron on reverse'],
  },
  {
    slug: 'bamboo-undercap',
    name: 'Bamboo Undercap',
    tagline: 'The layer that makes everything else work',
    category: 'essentials',
    fabric: 'Bamboo Jersey',
    price: 180,
    colours: ['black', 'ivory', 'mocha'],
    sizes: CAP_SIZES,
    rating: 4.9,
    reviews: 521,
    bestseller: true,
    description:
      'Seamless bamboo jersey with a wide, non-slip band. Breathable enough for August, smooth enough that nothing shows through a light chiffon.',
    details: [
      'Seamless bamboo jersey — no ridge under your hijab',
      'Wide 4 cm band that will not slide back',
      'Naturally antibacterial',
      'Full hairline coverage front and nape',
    ],
    care: ['Machine wash cold', 'Hang to dry', 'Do not iron the elastic band'],
  },
  {
    slug: 'lace-trim-undercap',
    name: 'Lace Trim Undercap',
    tagline: 'A little something at the hairline',
    category: 'essentials',
    fabric: 'Modal & Lace',
    price: 220,
    colours: ['black', 'pearl', 'blush'],
    sizes: CAP_SIZES,
    rating: 4.6,
    reviews: 178,
    description:
      'The same fit as our bamboo cap, finished with a narrow lace edge meant to be seen — a quiet detail for occasions that want one.',
    details: [
      'Soft modal body with a fine lace trim',
      'Designed to sit a few millimetres proud of the hijab',
      'Non-slip inner band',
      'Flat seams throughout',
    ],
    care: ['Hand wash cold', 'Do not tumble dry', 'Reshape and lay flat'],
  },
  {
    slug: 'no-snag-hijab-pins',
    name: 'No-Snag Hijab Pins',
    tagline: 'Twenty-four, and not one will pull a thread',
    category: 'essentials',
    fabric: 'Coated Steel',
    price: 150,
    colours: ['pearl', 'black'],
    rating: 4.8,
    reviews: 389,
    description:
      'Fine coated-steel pins with rounded tips that part the weave instead of piercing it. Sold in a tin of twenty-four, because they have a way of disappearing.',
    details: [
      'Set of 24 in a reusable tin',
      'Rounded, polished tips — safe on chiffon and silk',
      'Rust-resistant coating',
      '3.4 cm length, fine gauge',
    ],
    care: ['Keep dry', 'Wipe clean', 'Return to tin after use'],
  },
  {
    slug: 'magnetic-hijab-pins',
    name: 'Magnetic Hijab Pins',
    tagline: 'No holes, no pinpricks, no fuss',
    category: 'essentials',
    fabric: 'Brushed Metal',
    price: 260,
    colours: ['stone', 'charcoal'],
    rating: 4.7,
    reviews: 214,
    isNew: true,
    description:
      'Strong neodymium magnets in a brushed metal shell. They hold a heavy drape without leaving a single mark, which is the whole argument for them.',
    details: [
      'Set of 6 magnetic pairs',
      'Neodymium core, brushed metal face',
      'Holds up to four layers of chiffon',
      'Presented in a slim travel case',
    ],
    care: ['Keep away from cards and devices', 'Store in the case provided'],
  },
  {
    slug: 'volumising-scrunchie',
    name: 'Volumising Scrunchie',
    tagline: 'Height at the crown, honestly earned',
    category: 'essentials',
    fabric: 'Velvet Knit',
    price: 140,
    colours: ['black', 'camel', 'ivory'],
    rating: 4.8,
    reviews: 462,
    bestseller: true,
    description:
      'A soft velvet volumiser that builds a clean silhouette at the back of the head without pulling at the hair underneath.',
    details: [
      'Lightweight velvet knit over a soft foam core',
      'Grips an undercap without slipping',
      'Adds roughly 5 cm of height',
      'Gentle on hair — no tension at the root',
    ],
    care: ['Hand wash cold', 'Squeeze, do not wring', 'Air dry'],
  },
  {
    slug: 'travel-hijab-organiser',
    name: 'Travel Hijab Organiser',
    tagline: 'Twelve hijabs, no creases, one zip',
    category: 'essentials',
    fabric: 'Water-Resistant Canvas',
    price: 480,
    colours: ['espresso', 'stone'],
    rating: 4.9,
    reviews: 134,
    description:
      'A rolled organiser with twelve slim sleeves, so hijabs travel folded once rather than crushed into a corner of a suitcase.',
    details: [
      '12 individual sleeves, labelled',
      'Water-resistant coated canvas',
      'Rolls down to 28 cm; hangs open with a built-in hook',
      'Separate zip pocket for pins and caps',
    ],
    care: ['Wipe clean with a damp cloth', 'Do not machine wash'],
  },
  {
    slug: 'the-everyday-edit',
    name: 'The Everyday Edit',
    tagline: 'Three hijabs, two caps, one tin of pins',
    category: 'sets',
    fabric: 'Mixed',
    price: 1150,
    compareAt: 1340,
    colours: ['sand', 'black'],
    rating: 4.9,
    reviews: 168,
    description:
      'The starter set we put together after being asked the same question a thousand times: what do I actually need? Three hijabs in the fabrics that cover a whole week, two undercaps and a tin of pins.',
    details: [
      '1 × Signature Jersey Hijab',
      '1 × Modal Everyday Hijab',
      '1 × Premium Chiffon Hijab',
      '2 × Bamboo Undercaps',
      '1 × tin of No-Snag Pins (24)',
      'Saves 190 EGP against buying separately',
    ],
    care: ['Follow the care card for each piece'],
  },
  {
    slug: 'the-luxe-gift-set',
    name: 'The Luxe Gift Set',
    tagline: 'Boxed, ribboned, ready to send',
    category: 'sets',
    fabric: 'Mixed',
    price: 1890,
    compareAt: 2180,
    colours: ['espresso', 'pearl'],
    rating: 5.0,
    reviews: 74,
    featured: true,
    description:
      'Our silk satin hijab with a lace-trim cap, magnetic pins and the travel organiser, laid into a rigid linen-wrapped box with a handwritten card. We will write the message for you — just tell us what to say at checkout.',
    details: [
      '1 × Silk Satin Hijab',
      '1 × Lace Trim Undercap',
      '1 × set of Magnetic Pins',
      '1 × Travel Hijab Organiser',
      'Linen-wrapped rigid box, grosgrain ribbon',
      'Handwritten card — add your message at checkout',
    ],
    care: ['Follow the care card for each piece'],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const productImage = (
  product: Pick<Product, 'slug' | 'colours'>,
  colourKey?: string,
  variant: 'a' | 'b' = 'a',
) => `/products/${product.slug}-${colourKey ?? product.colours[0]}-${variant}.jpg`;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const getColour = (key: string): Colour =>
  COLOURS[key] ?? { key, name: key, hex: '#000000' };

export const byCategory = (category: CategorySlug) =>
  PRODUCTS.filter((p) => p.category === category);

export const featuredProducts = () => PRODUCTS.filter((p) => p.featured);

export const bestsellers = () => PRODUCTS.filter((p) => p.bestseller);

export const newArrivals = () => PRODUCTS.filter((p) => p.isNew);

/** Same category first, then anything else, never the product itself. */
export const relatedProducts = (product: Product, limit = 4) =>
  [...PRODUCTS]
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 0 : 2) + (p.fabric === product.fabric ? -1 : 0);
      return score(a) - score(b);
    })
    .slice(0, limit);

export const ALL_FABRICS = Array.from(new Set(PRODUCTS.map((p) => p.fabric))).sort();

export const ALL_COLOURS = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.colours)),
).sort((a, b) => getColour(a).name.localeCompare(getColour(b).name));

export const PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));
