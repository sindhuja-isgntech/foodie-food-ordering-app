import type { Restaurant } from '../types/foodie';
import { mockApi } from './mockApi';

export const fetchRestaurants = async (restaurants: Restaurant[]): Promise<Restaurant[]> => {
  return mockApi(restaurants, 600);
};
