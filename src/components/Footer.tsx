'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FOOTER_NAV } from '@/lib/nav';
import CurrencySwitcher from './CurrencySwitcher';
import Logo from './Logo';
import { IconArrow, IconCheck, IconInstagram, IconTikTok, IconWhatsApp } from './Icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-paper">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />

      {/* Newsletter ------------------------------------------------------ */}
      <div className="shell relative border-b border-paper/12 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <p className="label-sm text-paper/45">The Letter</p>
            <h2 className="h-section mt-5 text-paper">
              New fabrics, small runs,
              <br />
              and the odd styling note.
            </h2>
          </div>

          <div className="lg:pt-10">
            {sent ? (
              <p className="flex items-center gap-3 text-sm text-paper/80">
                <IconCheck className="h-5 w-5" />
                You are on the list. Check your inbox for a welcome note.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSent(true);
                }}
                className="flex items-center gap-4 border-b border-paper/25 pb-3 transition-colors focus-within:border-paper"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full bg-transparent py-2 text-sm text-paper placeholder:text-paper/40"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 p-2 text-paper/70 transition-colors hover:text-paper"
                >
                  <IconArrow className="h-5 w-5" />
                </button>
              </form>
            )}
            <p className="label-sm mt-4 text-paper/35">
              One letter a month. Unsubscribe whenever you like.
            </p>
          </div>
        </div>
      </div>

      {/* Links ----------------------------------------------------------- */}
      <div className="shell relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-16">
        <div>
          <div className="w-[190px]">
            <Logo variant="paper" width={190} />
          </div>
          <p className="mt-7 max-w-xs text-sm leading-[1.9] text-paper/55">
            Hijabs and the essentials that go with them. Cut, sewn and hand-finished
            in Cairo — sent anywhere in the world.
          </p>
          <div className="mt-8 flex items-center gap-5 text-paper/60">
            <a href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-paper">
              <IconInstagram />
            </a>
            <a href="https://tiktok.com" aria-label="TikTok" className="transition-colors hover:text-paper">
              <IconTikTok />
            </a>
            <a href="https://wa.me/201000000000" aria-label="WhatsApp" className="transition-colors hover:text-paper">
              <IconWhatsApp />
            </a>
          </div>
        </div>

        {FOOTER_NAV.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="label-sm text-paper/45">{group.title}</h3>
            <ul className="mt-6 space-y-3.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-sweep text-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Base bar -------------------------------------------------------- */}
      <div className="shell relative border-t border-paper/12 py-7">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <p className="label-sm text-paper/40">
            © {year} Hijab Essentials · Cairo, Egypt
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <span className="label-sm text-paper/40">Ships worldwide</span>
            <CurrencySwitcher tone="paper" />
            <div className="flex items-center gap-2.5 text-paper/45" aria-label="Accepted payment methods">
              {['Visa', 'Mastercard', 'Meeza', 'Fawry', 'COD'].map((m) => (
                <span
                  key={m}
                  className="border border-paper/20 px-2 py-1 text-[0.55rem] uppercase tracking-widest"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="label-sm mt-6 text-paper/25">
          Demonstration storefront — imagery is procedurally generated placeholder art.
        </p>
      </div>
    </footer>
  );
}
