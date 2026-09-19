import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { IconArrow, IconBox, IconLeaf, IconReturn, IconShip } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Hijab Essentials began in a Heliopolis flat in 2019. We make a small number of hijabs and essentials, cut and hand-finished in Cairo.',
};

const NUMBERS = [
  { figure: '2019', label: 'Founded in Heliopolis, Cairo' },
  { figure: '17', label: 'Pieces in the permanent range' },
  { figure: '64', label: 'Countries we have posted to' },
  { figure: '31k', label: 'Hems rolled by hand' },
];

const VALUES = [
  {
    icon: IconLeaf,
    title: 'Fewer, better',
    copy: 'Seventeen pieces. Each one earns its place by being worn for a month before it goes on sale, and stays only while it holds up.',
  },
  {
    icon: IconBox,
    title: 'Finished by hand',
    copy: 'Every hem is rolled and stitched in our studio. It is slower and it costs more, and it is the single clearest difference you will feel.',
  },
  {
    icon: IconShip,
    title: 'Honest with distance',
    copy: 'We quote real delivery windows, not optimistic ones, and we tell you about duties before you pay rather than after.',
  },
  {
    icon: IconReturn,
    title: 'Easy to undo',
    copy: 'Thirty days, unworn and unwashed, no interrogation. If a colour is wrong on you, that is information, not a dispute.',
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'A flat, four people, one unpicked hijab',
    copy: 'We spent a winter taking apart the hijabs we already owned to work out what made the good ones good. It was almost never the print.',
  },
  {
    year: '2021',
    title: 'The jersey we still sell today',
    copy: 'After eleven sample knits we found a weight that holds a wrap unpinned. It remains the first thing most people buy from us.',
  },
  {
    year: '2023',
    title: 'The studio on Baghdad Street',
    copy: 'We moved into a real workroom with real light, hired four machinists, and started rolling every hem in-house.',
  },
  {
    year: '2025',
    title: 'Sixty-four countries',
    copy: 'What started as deliveries by scooter across Cairo now leaves the studio in DHL boxes most mornings before ten.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Our Story"
        eyebrow="Since 2019 · Cairo"
        title={
          <>
            We make a small
            <br />
            number of things
            <br />
            <span className="font-script text-[0.82em]">properly</span>.
          </>
        }
        intro="Hijab Essentials started because the hijabs we could buy were either beautiful and badly made, or well made and dull. We decided to stop choosing."
        image="/editorial/campaign-wide.jpg"
      />

      {/* Numbers --------------------------------------------------------- */}
      <section className="border-b border-mist bg-bone">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-10 py-14 lg:grid-cols-4">
          {NUMBERS.map((n, i) => (
            <Reveal key={n.label} delay={i * 80}>
              <p className="font-display text-5xl font-light leading-none">{n.figure}</p>
              <p className="label-sm mt-4 max-w-[14rem] text-smoke">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Long form ------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <Reveal>
            <p className="label-sm text-ash">The beginning</p>
            <h2 className="h-section mt-5">
              The problem was
              <br />
              never the fabric
              <br />
              shops.
            </h2>
          </Reveal>

          <Reveal delay={120} className="prose-brand space-y-6 lg:pt-6">
            <p>
              Cairo has some of the best fabric markets in the world. What it did not have,
              in 2019, was anyone willing to explain why one jersey holds a wrap for twelve
              hours and another gives up by noon. The answer turned out to be unglamorous:
              knit weight, elastane percentage, and whether anyone bothered to finish the
              edge properly.
            </p>
            <p>
              So we learned it the slow way. We bought hijabs from everywhere we could and
              unpicked them on a kitchen table. We took swatches to mills in Mahalla and
              asked for a knit twenty grams heavier. We wore samples for a month each — through
              commutes, weddings, a funeral, the middle of August — and threw out the ones
              that disappointed us, which was most of them.
            </p>
            <p>
              What survived that process is what you see here. Seventeen pieces, no seasonal
              churn, no four-hundred-item catalogue we could not possibly stand behind. When
              something stops meeting the standard, we stop selling it rather than discounting
              it.
            </p>
            <p>
              Everything is cut and hand-finished in our studio in Cairo by people we know by
              name and pay properly. That is not a marketing line — it is the reason the hems
              look the way they do, and the reason we can tell you exactly who made the thing
              in your hands.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image band ------------------------------------------------------ */}
      <section className="grid gap-2 md:grid-cols-3">
        {['/editorial/hero-alt.jpg', '/editorial/styling.jpg', '/editorial/newsletter.jpg'].map(
          (src, i) => (
            <Reveal key={src} delay={i * 110} className="relative aspect-[4/5] overflow-hidden bg-bone">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width:768px) 33vw, 100vw"
                className="img-cover"
              />
            </Reveal>
          ),
        )}
      </section>

      {/* Values ---------------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="How we work"
          title="Four things we do not bend on"
          intro="Not values on a wall — the four rules that decide what we make and how we sell it."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="border-t border-ink pt-6">
              <v.icon className="h-5 w-5" />
              <h3 className="h-card mt-5">{v.title}</h3>
              <p className="prose-brand mt-3">{v.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline -------------------------------------------------------- */}
      <section className="bg-bone py-20 md:py-28">
        <div className="shell">
          <SectionHead eyebrow="Along the way" title="Six years, briefly" />

          <ol className="mt-14 space-y-0">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <li className="grid gap-4 border-t border-mist py-8 md:grid-cols-[8rem_1fr] md:gap-12">
                  <p className="font-display text-3xl font-light text-ash">{t.year}</p>
                  <div>
                    <h3 className="h-card">{t.title}</h3>
                    <p className="prose-brand mt-3 max-w-2xl">{t.copy}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing --------------------------------------------------------- */}
      <section className="shell py-20 text-center md:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <p className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-[1.3]">
            If something we made does not live up to this, we want to hear about it —
            properly, not through a form.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop" className="btn-solid">
              Shop the collection
            </Link>
            <Link href="/contact" className="label link-sweep inline-flex items-center gap-2">
              Talk to us
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
