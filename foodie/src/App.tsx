import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <Categories />
      <FeaturedRestaurants searchTerm={searchTerm} />
      <PopularFood searchTerm={searchTerm} />
      <Offers />
    </>
  );
};

export const App: React.FC = () => {
  return (
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
      </div>
    </Router>
  );
};

export default App;
