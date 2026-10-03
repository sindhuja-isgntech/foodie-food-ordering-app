import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { appConfig } from '../config/env';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <section className="home-hero relative overflow-hidden bg-gradient-to-b from-orange-50 to-[#fbf8f4] px-4 py-12 text-center sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Freshly made for you</p>
        <h1 className="mx-auto mb-4 max-w-3xl text-3xl font-extrabold text-stone-900 sm:text-4xl lg:text-5xl">
          Delicious Food Delivered To Your Doorstep
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-stone-600 sm:text-lg">
          Discover the best restaurants and food options in your city.
        </p>

        <div className="home-search mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-stone-200 bg-white p-2 shadow-md shadow-stone-900/5 md:flex-row md:p-3">
          <div className="flex w-full items-center gap-2 border-b border-stone-200 px-3 pb-2 md:w-1/3 md:border-b-0 md:border-r md:pb-0">
            <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
            <input
              type="text"
              defaultValue={appConfig.defaultLocation}
              placeholder="Select Location"
              className="w-full text-stone-700 focus:outline-none"
            />
          </div>
          <div className="flex w-full items-center gap-2 px-3 md:w-2/3">
            <Search className="h-5 w-5 shrink-0 text-stone-400" />
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Search for food, cuisines, or restaurants..."
              className="w-full text-stone-700 focus:outline-none"
            />
          </div>
          <button className="w-full rounded-lg bg-orange-600 px-8 py-3 font-semibold text-white hover:bg-orange-700 md:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
