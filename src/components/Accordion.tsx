'use client';

import { useState, type ReactNode } from 'react';

export default function Accordion({
  items,
  initial = 0,
}: {
  items: { title: string; body: ReactNode }[];
  /** Index open on first render; pass -1 for all closed. */
  initial?: number;
}) {
  const [open, setOpen] = useState(initial);

  return (
    <div className="border-t border-mist">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="border-b border-mist">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="label flex w-full items-center justify-between py-5 text-left transition-colors hover:text-smoke"
              >
                {item.title}
                <span className="relative ml-4 h-3 w-3 shrink-0" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-silk ${
                      isOpen ? 'scale-y-0' : 'scale-y-100'
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-silk"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pr-6">{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
