import { useState } from 'react';

export default function ReferralForm({ onCreate }) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [rewardRate, setRewardRate] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onCreate({ code, description, rewardRate });
      setCode('');
      setDescription('');
      setRewardRate(45);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="font-display text-2xl text-white">Create a new referral code</h3>
      <p className="mt-2 text-sm text-white/60">Generate a unique code or leave blank to auto-create a branded link.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Code (optional)
          <input
            className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
            placeholder="cex-alpha"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Reward rate (%)
          <input
            type="number"
            min="0"
            max="100"
            className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
            value={rewardRate}
            onChange={(event) => setRewardRate(event.target.value)}
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-white/70">
          Description
          <textarea
            rows="3"
            className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
            placeholder="Derivative whales rebate push"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
      </div>
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-black shadow-glow transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create referral'}
      </button>
    </form>
  );
}
