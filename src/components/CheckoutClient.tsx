'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FREE_SHIPPING_THRESHOLD, useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { getColour, productImage } from '@/lib/products';
import { IconArrow, IconCheck, IconChevron, IconLeaf } from './Icons';

/** Shipping zones in EGP. Frontend-only — a real rate engine replaces this. */
const ZONES = [
  { code: 'EG', label: 'Egypt', days: '1–3 working days', cost: 75, cod: true },
  { code: 'GULF', label: 'Saudi Arabia, UAE & Gulf', days: '2–4 working days', cost: 420, cod: false },
  { code: 'EU', label: 'Europe & UK', days: '3–5 working days', cost: 640, cod: false },
  { code: 'NA', label: 'US & Canada', days: '4–6 working days', cost: 780, cod: false },
  { code: 'ROW', label: 'Rest of world', days: '5–9 working days', cost: 890, cod: false },
];

const STEPS = ['Contact', 'Delivery', 'Payment'] as const;
type Step = 0 | 1 | 2;

export default function CheckoutClient() {
  const { lines, subtotal, clear } = useCart();
  const { format } = useCurrency();

  const [step, setStep] = useState<Step>(0);
  const [zone, setZone] = useState(ZONES[0]);
  const [payment, setPayment] = useState<'card' | 'cod' | 'fawry'>('card');
  const [giftNote, setGiftNote] = useState('');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [placed, setPlaced] = useState(false);

  const freeShipping = zone.code === 'EG' && subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = lines.length === 0 ? 0 : freeShipping ? 0 : zone.cost;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const orderRef = useMemo(
    () => `HE-${Math.floor(100000 + Math.random() * 899999)}`,
    [],
  );

  /* ------------------------------------------------------------------ */
  /* Confirmation                                                        */
  /* ------------------------------------------------------------------ */
  if (placed) {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink">
          <IconCheck className="h-6 w-6" />
        </span>
        <h1 className="h-section mt-8">Thank you</h1>
        <p className="prose-brand mt-4 max-w-md">
          Order <span className="text-ink">{orderRef}</span> is confirmed. A receipt is on its
          way to your inbox, and your tracking number follows as soon as the box leaves the
          studio.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop" className="btn-solid">
            Continue shopping
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact us
          </Link>
        </div>
        <p className="label-sm mt-12 text-ash">
          Demo checkout — no payment was taken and no order was placed.
        </p>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Empty bag                                                           */
  /* ------------------------------------------------------------------ */
  if (lines.length === 0) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="h-section">Your bag is empty</h1>
        <p className="prose-brand mt-4 max-w-sm">
          Add something you will actually wear, then come back here.
        </p>
        <Link href="/shop" className="btn-solid mt-8">
          Shop the collection
        </Link>
      </div>
    );
  }

  const Summary = (
    <div className="bg-bone p-7 md:p-8">
      <h2 className="label">Order summary</h2>

      <ul className="mt-6 space-y-5">
        {lines.map((line) => (
          <li key={line.id} className="flex gap-4">
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-mist">
              <Image
                src={productImage(line.product, line.colour)}
                alt=""
                fill
                sizes="64px"
                className="img-cover"
              />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[0.6rem] text-paper">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg font-light">{line.product.name}</p>
              <p className="label-sm mt-1 text-ash">
                {getColour(line.colour).name}
                {line.size ? ` · ${line.size}` : ''}
              </p>
            </div>
            <p className="shrink-0 text-sm tabular-nums">{format(line.lineTotal)}</p>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (promo.trim()) setPromoApplied(true);
        }}
        className="mt-7 flex items-center gap-3 border-b border-mist pb-2"
      >
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Discount code"
          aria-label="Discount code"
          className="w-full bg-transparent py-2 text-sm"
        />
        <button type="submit" className="label-sm shrink-0 text-smoke hover:text-ink">
          Apply
        </button>
      </form>
      {promoApplied && (
        <p className="label-sm mt-3 flex items-center gap-2 text-smoke">
          <IconCheck className="h-3.5 w-3.5" /> Code applied — 10% off
        </p>
      )}

      <dl className="mt-7 space-y-3 border-t border-mist pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-smoke">Subtotal</dt>
          <dd className="tabular-nums">{format(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-smoke">Discount</dt>
            <dd className="tabular-nums">−{format(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-smoke">Shipping · {zone.label}</dt>
          <dd className="tabular-nums">{shipping === 0 ? 'Free' : format(shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-mist pt-4">
          <dt className="label">Total</dt>
          <dd className="font-display text-2xl font-light tabular-nums">{format(total)}</dd>
        </div>
      </dl>

      <p className="label-sm mt-5 flex items-start gap-2 text-ash">
        <IconLeaf className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Packed in recycled tissue and a reusable cotton pouch.
      </p>
    </div>
  );

  return (
    <div className="shell py-10 md:py-16">
      <div className="flex flex-col items-center gap-4 border-b border-mist pb-8 text-center">
        <nav aria-label="Checkout steps" className="flex items-center gap-3">
          {STEPS.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              {i > 0 && <IconChevron className="h-3 w-3 text-mist" />}
              <button
                type="button"
                onClick={() => i < step && setStep(i as Step)}
                className={`label-sm transition-colors ${
                  i === step ? 'text-ink' : i < step ? 'text-smoke hover:text-ink' : 'text-ash'
                }`}
              >
                {label}
              </button>
            </span>
          ))}
        </nav>
      </div>

      <div className="mt-12 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-16">
        {/* Form ----------------------------------------------------------- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) {
              setStep((s) => (s + 1) as Step);
              return;
            }
            clear();
            setPlaced(true);
          }}
          className="order-2 mt-12 lg:order-1 lg:mt-0"
        >
          {step === 0 && (
            <section className="animate-fade-up">
              <h2 className="h-card">Contact</h2>
              <p className="prose-brand mt-2">
                We will send your receipt and tracking here. Nothing else, unless you ask.
              </p>
              <div className="mt-8 space-y-6">
                <input required type="email" placeholder="Email address" aria-label="Email address" className="field" />
                <input required type="tel" placeholder="Phone (for the courier)" aria-label="Phone" className="field" />
                <label className="flex cursor-pointer items-start gap-3 pt-2 text-sm text-smoke">
                  <input type="checkbox" className="mt-1 accent-ink" defaultChecked />
                  Email me new arrivals and small-run drops
                </label>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="animate-fade-up">
              <h2 className="h-card">Delivery</h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <input required placeholder="First name" aria-label="First name" className="field" />
                <input required placeholder="Last name" aria-label="Last name" className="field" />
                <input required placeholder="Address" aria-label="Address" className="field sm:col-span-2" />
                <input placeholder="Apartment, floor (optional)" aria-label="Apartment" className="field sm:col-span-2" />
                <input required placeholder="City" aria-label="City" className="field" />
                <input placeholder="Postcode" aria-label="Postcode" className="field" />
              </div>

              <fieldset className="mt-10">
                <legend className="label">Destination &amp; speed</legend>
                <div className="mt-5 space-y-2">
                  {ZONES.map((z) => {
                    const on = z.code === zone.code;
                    const isFree = z.code === 'EG' && subtotal >= FREE_SHIPPING_THRESHOLD;
                    return (
                      <label
                        key={z.code}
                        className={`flex cursor-pointer items-center justify-between border px-5 py-4 transition-colors duration-300 ${
                          on ? 'border-ink' : 'border-mist hover:border-ash'
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="zone"
                            checked={on}
                            onChange={() => {
                              setZone(z);
                              if (!z.cod && payment === 'cod') setPayment('card');
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              on ? 'border-ink' : 'border-mist'
                            }`}
                          >
                            {on && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                          </span>
                          <span>
                            <span className="block text-sm">{z.label}</span>
                            <span className="label-sm mt-0.5 block text-ash">{z.days}</span>
                          </span>
                        </span>
                        <span className="shrink-0 text-sm tabular-nums">
                          {isFree ? 'Free' : format(z.cost)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8">
                <label className="label" htmlFor="gift">
                  Gift note (optional)
                </label>
                <textarea
                  id="gift"
                  rows={3}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="We will write this by hand on a card and leave the prices out."
                  className="field mt-3 resize-none"
                />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="animate-fade-up">
              <h2 className="h-card">Payment</h2>
              <p className="prose-brand mt-2">
                All transactions are encrypted. We never see your card number.
              </p>

              <div className="mt-8 space-y-2">
                {[
                  { id: 'card', label: 'Card', note: 'Visa, Mastercard, Meeza' },
                  { id: 'fawry', label: 'Fawry', note: 'Pay at any Fawry outlet within 24h' },
                  ...(zone.cod
                    ? [{ id: 'cod', label: 'Cash on delivery', note: 'Egypt only · EGP 30 handling' }]
                    : []),
                ].map((m) => {
                  const on = payment === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center gap-4 border px-5 py-4 transition-colors duration-300 ${
                        on ? 'border-ink' : 'border-mist hover:border-ash'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={on}
                        onChange={() => setPayment(m.id as typeof payment)}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                          on ? 'border-ink' : 'border-mist'
                        }`}
                      >
                        {on && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                      </span>
                      <span>
                        <span className="block text-sm">{m.label}</span>
                        <span className="label-sm mt-0.5 block text-ash">{m.note}</span>
                      </span>
                    </label>
                  );
                })}
              </div>

              {payment === 'card' && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <input required placeholder="Card number" aria-label="Card number" className="field sm:col-span-2" inputMode="numeric" />
                  <input required placeholder="MM / YY" aria-label="Expiry" className="field" inputMode="numeric" />
                  <input required placeholder="CVC" aria-label="Security code" className="field" inputMode="numeric" />
                  <input required placeholder="Name on card" aria-label="Name on card" className="field sm:col-span-2" />
                </div>
              )}

              <p className="label-sm mt-8 text-ash">
                This is a demonstration storefront. No payment will be processed.
              </p>
            </section>
          )}

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-mist pt-8">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="label link-sweep text-smoke"
              >
                Back
              </button>
            ) : (
              <Link href="/shop" className="label link-sweep text-smoke">
                Continue shopping
              </Link>
            )}

            <button type="submit" className="btn-solid">
              {step === 2 ? `Pay ${format(total)}` : 'Continue'}
              <IconArrow className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Summary --------------------------------------------------------- */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          {Summary}
        </aside>
      </div>
    </div>
  );
}
