import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { IconInstagram, IconShip, IconWhatsApp } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the Hijab Essentials studio in Cairo — WhatsApp, email, or the form. We reply within one working day.',
};

const CHANNELS = [
  {
    icon: IconWhatsApp,
    title: 'WhatsApp',
    detail: '+20 100 000 0000',
    note: 'Fastest. Sat–Thu, 10:00–18:00 Cairo time.',
    href: 'https://wa.me/201000000000',
  },
  {
    icon: IconShip,
    title: 'Email',
    detail: 'hello@hijabessentials.com',
    note: 'Replies within one working day, always from a person.',
    href: 'mailto:hello@hijabessentials.com',
  },
  {
    icon: IconInstagram,
    title: 'Instagram',
    detail: '@hijabessentials',
    note: 'DMs are open, though slower than WhatsApp.',
    href: 'https://instagram.com',
  },
];

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-mist bg-bone">
        <div className="shell py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="label-sm text-ash">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-smoke">Contact</span>
          </nav>
          <h1 className="h-section mt-5">Talk to us</h1>
          <p className="prose-brand mt-4 max-w-xl">
            Sizing doubts, a late parcel, a colour you wish we made — all of it reaches the
            same small team in Cairo.
          </p>
        </div>
      </header>

      <div className="shell py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Channels ---------------------------------------------------- */}
          <div>
            <ul className="space-y-10">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.title} delay={i * 90} as="li">
                  <a href={c.href} className="group flex items-start gap-5">
                    <c.icon className="mt-1 h-5 w-5 shrink-0" />
                    <span>
                      <span className="label block">{c.title}</span>
                      <span className="mt-1.5 block font-display text-xl font-light text-ink">
                        <span className="link-sweep">{c.detail}</span>
                      </span>
                      <span className="label-sm mt-2 block text-ash">{c.note}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={300} className="mt-14 border-t border-mist pt-10">
              <h2 className="label">The studio</h2>
              <address className="prose-brand mt-4 not-italic">
                14 Baghdad Street, 3rd floor
                <br />
                Korba, Heliopolis
                <br />
                Cairo 11341, Egypt
              </address>
              <p className="label-sm mt-4 text-ash">
                Visits by appointment — message us first and we will put the kettle on.
              </p>
            </Reveal>

            <Reveal
              delay={360}
              as="section"
              className="mt-12 scroll-mt-32 border-t border-mist pt-10"
            >
              <h2 id="track" className="label">
                Tracking an order
              </h2>
              <p className="prose-brand mt-3">
                Your tracking number arrives by email the moment the box leaves the studio,
                usually within a day of ordering. If it has not turned up after 48 hours, send
                us the order reference and we will chase DHL ourselves.
              </p>
            </Reveal>

            <Reveal
              delay={420}
              as="section"
              className="mt-12 scroll-mt-32 border-t border-mist pt-10"
            >
              <h2 id="wholesale" className="label">
                Wholesale &amp; stockists
              </h2>
              <p className="prose-brand mt-3">
                We work with a small number of stockists across the Gulf, Europe and North
                America. Minimum first order is 60 pieces. Tell us about your shop and we will
                send the line sheet and terms.
              </p>
            </Reveal>
          </div>

          {/* Form -------------------------------------------------------- */}
          <Reveal delay={120}>
            <h2 className="h-card">Send a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
