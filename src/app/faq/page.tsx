import type { Metadata } from 'next';
import Link from 'next/link';
import Accordion from '@/components/Accordion';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers on sizing, fabrics, care, shipping, customs and returns for Hijab Essentials.',
};

const GROUPS: { title: string; items: { title: string; body: string }[] }[] = [
  {
    title: 'Choosing',
    items: [
      {
        title: 'Which hijab should I start with?',
        body: 'The Signature Jersey, in black or ivory. It holds a wrap without a pin, it is opaque, and it survives being washed twice a week. About seven in ten first orders include one, and most people come back for a second colour rather than a different fabric.',
      },
      {
        title: 'What is the difference between Standard and Maxi?',
        body: 'Standard is 180 × 70 cm and suits most everyday wrapping. Maxi is 200 × 75 cm — the extra length matters if you are taller than about 170 cm, prefer fuller coverage, or like styles with two passes around the neck.',
      },
      {
        title: 'Are the light colours see-through?',
        body: 'Our jersey, modal and crinkle cotton are opaque in every colourway, ivory included. Chiffon and georgette are semi-sheer by design — wear them over a matching undercap rather than a contrasting one.',
      },
      {
        title: 'Do you restock sold-out colours?',
        body: 'Core colours, yes, usually within three to four weeks. Printed modal runs are retired once they sell out and never come back. If you want to be told the moment something returns, message us and we will note it.',
      },
    ],
  },
  {
    title: 'Care',
    items: [
      {
        title: 'How should I wash my hijabs?',
        body: 'Jersey, modal and crinkle cotton go in the machine on a cold gentle cycle. Chiffon and georgette prefer hand washing but survive a delicate cycle in a laundry bag. Silk should be dry cleaned or hand washed cold with a silk detergent, and never wrung.',
      },
      {
        title: 'Will the colours fade?',
        body: 'Not noticeably, if you wash cold and dry out of direct sunlight. Egyptian sun is hard on dye — the single most common cause of fading we see is line drying on a bright balcony rather than in the shade.',
      },
      {
        title: 'My crinkle cotton has lost its texture',
        body: 'It has been ironed or tumble dried hot. Wash it cold, scrunch it firmly while damp, and let it air dry in that bunched shape. The crinkle comes back.',
      },
    ],
  },
  {
    title: 'Orders & delivery',
    items: [
      {
        title: 'How quickly do you dispatch?',
        body: 'Orders placed before 2pm Cairo time leave the studio the same working day. We do not dispatch on Fridays. You will have a tracking number by email as soon as the box is collected.',
      },
      {
        title: 'Do you ship outside Egypt?',
        body: 'Yes, to 64 countries and counting, with DHL Express. Gulf takes 2–4 working days, Europe and the UK 3–5, the US and Canada 4–6, and everywhere else 5–9.',
      },
      {
        title: 'Who pays customs and duties?',
        body: 'Outside Egypt, duties and import taxes are the recipient’s responsibility and are charged by your local customs authority, not by us. We declare every parcel accurately at its real value. See the shipping page for the typical thresholds by region.',
      },
      {
        title: 'Can I pay cash on delivery?',
        body: 'Within Egypt, yes, with a 30 EGP handling fee. International orders must be prepaid by card or Fawry.',
      },
    ],
  },
  {
    title: 'Returns',
    items: [
      {
        title: 'What is your returns policy?',
        body: 'Thirty days from delivery on unworn, unwashed pieces with tags attached. Message us for a returns reference, send it back, and we refund to the original payment method within five working days of it arriving.',
      },
      {
        title: 'Who pays return postage?',
        body: 'We cover return postage within Egypt. International returns are at your cost unless the piece arrived faulty or we sent the wrong thing, in which case we refund the postage too.',
      },
      {
        title: 'Can I exchange rather than refund?',
        body: 'Yes, for any piece of equal or greater value — you pay only the difference. Exchanges within Egypt ship back to you free.',
      },
      {
        title: 'What cannot be returned?',
        body: 'Pins and undercaps, once opened, for hygiene reasons. Everything else is returnable. If a gift set arrives and one piece is wrong, we will swap that piece rather than ask for the whole box back.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <header className="border-b border-mist bg-bone">
        <div className="shell py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="label-sm text-ash">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-smoke">FAQ</span>
          </nav>
          <h1 className="h-section mt-5">Questions, answered</h1>
          <p className="prose-brand mt-4 max-w-xl">
            The things we are asked most, written out properly. If yours is not here,{' '}
            <Link href="/contact" className="link-sweep text-ink">
              ask us directly
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="shell py-16 md:py-24">
        <div className="space-y-16 md:space-y-20">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 60} as="section">
              <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
                <h2 className="label pt-5 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
                  {group.title}
                </h2>
                <Accordion
                  initial={-1}
                  items={group.items.map((i) => ({
                    title: i.title,
                    body: <p className="prose-brand max-w-2xl">{i.body}</p>,
                  }))}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border-t border-mist pt-12 text-center">
          <h2 className="h-card">Still stuck?</h2>
          <p className="prose-brand mx-auto mt-3 max-w-md">
            WhatsApp reaches us fastest, Saturday to Thursday, 10:00–18:00 Cairo time.
          </p>
          <Link href="/contact" className="btn-solid mt-8">
            Contact the studio
          </Link>
        </Reveal>
      </div>
    </>
  );
}
