import React from 'react';
import { Plus } from 'lucide-react';
import type { FoodItem } from '../../types/foodie';
import { useCart } from '../../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100/50 group hover:scale-105 hover:-translate-y-1">
      <div className="flex items-center gap-4 p-4">
        <div className="relative overflow-hidden rounded-xl shrink-0">
          <img 
            src={item.img} 
            alt={item.name} 
            className="w-24 h-24 object-cover transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between mt-3">
            <p className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm px-3 py-1 rounded-lg">
              {item.price}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-orange-600 hover:to-orange-500 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              title="Add to Cart"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;