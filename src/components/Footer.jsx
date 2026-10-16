import { Link } from 'react-router-dom';
import { KeyRound, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-600 text-ivory"><KeyRound size={18} /></span>
            <span className="font-display text-xl font-bold">Haven<span className="text-forest-300">Estates</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/55">
            Exceptional homes across Islamabad &amp; Rawalpindi — verified listings, transparent pricing, advisors who listen.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ivory/40">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/listings" className="text-ivory/70 hover:text-gold-400">All listings</Link></li>
            <li><Link to="/calculator" className="text-ivory/70 hover:text-gold-400">Mortgage calculator</Link></li>
            <li><Link to="/favorites" className="text-ivory/70 hover:text-gold-400">Saved homes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ivory/40">Areas</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li>DHA Islamabad</li>
            <li>Bahria Town</li>
            <li>E-11 &amp; F-7</li>
            <li>Gulberg Greens</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ivory/40">Reach us</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold-400" /> +92 51 111 0000</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold-400" /> hello@havenestates.pk</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold-400" /> Blue Area, Islamabad</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ivory/35">
        © {new Date().getFullYear()} HavenEstates. A concept property experience.
      </div>
    </footer>
  );
}
