import Image from 'next/image';
import Link from 'next/link';

import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import {
  IconArrow,
  IconBox,
  IconLeaf,
  IconReturn,
  IconShip,
  IconStar,
} from '@/components/Icons';
import { CATEGORIES, PRODUCTS, bestsellers, newArrivals, productImage } from '@/lib/products';

const PROMISES = [
  { icon: IconShip, title: 'Free Egypt shipping', copy: 'On every order over EGP 1,500' },
  { icon: IconBox, title: 'Worldwide delivery', copy: 'DHL Express, 3–6 working days' },
  { icon: IconReturn, title: '30-day returns', copy: 'Unworn, unwashed, no questions' },
  { icon: IconLeaf, title: 'Made in Cairo', copy: 'Cut and hand-finished in our studio' },
];

const STYLING_STEPS = [
  {
    n: '01',
    title: 'Start with the cap',
    copy: 'A seamless undercap sets the hairline and gives every fabric something to grip. Everything after this is easier.',
  },
  {
    n: '02',
    title: 'Find the long side',
    copy: 'Leave roughly two thirds on your dominant side. That length is what you will drape, pleat or wrap — the short side just anchors.',
  },
  {
    n: '03',
    title: 'Pin where it folds',
    copy: 'One pin under the chin, one at the shoulder. Place them where the fabric already wants to sit, never where you are forcing it.',
  },
];

const REVIEWS = [
  {
    quote:
      'I have bought jersey hijabs from six different shops. This is the first one that does not go thin and shiny after a month of washing.',
    name: 'Nour A.',
    place: 'Alexandria',
    product: 'Signature Jersey Hijab',
  },
  {
    quote:
      'Ordered to London on a Tuesday and wore it on Saturday. The box alone made it feel like a gift to myself.',
    name: 'Yasmin K.',
    place: 'London',
    product: 'The Luxe Gift Set',
  },
  {
    quote:
      'The crinkle cotton is the only thing I could bear through August here. It breathes and it never needs ironing.',
    name: 'Hala M.',
    place: 'Cairo',
    product: 'Crinkle Cotton Hijab',
  },
];

const COMMUNITY = [
  'signature-jersey-hijab-mocha-a',
  'premium-chiffon-hijab-pearl-b',
  'silk-satin-hijab-plum-a',
  'crinkle-cotton-hijab-olive-b',
  'modal-everyday-hijab-blush-a',
  'printed-modal-hijab-sand-b',
];

