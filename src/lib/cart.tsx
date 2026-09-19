'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { getProduct, type Product } from './products';

/**
 * Client-side cart. No network, no persistence beyond localStorage — when the
 * backend lands, replace the reducer's side effects with API calls and leave
 * every consumer untouched.
 */

export type CartLine = {
  /** slug::colour::size — unique per configuration. */
  id: string;
  slug: string;
  colour: string;
  size?: string;
  quantity: number;
};

export type HydratedLine = CartLine & {
  product: Product;
  lineTotal: number;
};

type Action =
  | { type: 'add'; line: Omit<CartLine, 'id'> }
  | { type: 'remove'; id: string }
  | { type: 'setQuantity'; id: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; lines: CartLine[] };

const lineId = (l: Omit<CartLine, 'id'>) => `${l.slug}::${l.colour}::${l.size ?? 'os'}`;

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const id = lineId(action.line);
      const existing = state.find((l) => l.id === id);
      if (existing) {
        return state.map((l) =>
          l.id === id ? { ...l, quantity: Math.min(99, l.quantity + action.line.quantity) } : l,
        );
      }
      return [...state, { ...action.line, id }];
    }
    case 'remove':
      return state.filter((l) => l.id !== action.id);
    case 'setQuantity':
      return action.quantity <= 0
        ? state.filter((l) => l.id !== action.id)
        : state.map((l) =>
            l.id === action.id ? { ...l, quantity: Math.min(99, action.quantity) } : l,
          );
    case 'clear':
      return [];
    default:
      return state;
  }
}

const STORAGE_KEY = 'he.cart';

/** Free shipping inside Egypt above this EGP subtotal. */
export const FREE_SHIPPING_THRESHOLD = 1500;

type Ctx = {
  lines: HydratedLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (line: Omit<CartLine, 'id'>, opts?: { silent?: boolean }) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, dispatch] = useReducer(reducer, [] as CartLine[]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartLine[];
        if (Array.isArray(parsed)) {
          dispatch({ type: 'hydrate', lines: parsed.filter((l) => getProduct(l.slug)) });
        }
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* ignore */
    }
  }, [raw, ready]);

  // Lock the page behind the drawer.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const lines: HydratedLine[] = useMemo(
    () =>
      raw.flatMap((l) => {
        const product = getProduct(l.slug);
        if (!product) return [];
        return [{ ...l, product, lineTotal: product.price * l.quantity }];
      }),
    [raw],
  );

  const add = useCallback<Ctx['add']>((line, opts) => {
    dispatch({ type: 'add', line });
    if (!opts?.silent) setIsOpen(true);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      remove: (id) => dispatch({ type: 'remove', id }),
      setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [lines, isOpen, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
