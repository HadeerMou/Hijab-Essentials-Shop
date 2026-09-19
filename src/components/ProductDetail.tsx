'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { getColour, productImage, type Product } from '@/lib/products';
import Accordion from './Accordion';
import SizeGuide from './SizeGuide';
import {
  IconArrow,
  IconBox,
  IconCheck,
  IconLeaf,
  IconMinus,
  IconPlus,
  IconReturn,
  IconShip,
  IconStar,
} from './Icons';

export default function ProductDetail({ product }: { product: Product }) {
  const { format } = useCurrency();
  const { add } = useCart();

  const [colour, setColour] = useState(product.colours[0]);
  const [size, setSize] = useState(product.sizes?.[0]?.label);
  const [qty, setQty] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const gallery = useMemo(
    () => [
      productImage(product, colour, 'a'),
      productImage(product, colour, 'b'),
      product.category === 'sets' ? '/editorial/newsletter.jpg' : '/editorial/styling.jpg',
    ],
    [product, colour],
  );

  const onSale = typeof product.compareAt === 'number';

  const handleAdd = () => {
    add({ slug: product.slug, colour, size, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>
      <div className="shell pt-8 md:pt-10">
        <nav aria-label="Breadcrumb" className="label-sm text-ash">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-ink">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-smoke">{product.name}</span>
        </nav>
      </div>

      <div className="shell mt-6 pb-20 md:mt-8 md:pb-28">
        <div className="lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-16 xl:gap-24">
          {/* Gallery ---------------------------------------------------- */}
          <div>
            {/* mobile: snap carousel */}
            <div className="no-scrollbar -mx-[var(--shell-x)] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[var(--shell-x)] lg:hidden">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/5] w-[86%] shrink-0 snap-center overflow-hidden bg-bone"
                >
                  <Image
                    src={src}
                    alt={`${product.name} in ${getColour(colour).name}, view ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="86vw"
                    className="img-cover"
                  />
                </div>
              ))}
            </div>

            {/* desktop: stacked plates */}
            <div className="hidden gap-2 lg:grid">
              {gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <Image
                    src={src}
                    alt={`${product.name} in ${getColour(colour).name}, view ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="img-cover transition-transform duration-[1400ms] ease-silk hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info panel ------------------------------------------------- */}
          <div className="mt-10 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:mt-0">
            <div className="flex flex-wrap items-center gap-3">
              {product.isNew && <span className="label-sm bg-ink px-3 py-1.5 text-paper">New</span>}
              {product.lowStock && (
                <span className="label-sm border border-ink px-3 py-1.5">Low stock</span>
              )}
              <span className="label-sm text-ash">{product.fabric}</span>
            </div>

            <h1 className="h-section mt-4 !text-[clamp(1.9rem,3vw,2.6rem)]">{product.name}</h1>
            <p className="prose-brand mt-2 italic">{product.tagline}</p>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex items-center gap-1" aria-label={`${product.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    className="h-3 w-3 text-ink"
                    filled={i < Math.round(product.rating)}
                  />
                ))}
              </div>
              <span className="label-sm text-smoke">
                {product.rating.toFixed(1)} · {product.reviews} reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <p className="font-display text-3xl font-light tabular-nums">
                {format(product.price)}
              </p>
              {onSale && (
                <p className="text-sm text-ash line-through tabular-nums">
                  {format(product.compareAt!)}
                </p>
              )}
            </div>

            <div className="mt-8 h-px w-full bg-mist" />

            {/* Colour */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <p className="label">Colour</p>
                <p className="label-sm text-ash">{getColour(colour).name}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.colours.map((c) => {
                  const on = c === colour;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColour(c)}
                      aria-pressed={on}
                      aria-label={getColour(c).name}
                      title={getColour(c).name}
                      className={`h-8 w-8 rounded-full ring-offset-[3px] ring-offset-paper transition-all duration-300 ${
                        on ? 'ring-1 ring-ink' : 'hover:ring-1 hover:ring-mist'
                      }`}
                      style={{ backgroundColor: getColour(c).hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size */}
            {product.sizes && (
              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <p className="label">Size</p>
                  <button
                    type="button"
                    onClick={() => setGuideOpen(true)}
                    className="label-sm text-smoke underline underline-offset-4 hover:text-ink"
                  >
                    Size &amp; fabric guide
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {product.sizes.map((s) => {
                    const on = s.label === size;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSize(s.label)}
                        aria-pressed={on}
                        className={`border px-4 py-3.5 text-left transition-colors duration-300 ${
                          on ? 'border-ink bg-ink text-paper' : 'border-mist hover:border-ink'
                        }`}
                      >
                        <span className="label block">{s.label}</span>
                        {s.note && (
                          <span
                            className={`label-sm mt-1 block ${on ? 'text-paper/60' : 'text-ash'}`}
                          >
                            {s.note}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + add */}
            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-mist">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3.5 py-4 text-smoke transition-colors hover:text-ink"
                >
                  <IconMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="px-3.5 py-4 text-smoke transition-colors hover:text-ink"
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button type="button" onClick={handleAdd} className="btn-solid flex-1">
                {added ? (
                  <>
                    <IconCheck className="h-4 w-4" />
                    Added to bag
                  </>
                ) : (
                  <>Add to bag — {format(product.price * qty)}</>
                )}
              </button>
            </div>

            <Link href="/checkout" className="btn-outline mt-3 w-full">
              Buy it now
            </Link>

            {/* Reassurance */}
            <ul className="mt-8 space-y-3.5 border-t border-mist pt-8">
              {[
                { icon: IconShip, text: 'Free shipping in Egypt over EGP 1,500 · 1–3 days' },
                { icon: IconBox, text: 'Worldwide DHL Express · 3–6 working days' },
                { icon: IconReturn, text: '30-day returns on unworn, unwashed pieces' },
                { icon: IconLeaf, text: 'Cut and hand-finished in our Cairo studio' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[0.82rem] text-smoke">
                  <Icon className="h-4 w-4 shrink-0 text-ink" />
                  {text}
                </li>
              ))}
            </ul>

            {/* Accordions */}
            <div className="mt-10">
              <Accordion
                items={[
                  {
                    title: 'Description',
                    body: <p className="prose-brand">{product.description}</p>,
                  },
                  {
                    title: 'Details',
                    body: (
                      <ul className="prose-brand space-y-2">
                        {product.details.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span className="mt-2.5 h-px w-3 shrink-0 bg-ash" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: 'Care',
                    body: (
                      <ul className="prose-brand space-y-2">
                        {product.care.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span className="mt-2.5 h-px w-3 shrink-0 bg-ash" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: 'Shipping & returns',
                    body: (
                      <div className="prose-brand space-y-3">
                        <p>
                          Orders placed before 2pm Cairo time leave the studio the same working
                          day. Egypt: 1–3 days. Gulf: 2–4 days. Europe, UK and North America:
                          3–6 days with DHL Express, fully tracked.
                        </p>
                        <p>
                          Returns are accepted within 30 days on unworn, unwashed pieces with
                          tags attached.{' '}
                          <Link href="/shipping-returns" className="link-sweep text-ink">
                            Full policy
                          </Link>
                          .
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}

export function RelatedHeading() {
  return (
    <div className="flex items-end justify-between">
      <h2 className="h-section">Pairs well with</h2>
      <Link href="/shop" className="label link-sweep flex items-center gap-2 pb-1">
        All pieces
        <IconArrow className="h-4 w-4" />
      </Link>
    </div>
  );
}
