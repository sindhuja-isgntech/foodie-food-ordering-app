import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useRestaurants';
import { CUISINES } from '../constants/cuisines';

export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useCategories();

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to restaurants listing pre-filtered by the selected cuisine
    navigate(
      categoryName === 'All'
        ? '/restaurants'
        : `/restaurants?cuisine=${encodeURIComponent(categoryName)}`,
    );
  };

  const displayCategories =
    CUISINES.map(
      (name) =>
        categories?.find((category) => category.name === name) ?? {
          id: name.toLowerCase(),
          name,
          icon: name === 'All' ? '🍽️' : undefined,
        },
    );

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold text-stone-900">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl animate-pulse"
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
      <div className="mb-7">
        <h2 className="mb-2 text-2xl font-bold text-stone-900">Explore Categories</h2>
        <p className="text-stone-500 text-sm">Discover cuisines from around the world</p>
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
              className="flex flex-col items-center justify-center rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <span className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  cat.icon
                )}
              </span>
              <span className="text-sm font-bold text-stone-700 group-hover:text-orange-600 transition-colors duration-300 text-center">
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
