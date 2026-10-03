import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const linkClass = 'transition-colors hover:text-orange-400';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-stone-800 py-12 text-stone-300">
      {/* Thin brand accent along the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <section aria-labelledby="footer-brand-heading">
          <Link to="/" className="group mb-4 inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
              <ChefHat className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span id="footer-brand-heading" className="text-xl font-bold tracking-tight text-white">
              Foodie
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-6">Good food, great mood, delivered to your doorstep.</p>
        </section>
        <nav aria-labelledby="company-links-heading">
          <h4
            id="company-links-heading"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            Company
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className={linkClass}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className={linkClass}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="support-links-heading">
          <h4
            id="support-links-heading"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            Your Account
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/profile" className={linkClass}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-center text-xs text-stone-400 sm:px-6 lg:px-8">
        © 2026 Foodie Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
