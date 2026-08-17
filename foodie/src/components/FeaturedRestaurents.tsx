import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import type { Restaurant } from '../types/foodie';

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'The Burger Joint',
    rating: 4.8,
    time: '20-30 min',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    tag: 'Fast Food',
  },
  {
    id: 2,
    name: 'Pasta & Co.',
    rating: 4.6,
    time: '30-40 min',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80',
    tag: 'Italian',
  },
  {
    id: 3,
    name: 'Sushi World',
    rating: 4.9,
    time: '25-35 min',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
    tag: 'Japanese',
  },
];

interface FeaturedRestaurantsProps {
  searchTerm?: string;
}

export const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ searchTerm = '' }) => {
  const navigate = useNavigate();
  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredRestaurants = restaurants.filter((res) => {
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
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Featured Restaurants</h2>

      {filteredRestaurants.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-gray-500">
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
                <h3 className="mt-2 text-xl font-bold text-gray-800">{res.name}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
