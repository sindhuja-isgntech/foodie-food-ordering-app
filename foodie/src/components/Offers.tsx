import React from 'react';

export const Offers: React.FC = () => {
  return (
    <section id="offers" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white shadow-lg md:flex-row md:p-12">
        <div className="text-center md:text-left">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Special Promo
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Get 50% Off Your First Order</h2>
          <p className="mt-2 text-orange-100">
            Use promo code <span className="font-bold text-white">FOODIE50</span> at checkout.
          </p>
        </div>
        <button className="w-full rounded-full bg-white px-8 py-3 font-bold text-orange-600 shadow-lg transition hover:bg-orange-50 md:w-auto">
          Claim Offer
        </button>
      </div>
    </section>
  );
};

export default Offers;
