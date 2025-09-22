export default function LoadingState({ label = 'Loading' }) {
  return (
    <div className="flex justify-center py-16">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/60">
        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-yellow" />
        {label}
      </div>
    </div>
  );
}
