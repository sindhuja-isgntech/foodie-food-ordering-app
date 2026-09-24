import axios from 'axios';
import type { Restaurant } from '../types/foodie';
import { clearStoredUser, loadStoredUser } from '../services/authStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = loadStoredUser()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// The backend answers 401/403 when a token has expired (or was issued to a deleted user).
// Send the user back to login instead of leaving every protected page failing.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const sentToken = Boolean(error.config?.headers?.Authorization);
    if (sentToken && (status === 401 || status === 403)) {
      clearStoredUser();
      window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);

export const fetchRestaurants = async (search = '', cuisine = '') => {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (cuisine) params.cuisine = cuisine;
  const response = await apiClient.get('/restaurants', { params });
  return response.data.map(normalizeRestaurant);
};

export const fetchRestaurantById = async (id: number): Promise<Restaurant> => {
  const response = await apiClient.get(`/restaurants/${id}`);
  return normalizeRestaurant(response.data);
};

export const fetchCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data;
};

const normalizeRestaurant = (restaurant: Record<string, any>): Restaurant => {
  const foodItems = Array.isArray(restaurant.foodItems) ? restaurant.foodItems : [];

  return {
    id: Number(restaurant.id),
    name: String(restaurant.name ?? ''),
    rating: Number(restaurant.rating ?? 0),
    time: String(restaurant.deliveryTime ?? ''),
    img: String(restaurant.imageUrl ?? ''),
    tag: String(restaurant.cuisine ?? ''),
    description: typeof restaurant.description === 'string' ? restaurant.description : undefined,
    address: typeof restaurant.location === 'string' ? restaurant.location : undefined,
    menu: {
      categories: ['All', ...new Set(foodItems.map((item) => String(item.category?.name ?? '')))].filter(
        Boolean,
      ),
      items: foodItems.map((item) => ({
        id: Number(item.id),
        name: String(item.name ?? ''),
        price: `$${Number(item.price ?? 0).toFixed(2)}`,
        img: String(item.imageUrl ?? ''),
        description: String(item.description ?? ''),
        category: String(item.category?.name ?? ''),
        isVegetarian: Boolean(item.isVeg),
        isAvailable: item.isAvailable !== false,
      })),
    },
  };
};

export default apiClient;
