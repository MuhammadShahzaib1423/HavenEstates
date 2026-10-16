import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BedDouble, Bath, Heart, MapPin, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../data/properties';

export default function PropertyCard({ property, index = 0 }) {
  const { favorites, toggleFavorite } = useStore();
  const fav = favorites.includes(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/property/${property.id}`}
        className="group block overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-soft">
        <div className="relative h-60 overflow-hidden">
          <img src={property.image} alt={property.name} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-ivory/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink backdrop-blur">
              {property.type}
            </span>
            {property.tag && (
              <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                {property.tag}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
            aria-label="Save home"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
          >
            <motion.span animate={fav ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
              <Heart size={17} className={fav ? 'fill-red-500 text-red-500' : 'text-ink/60'} />
            </motion.span>
          </button>
          <p className="absolute bottom-3 left-4 font-display text-2xl font-bold text-white drop-shadow">
            {formatPKR(property.price)}
          </p>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-bold leading-tight transition-colors group-hover:text-forest-700">
            {property.name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink/50"><MapPin size={12} /> {property.location}</p>
          <div className="mt-4 flex items-center gap-4 border-t border-ink/5 pt-4 text-xs font-semibold text-ink/60">
            {property.beds > 0 && <span className="flex items-center gap-1.5"><BedDouble size={15} className="text-forest-600" /> {property.beds} beds</span>}
            <span className="flex items-center gap-1.5"><Bath size={15} className="text-forest-600" /> {property.baths} baths</span>
            <span className="flex items-center gap-1.5"><Ruler size={15} className="text-forest-600" /> {property.area.toLocaleString()} sqft</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
