import { useState } from 'react';

export default function AuthCard({ mode = 'login', onSubmit, switchMode, error }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-yellow/80">Partner Console</p>
      <h2 className="mt-3 font-display text-3xl text-white">
        {mode === 'login' ? 'Enter your affiliate hub' : 'Launch your partner profile'}
      </h2>
      <p className="mt-2 text-sm text-white/60">
        {mode === 'login'
          ? 'Access analytics, referral codes, and instant payout reports.'
          : 'Create a high-converting referral hub in under two minutes.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm text-white/70">
        {mode === 'register' ? (
          <label className="flex flex-col gap-2">
            Full name
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
              className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
            />
          </label>
        ) : null}
        <label className="flex flex-col gap-2">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
            className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
            minLength={6}
            className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
          />
        </label>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-black shadow-glow transition hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading ? 'Processing...' : mode === 'login' ? 'Access dashboard' : 'Create account'}
        </button>
      </form>

      <button
        onClick={switchMode}
        className="mt-6 w-full text-xs uppercase tracking-[0.3em] text-white/50 hover:text-brand-yellow"
      >
        {mode === 'login' ? 'Need an account? Activate now' : 'Have an account? Log in'}
      </button>
    </div>
  );
}
