'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Prices live in EGP throughout the catalogue. This context handles display
 * conversion only — when a real backend arrives, swap `RATES` for live rates
 * fetched server-side and keep the rest of the API identical.
 */

export type CurrencyCode = 'EGP' | 'USD';

type Config = {
  code: CurrencyCode;
  symbol: string;
  /** Multiplier applied to the EGP base price. */
  rate: number;
  locale: string;
  /** Round display prices to this increment for a tidy price ladder. */
  step: number;
};

export const CURRENCIES: Record<CurrencyCode, Config> = {
  EGP: { code: 'EGP', symbol: 'EGP', rate: 1, locale: 'en-EG', step: 5 },
  USD: { code: 'USD', symbol: '$', rate: 1 / 48.6, locale: 'en-US', step: 0.5 },
};

const STORAGE_KEY = 'he.currency';

type Ctx = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Formats an EGP base price for display, e.g. "EGP 450" or "$9.50". */
  format: (egp: number) => string;
  /** Numeric converted value, for totals maths. */
  convert: (egp: number) => number;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('EGP');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'EGP' || saved === 'USD') setCurrencyState(saved);
    } catch {
      /* storage unavailable — the EGP default is fine */
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const convert = useCallback(
    (egp: number) => {
      const { rate, step } = CURRENCIES[currency];
      const raw = egp * rate;
      return Math.round(raw / step) * step;
    },
    [currency],
  );

  const format = useCallback(
    (egp: number) => {
      const value = convert(egp);
      if (currency === 'USD') {
        return `$${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
      }
      return `EGP ${value.toLocaleString('en-EG')}`;
    },
    [convert, currency],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, format, convert }),
    [currency, setCurrency, format, convert],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>');
  return ctx;
}
