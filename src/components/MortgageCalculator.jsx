import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatPKR, monthlyPayment } from '../data/properties';

export default function MortgageCalculator({ defaultPrice = 50000000, compact = false }) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(19);
  const [years, setYears] = useState(15);

  const calc = useMemo(() => {
    const down = Math.round((price * downPct) / 100);
    const principal = price - down;
    const monthly = Math.round(monthlyPayment(principal, rate, years));
    const totalPaid = monthly * years * 12;
    const interest = totalPaid - principal;
    return { down, principal, monthly, totalPaid, interest };
  }, [price, downPct, rate, years]);

  const donutPct = calc.totalPaid > 0 ? (calc.principal / calc.totalPaid) * 100 : 50;
  const R = 70;
  const C = 2 * Math.PI * R;

  const slider = 'w-full accent-forest-700';

  return (
    <div className={`rounded-3xl bg-white p-6 shadow-card sm:p-8 ${compact ? '' : ''}`}>
      <h3 className="font-display text-xl font-bold">Mortgage calculator</h3>
      <p className="mt-1 text-xs text-ink/50">Estimate your monthly payment in seconds.</p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex justify-between text-xs font-bold"><span className="uppercase tracking-widest text-ink/45">Home price</span><span className="text-forest-700">{formatPKR(price)}</span></div>
            <input type="range" min={10000000} max={250000000} step={1000000} value={price} onChange={(e) => setPrice(+e.target.value)} className={slider} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-xs font-bold"><span className="uppercase tracking-widest text-ink/45">Down payment</span><span className="text-forest-700">{downPct}% · {formatPKR(calc.down)}</span></div>
            <input type="range" min={10} max={60} step={5} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className={slider} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-xs font-bold"><span className="uppercase tracking-widest text-ink/45">Interest rate</span><span className="text-forest-700">{rate}%</span></div>
            <input type="range" min={5} max={25} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} className={slider} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-xs font-bold"><span className="uppercase tracking-widest text-ink/45">Term</span><span className="text-forest-700">{years} years</span></div>
            <input type="range" min={5} max={25} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className={slider} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative h-48 w-48">
            <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
              <circle cx="90" cy="90" r={R} fill="none" stroke="#EFE9DC" strokeWidth="20" />
              <motion.circle
                cx="90" cy="90" r={R} fill="none" stroke="#1E624C" strokeWidth="20" strokeLinecap="round"
                strokeDasharray={C}
                animate={{ strokeDashoffset: C - (C * donutPct) / 100 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p key={calc.monthly} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-display text-2xl font-bold">
                {formatPKR(calc.monthly)}
              </motion.p>
              <p className="text-[11px] uppercase tracking-widest text-ink/45">per month</p>
            </div>
          </div>
          <div className="mt-5 grid w-full grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-ivory p-3">
              <p className="text-[10px] uppercase tracking-widest text-ink/45">Principal</p>
              <p className="mt-0.5 text-sm font-bold text-forest-700">{formatPKR(calc.principal)}</p>
            </div>
            <div className="rounded-2xl bg-ivory p-3">
              <p className="text-[10px] uppercase tracking-widest text-ink/45">Total interest</p>
              <p className="mt-0.5 text-sm font-bold text-gold-600">{formatPKR(calc.interest)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
