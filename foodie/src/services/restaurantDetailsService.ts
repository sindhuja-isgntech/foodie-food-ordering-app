import type { Restaurant } from '../types/foodie';
import { mockApi } from './mockApi';

export const fetchRestaurantById = async (restaurants: Restaurant[], id: number): Promise<Restaurant> => {
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    throw new Error(`Restaurant with ID ${id} not found.`);
  }

  return mockApi(restaurant, 500);
};
