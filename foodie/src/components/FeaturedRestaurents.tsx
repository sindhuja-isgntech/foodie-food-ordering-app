import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';

interface FeaturedRestaurantsProps {
  searchTerm?: string;
}

export const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ searchTerm = '' }) => {
  const navigate = useNavigate();
  const { data: restaurants = [], isLoading, isError } = useRestaurants();
  const normalizedQuery = searchTerm.trim().toLowerCase();
  const highestRating = restaurants.length
    ? Math.max(...restaurants.map((restaurant) => restaurant.rating))
    : 0;

  const filteredRestaurants = restaurants.filter((res) => {
    if (res.rating !== highestRating) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      res.name.toLowerCase().includes(normalizedQuery) ||
      res.tag.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-2xl font-bold text-stone-800">Featured Restaurants</h2>

      {isLoading ? (
        <p className="text-stone-500">Loading restaurants...</p>
      ) : isError ? (
        <p className="text-red-500">Unable to load restaurants.</p>
      ) : filteredRestaurants.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-stone-500">
          No restaurants match “{searchTerm}”.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRestaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => navigate(`/restaurant/${res.id}`)}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md cursor-pointer"
            >
              <img src={res.img} alt={res.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
                  {res.tag}
                </span>
                <h3 className="mt-2 text-xl font-bold text-stone-800">{res.name}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400" /> {res.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {res.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedRestaurants;
