import { rewardMatrix } from '../data/rewardMatrix.js';
import PageHeader from '../components/PageHeader.jsx';

export default function RewardsMatrixPage() {
  return (
    <div>
      <PageHeader
        eyebrow="VIP Matrix"
        title="Detailed rebate tiers"
        subtitle="Mirror the official TetherMax rate card with a customizable set of maker/taker rewards."
      />
      <div className="rounded-3xl border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5 text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-white/60">
              <tr>
                <th className="px-6 py-4">VIP Level</th>
                <th className="px-6 py-4">Monthly Volume (USDT)</th>
                <th className="px-6 py-4">Maker Rebate</th>
                <th className="px-6 py-4">Taker Rebate</th>
              </tr>
            </thead>
            <tbody>
              {rewardMatrix.map((tier) => (
                <tr key={tier.level} className="border-b border-white/5">
                  <td className="px-6 py-4 font-semibold text-white">{tier.level}</td>
                  <td className="px-6 py-4">{tier.volume}</td>
                  <td className="px-6 py-4 text-brand-yellow">{tier.maker}</td>
                  <td className="px-6 py-4 text-brand-yellow">{tier.taker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
