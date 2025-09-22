export default function BulletList({ items = [] }) {
  if (!Array.isArray(items)) return null;

  return (
    <ul className="space-y-3 text-base text-white/70">
      {items.map((item) =>
        typeof item === 'string' ? (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-yellow" />
            <span>{item}</span>
          </li>
        ) : (
          <li key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold text-brand-yellow">{item.question}</p>
            <p className="mt-2 text-sm text-white/60">{item.answer}</p>
          </li>
        )
      )}
    </ul>
  );
}
