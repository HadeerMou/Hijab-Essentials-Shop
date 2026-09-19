'use client';

import { CURRENCIES, useCurrency, type CurrencyCode } from '@/lib/currency';

const ORDER: CurrencyCode[] = ['EGP', 'USD'];

export default function CurrencySwitcher({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'paper';
}) {
  const { currency, setCurrency } = useCurrency();
  const dim = tone === 'paper' ? 'text-paper/45' : 'text-ash';
  const on = tone === 'paper' ? 'text-paper' : 'text-ink';

  return (
    <div
      className={`label-sm flex items-center gap-2 ${className}`}
      role="group"
      aria-label="Display currency"
    >
      {ORDER.map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && <span className={dim} aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => setCurrency(code)}
            aria-pressed={currency === code}
            className={`transition-colors duration-300 hover:opacity-100 ${
              currency === code ? on : `${dim} hover:${on}`
            }`}
          >
            {CURRENCIES[code].code}
          </button>
        </span>
      ))}
    </div>
  );
}
