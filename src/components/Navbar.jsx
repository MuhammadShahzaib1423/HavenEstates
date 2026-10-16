import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, KeyRound, Menu, X, Calculator } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { favorites } = useStore();
  const [open, setOpen] = useState(false);

  const linkCls = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${isActive ? 'text-forest-700' : 'text-ink/65 hover:text-ink'}`;

  const links = [
    ['/listings', 'Buy'],
    ['/calculator', 'Mortgage'],
    ['/favorites', 'Saved'],
    ['/contact', 'Contact'],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-700 text-ivory">
            <KeyRound size={18} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Haven<span className="text-forest-600">Estates</span>
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-7 md:flex">
          {links.slice(0, 3).map(([to, label]) => (
            <NavLink key={to} to={to} className={linkCls}>{label}</NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/favorites" className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5" aria-label="Saved homes">
            <Heart size={19} />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-ink">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/contact" className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ivory transition hover:bg-forest-700 md:flex">
            <Calculator size={15} /> List with us
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 md:hidden" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {links.map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-ink/5">
                  {label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
