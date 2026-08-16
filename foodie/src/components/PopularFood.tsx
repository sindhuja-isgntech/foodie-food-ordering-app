import React from 'react';
import type { FoodItem } from '../types/foodie';

const items: FoodItem[] = [
  {
    id: 1,
    name: 'Pepperoni Pizza',
    price: '$12.99',
    img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Double Cheese Burger',
    price: '$8.99',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Ramen Noodle Soup',
    price: '$11.50',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
  },
];

export const PopularFood: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Dishes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4"
            >
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-orange-500 font-bold mt-1">{item.price}</p>
                <button className="mt-2 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-orange-500 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFood;
