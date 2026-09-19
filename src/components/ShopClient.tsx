'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import Reveal from './Reveal';
import { IconClose, IconFilter } from './Icons';
import { useCurrency } from '@/lib/currency';
import {
  ALL_COLOURS,
  ALL_FABRICS,
  CATEGORIES,
  PRICE_MAX,
  PRODUCTS,
  getColour,
  type CategorySlug,
  type Product,
} from '@/lib/products';

type Sort = 'featured' | 'new' | 'popular' | 'price-asc' | 'price-desc';

const SORTS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest' },
  { value: 'popular', label: 'Most loved' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

const rank = (p: Product) =>
  (p.featured ? 0 : 1) + (p.bestseller ? 0 : 1) + (p.isNew ? 0 : 1);

export default function ShopClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { format, convert, currency } = useCurrency();

  const category = (params.get('category') as CategorySlug | null) ?? null;
  const sortParam = (params.get('sort') as Sort | null) ?? 'featured';

  const [fabrics, setFabrics] = useState<string[]>([]);
  const [colours, setColours] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<Sort>(sortParam);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => setSort(sortParam), [sortParam]);

  // Changing category is a navigation — it keeps the URL shareable.
  const setCategory = useCallback(
    (next: CategorySlug | null) => {
      const q = new URLSearchParams(params.toString());
      if (next) q.set('category', next);
      else q.delete('category');
      router.push(`/shop${q.toString() ? `?${q}` : ''}`, { scroll: false });
    },
    [params, router],
  );

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const activeCount =
    fabrics.length + colours.length + (maxPrice < PRICE_MAX ? 1 : 0) + (category ? 1 : 0);

  const results = useMemo(() => {
    let out = PRODUCTS.filter((p) => {
      if (category && p.category !== category) return false;
      if (fabrics.length && !fabrics.includes(p.fabric)) return false;
      if (colours.length && !p.colours.some((c) => colours.includes(c))) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      switch (sort) {
        case 'new':
          return Number(!!b.isNew) - Number(!!a.isNew) || rank(a) - rank(b);
        case 'popular':
          return b.reviews - a.reviews;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return rank(a) - rank(b) || b.rating - a.rating;
      }
    });

    return out;
  }, [category, fabrics, colours, maxPrice, sort]);

  const clearAll = () => {
    setFabrics([]);
    setColours([]);
    setMaxPrice(PRICE_MAX);
    setCategory(null);
  };

  const heading = category
    ? CATEGORIES.find((c) => c.slug === category)?.name ?? 'Shop'
    : 'The collection';

  const blurb = category
    ? CATEGORIES.find((c) => c.slug === category)?.blurb
    : 'Everything we make, in one place. Seventeen pieces — no more than we can vouch for.';

  /* ---------------------------------------------------------------- */

  const Filters = (
    <div className="space-y-10">
      <fieldset>
        <legend className="label mb-5">Category</legend>
        <ul className="space-y-3">
          <li>
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`text-sm transition-colors ${
                !category ? 'text-ink' : 'text-smoke hover:text-ink'
              }`}
            >
              <span className={!category ? 'border-b border-ink pb-0.5' : ''}>Everything</span>
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => setCategory(c.slug)}
                className={`text-sm transition-colors ${
                  category === c.slug ? 'text-ink' : 'text-smoke hover:text-ink'
                }`}
              >
                <span className={category === c.slug ? 'border-b border-ink pb-0.5' : ''}>
                  {c.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="rule" />

      <fieldset>
        <legend className="label mb-5">Fabric</legend>
        <ul className="space-y-3">
          {ALL_FABRICS.map((f) => {
            const on = fabrics.includes(f);
            return (
              <li key={f}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-smoke transition-colors hover:text-ink">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setFabrics((prev) => toggle(prev, f))}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors ${
                      on ? 'border-ink bg-ink' : 'border-mist'
                    }`}
                  >
                    {on && (
                      <svg viewBox="0 0 10 10" className="h-2 w-2 text-paper" aria-hidden>
                        <path d="m1 5 2.6 2.6L9 2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    )}
                  </span>
                  <span className={on ? 'text-ink' : ''}>{f}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="rule" />

      <fieldset>
        <legend className="label mb-5">Colour</legend>
        <div className="flex flex-wrap gap-2.5">
          {ALL_COLOURS.map((c) => {
            const on = colours.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => setColours((prev) => toggle(prev, c))}
                aria-pressed={on}
                title={getColour(c).name}
                aria-label={getColour(c).name}
                className={`h-6 w-6 rounded-full ring-offset-2 ring-offset-paper transition-all duration-300 ${
                  on ? 'ring-1 ring-ink' : 'hover:ring-1 hover:ring-mist'
                }`}
                style={{ backgroundColor: getColour(c).hex }}
              />
            );
          })}
        </div>
        {colours.length > 0 && (
          <p className="label-sm mt-4 text-ash">
            {colours.map((c) => getColour(c).name).join(', ')}
          </p>
        )}
      </fieldset>

      <div className="rule" />

      <fieldset>
        <legend className="label mb-5">Price</legend>
        <input
          type="range"
          min={100}
          max={PRICE_MAX}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="h-px w-full cursor-pointer appearance-none bg-mist accent-ink
                     [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-ink"
        />
        <div className="label-sm mt-3 flex justify-between text-ash">
          <span>{format(100)}</span>
          <span className="text-ink">Up to {format(maxPrice)}</span>
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button type="button" onClick={clearAll} className="label link-sweep text-smoke">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Page head ------------------------------------------------------- */}
      <header className="border-b border-mist bg-bone">
        <div className="shell py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="label-sm text-ash">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-smoke">{heading}</span>
          </nav>
          <h1 className="h-section mt-5">{heading}</h1>
          <p className="prose-brand mt-4 max-w-xl">{blurb}</p>
        </div>
      </header>

      <div className="shell py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-16">
          {/* Sidebar --------------------------------------------------- */}
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">{Filters}</div>
          </aside>

          {/* Results --------------------------------------------------- */}
          <section>
            <div className="flex items-center justify-between gap-4 border-b border-mist pb-4">
              <p className="label-sm text-smoke">
                {results.length} {results.length === 1 ? 'piece' : 'pieces'}
                {currency === 'USD' && <span className="ml-2 text-ash">· prices in USD</span>}
              </p>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setDrawer(true)}
                  className="label flex items-center gap-2 lg:hidden"
                >
                  <IconFilter className="h-4 w-4" />
                  Filter{activeCount > 0 && ` (${activeCount})`}
                </button>

                <label className="flex items-center gap-2">
                  <span className="label-sm sr-only text-ash sm:not-sr-only">Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="label cursor-pointer border-b border-mist py-1 pr-5 text-ink transition-colors hover:border-ink"
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-3xl font-light">Nothing matches that</p>
                <p className="prose-brand mx-auto mt-4 max-w-sm">
                  Try widening the price or clearing a colour.
                </p>
                <button type="button" onClick={clearAll} className="btn-outline mt-8">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 xl:grid-cols-3 xl:gap-x-6">
                {results.map((p, i) => (
                  <Reveal key={p.slug} delay={Math.min(i, 5) * 70}>
                    <ProductCard
                      product={p}
                      priority={i < 3}
                      sizes="(min-width:1280px) 26vw, (min-width:1024px) 34vw, 45vw"
                    />
                  </Reveal>
                ))}
              </div>
            )}

            <p className="label-sm mt-16 border-t border-mist pt-6 text-ash">
              Showing {results.length} of {PRODUCTS.length} pieces · Prices shown in{' '}
              {currency}
              {currency === 'USD' && ` (converted from EGP at ${(1 / convert(1)).toFixed(0)} EGP)`}
            </p>
          </section>
        </div>
      </div>

      {/* Mobile filter drawer -------------------------------------------- */}
      {drawer && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 animate-fade-in bg-ink/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-paper">
            <div className="flex items-center justify-between border-b border-mist px-5 py-5">
              <p className="label">Filter</p>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Close filters"
                className="-mr-2 p-2"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-8">{Filters}</div>
            <div className="border-t border-mist p-5">
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="btn-solid w-full"
              >
                Show {results.length} {results.length === 1 ? 'piece' : 'pieces'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
