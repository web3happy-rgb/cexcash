import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Rewards', to: '/rewards' },
  { label: 'How it Works', to: '/how-it-works' },
  { label: 'Resources', to: '/resources' },
  { label: 'FAQ', to: '/faq' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-gray/40 bg-brand-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-brand-black font-bold text-xl shadow-glow">
            TM
          </span>
          <div>
            <span className="block font-display text-lg tracking-wide">TetherMax Studio</span>
            <span className="block text-xs text-white/70">Elite rebate infrastructure</span>
          </div>
        </Link>

        <button
          className="md:hidden rounded-md border border-brand-yellow/40 px-3 py-2 text-brand-yellow"
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </button>

        <div className={`absolute left-0 top-full w-full border-b border-brand-gray/40 bg-brand-black/95 px-6 pb-6 md:static md:block md:w-auto md:border-none md:bg-transparent md:p-0 ${open ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.2em] transition hover:text-brand-yellow ${
                    isActive ? 'text-brand-yellow' : 'text-white/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-black shadow-glow transition hover:bg-yellow-300"
            >
              Launch App
            </Link>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-brand-yellow/60 hover:text-brand-yellow"
              >
                Log out
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}
