import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12 text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section aria-labelledby="footer-brand-heading">
          <h3 id="footer-brand-heading" className="mb-4 font-bold text-white">Foodie</h3>
          <p className="text-sm">Delivering happiness, one meal at a time.</p>
        </section>
        <nav aria-labelledby="quick-links-heading">
          <h4 id="quick-links-heading" className="mb-3 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="support-links-heading">
          <h4 id="support-links-heading" className="mb-3 font-semibold text-white">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="legal-links-heading">
          <h4 id="legal-links-heading" className="mb-3 font-semibold text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-gray-800 px-4 pt-6 text-center text-xs sm:px-6 lg:px-8">
        © 2026 Foodie Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
