import React from 'react';
import type { Category } from '../../types/foodie';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition border ${
        isSelected
          ? 'bg-orange-500 text-white border-orange-500 shadow-md'
          : 'bg-orange-50/50 text-gray-700 border-transparent hover:bg-orange-100'
      }`}
    >
      <span className="text-3xl mb-2">{category.icon}</span>
      <span className="font-semibold text-sm">{category.name}</span>
    </div>
  );
};

export default CategoryCard;
