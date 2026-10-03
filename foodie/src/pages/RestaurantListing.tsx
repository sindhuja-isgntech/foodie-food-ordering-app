import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, Clock } from 'lucide-react';
import { fetchRestaurants, fetchCategories } from '../api/axiosClient';
import { CUISINES } from '../constants/cuisines';

type Restaurant = {
  id: string | number;
  img: string;
  name: string;
  rating: number;
  time: string;
  tag: string;
};

type Category = {
  id: string | number;
  imageUrl: string;
  name: string;
};

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // The cuisine filter lives in the URL so the home page category tiles can
  // deep-link into this page already filtered.
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCuisine = searchParams.get('cuisine') ?? '';

  const handleCuisineChange = (cuisine: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cuisine) {
      nextParams.set('cuisine', cuisine);
    } else {
      nextParams.delete('cuisine');
    }
    setSearchParams(nextParams, { replace: true });
  };

  // Fetch Restaurants using TanStack Query
  const {
    data: restaurants = [],
    isLoading,
    isError,
    error,
  } = useQuery<Restaurant[]>({
    queryKey: ['restaurants', searchTerm, selectedCuisine],
    queryFn: () => fetchRestaurants(searchTerm, selectedCuisine),
  });

  // Fetch Categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">Restaurants</h1>
        <p className="mt-2 text-sm text-stone-600">Find a local favorite for your next meal.</p>
      </div>
      <div className="mb-8 flex w-full max-w-3xl flex-col justify-between gap-2 rounded-xl border border-stone-200/80 bg-white p-2 shadow-sm sm:flex-row">
        <input
          type="text"
          placeholder="Search restaurants by name..."
          aria-label="Search restaurants by name"
          className="w-full flex-1 rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          aria-label="Filter by cuisine"
          className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
          value={selectedCuisine}
          onChange={(e) => handleCuisineChange(e.target.value)}
        >
          <option value="">All Cuisines</option>
          {CUISINES.filter((cuisine) => cuisine !== 'All').map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-stone-900">Browse by cuisine</h2>
        <div className="flex gap-4 overflow-x-auto pb-1">
          {CUISINES.map((name) => {
            const cuisineValue = name === 'All' ? '' : name;
            const isActive = selectedCuisine === cuisineValue;
            const imageUrl = categories.find((category) => category.name === name)?.imageUrl;

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleCuisineChange(cuisineValue)}
                aria-pressed={isActive}
                className={`flex min-w-[120px] shrink-0 items-center gap-2 rounded-lg border px-3 py-2.5 transition ${
                  isActive
                    ? 'border-orange-600 bg-orange-50 text-orange-600 shadow-sm'
                    : 'border-stone-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                {imageUrl && (
                  <img src={imageUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                )}
                <span className="font-medium text-sm">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && <p className="text-stone-500">Loading restaurants from backend...</p>}
      {isError && <p className="text-red-500">Failed to load data: {error.message}</p>}

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurant/${restaurant.id}`}
            className="block overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img src={restaurant.img} alt={restaurant.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
                {restaurant.tag}
              </span>
              <h3 className="mt-2 text-xl font-bold text-stone-800">{restaurant.name}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400" /> {restaurant.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {restaurant.time}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}