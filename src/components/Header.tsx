'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ANNOUNCEMENTS, PRIMARY_NAV } from '@/lib/nav';
import { useCart } from '@/lib/cart';
import CurrencySwitcher from './CurrencySwitcher';
import Logo from './Logo';
import MobileNav from './MobileNav';
import SearchOverlay from './SearchOverlay';
import { IconBag, IconMenu, IconSearch, IconUser } from './Icons';

/** Pages whose hero runs dark and full-bleed under a transparent header. */
const OVERLAY_ROUTES = ['/', '/about', '/styling'];

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const overlay = OVERLAY_ROUTES.includes(pathname);
  const floating = overlay && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const tone = floating ? 'text-paper' : 'text-ink';

  // Checkout runs distraction-free: wordmark, a way back, nothing else.
  if (pathname === '/checkout') {
    return (
      <header className="border-b border-mist bg-paper">
        <div className="shell flex h-[var(--nav-h)] items-center justify-between">
          <Link href="/shop" className="label link-sweep text-smoke">
            Back to shop
          </Link>
          <div className="w-[132px] md:w-[160px]">
            <Logo priority />
          </div>
          <span className="label-sm hidden text-ash sm:block">Secure checkout</span>
          <span className="sm:hidden" />
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Announcement marquee — scrolls away with the page ---------------- */}
      <div className="relative z-[60] overflow-hidden bg-ink py-2.5 text-paper">
        <div className="flex w-max animate-marquee will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {ANNOUNCEMENTS.map((text) => (
                <span key={text} className="label-sm flex items-center whitespace-nowrap px-8">
                  {text}
                  <span className="ml-8 text-paper/30">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main bar -------------------------------------------------------- */}
      <header
        className={`sticky top-0 z-[80] transition-[background-color,box-shadow,border-color] duration-500 ease-silk ${
          floating
            ? 'border-b border-paper/15 bg-transparent'
            : 'border-b border-mist bg-paper/92 backdrop-blur-md'
        }`}
      >
        <div className="shell">
          <div className="grid h-[var(--nav-h)] grid-cols-[1fr_auto_1fr] items-center">
            {/* left: nav */}
            <nav className="hidden lg:block">
              <ul className={`flex items-center gap-7 ${tone}`}>
                {PRIMARY_NAV.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="label link-sweep opacity-80 hover:opacity-100">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`-ml-2 justify-self-start p-2 lg:hidden ${tone}`}
            >
              <IconMenu className="h-5 w-5" />
            </button>

            {/* centre: wordmark */}
            <div
              className={`justify-self-center transition-all duration-500 ease-silk ${
                scrolled ? 'w-[118px] md:w-[136px]' : 'w-[132px] md:w-[172px]'
              }`}
            >
              <Logo variant={floating ? 'paper' : 'ink'} width={220} priority />
            </div>

            {/* right: utilities */}
            <div className={`flex items-center justify-end gap-1 md:gap-3 ${tone}`}>
              <div className="mr-2 hidden xl:block">
                <CurrencySwitcher tone={floating ? 'paper' : 'ink'} />
              </div>
              <Link
                href="/styling"
                className="label link-sweep mr-3 hidden opacity-80 hover:opacity-100 lg:inline-block"
              >
                Styling
              </Link>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 opacity-80 transition-opacity hover:opacity-100"
              >
                <IconSearch />
              </button>
              <Link
                href="/contact"
                aria-label="Account"
                className="hidden p-2 opacity-80 transition-opacity hover:opacity-100 sm:block"
              >
                <IconUser />
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
                className="relative -mr-2 p-2 opacity-80 transition-opacity hover:opacity-100"
              >
                <IconBag />
                {count > 0 && (
                  <span
                    className={`absolute right-0 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.58rem] font-medium tabular-nums ${
                      floating ? 'bg-paper text-ink' : 'bg-ink text-paper'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
