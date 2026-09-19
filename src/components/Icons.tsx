/* Hairline icon set — 1px strokes to match the typography. */

type P = { className?: string };

const base = 'h-[18px] w-[18px]';

export const IconSearch = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconBag = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4.5 7.5h15l-1 13h-13l-1-13Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 9.5V6.75a3.25 3.25 0 0 1 6.5 0V9.5"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

export const IconUser = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="8.5" r="3.75" stroke="currentColor" strokeWidth="1.1" />
    <path d="M4.75 20.25c0-3.7 3.25-6 7.25-6s7.25 2.3 7.25 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconClose = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconMenu = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M3.5 7.5h17M3.5 12.5h17M3.5 17.5h11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconArrow = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M4 12h15.5M14 6.5 19.5 12 14 17.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevron = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m8.5 5 7 7-7 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconMinus = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5.5 12h13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconPlus = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 5.5v13M5.5 12h13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconStar = ({ className = 'h-3 w-3', filled = true }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill={filled ? 'currentColor' : 'none'}>
    <path
      d="m12 3.5 2.6 5.5 5.9.8-4.3 4.2 1 6-5.2-2.9-5.2 2.9 1-6L3.5 9.8l5.9-.8L12 3.5Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShip = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M2.5 14.5h11V7.5h-11v7Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M13.5 10.5h4l4 3.2v.8h-8v-4Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <circle cx="7" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="17.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const IconReturn = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M4 11a8 8 0 1 1 2.3 5.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M3.5 5.5V11H9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconLeaf = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M20 4c0 9-5.4 14-11 14a5 5 0 0 1-5-5C4 8.5 10 4 20 4Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M4.5 20c3-6.5 7-10 12-13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconBox = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 3.5 20.5 8v8L12 20.5 3.5 16V8L12 3.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M3.5 8 12 12.5 20.5 8M12 12.5v8" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

export const IconInstagram = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);

export const IconTikTok = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M14 3.5v11.2a3.3 3.3 0 1 1-2.8-3.26"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path d="M14 3.5c.6 2.6 2.2 4 4.7 4.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconWhatsApp = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 20.5 11.7Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path
      d="M9 8.6c.5-.2.9 0 1.1.4l.5 1.1c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.1.5c.4.2.6.6.4 1.1-.3.8-1.2 1.2-2 1-2.6-.7-4.6-2.7-5.3-5.3-.2-.8.2-1.6 1-1.9l.3.2Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconGlobe = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const IconFilter = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M3.5 7h17M6.5 12h11M10 17h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const IconCheck = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
