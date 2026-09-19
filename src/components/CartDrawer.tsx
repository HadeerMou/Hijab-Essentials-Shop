'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FREE_SHIPPING_THRESHOLD, useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { getColour, productImage } from '@/lib/products';
import { IconClose, IconMinus, IconPlus } from './Icons';

export default function CartDrawer() {
  const { lines, subtotal, count, isOpen, closeCart, remove, setQuantity } = useCart();
  const { format } = useCurrency();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        type="button"
        aria-label="Close bag"
        onClick={closeCart}
        className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-[2px]"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[28rem] animate-slide-in flex-col bg-paper shadow-[-30px_0_80px_-40px_rgba(16,16,16,0.5)]">
        <header className="flex items-center justify-between border-b border-mist px-6 py-5">
          <h2 className="label">
            Your Bag{' '}
            <span className="ml-1 text-ash">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="-mr-2 p-2 text-smoke transition-colors hover:text-ink"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <p className="font-display text-3xl font-light leading-tight text-ink">
              Nothing here yet
            </p>
            <p className="prose-brand mt-4 max-w-xs">
              Start with the Signature Jersey — it is where most people begin.
            </p>
            <Link href="/shop" onClick={closeCart} className="btn-solid mt-8">
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping meter */}
            <div className="border-b border-mist px-6 py-4">
              <p className="label-sm text-smoke">
                {remaining > 0 ? (
                  <>
                    {format(remaining)} away from free Egypt shipping
                  </>
                ) : (
                  <>Free shipping within Egypt unlocked</>
                )}
              </p>
              <div className="mt-2.5 h-px w-full bg-mist">
                <div
                  className="h-px bg-ink transition-[width] duration-700 ease-silk"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-mist overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-5 py-6">
                  <Link
                    href={`/product/${line.slug}`}
                    onClick={closeCart}
                    className="relative block h-32 w-24 shrink-0 overflow-hidden bg-bone"
                  >
                    <Image
                      src={productImage(line.product, line.colour)}
                      alt={line.product.name}
                      fill
                      sizes="96px"
                      className="img-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="font-display text-lg font-light leading-snug text-ink hover:opacity-70"
                      >
                        {line.product.name}
                      </Link>
                      <span className="shrink-0 text-sm tabular-nums text-ink">
                        {format(line.lineTotal)}
                      </span>
                    </div>

                    <p className="label-sm mt-1.5 text-ash">
                      {getColour(line.colour).name}
                      {line.size ? ` · ${line.size}` : ''}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-mist">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-2 text-smoke transition-colors hover:text-ink"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs tabular-nums">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-2 text-smoke transition-colors hover:text-ink"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="label-sm text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-mist px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="label">Subtotal</span>
                <span className="font-display text-2xl font-light tabular-nums">
                  {format(subtotal)}
                </span>
              </div>
              <p className="label-sm mt-2 text-ash">
                Shipping and duties calculated at checkout
              </p>
              <Link href="/checkout" onClick={closeCart} className="btn-solid mt-5 w-full">
                Checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="label mt-4 w-full text-center text-smoke underline-offset-4 hover:text-ink hover:underline"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
