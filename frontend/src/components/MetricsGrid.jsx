export default function MetricsGrid({ items = [] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label || item.level}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-yellow/40 hover:shadow-glow"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-brand-yellow/80">{item.label || item.level}</p>
          <p className="mt-4 font-display text-4xl text-brand-yellow">{item.value || item.rebate}</p>
          <p className="mt-2 text-sm text-white/60">{item.caption || item.volume}</p>
        </div>
      ))}
    </div>
  );
}
