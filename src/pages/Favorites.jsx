import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { properties } from '../data/properties';
import { useStore } from '../context/StoreContext';
import PropertyCard from '../components/PropertyCard';
import Reveal from '../components/Reveal';

export default function Favorites() {
  const { favorites } = useStore();
  const list = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-tight">Saved homes</h1>
        <p className="mt-1 text-ink/55">{list.length} home{list.length === 1 ? '' : 's'} on your shortlist</p>
      </Reveal>
      {list.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-card">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest-50 text-forest-500"><Heart size={32} /></span>
          <p className="mt-4 font-display text-xl font-bold">Nothing saved yet</p>
          <p className="mt-1 text-sm text-ink/50">Tap the heart on any listing to build your shortlist.</p>
          <Link to="/listings" className="mt-6 inline-block rounded-2xl bg-ink px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-forest-700">
            Browse listings
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
