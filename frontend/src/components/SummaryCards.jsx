export default function SummaryCards({ summary }) {
  const cards = [
    { label: 'Active Codes', value: summary?.total_codes ?? 0 },
    { label: 'Tracked Referrals', value: summary?.total_referrals ?? 0 },
    { label: 'Total Volume (USDT)', value: (summary?.total_volume ?? 0).toLocaleString() },
    { label: 'Rewards Paid (USDT)', value: (summary?.total_rewards ?? 0).toLocaleString() }
  ];

  return (
    <div className="mb-10 grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-yellow/80">{card.label}</p>
          <p className="mt-4 font-display text-3xl text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
