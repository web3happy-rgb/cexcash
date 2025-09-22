export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <div className="mb-12 flex flex-col gap-4 text-center">
      {eyebrow ? (
        <span className="text-xs uppercase tracking-[0.4em] text-brand-yellow/80">{eyebrow}</span>
      ) : null}
      <h1 className="font-display text-4xl text-white md:text-5xl">{title}</h1>
      <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/70">{subtitle}</p>
    </div>
  );
}
