import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { Role } from './types/auth';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { FeedbackProvider } from './context/FeedbackContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import Footer from './components/Footer';
import SearchBar from './components/Searchbar';
import Categories from './components/Categories';
import FeaturedRestaurants from './components/FeaturedRestaurents';
import PopularFood from './components/PopularFood';
import Offers from './components/Offers';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import About from './pages/About';
import Contact from './pages/Contact';
import RestaurantsPage from './pages/RestaurantListing';
import RestaurantDetails from './pages/RestaurantDetails';
import FoodDetails from './pages/FoodDetails';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageRestaurants from './pages/admin/ManageRestaurants';
import ManageCategories from './pages/admin/ManageCategories';
import ManageFoods from './pages/admin/ManageFoods';
import ManageOrders from './pages/admin/ManageOrders';

const queryClient = new QueryClient();

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <Categories />
      <FeaturedRestaurants searchTerm={searchValue} />
      <PopularFood searchTerm={searchValue} />
      <Offers />
    </>
  );
};

const homePathFor = (role?: Role) => (role === 'ADMIN' ? '/admin' : role ? '/' : '/login');

// Protected Route Guard Component
const ProtectedRoute = ({ requiredRole }: { requiredRole?: Role }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Send users to their own area (admin dashboard or customer home) rather than a page they can't use
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={homePathFor(user?.role)} replace />;
  }

  return <Outlet />;
};

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <FeedbackProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <div className="app-shell min-h-dvh w-full font-sans flex flex-col">
                  <div className="min-w-0 flex-1">
                    <Navbar />
                    <main className="min-w-0">
                      <Routes>
                        {/* Public Auth Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/restaurants" element={<RestaurantsPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* Customers return to the home page after authentication. */}
                        <Route element={<ProtectedRoute requiredRole="CUSTOMER" />}>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                          <Route path="/food/:id" element={<FoodDetails />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route
                            path="/cart"
                            element={<div className="p-8 font-bold">Customer Cart</div>}
                          />
                          <Route path="/orders" element={<Orders />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="/admin/restaurants" element={<ManageRestaurants />} />
                          <Route path="/admin/categories" element={<ManageCategories />} />
                          <Route path="/admin/foods" element={<ManageFoods />} />
                          <Route path="/admin/orders" element={<ManageOrders />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                  <Footer />
                </div>
                <CartDrawer />
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </FeedbackProvider>
    </QueryClientProvider>
  );
}
