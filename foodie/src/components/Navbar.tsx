import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { appConfig } from '../config/env';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-orange-500 p-2 text-xl font-bold text-white">F</span>
            <span className="text-lg font-bold text-gray-800 sm:text-2xl">{appConfig.appName}</span>
          </div>

          <div className="hidden items-center space-x-8 font-medium text-gray-600 md:flex">
            <a href="#" className="text-orange-500">
              Home
            </a>
            <a href="#categories" className="transition hover:text-orange-500">
              Categories
            </a>
            <a href="#featured" className="transition hover:text-orange-500">
              Restaurants
            </a>
            <a href="#offers" className="transition hover:text-orange-500">
              Offers
            </a>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <button
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
              aria-label="View Cart"
            >
              <ShoppingBag className="h-6 w-6" />
            </button>
            <button className="rounded-full bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600">
              Sign In
            </button>
          </div>

          <div className="ml-auto flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-3 border-b bg-white px-4 pb-4 pt-2 md:hidden">
          <a href="#" className="block font-medium text-orange-500">
            Home
          </a>
          <a href="#categories" className="block text-gray-600">
            Categories
          </a>
          <a href="#featured" className="block text-gray-600">
            Restaurants
          </a>
          <a href="#offers" className="block text-gray-600">
            Offers
          </a>
          <button className="mt-2 w-full rounded-full bg-orange-500 py-2 font-medium text-white">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
