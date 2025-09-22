import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Concierge"
        title="Tap into our partner success desk"
        subtitle="Dedicated yellow-and-black concierge inspired by TetherMax — schedule activations, co-marketing, or compliance reviews."
      />
      <div className="grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="space-y-4 text-sm text-white/70">
            <label className="flex flex-col gap-2">
              Full name
              <input
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              Request details
              <textarea
                required
                rows="5"
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-black shadow-glow hover:bg-yellow-300"
          >
            Submit request
          </button>
          {submitted ? <p className="mt-4 text-sm text-brand-yellow">Our team will reach out within 12 hours.</p> : null}
        </form>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-gray via-black to-black p-8">
          <h3 className="font-display text-3xl text-white">How we support you</h3>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            <li>• Priority OTC and liquidity desk access for VIP partners.</li>
            <li>• Co-branded landing pages translated in 16 languages.</li>
            <li>• Monthly growth sprints replicating TetherMax optimization cadences.</li>
          </ul>
          <div className="mt-8 rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-6 text-sm text-brand-yellow">
            Concierge hotline: +65 8000 555 222<br />
            Institutional desk: otc@cexcash.com
          </div>
        </div>
      </div>
    </div>
  );
}
