import Image from 'next/image';
import Link from 'next/link';

/** Dark full-bleed page header that sits under the transparent nav. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumb,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
  crumb?: string;
}) {
  return (
    <section className="under-nav relative isolate flex min-h-[62svh] items-end overflow-hidden bg-ink text-paper">
      {/* The plates vary from espresso to ivory, so the scrim has to be strong
          enough to carry paper-white type over the lightest of them. */}
      <Image src={image} alt="" fill priority sizes="100vw" className="img-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/48 to-ink/62" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="shell relative w-full pb-14 pt-36 md:pb-20">
        {crumb && (
          <nav aria-label="Breadcrumb" className="label-sm mb-6 text-paper/50">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-paper/75">{crumb}</span>
          </nav>
        )}
        {eyebrow && <p className="label-sm text-paper/60">{eyebrow}</p>}
        <h1 className="h-display mt-5 max-w-4xl text-paper">{title}</h1>
        {intro && (
          <p className="mt-7 max-w-xl text-[0.98rem] leading-[1.9] text-paper/75">{intro}</p>
        )}
      </div>
    </section>
  );
}
