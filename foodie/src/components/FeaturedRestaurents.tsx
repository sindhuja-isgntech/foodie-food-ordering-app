import React from 'react';
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

export const FeaturedRestaurants: React.FC = () => {
  return (
    <section id="featured" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Restaurants</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {restaurants.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
          >
            <img src={res.img} alt={res.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                {res.tag}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">{res.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" /> {res.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {res.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
