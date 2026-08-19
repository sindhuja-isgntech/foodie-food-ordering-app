import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/useCart';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { cart = [], setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  // Mock authentication state (set to true to test logged-in profile view)
  const isAuthenticated = true;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-all duration-300 transform group-hover:scale-110">
            F
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Foodie
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-semibold text-sm transition-all duration-300 relative group ${
              location.pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Home
            <span
              className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
          </Link>
          <Link
            to="/restaurants"
            className={`font-semibold text-sm transition-all duration-300 relative group ${
              location.pathname === '/restaurants'
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Restaurants
            <span
              className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ${location.pathname === '/restaurants' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
          </Link>
          <Link
            to="/orders"
            className={`font-semibold text-sm transition-all duration-300 relative group ${
              location.pathname === '/orders'
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Orders
            <span
              className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ${location.pathname === '/orders' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all duration-300 group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Profile / Auth State */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/profile'
                  ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-lg shadow-orange-500/20'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline font-semibold text-sm">Profile</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
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
