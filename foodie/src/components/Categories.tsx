import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useRestaurants';

export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useCategories();

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to restaurants listing pre-filtered by selected category
    navigate(`/restaurants?category=${encodeURIComponent(categoryName)}`);
  };

  // Filter out the 'All' category since it's handled separately in RestaurantListing
  const displayCategories = categories?.filter((cat) => cat.name !== 'All') || [];

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse"
              style={{
                backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Explore Categories</h2>
        <p className="text-gray-500 text-sm">Discover cuisines from around the world</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {displayCategories.map((cat, index) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group cursor-pointer"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              className="flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-md hover:shadow-xl border border-transparent hover:border-orange-200"
              style={{
                background: `linear-gradient(135deg, ${['#fff5f0', '#fff8e1', '#f0f4ff', '#f5f0ff', '#f0fff4', '#fffbf0'][index % 6]} 0%, white 100%)`,
              }}
            >
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition-colors duration-300 text-center">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
