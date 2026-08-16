import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import FoodCard from '../components/cards/FoodCard';
import type { Restaurant } from '../types/foodie';

const mockRestaurantData: Record<string, Restaurant> = {
  '1': {
    id: 1,
    name: 'The Burger Joint',
    rating: 4.8,
    time: '20-30 min',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tag: 'Fast Food',
    description: 'Serving gourmet smashed burgers, crispy fries, and handcrafted milkshakes.',
    address: '123 Main Street, Downtown',
    menu: {
      categories: ['All', 'Burgers', 'Sides', 'Drinks'],
      items: [
        {
          id: 101,
          name: 'Double Cheese Burger',
          price: '$8.99',
          img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
          category: 'Burgers',
        } as any,
        {
          id: 102,
          name: 'Crispy French Fries',
          price: '$3.99',
          img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
          category: 'Sides',
        } as any,
        {
          id: 103,
          name: 'Chocolate Milkshake',
          price: '$4.50',
          img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
          category: 'Drinks',
        } as any,
      ] as any,
    },
  },
};

export const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const restaurant = id
    ? mockRestaurantData[id] || mockRestaurantData['1']
    : mockRestaurantData['1'];
  const menu = restaurant.menu;

  const filteredItems = menu?.items.filter((item) => {
    const itemCategory = (item as { category?: string }).category;
    return selectedCategory === 'All' || itemCategory === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/restaurants')}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 font-medium transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Restaurants
      </button>

      {/* Banner */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
        <img src={restaurant.img} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-8">
          <div className="text-white">
            <span className="bg-orange-500 text-xs px-3 py-1 rounded-full font-semibold uppercase">
              {restaurant.tag}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm mt-3 text-gray-200">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" /> {restaurant.rating}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {restaurant.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {restaurant.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      {menu && (
        <div className="mb-8 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
          <div className="flex gap-2 overflow-x-auto">
            {menu.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Food Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems?.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/food/${item.id}`)}
            className="cursor-pointer"
          >
            <FoodCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
