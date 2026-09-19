import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { IconBox, IconReturn, IconShip } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Delivery times and costs from Cairo to 64 countries, customs guidance, and our 30-day returns policy.',
};

const ZONES = [
  { zone: 'Egypt', time: '1–3 working days', cost: 'EGP 75 · free over EGP 1,500', carrier: 'Bosta / Mylerz' },
  { zone: 'Saudi Arabia, UAE & Gulf', time: '2–4 working days', cost: 'EGP 420', carrier: 'DHL Express' },
  { zone: 'Europe & UK', time: '3–5 working days', cost: 'EGP 640', carrier: 'DHL Express' },
  { zone: 'US & Canada', time: '4–6 working days', cost: 'EGP 780', carrier: 'DHL Express' },
  { zone: 'Rest of world', time: '5–9 working days', cost: 'EGP 890', carrier: 'DHL Express' },
];

const DUTIES = [
  { place: 'United Kingdom', note: 'VAT and duty apply above £135. Below that, VAT only.' },
  { place: 'European Union', note: 'VAT applies from the first euro; duty above €150.' },
  { place: 'United States', note: 'Usually duty-free below $800 under de minimis.' },
  { place: 'Gulf states', note: 'Typically 5% VAT plus customs handling above local thresholds.' },
];

const STEPS = [
  {
    n: '01',
    title: 'Tell us within 30 days',
    copy: 'Message us with your order reference and which pieces are going back. You will get a returns number the same working day.',
  },
  {
    n: '02',
    title: 'Send it as it arrived',
    copy: 'Unworn, unwashed, tags attached, in the original pouch if you still have it. Inside Egypt we arrange and pay for the pickup.',
  },
  {
    n: '03',
    title: 'Refund in five days',
    copy: 'Once it reaches the studio we check it and refund to your original payment method within five working days. Exchanges go out the same day.',
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <header className="border-b border-mist bg-bone">
        <div className="shell py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="label-sm text-ash">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-smoke">Shipping &amp; Returns</span>
          </nav>
          <h1 className="h-section mt-5">Getting it to you, and back</h1>
          <p className="prose-brand mt-4 max-w-xl">
            Real delivery windows, honest duty guidance, and a returns process that does not
            require an argument.
          </p>
        </div>
      </header>

      <div className="shell py-16 md:py-24">
        {/* Summary ------------------------------------------------------- */}
        <div className="grid gap-10 border-b border-mist pb-14 md:grid-cols-3">
          {[
            { icon: IconShip, title: 'Same-day dispatch', copy: 'Order before 2pm Cairo time, Saturday to Thursday.' },
            { icon: IconBox, title: '64 countries', copy: 'DHL Express, fully tracked, signature on delivery.' },
            { icon: IconReturn, title: '30-day returns', copy: 'Unworn and unwashed, refunded within five working days.' },
          ].map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 90} className="flex items-start gap-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="label">{title}</p>
                <p className="prose-brand mt-1.5 text-[0.85rem]">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rates --------------------------------------------------------- */}
        <Reveal as="section" className="pt-16">
          <h2 className="h-section">Delivery</h2>
          <p className="prose-brand mt-4 max-w-2xl">
            Everything ships from our studio in Heliopolis. Times below are working days from
            dispatch, not from when you place the order — though for most orders those are the
            same day.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="label-sm border-b border-ink text-ash">
                  <th className="py-4 font-normal">Destination</th>
                  <th className="py-4 font-normal">Time</th>
                  <th className="py-4 font-normal">Cost</th>
                  <th className="py-4 font-normal">Carrier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {ZONES.map((z) => (
                  <tr key={z.zone}>
                    <td className="py-5 pr-6 text-ink">{z.zone}</td>
                    <td className="py-5 pr-6 text-smoke">{z.time}</td>
                    <td className="py-5 pr-6 text-smoke">{z.cost}</td>
                    <td className="py-5 text-smoke">{z.carrier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="label-sm mt-6 text-ash">
            Prices shown in EGP. Your card is charged in EGP; your bank converts at its own
            rate.
          </p>
        </Reveal>

        {/* Duties -------------------------------------------------------- */}
        <Reveal as="section" className="mt-20 border-t border-mist pt-16">
          <h2 className="h-section">Customs &amp; duties</h2>
          <p className="prose-brand mt-4 max-w-2xl">
            Outside Egypt, import taxes are set by your country and collected by the carrier on
            delivery. They are not included in our prices and we cannot pay them on your
            behalf. We declare every parcel accurately at its real value — we will not mark an
            order as a gift.
          </p>

          <dl className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
            {DUTIES.map((d) => (
              <div key={d.place} className="border-t border-mist pt-5">
                <dt className="label">{d.place}</dt>
                <dd className="prose-brand mt-2 text-[0.88rem]">{d.note}</dd>
              </div>
            ))}
          </dl>

          <p className="label-sm mt-8 text-ash">
            Thresholds change. Check your local customs authority if the exact figure matters
            to you.
          </p>
        </Reveal>

        {/* Returns ------------------------------------------------------- */}
        <Reveal as="section" className="mt-20 border-t border-mist pt-16">
          <h2 className="h-section">Returns &amp; exchanges</h2>
          <p className="prose-brand mt-4 max-w-2xl">
            Thirty days from the day it arrives. Unworn, unwashed, tags on. Pins and undercaps
            cannot come back once opened, for hygiene reasons — everything else can.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t border-ink pt-6">
                <p className="font-display text-5xl font-light text-mist">{s.n}</p>
                <h3 className="h-card mt-5">{s.title}</h3>
                <p className="prose-brand mt-3">{s.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-bone p-8 md:p-10">
            <h3 className="h-card">If something arrives faulty</h3>
            <p className="prose-brand mt-3 max-w-2xl">
              Send us a photograph within seven days of delivery. We will replace the piece and
              cover the postage both ways, and we would rather you kept the faulty one than
              spent an afternoon at a post office — we will tell you which applies.
            </p>
            <Link href="/contact" className="btn-solid mt-7">
              Start a return
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
