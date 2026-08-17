import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'text-orange-500 font-semibold' : 'hover:text-orange-500 transition';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-orange-500 text-white p-2 rounded-xl font-bold text-xl">F</span>
            <span className="text-2xl font-bold text-gray-800">Foodie</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/restaurants" className={isActive('/restaurants')}>Restaurants</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full text-gray-600"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>
            <button className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition">
              Sign In
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600" aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;