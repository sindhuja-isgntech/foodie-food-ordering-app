import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

const categories: CategoryItem[] = [
  { id: '1', name: 'Pizza', icon: '🍕' },
  { id: '2', name: 'Burgers', icon: '🍔' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Asian', icon: '🍜' },
  { id: '5', name: 'Indian', icon: '🍛' },
  { id: '6', name: 'Desserts', icon: '🍰' },
  { id: '7', name: 'Healthy', icon: '🥗' },
];



export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName: string) => {
    // Navigate to restaurants listing pre-filtered by selected category
    navigate(`/restaurants?category=${encodeURIComponent(categoryName)}`);
  };
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Explore Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center justify-center p-6 bg-orange-50/40 hover:bg-orange-100/60 rounded-2xl cursor-pointer transition transform hover:-translate-y-1 shadow-sm border border-orange-100/50 group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {cat.icon}
            </span>
            <span className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
