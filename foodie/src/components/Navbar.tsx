import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { cart = [], setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  // Mock authentication state (set to true to test logged-in profile view)
  const isAuthenticated = true;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/30">
            F
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Foodie
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-semibold text-sm transition ${
              location.pathname === '/'
                ? 'text-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className={`font-semibold text-sm transition ${
              location.pathname === '/restaurants'
                ? 'text-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Restaurants
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Profile / Auth State */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
                location.pathname === '/profile'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline font-semibold text-sm">Profile</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-full shadow-md shadow-orange-500/20 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;