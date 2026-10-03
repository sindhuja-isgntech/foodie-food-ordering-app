import React from 'react';
import { Plus } from 'lucide-react';
import type { FoodItem } from '../../types/foodie';
import { useCart } from '../../context/useCart';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4 p-4">
        <div className="relative overflow-hidden rounded-xl shrink-0">
          <img
            src={item.img}
            alt={item.name}
            className="h-24 w-24 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-stone-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between mt-3">
            <p className="rounded-md bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
              {item.price}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              className="flex items-center justify-center rounded-lg bg-orange-600 p-2 text-white hover:bg-orange-700"
              title="Add to Cart"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
