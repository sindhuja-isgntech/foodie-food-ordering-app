import React from 'react';
import type { FoodItem } from '../types/foodie';

const items: FoodItem[] = [
  {
    id: 1,
    name: 'Pepperoni Pizza',
    price: '$12.99',
    img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80',
    description: 'Classic pepperoni pizza with fresh mozzarella and tomato sauce',
    category: 'Pizza',
  },
  {
    id: 2,
    name: 'Double Cheese Burger',
    price: '$8.99',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    description: 'Two beef patties with melted cheddar cheese and special sauce',
    category: 'Burgers',
  },
  {
    id: 3,
    name: 'Ramen Noodle Soup',
    price: '$11.50',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
    description: 'Traditional ramen with rich broth and tender noodles',
    category: 'Ramen',
  },
];

interface PopularFoodProps {
  searchTerm?: string;
}

export const PopularFood: React.FC<PopularFoodProps> = ({ searchTerm = '' }) => {
  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    if (!normalizedQuery) {
      return true;
    }

    return item.name.toLowerCase().includes(normalizedQuery);
  });

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Popular Dishes</h2>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-gray-500">
            No dishes match “{searchTerm}”.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-24 w-full rounded-xl object-cover sm:h-24 sm:w-24"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="mt-1 font-bold text-orange-500">{item.price}</p>
                  <button className="mt-3 rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white transition hover:bg-orange-500">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularFood;
