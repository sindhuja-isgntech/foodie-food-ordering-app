import React from 'react';
import type { Category } from '../types/foodie';

const categories: Category[] = [
  { id: '1', name: 'Pizza', icon: '🍕' },
  { id: '2', name: 'Burgers', icon: '🍔' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Asian', icon: '🍜' },
  { id: '5', name: 'Desserts', icon: '🍰' },
  { id: '6', name: 'Healthy', icon: '🥗' },
];

export const Categories: React.FC = () => {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Categories</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center justify-center p-4 bg-orange-50/50 hover:bg-orange-100 rounded-2xl cursor-pointer transition"
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <span className="font-semibold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
