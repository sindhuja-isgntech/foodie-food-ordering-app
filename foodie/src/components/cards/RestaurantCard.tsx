import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import type { Restaurant } from '../../types/foodie';
import Rating from '../common/Rating';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:scale-105 hover:-translate-y-1 border border-gray-100/50 group"
    >
      <div>
        <div className="relative overflow-hidden">
          <img 
            src={restaurant.img} 
            alt={restaurant.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
            {restaurant.tag}
          </span>
          {restaurant.rating >= 4.8 && (
            <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
              ⭐ Top Rated
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{restaurant.description}</p>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Rating value={restaurant.rating} />
              <span className="font-semibold text-gray-700">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-orange-500" /> 
              <span className="font-medium">{restaurant.time}</span>
            </div>
          </div>
          {restaurant.address && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{restaurant.address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
