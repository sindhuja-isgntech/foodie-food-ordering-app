import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-orange-300/20 bg-[#2b1b12]/95 py-12 text-orange-100/70 shadow-[0_-14px_40px_rgba(91,45,14,0.12)] backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <section aria-labelledby="footer-brand-heading">
          <Link to="/" className="group mb-4 inline-flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-[1.15rem] bg-gradient-to-br from-orange-400 to-amber-500 text-orange-950 shadow-lg shadow-black/10 ring-1 ring-orange-200/40 transition-transform group-hover:rotate-[-6deg]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50/95 text-orange-600 shadow-inner">
                <ChefHat className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </span>
            <span id="footer-brand-heading" className="text-xl font-black tracking-tight text-orange-200">Foodie</span>
          </Link>
          <p className="max-w-xs text-sm leading-6">Good food, great mood, delivered to your doorstep.</p>
        </section>
        <nav aria-labelledby="company-links-heading">
          <h4 id="company-links-heading" className="mb-3 font-semibold text-orange-50">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="transition-colors hover:text-orange-300">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-orange-300">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="support-links-heading">
          <h4 id="support-links-heading" className="mb-3 font-semibold text-orange-50">Your Account</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/profile" className="transition-colors hover:text-orange-300">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-orange-200/15 px-4 pt-6 text-center text-xs text-orange-100/50 sm:px-6 lg:px-8">
        © 2026 Foodie Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
