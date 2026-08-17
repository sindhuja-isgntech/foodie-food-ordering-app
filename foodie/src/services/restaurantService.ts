import type { Restaurant, Category } from '../types/foodie';

const mockCategories: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
  { id: 'italian', name: 'Italian', icon: '🍕' },
  { id: 'japanese', name: 'Japanese', icon: '🍣' },
  { id: 'asian', name: 'Asian', icon: '🍜' },
];

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'The Burger Joint',
    rating: 4.8,
    time: '20-30 min',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    tag: 'Fast Food',
    description: 'Serving gourmet smashed burgers, crispy fries, and handcrafted milkshakes.',
    address: '123 Main Street, Downtown',
    menu: {
      categories: ['All', 'Burgers', 'Sides', 'Drinks'],
      items: [
        { id: 101, name: 'Double Cheese Burger', price: '$8.99', description: 'Two beef patties, cheddar cheese, secret sauce', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', category: 'Burgers' },
        { id: 102, name: 'Bacon Smokey Burger', price: '$10.49', description: 'Crispy bacon, smoked gouda, BBQ sauce', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80', category: 'Burgers' },
        { id: 103, name: 'Crispy French Fries', price: '$3.99', description: 'Golden salted fries served with garlic aioli', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', category: 'Sides' },
      ],
    },
  },
  {
    id: 2,
    name: 'Pasta & Co.',
    rating: 4.6,
    time: '30-40 min',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80',
    tag: 'Italian',
    description: 'Authentic handmade Italian pasta, wood-fired pizzas, and classic sauces.',
    address: '456 Olive Avenue, Little Italy',
    menu: {
      categories: ['All', 'Pasta', 'Pizza', 'Desserts'],
      items: [
        { id: 201, name: 'Fettuccine Alfredo', price: '$14.99', description: 'Creamy parmesan sauce over fresh handmade fettuccine', img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80', category: 'Pasta' },
        { id: 202, name: 'Margherita Pizza', price: '$13.50', description: 'Fresh basil, mozzarella, and San Marzano tomato sauce', img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80', category: 'Pizza' },
      ],
    },
  },

  {
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
        { id: 301, name: 'Salmon Avocado Roll', price: '$12.00', description: 'Fresh Atlantic salmon wrapped with creamy avocado', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80', category: 'Rolls' },
        { id: 302, name: 'Tuna Sashimi (5 pcs)', price: '$16.50', description: 'Thinly sliced raw bluefin tuna', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80', category: 'Sashimi' },
        { id: 303, name: 'Dragon Roll', price: '$14.99', description: 'Eel, cucumber topped with avocado and unagi sauce', img: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80', category: 'Rolls' },
        { id: 304, name: 'Steamed Edamame', price: '$4.99', description: 'Salted Japanese soybeans in pod', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', category: 'Appetizers' },
      ],
    },
  },
  {
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
        { id: 401, name: 'Tonkotsu Pork Ramen', price: '$13.99', description: 'Rich pork bone broth with chashu pork, soft egg, and bamboo', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', category: 'Ramen' },
        { id: 402, name: 'Spicy Miso Ramen', price: '$14.50', description: 'Spicy miso broth with ground pork, corn, and chili oil', img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=400&q=80', category: 'Ramen' },
        { id: 403, name: 'Pork Gyoza (6 pcs)', price: '$6.50', description: 'Pan-fried Japanese dumplings with soy dip', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80', category: 'Sides' },
        { id: 404, name: 'Matcha Iced Green Tea', price: '$3.99', description: 'Refreshing Japanese cold brew green tea', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80', category: 'Tea' },
      ],
    },
  },
  {
    id: 5,
    name: 'Taj Mahal Palace',
    rating: 4.9,
    time: '25-35 min',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80',
    tag: 'Indian',
    description: 'Authentic North & South Indian fine dining featuring rich curries, tandoori specialties, and freshly baked breads.',
    address: '202 Curry Spice Lane, Midtown',
    menu: {
      categories: ['All', 'Curries', 'Starters', 'Breads'],
      items: [
        { id: 501, name: 'Butter Chicken', price: '$15.99', description: 'Tender chicken cooked in a rich, velvety tomato and butter cream sauce', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80', category: 'Curries' },
        { id: 502, name: 'Garlic Butter Naan', price: '$3.49', description: 'Freshly baked tandoori flatbread brushed with garlic and melted butter', img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=400&q=80', category: 'Breads' },
      ],
    },
  },
{
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
        { id: 601, name: 'Hyderabadi Chicken Dum Biryani', price: '$14.99', description: 'Fragrant basmati rice slow-cooked with marinated chicken and aromatic spices', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80', category: 'Biryani' },
        { id: 602, name: 'Lamb Shank Dum Biryani', price: '$17.49', description: 'Tender slow-cooked lamb shank served over saffron basmati rice', img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80', category: 'Biryani' },
        { id: 603, name: 'Chicken Seekh Kebab', price: '$11.99', description: 'Minced chicken skewers spiced with herbs and cooked over charcoal', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80', category: 'Kebabs' },
        { id: 604, name: 'Mango Lassi', price: '$3.99', description: 'Traditional chilled yogurt drink blended with sweet Alphonso mango pulp', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80', category: 'Drinks' },
      ],
    },
  },

];

// Service functions simulating API calls (replace with real axios requests like: return (await axiosClient.get('/restaurants')).data)
export const restaurantService = {
  fetchCategories: async (): Promise<Category[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCategories;
  },

  fetchRestaurants: async (): Promise<Restaurant[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockRestaurants;
  },

  fetchRestaurantById: async (id: number): Promise<Restaurant> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const restaurant = mockRestaurants.find((r) => r.id === id);
    if (!restaurant) {
      throw new Error(`Restaurant with ID ${id} not found.`);
    }
    return restaurant;
  },
};