export default function HomePage() {
  const newIn = newArrivals();
  const best = bestsellers().slice(0, 4);
  const edits = PRODUCTS.filter((p) => p.category === 'sets');

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="under-nav relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink text-paper md:min-h-[94svh]">
        <Image
          src="/editorial/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="img-cover animate-ken-burns opacity-95"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/45"
          aria-hidden
        />
        <div className="grain absolute inset-0" aria-hidden />

        <div className="shell relative w-full pb-16 pt-40 md:pb-24">
          <div className="max-w-3xl">
            <p className="label-sm animate-fade-up text-paper/65">
              Cairo · Shipping worldwide
            </p>
            <h1
              className="h-display mt-6 animate-fade-up text-paper"
              style={{ animationDelay: '120ms' }}
            >
              The drape,
              <br />
              <span className="font-script text-[0.78em] leading-none">considered</span>.
            </h1>
            <p
              className="mt-8 max-w-lg animate-fade-up text-[0.98rem] leading-[1.9] text-paper/75"
              style={{ animationDelay: '240ms' }}
            >
              Jersey that holds without a pin. Chiffon with no shine. Silk hemmed by hand.
              We make a small number of things and we make them properly.
            </p>

            <div
              className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
              style={{ animationDelay: '360ms' }}
            >
              <Link href="/shop?category=hijabs" className="btn-invert">
                Shop hijabs
              </Link>
              <Link href="/shop?category=essentials" className="btn border border-paper/45 text-paper hover:bg-paper hover:text-ink">
                Explore essentials
              </Link>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-paper/15 pt-6">
            <p className="label-sm text-paper/55">Scroll</p>
            <p className="label-sm flex items-center gap-2 text-paper/55">
              <IconStar className="h-3 w-3" />
              4.9 average · 3,200+ reviews
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Promises                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-mist bg-bone">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-4">
          {PROMISES.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 80} className="flex items-start gap-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
              <div>
                <p className="label">{title}</p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-smoke">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Categories                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="Three shelves"
          title="Where to begin"
          intro="The whole shop, sorted the way we think about it in the studio."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 110}>
              <Link
                href={`/shop?category=${c.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-bone"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width:768px) 31vw, 92vw"
                  className="img-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-7 text-paper">
                  <h3 className="font-display text-3xl font-light">{c.name}</h3>
                  <p className="mt-2 max-w-xs text-[0.85rem] leading-relaxed text-paper/70">
                    {c.blurb}
                  </p>
                  <span className="label-sm mt-5 inline-flex items-center gap-2 text-paper">
                    Shop
                    <IconArrow className="h-3.5 w-3.5 transition-transform duration-500 ease-silk group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* New in                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell border-t border-mist py-20 md:py-28">
        <SectionHead
          eyebrow="Just landed"
          title="New in"
          href="/shop?sort=new"
          hrefLabel="See everything new"
        />

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {[...newIn, ...best].slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Story split                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell py-8 md:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-bone lg:aspect-[5/6]">
            <Image
              src="/editorial/story.jpg"
              alt=""
              fill
              sizes="(min-width:1024px) 46vw, 92vw"
              className="img-cover"
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="label-sm text-ash">Our story</p>
            <h2 className="h-section mt-5">
              It started with one
              <br />
              <span className="font-script text-[1.05em]">jersey</span> that never
              <br />
              behaved properly.
            </h2>
            <div className="prose-brand mt-7 space-y-5">
              <p>
                In 2019 we were four people in a flat in Heliopolis, unpicking hijabs to
                work out why the good ones were good. The answer was rarely the print or
                the price — it was the weight of the knit and the finish at the hem.
              </p>
              <p>
                So we started there. Every fabric in this shop was chosen by wearing it
                for a month first, and every hem is rolled and stitched by hand in our
                studio in Cairo. We would rather offer twelve things we can stand behind
                than four hundred we cannot.
              </p>
            </div>
            <Link href="/about" className="label link-sweep mt-8 inline-flex items-center gap-2">
              Read the full story
              <IconArrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Bestsellers                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell border-t border-mist py-20 md:py-28">
        <SectionHead
          eyebrow="Most reordered"
          title="The ones that come back"
          intro="Ranked by how often the same customer buys a second one."
          href="/shop?sort=popular"
        />

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {best.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Campaign band                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Image
          src="/editorial/campaign-wide.jpg"
          alt=""
          fill
          sizes="100vw"
          className="img-cover opacity-70"
        />
        <div className="absolute inset-0 bg-ink/45" aria-hidden />
        <div className="grain absolute inset-0" aria-hidden />

        <div className="shell relative py-24 text-center md:py-36">
          <Reveal className="mx-auto max-w-3xl">
            <p className="label-sm text-paper/55">Autumn edit</p>
            <p className="mt-7 font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-light leading-[1.25] text-paper">
              “A hijab should be the least complicated decision of your morning.”
            </p>
            <p className="label-sm mt-8 text-paper/55">From the studio, Cairo</p>
            <Link href="/shop" className="btn-invert mt-10">
              Shop the edit
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Styling steps                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="How to style"
          title="Three things, in order"
          intro="Most styling problems are a cap problem. Get the first step right and the rest follows."
          href="/styling"
          hrefLabel="Full styling guide"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STYLING_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} className="border-t border-ink pt-6">
              <p className="font-display text-5xl font-light text-mist">{s.n}</p>
              <h3 className="h-card mt-5">{s.title}</h3>
              <p className="prose-brand mt-3">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sets                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-bone py-20 md:py-28">
        <div className="shell">
          <SectionHead
            eyebrow="Boxed & ribboned"
            title="Sets worth sending"
            intro="Curated, wrapped and posted with a handwritten card — anywhere in the world."
            href="/shop?category=sets"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {edits.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <Link
                  href={`/product/${p.slug}`}
                  className="group grid grid-cols-[1fr_1.1fr] items-stretch overflow-hidden bg-paper"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={productImage(p)}
                      alt=""
                      fill
                      sizes="(min-width:768px) 24vw, 46vw"
                      className="img-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7">
                    <p className="label-sm text-ash">{p.category === 'sets' ? 'Gift set' : p.fabric}</p>
                    <h3 className="mt-3 font-display text-2xl font-light leading-snug md:text-3xl">
                      {p.name}
                    </h3>
                    <p className="prose-brand mt-3 line-clamp-3 text-[0.85rem]">{p.tagline}</p>
                    <span className="label mt-6 inline-flex items-center gap-2">
                      Discover
                      <IconArrow className="h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Reviews                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <SectionHead align="center" eyebrow="In their words" title="What comes back to us" />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110} className="flex flex-col">
              <div className="flex gap-1 text-ink" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, n) => (
                  <IconStar key={n} className="h-3 w-3" />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl font-light leading-[1.5]">
                “{r.quote}”
              </blockquote>
              <footer className="mt-auto pt-6">
                <p className="label">{r.name}</p>
                <p className="label-sm mt-1.5 text-ash">
                  {r.place} · {r.product}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Community                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-mist pt-20 md:pt-28">
        <div className="shell">
          <SectionHead
            align="center"
            eyebrow="@hijabessentials"
            title="Worn everywhere"
            intro="Tag us and we will share it. We read every one."
          />
        </div>

        <div className="mt-12 grid grid-cols-3 gap-1 md:grid-cols-6">
          {COMMUNITY.map((file, i) => (
            <a
              key={file}
              href="https://instagram.com"
              aria-label="View on Instagram"
              className="group relative block aspect-square overflow-hidden bg-bone"
            >
              <Image
                src={`/products/${file}.jpg`}
                alt=""
                fill
                sizes="(min-width:768px) 16vw, 33vw"
                className="img-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
