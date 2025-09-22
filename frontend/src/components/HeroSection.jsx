import { Link } from 'react-router-dom';

export default function HeroSection({ heading, subheading, body = [], ctas = [], media }) {
  return (
    <section className="relative mb-16 overflow-hidden rounded-3xl border border-brand-gray/50 bg-gradient-to-br from-brand-gray via-brand-black to-black px-8 py-16 shadow-[0_80px_120px_rgba(0,0,0,0.4)]">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.5em] text-brand-yellow/90">CEX Rebate Engine</span>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            {heading}
          </h1>
          <p className="text-lg text-white/70">{subheading}</p>
          <ul className="space-y-3 text-sm text-white/60">
            {Array.isArray(body)
              ? body.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-yellow" />
                    <span>{item}</span>
                  </li>
                ))
              : null}
          </ul>
          <div className="flex flex-wrap gap-4">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                to={cta.href}
                className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                  cta.primary !== false
                    ? 'bg-brand-yellow text-brand-black shadow-glow hover:bg-yellow-300'
                    : 'border border-white/20 text-white hover:border-brand-yellow/50 hover:text-brand-yellow'
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-yellow/10 via-transparent to-transparent blur-3xl" />
          {media && typeof media === 'string' && media.endsWith('.svg') ? (
            <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${media}`} alt="Hero graphic" className="w-full max-w-md" />
          ) : (
            <div className="grid w-full max-w-md gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              <p>Latency: &lt; 30ms routing across 200+ markets.</p>
              <p>Instant payouts with multi-currency treasury support.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
