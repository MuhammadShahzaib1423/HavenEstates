import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bath, BedDouble, Calendar, Check, ChevronLeft, ChevronRight, Heart, MapPin, Phone, Ruler, X } from 'lucide-react';
import { getProperty, properties, formatPKR } from '../data/properties';
import { useStore } from '../context/StoreContext';
import PropertyCard from '../components/PropertyCard';
import MortgageCalculator from '../components/MortgageCalculator';
import Reveal from '../components/Reveal';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = getProperty(id);
  const { favorites, toggleFavorite } = useStore();
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  if (!property) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl font-bold">Listing not found</p>
        <Link to="/listings" className="mt-4 inline-block text-sm font-bold text-forest-700 hover:underline">Back to listings</Link>
      </div>
    );
  }

  const fav = favorites.includes(property.id);
  const similar = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const gallery = property.gallery;

  const step = (dir) => setImgIndex((i) => (i + dir + gallery.length) % gallery.length);

  const request = (e) => {
    e.preventDefault();
    if (form.name.trim() && form.phone.trim().length >= 10) setSent(true);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Link to="/listings" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/55 hover:text-ink">
          <ArrowLeft size={15} /> All listings
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-forest-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ivory">{property.type}</span>
              {property.tag && <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">{property.tag}</span>}
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{property.name}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-ink/55"><MapPin size={15} /> {property.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-display text-3xl font-bold text-forest-700">{formatPKR(property.price)}</p>
            <button onClick={() => toggleFavorite(property.id)} aria-label="Save home"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-white transition hover:scale-110">
              <motion.span animate={fav ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.35 }}>
                <Heart size={20} className={fav ? 'fill-red-500 text-red-500' : 'text-ink/50'} />
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* gallery */}
      <div className="mx-auto mt-6 grid max-w-7xl gap-3 px-4 sm:px-6 lg:grid-cols-3">
        <motion.button onClick={() => setLightbox(true)} whileHover={{ scale: 0.995 }}
          className="relative h-72 overflow-hidden rounded-3xl lg:col-span-2 lg:h-[440px]">
          <AnimatePresence mode="wait">
            <motion.img key={imgIndex} src={gallery[imgIndex]} alt={property.name}
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }} className="h-full w-full cursor-zoom-in object-cover" />
          </AnimatePresence>
          <span className="absolute bottom-4 right-4 rounded-full bg-ink/60 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
            {imgIndex + 1} / {gallery.length}
          </span>
        </motion.button>
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:grid-rows-3">
          {gallery.slice(0, 3).map((g, i) => (
            <button key={g} onClick={() => setImgIndex(i)}
              className={`relative h-24 overflow-hidden rounded-2xl transition lg:h-full ${imgIndex === i ? 'ring-4 ring-forest-600' : 'opacity-75 hover:opacity-100'}`}>
              <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      {gallery.length > 1 && (
        <div className="mx-auto mt-3 flex max-w-7xl justify-end gap-2 px-4 sm:px-6">
          <button onClick={() => step(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-card transition hover:bg-ink hover:text-ivory" aria-label="Previous photo"><ChevronLeft size={18} /></button>
          <button onClick={() => step(1)} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-card transition hover:bg-ink hover:text-ivory" aria-label="Next photo"><ChevronRight size={18} /></button>
        </div>
      )}

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" onClick={() => setLightbox(false)}>
            <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close"><X size={20} /></button>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous"><ChevronLeft size={20} /></button>
            <motion.img key={imgIndex} src={gallery[imgIndex]} alt={property.name} onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next"><ChevronRight size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: BedDouble, v: property.beds || '—', l: 'Bedrooms' },
              { icon: Bath, v: property.baths, l: 'Bathrooms' },
              { icon: Ruler, v: property.area.toLocaleString(), l: 'Sq. ft.' },
              { icon: Calendar, v: property.year, l: 'Built' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white p-5 text-center shadow-card">
                <s.icon size={20} className="mx-auto text-forest-600" />
                <p className="mt-2 font-display text-xl font-bold">{s.v}</p>
                <p className="text-[11px] uppercase tracking-widest text-ink/45">{s.l}</p>
              </div>
            ))}
          </div>

          <Reveal className="mt-10">
            <h2 className="font-display text-2xl font-bold">About this home</h2>
            <p className="mt-3 leading-relaxed text-ink/65">{property.description}</p>
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="font-display text-2xl font-bold">Amenities</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {property.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-card">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-forest-50 text-forest-700"><Check size={13} /></span> {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10">
            <MortgageCalculator defaultPrice={property.price} />
          </Reveal>
        </div>

        {/* agent card */}
        <aside>
          <div className="rounded-3xl bg-ink p-6 text-ivory shadow-soft lg:sticky lg:top-24">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-600 font-display text-xl font-bold">{property.agent.name[0]}</span>
              <div>
                <p className="font-display text-lg font-bold">{property.agent.name}</p>
                <p className="text-xs text-ivory/50">Verified Haven advisor</p>
              </div>
            </div>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 rounded-2xl bg-forest-700/40 p-5 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest-500 text-white"><Check size={22} /></span>
                <p className="mt-3 font-bold">Request received</p>
                <p className="mt-1 text-xs text-ivory/60">{property.agent.name} will call you within 2 working hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={request} className="mt-6 space-y-3">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold-400" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold-400" />
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="I'd like to schedule a viewing…" rows={3}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold-400" />
                <button type="submit" className="w-full rounded-2xl bg-gold-500 py-3.5 text-sm font-bold text-ink transition hover:bg-gold-400">
                  Request a viewing
                </button>
                <a href={`tel:${property.agent.phone.replace(/\s/g, '')}`}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 py-3.5 text-sm font-bold transition hover:bg-white/10">
                  <Phone size={15} /> {property.agent.phone}
                </a>
              </form>
            )}
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Similar {property.type.toLowerCase()}s</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
