import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, MapPin, Phone, Send } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', interest: 'Buying', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim() && form.phone.trim().length >= 10) setSent(true);
  };

  const input = 'w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-200';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest-600">Get in touch</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">Let's talk about home</h1>
        <p className="mt-3 max-w-2xl text-ink/55">Buying, selling or just exploring — an advisor replies within 2 working hours.</p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <Reveal>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl bg-white p-12 text-center shadow-card">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-700 text-white"><Check size={28} /></span>
              <h2 className="mt-5 font-display text-2xl font-bold">Message received</h2>
              <p className="mt-2 text-sm text-ink/55">Thanks {form.name.split(' ')[0]} — we'll be in touch within 2 working hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-card sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={input} />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className={input} />
              </div>
              <div className="mt-4 flex gap-2">
                {['Buying', 'Selling', 'Renting'].map((t) => (
                  <button type="button" key={t} onClick={() => setForm({ ...form, interest: t })}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${form.interest === t ? 'bg-ink text-ivory' : 'bg-ivory text-ink/60 hover:bg-ink/5'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                placeholder="Tell us what you're looking for — area, budget, timeline…" className={`${input} mt-4`} />
              <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-700 py-4 text-sm font-bold text-ivory transition hover:bg-forest-600 sm:w-auto sm:px-10">
                <Send size={16} /> Send message
              </button>
            </form>
          )}
        </Reveal>

        <div className="space-y-4">
          {[
            { icon: Phone, t: 'Call us', d: '+92 51 111 0000' },
            { icon: Mail, t: 'Email', d: 'hello@havenestates.pk' },
            { icon: MapPin, t: 'Visit', d: '3rd Floor, Meridian Plaza, Blue Area, Islamabad' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-700 text-ivory"><c.icon size={20} /></span>
                <div><p className="text-xs uppercase tracking-widest text-ink/45">{c.t}</p><p className="mt-0.5 text-sm font-bold">{c.d}</p></div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <div className="rounded-3xl bg-ink p-6 text-ivory">
              <p className="font-display text-lg font-bold">Office hours</p>
              <p className="mt-2 text-sm text-ivory/60">Mon – Sat · 10:00 – 19:00<br />Sunday · viewings by appointment</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
