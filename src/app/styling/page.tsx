import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { IconArrow } from '@/components/Icons';
import { PRODUCTS, getProduct } from '@/lib/products';

export const metadata: Metadata = {
  title: 'How to Style',
  description:
    'Three hijab styles explained step by step, plus a plain-language fabric guide and the fixes for the four things that usually go wrong.',
};

const LOOKS = [
  {
    name: 'The Everyday Drape',
    time: '40 seconds',
    fabric: 'Cotton Jersey or Bamboo Modal',
    image: '/products/signature-jersey-hijab-mocha-a.jpg',
    steps: [
      'Put on a seamless undercap and pull it just past your hairline.',
      'Centre the hijab, leaving about two thirds of the length on your dominant side.',
      'Pin under the chin — one pin, angled up, catching both layers.',
      'Take the long side over the opposite shoulder and let it fall. Do not fuss with it.',
    ],
  },
  {
    name: 'The Pinned Wrap',
    time: '2 minutes',
    fabric: 'Matte Chiffon or Georgette',
    image: '/products/premium-chiffon-hijab-rosewood-a.jpg',
    steps: [
      'Start with a volumising scrunchie at the crown for height.',
      'Drape with the long side over your shoulder, then pin at the temple rather than the chin.',
      'Bring the long side around the back of the neck and up to the same temple.',
      'Pin a second time through all layers, then soften the fold at the forehead with your fingers.',
    ],
  },
  {
    name: 'The Turban Fold',
    time: '90 seconds',
    fabric: 'Crinkle Cotton or Georgette',
    image: '/products/crinkle-cotton-hijab-camel-b.jpg',
    steps: [
      'Use equal lengths on both sides, no undercap needed with crinkle cotton.',
      'Cross the two ends at the nape and bring them back to the front.',
      'Twist once at the forehead, then wrap each end around the crown in opposite directions.',
      'Tuck the ends in at the side and pull gently at the crown for shape.',
    ],
  },
];

const FABRICS = [
  {
    name: 'Cotton Jersey',
    for: 'Every day, no pins',
    feel: 'Mid-weight, matte, slight stretch',
    note: 'The most forgiving thing we sell. Grips itself, so it holds a wrap with no pin at all. If you own one hijab, own this.',
    slug: 'signature-jersey-hijab',
  },
  {
    name: 'Matte Chiffon',
    for: 'Occasions, layering',
    feel: 'Light, airy, semi-sheer',
    note: 'Needs an undercap and at least one pin, but nothing else drapes like it. Choose the matte finish over shiny chiffon every time.',
    slug: 'premium-chiffon-hijab',
  },
  {
    name: 'Crinkle Cotton',
    for: 'Heat and humidity',
    feel: 'Light, textured, structured',
    note: 'Breathes better than anything else here and never needs ironing. The texture creates volume so you can skip the scrunchie.',
    slug: 'crinkle-cotton-hijab',
  },
  {
    name: 'Bamboo Modal',
    for: 'Long days, travel',
    feel: 'Cool, fluid, crease-resistant',
    note: 'Sits closer to the body than jersey and comes out of a suitcase ready to wear. Our pick for flying.',
    slug: 'modal-everyday-hijab',
  },
  {
    name: 'Mulberry Silk',
    for: 'Evenings',
    feel: 'Liquid, cool, satin face',
    note: 'The most beautiful and the least obedient. Pin it properly or wear the matte side out for grip.',
    slug: 'silk-satin-hijab',
  },
  {
    name: 'Poly Georgette',
    for: 'Turbans and pleats',
    feel: 'Crisp, dry, holds shape',
    note: 'The only fabric here that keeps a fold exactly where you put it. Ideal for structured styles.',
    slug: 'georgette-hijab',
  },
];

const FIXES = [
  {
    problem: 'It keeps sliding back',
    answer:
      'The cap is the culprit, not the hijab. A cap with a wide non-slip band sits further forward and gives the fabric something to hold. Check yours is not stretched out — they last about a year.',
  },
  {
    problem: 'The front looks flat',
    answer:
      'Add a volumiser at the crown, or choose crinkle cotton which builds its own height. Resist the urge to pile hair up under the cap — it creates a lump, not volume.',
  },
  {
    problem: 'Pins snag the fabric',
    answer:
      'Ordinary safety pins pierce the weave. Use fine pins with rounded tips, or switch to magnetics on chiffon and silk, where a single pull shows permanently.',
  },
  {
    problem: 'Light colours show through',
    answer:
      'Every ivory and pearl in our range is opaque, but lighter chiffons are semi-sheer by nature. Wear a matching undercap rather than a black one — the contrast is what shows.',
  },
];

