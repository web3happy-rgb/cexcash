import { useState } from 'react';

export default function ReferralTable({ referrals = [], onAddActivity }) {
  const [expandedCode, setExpandedCode] = useState(null);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5 text-left text-sm text-white/70">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-white/60">
            <tr>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Reward</th>
              <th className="px-6 py-4">Referrals</th>
              <th className="px-6 py-4">Volume</th>
              <th className="px-6 py-4">Rewards Paid</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral.id} className="border-b border-white/5">
                <td className="px-6 py-4 font-semibold text-white">{referral.code}</td>
                <td className="px-6 py-4">{referral.reward_rate}%</td>
                <td className="px-6 py-4">{referral.stats?.referrals ?? 0}</td>
                <td className="px-6 py-4">{(referral.stats?.total_volume ?? 0).toLocaleString()}</td>
                <td className="px-6 py-4">{(referral.stats?.total_rewards ?? 0).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setExpandedCode((current) => (current === referral.code ? null : referral.code))}
                    className="rounded-full border border-brand-yellow/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-brand-yellow"
                  >
                    Activity
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {referrals.map((referral) => (
        <ReferralActivity
          key={`activity-${referral.id}`}
          referral={referral}
          open={expandedCode === referral.code}
          onClose={() => setExpandedCode(null)}
          onAddActivity={onAddActivity}
        />
      ))}
    </div>
  );
}

function ReferralActivity({ referral, open, onClose, onAddActivity }) {
  const [form, setForm] = useState({ referredEmail: '', tradingVolume: '', rewardAmount: '', status: 'completed' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onAddActivity(referral.code, form);
      setForm({ referredEmail: '', tradingVolume: '', rewardAmount: '', status: 'completed' });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-white/5 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="max-w-xl space-y-3">
          <h3 className="font-display text-2xl text-white">{referral.code} activity</h3>
          <p className="text-sm text-white/60">Log trades and payouts to mirror real-time analytics.</p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/50">
            <p className="uppercase tracking-[0.3em] text-brand-yellow/80">Recent conversions</p>
            <ul className="mt-3 space-y-2">
              {referral.latest?.length
                ? referral.latest.map((item, index) => (
                    <li key={index} className="flex justify-between text-white/70">
                      <span>{item.referred_email || 'anonymous'}</span>
                      <span>{item.trading_volume?.toLocaleString()} USDT</span>
                    </li>
                  ))
                : <li className="text-white/40">No activity yet</li>}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4">
            <label className="text-sm text-white/70">
              Email
              <input
                value={form.referredEmail}
                onChange={(event) => setForm((prev) => ({ ...prev, referredEmail: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              />
            </label>
            <label className="text-sm text-white/70">
              Trading volume (USDT)
              <input
                type="number"
                value={form.tradingVolume}
                onChange={(event) => setForm((prev) => ({ ...prev, tradingVolume: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              />
            </label>
            <label className="text-sm text-white/70">
              Reward amount (USDT)
              <input
                type="number"
                value={form.rewardAmount}
                onChange={(event) => setForm((prev) => ({ ...prev, rewardAmount: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              />
            </label>
            <label className="text-sm text-white/70">
              Status
              <select
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
              >
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </label>
          </div>
          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60 hover:border-brand-yellow/40 hover:text-brand-yellow"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-brand-yellow px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-black shadow-glow hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Log activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
