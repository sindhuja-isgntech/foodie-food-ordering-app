import React from 'react';
import { Search, MapPin } from 'lucide-react';

export const SearchBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Delicious Food Delivered To Your Doorstep
      </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
        Discover the best restaurants and food options in your city.
      </p>

      <div className="max-w-3xl mx-auto bg-white p-2 md:p-3 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-2 px-3 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0">
          <MapPin className="text-orange-500 w-5 h-5 shrink-0" />
          <input
            type="text"
            placeholder="Select Location"
            className="w-full focus:outline-none text-gray-700"
          />
        </div>
        <div className="flex items-center gap-2 px-3 w-full md:w-2/3">
          <Search className="text-gray-400 w-5 h-5 shrink-0" />
          <input
            type="text"
            placeholder="Search for food, cuisines, or restaurants..."
            className="w-full focus:outline-none text-gray-700"
          />
        </div>
        <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
