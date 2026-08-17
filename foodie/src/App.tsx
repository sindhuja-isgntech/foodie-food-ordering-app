import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
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
    <>
      <SearchBar
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
      />
      <Categories />
      <FeaturedRestaurants />
      <PopularFood />
      <Offers />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white font-sans flex flex-col justify-between">
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurants" element={<RestaurantListing />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/food/:id" element={<FoodDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;