import React from 'react';

export const Offers: React.FC = () => {
  return (
    <section id="offers" className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            Special Promo
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Get 50% Off Your First Order</h2>
          <p className="text-orange-100 mt-2">
            Use promo code <span className="font-bold text-white">FOODIE50</span> at checkout.
          </p>
        </div>
        <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition shadow-lg shrink-0">
          Claim Offer
        </button>
      </div>
    </section>
  );
};

export default Offers;
