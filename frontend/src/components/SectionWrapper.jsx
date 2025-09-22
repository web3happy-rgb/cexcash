export default function SectionWrapper({ heading, subheading, children, eyebrow, align = 'left' }) {
  return (
    <section className="mb-16 rounded-3xl border border-brand-gray/60 bg-brand-gray/40 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
      <div className={`mx-auto flex flex-col gap-6 ${align === 'center' ? 'text-center' : ''}`}>
        {eyebrow ? (
          <span className="text-xs uppercase tracking-[0.4em] text-brand-yellow/80">{eyebrow}</span>
        ) : null}
        {heading ? (
          <h2 className="font-display text-3xl md:text-4xl text-white">{heading}</h2>
        ) : null}
        {subheading ? (
          <p className={`text-lg leading-relaxed text-white/70 ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>
            {subheading}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
