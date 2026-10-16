import MortgageCalculator from '../components/MortgageCalculator';
import Reveal from '../components/Reveal';

export default function Calculator() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest-600">Plan with confidence</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">What can you afford?</h1>
        <p className="mt-3 max-w-2xl text-ink/55">
          Slide the numbers and watch your monthly payment update live. Typical bank rates in Pakistan currently range from 18–22% — we've set a realistic default.
        </p>
      </Reveal>
      <Reveal className="mt-8">
        <MortgageCalculator />
      </Reveal>
      <Reveal className="mt-8">
        <div className="rounded-3xl bg-forest-800 p-8 text-ivory">
          <h2 className="font-display text-xl font-bold">A note on the numbers</h2>
          <p className="mt-2 text-sm leading-relaxed text-ivory/65">
            This is an estimate for planning only — your bank's exact rate, processing fees and insurance will shift the final figure slightly.
            Our advisors compare offers across five banks for every buyer, free of charge.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
