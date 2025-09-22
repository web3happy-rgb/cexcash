import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span className="text-xs uppercase tracking-[0.4em] text-brand-yellow/80">404</span>
      <h1 className="font-display text-5xl text-white">Page not found</h1>
      <p className="max-w-xl text-white/70">
        The experience you are looking for lives somewhere else. Return to the yellow-and-black core interface.
      </p>
      <Link
        to="/"
        className="rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-black shadow-glow hover:bg-yellow-300"
      >
        Back to home
      </Link>
    </div>
  );
}
