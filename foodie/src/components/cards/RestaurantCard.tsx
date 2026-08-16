import React from 'react';
import { Clock } from 'lucide-react';
import type { Restaurant } from '../../types/foodie';
import Rating from '../common/Rating';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative">
          <img src={restaurant.img} alt={restaurant.name} className="w-full h-48 object-cover" />
          <span className="absolute top-3 left-3 text-xs bg-orange-500 text-white px-2.5 py-1 rounded-full font-medium shadow-sm">
            {restaurant.tag}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
            <Rating value={restaurant.rating} />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" /> {restaurant.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
