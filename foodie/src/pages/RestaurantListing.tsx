import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Restaurant, Category } from '../types/foodie';
import RestaurantCard from '../components/cards/RestaurantCard';
import CategoryCard from '../components/cards/CategoryCard';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'The Burger Joint',
    rating: 4.8,
    time: '20-30 min',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    tag: 'Fast Food',
  },
  {
    id: 2,
    name: 'Pasta & Co.',
    rating: 4.6,
    time: '30-40 min',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80',
    tag: 'Italian',
  },
  {
    id: 3,
    name: 'Sushi World',
    rating: 4.9,
    time: '25-35 min',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
    tag: 'Japanese',
  },
  {
    id: 4,
    name: 'Tokyo Ramen Hub',
    rating: 4.5,
    time: '15-25 min',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80',
    tag: 'Asian',
  },
  {
    id: 5,
    name: 'Taj Mahal Palace',
    rating: 4.9,
    time: '25-35 min',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80',
    tag: 'Indian',
  },
  {
    id: 6,
    name: 'Royal Biryani House',
    rating: 4.7,
    time: '20-30 min',
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
    tag: 'Indian',
  },
];

const mockCategories: Category[] = [
  { id: '1', name: 'All', icon: '🍽️' },
  { id: '2', name: 'Fast Food', icon: '🍔' },
  { id: '3', name: 'Italian', icon: '🍝' },
  { id: '4', name: 'Japanese', icon: '🍣' },
  { id: '5', name: 'Asian', icon: '🥢' },
  { id: '6', name: 'Indian', icon: '🍛' },
];

export const RestaurantListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isError, setIsError] = useState<boolean>(false);

  // Filter restaurants by search query and category
  const filteredRestaurants = mockRestaurants.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || res.tag.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Search Bar */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Explore Restaurants</h1>
        <p className="text-gray-500 mb-6">Find top-rated spots and delicious meals near you.</p>

        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Cuisines</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {mockCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.name}
              onClick={() => setSelectedCategory(cat.name)}
            />
          ))}
        </div>
      </div>

      {/* Main Content Areas */}
      {isError ? (
        <ErrorState onRetry={() => setIsError(false)} />
      ) : filteredRestaurants.length === 0 ? (
        <EmptyState onReset={handleReset} />
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4 font-medium">
            Showing {filteredRestaurants.length} restaurant
            {filteredRestaurants.length > 1 ? 's' : ''}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;
