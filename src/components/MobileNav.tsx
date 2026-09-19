'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { PRIMARY_NAV } from '@/lib/nav';
import CurrencySwitcher from './CurrencySwitcher';
import Logo from './Logo';
import { IconClose, IconInstagram, IconTikTok, IconWhatsApp } from './Icons';

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
    <div className="fixed inset-0 z-[95] flex flex-col bg-paper animate-fade-in lg:hidden">
      <div className="flex items-center justify-between border-b border-mist px-5 py-5">
        <div onClick={onClose}>
          <Logo width={140} />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-8">
        <ul className="space-y-1">
          {PRIMARY_NAV.map((item, i) => (
            <li
              key={item.href}
              className="animate-fade-up border-b border-mist/70"
              style={{ animationDelay: `${60 + i * 45}ms` }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-baseline justify-between py-5 font-display text-3xl font-light text-ink"
              >
                {item.label}
                <span className="label-sm text-ash">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-10 space-y-4">
          {[
            { label: 'Shipping & Returns', href: '/shipping-returns' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onClose} className="label text-smoke">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between border-t border-mist px-5 py-6">
        <CurrencySwitcher />
        <div className="flex items-center gap-5 text-smoke">
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-ink">
            <IconInstagram />
          </a>
          <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-ink">
            <IconTikTok />
          </a>
          <a href="https://wa.me/201000000000" aria-label="WhatsApp" className="hover:text-ink">
            <IconWhatsApp />
          </a>
        </div>
      </div>
    </div>
  );
}
