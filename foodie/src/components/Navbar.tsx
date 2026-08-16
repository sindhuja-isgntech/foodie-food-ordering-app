import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white p-2 rounded-xl font-bold text-xl">F</span>
            <span className="text-2xl font-bold text-gray-800">Foodie</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <a href="#" className="text-orange-500">
              Home
            </a>
            <a href="#categories" className="hover:text-orange-500 transition">
              Categories
            </a>
            <a href="#featured" className="hover:text-orange-500 transition">
              Restaurants
            </a>
            <a href="#offers" className="hover:text-orange-500 transition">
              Offers
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-6 h-6" />
            </button>
            <button className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition">
              Sign In
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b px-4 pt-2 pb-4 space-y-3">
          <a href="#" className="block text-orange-500 font-medium">
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
          <button className="w-full mt-2 bg-orange-500 text-white py-2 rounded-full font-medium">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
