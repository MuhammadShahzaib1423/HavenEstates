import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { properties, TYPES, formatPKR } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

export default function Listings() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [type, setType] = useState(params.get('type') || 'Any type');
  const [minBeds, setMinBeds] = useState(0);
  const [maxPrice, setMaxPrice] = useState(250000000);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(() => {
    let out = properties.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
      const matchT = type === 'Any type' || p.type === type;
      return matchQ && matchT && p.beds >= minBeds && p.price <= maxPrice;
    });
    out = [...out].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'area') return b.area - a.area;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
    return out;
  }, [query, type, minBeds, maxPrice, sort]);

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/45">Property type</p>
        <div className="flex flex-wrap gap-2">
          {['Any type', ...TYPES].map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${type === t ? 'bg-ink text-ivory shadow-card' : 'bg-ivory text-ink/60 hover:bg-ink/5'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/45">Bedrooms</p>
        <div className="flex gap-2">
          {[0, 3, 4, 5].map((b) => (
            <button key={b} onClick={() => setMinBeds(b)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${minBeds === b ? 'bg-ink text-ivory' : 'bg-ivory text-ink/60 hover:bg-ink/5'}`}>
              {b === 0 ? 'Any' : `${b}+`}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 flex justify-between text-xs font-bold uppercase tracking-widest text-ink/45">
          Max price <span className="text-forest-700">{formatPKR(maxPrice)}</span>
        </p>
        <input type="range" min={20000000} max={250000000} step={5000000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-forest-700" />
      </div>
      <button onClick={() => { setType('Any type'); setMinBeds(0); setMaxPrice(250000000); setQuery(''); }}
        className="text-xs font-bold text-forest-700 hover:underline">Reset all filters</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">All listings</h1>
        <p className="mt-2 text-ink/55">{list.length} verified homes on the market</p>
      </motion.div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, area or type…"
            className="w-full rounded-2xl border border-ink/10 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-200" />
        </div>
        <div className="flex gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-sm font-semibold outline-none">
            <option value="featured">Featured first</option>
            <option value="priceAsc">Price: low to high</option>
            <option value="priceDesc">Price: high to low</option>
            <option value="area">Largest area</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-ivory lg:hidden">
            {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />} Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden">
            <div className="mt-4 rounded-3xl bg-white p-6 shadow-card">{filters}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-card">{filters}</div>
        </aside>
        <div>
          {list.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 text-center shadow-card">
              <p className="font-display text-xl font-bold">No homes match those filters</p>
              <p className="mt-2 text-sm text-ink/50">Try widening the net — your home is out there.</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {list.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <PropertyCard property={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
