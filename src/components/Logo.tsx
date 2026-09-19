import Image from 'next/image';
import Link from 'next/link';

/**
 * The wordmark, lifted from the brand's own logo artwork. Two colour cuts —
 * ink for light surfaces, paper for dark ones.
 */
export default function Logo({
  variant = 'ink',
  className = '',
  width = 190,
  priority = false,
}: {
  variant?: 'ink' | 'paper';
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Hijab Essentials — home"
      className={`block shrink-0 transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      <Image
        src={variant === 'paper' ? '/brand/logo-white.png' : '/brand/logo.png'}
        alt="Hijab Essentials"
        width={width}
        height={Math.round((width * 836) / 1924)}
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
