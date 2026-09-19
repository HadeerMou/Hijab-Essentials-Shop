'use client';

import { useEffect } from 'react';
import { IconClose } from './Icons';

const SIZES = [
  { name: 'Standard', dims: '180 × 70 cm', fit: 'Everyday wrapping, one or two layers' },
  { name: 'Maxi', dims: '200 × 75 cm', fit: 'Longer drape, fuller coverage, layered styles' },
  { name: 'Cap S / M', dims: '54 – 56 cm', fit: 'Fits most; sits flat at the hairline' },
  { name: 'Cap L / XL', dims: '57 – 60 cm', fit: 'Thicker hair or a looser band' },
];

const FABRICS = [
  { name: 'Cotton Jersey', weight: 'Mid', drape: 'Structured', note: 'Holds without pins. The all-rounder.' },
  { name: 'Matte Chiffon', weight: 'Light', drape: 'Fluid', note: 'Semi-sheer. Layer over a cap.' },
  { name: 'Crinkle Cotton', weight: 'Light', drape: 'Textured', note: 'Volume built in. Never iron it.' },
  { name: 'Bamboo Modal', weight: 'Light-mid', drape: 'Fluid', note: 'Coolest against the skin.' },
  { name: 'Mulberry Silk', weight: 'Mid', drape: 'Liquid', note: 'Slippery — pin it, or wear the matte side out.' },
  { name: 'Poly Georgette', weight: 'Mid', drape: 'Crisp', note: 'Keeps pleats and turban shapes.' },
];

export default function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
      <button
        type="button"
        aria-label="Close size guide"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Size and fabric guide"
        className="relative max-h-[86vh] w-full max-w-3xl animate-fade-up overflow-y-auto bg-paper"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-mist bg-paper px-6 py-5 md:px-10">
          <h2 className="label">Size &amp; fabric guide</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 p-2 text-smoke hover:text-ink"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-8 md:px-10 md:py-10">
          <h3 className="font-display text-2xl font-light">Measurements</h3>
          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="label-sm border-b border-mist text-ash">
                <th className="py-3 font-normal">Size</th>
                <th className="py-3 font-normal">Dimensions</th>
                <th className="hidden py-3 font-normal sm:table-cell">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {SIZES.map((s) => (
                <tr key={s.name}>
                  <td className="py-4 pr-4 text-ink">{s.name}</td>
                  <td className="py-4 pr-4 tabular-nums text-smoke">{s.dims}</td>
                  <td className="hidden py-4 text-smoke sm:table-cell">{s.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="mt-12 font-display text-2xl font-light">Fabrics, compared</h3>
          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="label-sm border-b border-mist text-ash">
                <th className="py-3 font-normal">Fabric</th>
                <th className="py-3 font-normal">Weight</th>
                <th className="py-3 font-normal">Drape</th>
                <th className="hidden py-3 font-normal md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {FABRICS.map((f) => (
                <tr key={f.name}>
                  <td className="py-4 pr-4 text-ink">{f.name}</td>
                  <td className="py-4 pr-4 text-smoke">{f.weight}</td>
                  <td className="py-4 pr-4 text-smoke">{f.drape}</td>
                  <td className="hidden py-4 text-smoke md:table-cell">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="prose-brand mt-10">
            Still unsure? Message us on WhatsApp with your usual size and we will tell you
            honestly which one to take — including when the answer is neither.
          </p>
        </div>
      </div>
    </div>
  );
}
