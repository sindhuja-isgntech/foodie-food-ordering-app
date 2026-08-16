import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { appConfig } from '../config/env';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-12 text-center sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mx-auto mb-4 max-w-3xl text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          Delicious Food Delivered To Your Doorstep
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:text-lg">
          Discover the best restaurants and food options in your city.
        </p>

        <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-lg md:flex-row md:p-3">
          <div className="flex w-full items-center gap-2 border-b border-gray-200 px-3 pb-2 md:w-1/3 md:border-b-0 md:border-r md:pb-0">
            <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
            <input
              type="text"
              defaultValue={appConfig.defaultLocation}
              placeholder="Select Location"
              className="w-full text-gray-700 focus:outline-none"
            />
          </div>
          <div className="flex w-full items-center gap-2 px-3 md:w-2/3">
            <Search className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Search for food, cuisines, or restaurants..."
              className="w-full text-gray-700 focus:outline-none"
            />
          </div>
          <button className="w-full rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
