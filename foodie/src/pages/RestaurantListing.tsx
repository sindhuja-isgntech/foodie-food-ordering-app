import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { useRestaurants, useCategories } from '../hooks/useRestaurants';
import RestaurantCard from '../components/cards/RestaurantCard';
import CategoryCard from '../components/cards/CategoryCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';

type SortOption = 'default' | 'rating-desc' | 'name-asc';

export const RestaurantListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // TanStack Query hooks
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: restaurants, isLoading, isError, error, refetch } = useRestaurants();

  // Filter and Sort logic
  const processedRestaurants = useMemo(() => {
    if (!restaurants) return [];

    let result = restaurants.filter((res) => {
      const matchesSearch =
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.tag.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || res.tag.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'rating-desc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [restaurants, searchTerm, selectedCategory, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Sort Controls */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Explore Restaurants</h1>
        <p className="text-gray-500 mb-6">Find top-rated spots and delicious meals near you.</p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-full sm:w-auto font-medium"
            >
              <option value="default">Sort by: Default</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="name-asc">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      {!isLoadingCategories && categories && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cuisines</h2>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isSelected={selectedCategory === cat.name}
                onClick={() => setSelectedCategory(cat.name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* State Management Displays */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState message={error?.message} onRetry={() => refetch()} />
      ) : processedRestaurants.length === 0 ? (
        <EmptyState onReset={handleReset} />
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4 font-medium">
            Showing {processedRestaurants.length} restaurant{processedRestaurants.length > 1 ? 's' : ''}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {processedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;