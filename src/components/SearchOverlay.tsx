'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS, getColour, productImage } from '@/lib/products';
import { useCurrency } from '@/lib/currency';
import { IconClose, IconSearch } from './Icons';

const SUGGESTIONS = ['Jersey', 'Chiffon', 'Silk', 'Undercap', 'Pins', 'Gift set'];

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { format } = useCurrency();

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.fabric, p.tagline, p.category, ...p.colours.map((c) => getColour(c).name)]
        .join(' ')
        .toLowerCase()
        .includes(q),
    ).slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] animate-fade-in">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
      />

      <div className="relative bg-paper shadow-[0_24px_80px_-40px_rgba(16,16,16,0.45)]">
        <div className="shell py-8 md:py-12">
          <div className="flex items-center gap-5 border-b border-mist pb-5">
            <IconSearch className="h-5 w-5 shrink-0 text-ash" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hijabs, fabrics, colours…"
              className="w-full font-display text-2xl font-light tracking-tight text-ink md:text-4xl"
              aria-label="Search products"
            />
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2 text-smoke transition-colors hover:text-ink"
              aria-label="Close search"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          {!query && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="label-sm mr-2 text-ash">Try</span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="label border border-mist px-4 py-2 text-smoke transition-colors duration-300 hover:border-ink hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <p className="prose-brand mt-10">
              Nothing matches “{query}”. Try a fabric — jersey, chiffon, modal — or{' '}
              <Link href="/shop" onClick={onClose} className="link-sweep text-ink">
                browse everything
              </Link>
              .
            </p>
          )}

          {results.length > 0 && (
            <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-5"
                  >
                    <span className="relative block h-24 w-20 shrink-0 overflow-hidden bg-bone">
                      <Image
                        src={productImage(p)}
                        alt=""
                        fill
                        sizes="80px"
                        className="img-cover transition-transform duration-700 ease-silk group-hover:scale-105"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-lg font-light text-ink">
                        {p.name}
                      </span>
                      <span className="label-sm mt-1 block text-ash">{p.fabric}</span>
                      <span className="mt-2 block text-sm text-smoke">{format(p.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
