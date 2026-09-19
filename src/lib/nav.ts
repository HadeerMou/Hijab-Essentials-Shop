export const PRIMARY_NAV = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Hijabs', href: '/shop?category=hijabs' },
  { label: 'Essentials', href: '/shop?category=essentials' },
  { label: 'Sets & Gifting', href: '/shop?category=sets' },
  { label: 'How to Style', href: '/styling' },
  { label: 'Our Story', href: '/about' },
] as const;

export const FOOTER_NAV: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New In', href: '/shop?sort=new' },
      { label: 'Hijabs', href: '/shop?category=hijabs' },
      { label: 'Essentials', href: '/shop?category=essentials' },
      { label: 'Sets & Gifting', href: '/shop?category=sets' },
      { label: 'Bestsellers', href: '/shop?sort=popular' },
    ],
  },
  {
    title: 'The Brand',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'How to Style', href: '/styling' },
      { label: 'Fabric Guide', href: '/styling#fabrics' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Track an Order', href: '/contact#track' },
      { label: 'Wholesale', href: '/contact#wholesale' },
    ],
  },
];

export const ANNOUNCEMENTS = [
  'Free shipping across Egypt on orders over EGP 1,500',
  'Worldwide delivery — DHL Express in 3–6 days',
  'New in: Crinkle Cotton, four colourways',
  'Hand-finished in Cairo since 2019',
  '30-day returns, no questions asked',
];
