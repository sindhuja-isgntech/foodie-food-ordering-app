import React from 'react';
import type { FoodItem } from '../../types/foodie';
import { useCart } from '../../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4 hover:shadow-md transition">
      <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-xl shrink-0" />
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{item.name}</h3>
        <p className="text-orange-500 font-bold mt-1">{item.price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          className="mt-2 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-orange-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;