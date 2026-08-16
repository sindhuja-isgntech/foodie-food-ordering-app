import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/Searchbar';
import Categories from './components/Categories';
import FeaturedRestaurants from './components/FeaturedRestaurents';
import PopularFood from './components/PopularFood';
import Offers from './components/Offers';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      <Navbar />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <Categories />
      <FeaturedRestaurants searchTerm={searchTerm} />
      <PopularFood searchTerm={searchTerm} />
      <Offers />
      <Footer />
    </div>
  );
};

export default App;
