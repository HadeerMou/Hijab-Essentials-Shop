import Link from 'next/link';
import Reveal from './Reveal';
import { IconArrow } from './Icons';

export default function SectionHead({
  eyebrow,
  title,
  intro,
  href,
  hrefLabel = 'View all',
  align = 'between',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  href?: string;
  hrefLabel?: string;
  align?: 'between' | 'center';
}) {
  if (align === 'center') {
    return (
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && <p className="label-sm text-ash">{eyebrow}</p>}
        <h2 className="h-section mt-4">{title}</h2>
        {intro && <p className="prose-brand mx-auto mt-5 max-w-xl">{intro}</p>}
        {href && (
          <Link href={href} className="label link-sweep mt-7 inline-flex items-center gap-2">
            {hrefLabel}
            <IconArrow className="h-4 w-4" />
          </Link>
        )}
      </Reveal>
    );
  }

  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl">
        {eyebrow && <p className="label-sm text-ash">{eyebrow}</p>}
        <h2 className="h-section mt-4">{title}</h2>
        {intro && <p className="prose-brand mt-5">{intro}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="label link-sweep inline-flex shrink-0 items-center gap-2 pb-1"
        >
          {hrefLabel}
          <IconArrow className="h-4 w-4" />
        </Link>
      )}
    </Reveal>
  );
}
