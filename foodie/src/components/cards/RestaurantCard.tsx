import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import type { Restaurant } from '../../types/foodie';
import Rating from '../common/Rating';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <article
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-stone-200/80 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={restaurant.img}
            alt={restaurant.name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-orange-700 shadow-sm backdrop-blur-sm">
            {restaurant.tag}
          </span>
          {restaurant.rating >= 4.8 && (
            <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-amber-800 shadow-sm">
              ⭐ Top Rated
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-stone-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-stone-500 text-sm mt-1 line-clamp-2">{restaurant.description}</p>
          <div className="flex items-center gap-3 text-sm text-stone-600 mt-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Rating value={restaurant.rating} />
              <span className="font-semibold text-stone-700">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{restaurant.time}</span>
            </div>
          </div>
          {restaurant.address && (
            <div className="flex items-center gap-1 text-xs text-stone-500 mt-2">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{restaurant.address}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default RestaurantCard;
