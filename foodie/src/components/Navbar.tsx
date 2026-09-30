import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, LogOut, ShieldCheck, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';

const CUSTOMER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/orders', label: 'Orders' },
];

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/restaurants', label: 'Restaurants' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/foods', label: 'Food Items' },
  { to: '/admin/orders', label: 'Orders' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemsCount: totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const links = isAdmin ? ADMIN_LINKS : CUSTOMER_LINKS;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 py-3 md:h-20 md:py-0 flex flex-wrap items-center justify-between gap-y-2">
        {/* Logo */}
        <Link to={isAdmin ? '/admin' : '/'} className="group flex items-center gap-2.5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-[1.15rem] bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:shadow-orange-500/60">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50/95 text-orange-600 shadow-inner">
              <ChefHat className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-300 shadow-sm" />
          </div>
          <span className="bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-2xl font-black tracking-tight text-transparent">
            Foodie
          </span>
          {isAdmin && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="order-3 basis-full flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-1 sm:gap-x-5 sm:pt-2 md:order-none md:basis-auto md:gap-8 md:pt-0">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`font-semibold text-sm transition-all duration-300 relative group ${
                  active ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isAdmin ? (
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          ) : (
            <>
              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all duration-300 group"
                aria-label={totalItems > 0 ? `Shopping Cart, ${totalItems} items` : 'Shopping Cart'}
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
                  className={`flex items-center gap-2 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full border transition-all duration-300 transform hover:scale-105 ${
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
                  to="/login"
                  className="px-4 py-2.5 sm:px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
