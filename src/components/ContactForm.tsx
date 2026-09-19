'use client';

import { useState } from 'react';
import { IconCheck } from './Icons';

const TOPICS = [
  'An order I have placed',
  'Choosing a size or fabric',
  'Returns and exchanges',
  'Wholesale and stockists',
  'Something else',
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  if (sent) {
    return (
      <div className="border border-mist p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink">
          <IconCheck className="h-5 w-5" />
        </span>
        <h3 className="h-card mt-6">Message received</h3>
        <p className="prose-brand mt-3">
          A person — not an auto-reply — will get back to you within one working day. If it is
          urgent, WhatsApp is faster.
        </p>
        <button type="button" onClick={() => setSent(false)} className="label link-sweep mt-6">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-7"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="label-sm text-ash">Name</span>
          <input required className="field mt-1" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="label-sm text-ash">Email</span>
          <input required type="email" className="field mt-1" placeholder="you@example.com" />
        </label>
      </div>

      <fieldset>
        <legend className="label-sm text-ash">What is it about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const on = t === topic;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                aria-pressed={on}
                className={`label border px-4 py-2.5 transition-colors duration-300 ${
                  on ? 'border-ink bg-ink text-paper' : 'border-mist text-smoke hover:border-ink'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className="label-sm text-ash">Order number (if you have one)</span>
        <input className="field mt-1" placeholder="HE-000000" />
      </label>

      <label className="block">
        <span className="label-sm text-ash">Message</span>
        <textarea
          required
          rows={5}
          className="field mt-1 resize-none"
          placeholder="Tell us what you need. The more detail, the better the answer."
        />
      </label>

      <button type="submit" className="btn-solid w-full sm:w-auto">
        Send message
      </button>

      <p className="label-sm text-ash">
        Demonstration form — nothing is sent anywhere.
      </p>
    </form>
  );
}
