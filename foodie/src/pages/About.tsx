import React from 'react';
import { Heart, MapPin, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: UtensilsCrossed,
    title: 'Good food, thoughtfully found',
    description: 'We bring local favorites and new discoveries together in one easy-to-browse place.',
  },
  {
    icon: MapPin,
    title: 'Made for your neighborhood',
    description: 'From a quick lunch to a relaxed dinner, Foodie helps you find what fits your moment.',
  },
  {
    icon: Heart,
    title: 'A little more joy',
    description: 'Simple ordering, clear choices, and meals that arrive ready to make your day better.',
  },
];

export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white shadow-xl shadow-orange-900/10 sm:p-12">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-100">Our story</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Food worth looking forward to.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-orange-50 sm:text-lg">
            Foodie makes it easy to discover restaurants, choose your next favorite meal, and get it delivered without the guesswork.
          </p>
          <Link to="/restaurants" className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-orange-600 shadow-lg transition hover:bg-orange-50">
            Find a restaurant
          </Link>
        </div>
        <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full border-[28px] border-white/15" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />
      </section>

      <section className="py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Why Foodie</p>
          <h2 className="mt-2 text-3xl font-black text-gray-900">The best part of your day can start here.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-orange-100 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
