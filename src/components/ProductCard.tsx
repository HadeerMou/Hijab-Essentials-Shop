'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { getColour, productImage, type Product } from '@/lib/products';
import { IconStar } from './Icons';

export default function ProductCard({
  product,
  priority = false,
  sizes = '(min-width:1280px) 22vw, (min-width:768px) 31vw, 45vw',
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const [colour, setColour] = useState(product.colours[0]);
  const [hovered, setHovered] = useState(false);
  const { format } = useCurrency();
  const { add } = useCart();

  const onSale = typeof product.compareAt === 'number';
  const flag = product.isNew
    ? 'New'
    : onSale
      ? 'Offer'
      : product.bestseller
        ? 'Bestseller'
        : null;

  const quickAdd = () =>
    add({
      slug: product.slug,
      colour,
      size: product.sizes?.[0]?.label,
      quantity: 1,
    });

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <Image
            src={productImage(product, colour, 'a')}
            alt={`${product.name} in ${getColour(colour).name}`}
            fill
            sizes={sizes}
            priority={priority}
            className={`img-cover transition-[opacity,transform] duration-[900ms] ease-silk ${
              hovered ? 'scale-[1.04] opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <Image
            src={productImage(product, colour, 'b')}
            alt=""
            fill
            sizes={sizes}
            aria-hidden
            className={`img-cover transition-[opacity,transform] duration-[900ms] ease-silk ${
              hovered ? 'scale-[1.04] opacity-100' : 'scale-100 opacity-0'
            }`}
          />

          {flag && (
            <span className="label-sm absolute left-4 top-4 bg-paper/90 px-3 py-1.5 text-ink backdrop-blur-sm">
              {flag}
            </span>
          )}

          {product.lowStock && (
            <span className="label-sm absolute right-4 top-4 bg-ink/85 px-3 py-1.5 text-paper backdrop-blur-sm">
              Low stock
            </span>
          )}

          {/* Quick add — slides up on hover, always reachable on touch. */}
          <div
            className={`absolute inset-x-3 bottom-3 transition-all duration-500 ease-silk md:inset-x-4 md:bottom-4 ${
              hovered
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-3 opacity-0 md:pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                quickAdd();
              }}
              className="label w-full bg-paper/95 py-3.5 text-ink backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Quick add
            </button>
          </div>
        </div>
      </Link>

      <div className="pt-4">
        <div className="flex min-h-[3.4rem] items-baseline justify-between gap-4">
          <h3 className="h-card min-w-0">
            <Link href={`/product/${product.slug}`} className="link-sweep">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-sm tabular-nums">
            {onSale && (
              <span className="mr-2 text-ash line-through">{format(product.compareAt!)}</span>
            )}
            {format(product.price)}
          </p>
        </div>

        <div className="mt-1.5 flex items-center gap-3">
          <p className="label-sm text-ash">{product.fabric}</p>
          <span className="flex items-center gap-1 text-ash">
            <IconStar className="h-2.5 w-2.5" />
            <span className="text-[0.66rem] tabular-nums">{product.rating.toFixed(1)}</span>
          </span>
        </div>

        {product.colours.length > 1 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            {product.colours.map((c) => {
              const active = c === colour;
              return (
                <button
                  key={c}
                  type="button"
                  onMouseEnter={() => setColour(c)}
                  onFocus={() => setColour(c)}
                  onClick={() => setColour(c)}
                  aria-label={getColour(c).name}
                  aria-pressed={active}
                  title={getColour(c).name}
                  className={`h-3.5 w-3.5 rounded-full ring-offset-2 ring-offset-paper transition-all duration-300 ${
                    active ? 'ring-1 ring-ink' : 'ring-0 hover:ring-1 hover:ring-mist'
                  }`}
                  style={{ backgroundColor: getColour(c).hex }}
                />
              );
            })}
            <span className="label-sm ml-1 text-ash">{product.colours.length} colours</span>
          </div>
        )}
      </div>
    </article>
  );
}
