import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-brand-gray/40 bg-brand-black/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-brand-black font-bold text-xl shadow-glow">
              TM
            </span>
            <span className="font-display text-xl">TetherMax Studio</span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Copy-perfect referral landing pages, analytics dashboards, and compliance workflows inspired by the industry-leading
            TetherMax affiliate experience.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Built for pro market makers & community leaders.</p>
        </div>

        <div className="grid grid-cols-2 gap-12 text-sm text-white/70 md:grid-cols-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">Program</p>
            <ul className="space-y-2">
              <li><Link to="/rewards" className="hover:text-brand-yellow">Rewards</Link></li>
              <li><Link to="/how-it-works" className="hover:text-brand-yellow">Workflow</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-yellow">Partner Login</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">Resources</p>
            <ul className="space-y-2">
              <li><Link to="/resources" className="hover:text-brand-yellow">Media Kits</Link></li>
              <li><Link to="/resources/webinars" className="hover:text-brand-yellow">Webinars</Link></li>
              <li><Link to="/resources/tools" className="hover:text-brand-yellow">Automation</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">Company</p>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-brand-yellow">About</Link></li>
              <li><Link to="/contact" className="hover:text-brand-yellow">Contact</Link></li>
              <li><Link to="/legal/terms" className="hover:text-brand-yellow">Terms</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">Follow</p>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow">X (Twitter)</a></li>
              <li><a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-brand-yellow">Telegram</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-gray/40 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} TetherMax Studio. All rights reserved. Crafted with precision in yellow & black.
      </div>
    </footer>
  );
}
