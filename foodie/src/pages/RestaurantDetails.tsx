import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import FoodCard from '../components/cards/FoodCard';
import type { Restaurant } from '../types/foodie';

// Dynamic mock data for all 4 restaurants
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
          description: 'Two beef patties, cheddar cheese, secret sauce',
          img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
          category: 'Burgers',
        },
        {
          id: 102,
          name: 'Bacon Smokey Burger',
          price: '$10.49',
          description: 'Crispy bacon, smoked gouda, BBQ sauce',
          img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80',
          category: 'Burgers',
        },
        {
          id: 103,
          name: 'Crispy French Fries',
          price: '$3.99',
          description: 'Golden salted fries served with garlic aioli',
          img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
          category: 'Sides',
        },
        {
          id: 104,
          name: 'Chocolate Milkshake',
          price: '$4.50',
          description: 'Rich chocolate ice cream topped with whipped cream',
          img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
          category: 'Drinks',
        },
      ],
    },
  },
  '2': {
    id: 2,
    name: 'Pasta & Co.',
    rating: 4.6,
    time: '30-40 min',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    tag: 'Italian',
    description: 'Authentic handmade Italian pasta, wood-fired pizzas, and classic sauces.',
    address: '456 Olive Avenue, Little Italy',
    menu: {
      categories: ['All', 'Pasta', 'Pizza', 'Desserts'],
      items: [
        {
          id: 201,
          name: 'Fettuccine Alfredo',
          price: '$14.99',
          description: 'Creamy parmesan sauce over fresh handmade fettuccine',
          img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80',
          category: 'Pasta',
        },
        {
          id: 202,
          name: 'Margherita Pizza',
          price: '$13.50',
          description: 'Fresh basil, mozzarella, and San Marzano tomato sauce',
          img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80',
          category: 'Pizza',
        },
        {
          id: 203,
          name: 'Penne Carbonara',
          price: '$15.25',
          description: 'Crispy pancetta, egg yolk, and pecorino romano',
          img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80',
          category: 'Pasta',
        },
        {
          id: 204,
          name: 'Classic Tiramisu',
          price: '$6.99',
          description: 'Espresso-soaked ladyfingers with mascarpone cream',
          img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80',
          category: 'Desserts',
        },
      ],
    },
  },
  '3': {
    id: 3,
    name: 'Sushi World',
    rating: 4.9,
    time: '25-35 min',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    tag: 'Japanese',
    description: 'Fresh sashimi, signature sushi rolls, and traditional Japanese appetizers.',
    address: '789 Sakura Way, Uptown',
    menu: {
      categories: ['All', 'Rolls', 'Sashimi', 'Appetizers'],
      items: [
        {
          id: 301,
          name: 'Salmon Avocado Roll',
          price: '$12.00',
          description: 'Fresh Atlantic salmon wrapped with creamy avocado',
          img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
          category: 'Rolls',
        },
        {
          id: 302,
          name: 'Tuna Sashimi (5 pcs)',
          price: '$16.50',
          description: 'Thinly sliced raw bluefin tuna',
          img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80',
          category: 'Sashimi',
        },
        {
          id: 303,
          name: 'Dragon Roll',
          price: '$14.99',
          description: 'Eel, cucumber topped with avocado and unagi sauce',
          img: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80',
          category: 'Rolls',
        },
        {
          id: 304,
          name: 'Steamed Edamame',
          price: '$4.99',
          description: 'Salted Japanese soybeans in pod',
          img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
          category: 'Appetizers',
        },
      ],
    },
  },
  '4': {
    id: 4,
    name: 'Tokyo Ramen Hub',
    rating: 4.5,
    time: '15-25 min',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    tag: 'Asian',
    description: 'Rich broth ramen bowls, steamed gyoza dumplings, and Asian street food classics.',
    address: '101 Lantern Boulevard, East Side',
    menu: {
      categories: ['All', 'Ramen', 'Sides', 'Tea'],
      items: [
        {
          id: 401,
          name: 'Tonkotsu Pork Ramen',
          price: '$13.99',
          description: 'Rich pork bone broth with chashu pork, soft egg, and bamboo',
          img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
          category: 'Ramen',
        },
        {
          id: 402,
          name: 'Spicy Miso Ramen',
          price: '$14.50',
          description: 'Spicy miso broth with ground pork, corn, and chili oil',
          img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=400&q=80',
          category: 'Ramen',
        },
        {
          id: 403,
          name: 'Pork Gyoza (6 pcs)',
          price: '$6.50',
          description: 'Pan-fried Japanese dumplings with soy dip',
          img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80',
          category: 'Sides',
        },
        {
          id: 404,
          name: 'Matcha Iced Green Tea',
          price: '$3.99',
          description: 'Refreshing Japanese cold brew green tea',
          img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
          category: 'Tea',
        },
      ],
    },
  },
  '5': {
    id: 5,
    name: 'Taj Mahal Palace',
    rating: 4.9,
    time: '25-35 min',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    tag: 'Indian',
    description:
      'Authentic North & South Indian fine dining featuring rich curries, tandoori specialties, and freshly baked breads.',
    address: '202 Curry Spice Lane, Midtown',
    menu: {
      categories: ['All', 'Curries', 'Starters', 'Breads', 'Desserts'],
      items: [
        {
          id: 501,
          name: 'Butter Chicken (Murgh Makhani)',
          price: '$15.99',
          description: 'Tender chicken cooked in a rich, velvety tomato and butter cream sauce',
          img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80',
          category: 'Curries',
        },
        {
          id: 502,
          name: 'Paneer Tikka Masala',
          price: '$13.99',
          description: 'Grilled cottage cheese cubes simmered in a spiced onion-tomato gravy',
          img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
          category: 'Curries',
        },
        {
          id: 503,
          name: 'Crispy Vegetable Samosas (2 pcs)',
          price: '$5.49',
          description: 'Golden pastry stuffed with spiced potatoes and green peas',
          img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
          category: 'Starters',
        },
        {
          id: 504,
          name: 'Garlic Butter Naan',
          price: '$3.49',
          description: 'Freshly baked tandoori flatbread brushed with garlic and melted butter',
          img: 'https://cafedelites.com/wp-content/uploads/2020/06/Garlic-Naan-Recipe-IMAGE-76.jpg',
          category: 'Breads',
        },
        {
          id: 505,
          name: 'Gulab Jamun (2 pcs)',
          price: '$4.99',
          description: 'Warm milk-solid dumplings soaked in rose-flavored cardamom syrup',
          img: 'https://as2.ftcdn.net/v2/jpg/08/94/76/25/1000_F_894762571_KXz2mTpbcjHRGMg48iiU4CnI9v7La4EN.jpg',
          category: 'Desserts',
        },
      ],
    },
  },
  '6': {
    id: 6,
    name: 'Royal Biryani House',
    rating: 4.7,
    time: '20-30 min',
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    tag: 'Indian',
    description: 'Specializing in Hyderabadi dum biryanis, kebabs, and refreshing lassi drinks.',
    address: '55 Nizam Road, West District',
    menu: {
      categories: ['All', 'Biryani', 'Kebabs', 'Drinks'],
      items: [
        {
          id: 601,
          name: 'Hyderabadi Chicken Dum Biryani',
          price: '$14.99',
          description:
            'Fragrant basmati rice slow-cooked with marinated chicken and aromatic spices',
          img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
          category: 'Biryani',
        },
        {
          id: 602,
          name: 'Lamb Shank Dum Biryani',
          price: '$17.49',
          description: 'Tender slow-cooked lamb shank served over saffron basmati rice',
          img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80',
          category: 'Biryani',
        },
        {
          id: 603,
          name: 'Chicken Seekh Kebab',
          price: '$11.99',
          description: 'Minced chicken skewers spiced with herbs and cooked over charcoal',
          img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
          category: 'Kebabs',
        },
        {
          id: 604,
          name: 'Mango Lassi',
          price: '$3.99',
          description: 'Traditional chilled yogurt drink blended with sweet Alphonso mango pulp',
          img: 'https://tse2.mm.bing.net/th/id/OIP.NAmdO2HgT0G5qsNrhz3Q1AHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
          category: 'Drinks',
        },
      ],
    },
  },
};

export const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Fallback to restaurant 1 if id not found
  const restaurant =
    id && mockRestaurantData[id] ? mockRestaurantData[id] : mockRestaurantData['1'];
  const menu = restaurant.menu;

  const filteredItems = menu?.items.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory,
  );

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
            <p className="text-gray-300 text-sm mt-1 max-w-xl">{restaurant.description}</p>
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

      {/* Category Filter Tabs */}
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

      {/* Dynamic Food Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems?.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/food/${item.id}`, { state: { food: item } })}
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
