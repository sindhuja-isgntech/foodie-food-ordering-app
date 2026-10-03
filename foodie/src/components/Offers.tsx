import React from 'react';

export const Offers: React.FC = () => {
  return (
    <section id="offers" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="relative isolate flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-stone-900 p-8 text-white shadow-xl shadow-stone-900/20 ring-1 ring-white/5 md:flex-row md:p-12">
        {/* Soft brand glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="text-center md:text-left">
          <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Special Promo
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            Get <span className="text-orange-400">50% off</span> your first order
          </h2>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-stone-300 md:justify-start">
            Use promo code
            <span className="rounded-lg border border-dashed border-amber-300/60 bg-white/5 px-3 py-1 font-mono text-sm font-bold tracking-widest text-amber-200">
              FOODIE50
            </span>
            at checkout.
          </p>
        </div>

        <button className="w-full shrink-0 rounded-xl bg-orange-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/40 md:w-auto">
          Claim Offer
        </button>
      </div>
    </section>
  );
};

export default Offers;
