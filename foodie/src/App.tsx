import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import CartDrawer from './components/cart/CartDrawer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import SearchBar from './components/Searchbar';
import Categories from './components/Categories';
import FeaturedRestaurants from './components/FeaturedRestaurents';
import PopularFood from './components/PopularFood';
import Offers from './components/Offers';

import RestaurantListing from './pages/RestaurantListing';
import RestaurantDetails from './pages/RestaurantDetails';
import FoodDetails from './pages/FoodDetails';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="home-page">
      <SearchBar value={searchValue} onChange={(value: string) => setSearchValue(value)} />
      <Categories />
      <FeaturedRestaurants searchTerm={searchValue} />
      <PopularFood searchTerm={searchValue} />
      <Offers />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div className="app-shell min-h-screen bg-[#fffaf5] font-sans flex flex-col justify-between">
              <div>
                <Navbar />
                <main className="relative z-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/restaurants" element={<RestaurantListing />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                    <Route path="/food/:id" element={<FoodDetails />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
              <Footer />
              <CartDrawer />
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
