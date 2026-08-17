import React from 'react';
import type { Category } from '../types/foodie';

const categories: Category[] = [
  { id: '1', name: 'Pizza', icon: '🍕' },
  { id: '2', name: 'Burgers', icon: '🍔' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Asian', icon: '🍜' },
  { id: '5', name: 'Indian', icon: '🍛' },
  { id: '6', name: 'Desserts', icon: '🍰' },
  { id: '7', name: 'Healthy', icon: '🥗' },
];

export const Categories: React.FC = () => {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Explore Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-orange-50/50 p-4 transition hover:bg-orange-100"
          >
            <span className="mb-2 text-4xl">{cat.icon}</span>
            <span className="text-center font-semibold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