export default function StylingPage() {
  const picks = ['bamboo-undercap', 'volumising-scrunchie', 'no-snag-hijab-pins', 'magnetic-hijab-pins']
    .map((s) => getProduct(s))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <>
      <PageHero
        crumb="How to Style"
        eyebrow="The guide"
        title={
          <>
            Three looks,
            <br />
            six fabrics,
            <br />
            <span className="font-script text-[0.82em]">no mystery</span>.
          </>
        }
        intro="Everything we get asked in the studio, written down. Start with the fabric guide if you are not sure what to buy, or jump straight to the styles."
        image="/editorial/styling.jpg"
      />

      {/* Looks ----------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="Step by step"
          title="Three styles worth knowing"
          intro="Learn these and you can improvise the rest. Each one works with the fabrics listed beside it."
        />

        <div className="mt-16 space-y-20 md:space-y-28">
          {LOOKS.map((look, i) => (
            <Reveal key={look.name}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <Image
                    src={look.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 46vw, 92vw"
                    className="img-cover"
                  />
                  <figcaption className="label-sm absolute bottom-4 left-4 bg-paper/90 px-3 py-1.5 text-ink">
                    {look.time}
                  </figcaption>
                </figure>

                <div>
                  <p className="label-sm text-ash">Look 0{i + 1}</p>
                  <h3 className="h-section mt-4 !text-[clamp(1.7rem,2.8vw,2.4rem)]">
                    {look.name}
                  </h3>
                  <p className="label-sm mt-4 text-smoke">Best in {look.fabric}</p>

                  <ol className="mt-8 space-y-5">
                    {look.steps.map((s, n) => (
                      <li key={s} className="flex gap-5">
                        <span className="label-sm w-6 shrink-0 pt-1 text-ash tabular-nums">
                          0{n + 1}
                        </span>
                        <p className="prose-brand">{s}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fabric guide ---------------------------------------------------- */}
      <section id="fabrics" className="scroll-mt-32 bg-bone py-20 md:py-28">
        <div className="shell">
          <SectionHead
            eyebrow="Fabric guide"
            title="What to buy, and why"
            intro="Six fabrics, what each one is actually for, and the honest catch with each."
          />

          <div className="mt-14 grid gap-px overflow-hidden bg-mist md:grid-cols-2 lg:grid-cols-3">
            {FABRICS.map((f, i) => (
              <Reveal key={f.name} delay={Math.min(i, 4) * 70} className="bg-bone p-8">
                <h3 className="h-card">{f.name}</h3>
                <dl className="mt-5 space-y-2 text-[0.8rem]">
                  <div className="flex gap-3">
                    <dt className="label-sm w-14 shrink-0 text-ash">For</dt>
                    <dd className="text-smoke">{f.for}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="label-sm w-14 shrink-0 text-ash">Feel</dt>
                    <dd className="text-smoke">{f.feel}</dd>
                  </div>
                </dl>
                <p className="prose-brand mt-5 text-[0.88rem]">{f.note}</p>
                <Link
                  href={`/product/${f.slug}`}
                  className="label-sm link-sweep mt-6 inline-flex items-center gap-2"
                >
                  Shop it
                  <IconArrow className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fixes ----------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="Troubleshooting"
          title="Four things that usually go wrong"
          intro="And what to do about each, in order of how often we are asked."
        />

        <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {FIXES.map((f, i) => (
            <Reveal key={f.problem} delay={i * 80} className="border-t border-ink pt-6">
              <h3 className="h-card">“{f.problem}”</h3>
              <p className="prose-brand mt-4">{f.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Kit ------------------------------------------------------------- */}
      <section className="shell border-t border-mist py-20 md:py-28">
        <SectionHead
          eyebrow="The kit"
          title="What actually helps"
          intro="None of it is expensive, and all of it makes more difference than another hijab."
          href="/shop?category=essentials"
          hrefLabel="All essentials"
        />

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {picks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
