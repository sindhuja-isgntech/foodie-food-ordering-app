import React from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/Searchbar';
import Categories from './components/Categories';
import FeaturedRestaurants from './components/FeaturedRestaurents';
import PopularFood from './components/PopularFood';
import Offers from './components/Offers';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <SearchBar />
      <Categories />
      <FeaturedRestaurants />
      <PopularFood />
      <Offers />
      <Footer />
    </div>
  );
};

export default App;
