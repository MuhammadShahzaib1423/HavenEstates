import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, BadgeCheck, Handshake, MapPin, Search, Star } from 'lucide-react';
import { properties, TYPES } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import Reveal from '../components/Reveal';

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [type, setType] = useState('Any type');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const featured = properties.filter((p) => p.featured).slice(0, 4);

  const search = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (type !== 'Any type') params.set('type', type);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-ink text-ivory">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img src="/images/prop-villa.jpg" alt="Luxury villa at dusk" className="h-[115%] w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink" />
          <div className="hero-grid absolute inset-0" />
        </motion.div>
        <motion.div style={{ y: fgY }} className="relative mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 lg:pt-32">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur">
              <BadgeCheck size={14} className="text-gold-400" /> 100% verified listings
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Find a home<br />you'll <em className="text-gold-400">love</em> to live in.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ivory/65">
              Handpicked villas, apartments and penthouses across Islamabad &amp; Rawalpindi — with transparent pricing and advisors who actually listen.
            </p>
          </motion.div>

          <motion.form onSubmit={search}
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-10 flex max-w-3xl flex-col gap-2 rounded-3xl bg-ivory p-2 shadow-soft sm:flex-row sm:items-center sm:rounded-full">
            <div className="flex flex-1 items-center gap-2 px-4 py-2.5">
              <MapPin size={18} className="shrink-0 text-forest-600" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Area, project or keyword…"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/40" />
            </div>
            <div className="hidden h-8 w-px bg-ink/10 sm:block" />
            <select value={type} onChange={(e) => setType(e.target.value)}
              className="bg-transparent px-4 py-2.5 text-sm font-semibold text-ink outline-none sm:w-44">
              <option>Any type</option>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-forest-700 px-8 py-3.5 text-sm font-bold text-ivory transition hover:bg-forest-600">
              <Search size={16} /> Search
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex gap-10">
            {[
              ['850+', 'homes sold'],
              ['4.9', 'client rating'],
              ['12 yrs', 'of trust'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-bold text-gold-300">{v}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/50">{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest-600">Curated for you</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Featured residences</h2>
            </div>
            <Link to="/listings" className="group hidden items-center gap-1.5 text-sm font-bold text-forest-700 sm:flex">
              All listings <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest-600">The Haven promise</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Buying, minus the headache</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: BadgeCheck, title: 'Verified, always', text: 'Every listing is physically inspected and title-checked before it goes live. No surprises at the registry.' },
            { icon: Handshake, title: 'Advisors, not agents', text: 'Fixed, transparent fees and advice that sometimes means telling you not to buy. Radical, we know.' },
            { icon: Award, title: 'After-key care', text: 'Snag-list fixes, utility transfers and a 90-day support window after you get the keys.' },
          ].map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-700 text-ivory transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <s.icon size={24} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEIGHBOURHOODS */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest-600">Neighbourhoods</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Where the city lives best</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'DHA Islamabad', img: '/images/prop-villa.jpg', count: 24 },
            { name: 'Bahria Town', img: '/images/prop-house.jpg', count: 31 },
            { name: 'E-11 & F-7', img: '/images/prop-apartment.jpg', count: 18 },
            { name: 'Gulberg Greens', img: '/images/prop-townhouse.jpg', count: 15 },
          ].map((n, i) => (
            <Reveal key={n.name} delay={i * 0.08}>
              <Link to={`/listings?q=${encodeURIComponent(n.name.split(' ')[0])}`}
                className="group relative block h-72 overflow-hidden rounded-3xl shadow-card">
                <img src={n.img} alt={n.name} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="font-display text-xl font-bold text-white">{n.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                    {n.count} listings <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest-600">Client stories</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Keys handed, smiles kept</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { name: 'Usman Tariq', detail: 'Villa in DHA Phase 2', text: 'They talked me out of two overpriced options before finding the right one. Who does that? HavenEstates does.' },
            { name: 'Fatima Noor', detail: 'Apartment in E-11', text: 'From first viewing to registry in 19 days. Every document was ready before I even asked for it.' },
            { name: 'Ali Hamza', detail: 'Townhouse in Gulberg', text: 'The mortgage calculator on their site matched my bank quote to the rupee. Bought with total confidence.' },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="h-full rounded-3xl bg-white p-7 shadow-card">
                <div className="flex gap-1 text-gold-500">{Array(5).fill(0).map((_, s) => <Star key={s} size={15} className="fill-gold-500" />)}</div>
                <blockquote className="mt-4 font-display text-[17px] leading-relaxed text-ink/80">“{t.text}”</blockquote>
                <figcaption className="mt-5 border-t border-ink/5 pt-4">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-ink/45">{t.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-800 px-8 py-16 text-ivory sm:px-14">
            <div className="hero-grid absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">Selling? Let's find your home its next story.</h2>
              <p className="mt-4 text-ivory/65">Free valuation, professional photography and a listing live within 48 hours.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="rounded-2xl bg-gold-500 px-7 py-3.5 text-sm font-bold text-ink transition hover:bg-gold-400">Get a free valuation</Link>
                <Link to="/listings" className="rounded-2xl border border-white/25 px-7 py-3.5 text-sm font-bold transition hover:bg-white/10">Browse homes</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
