import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '../services/restaurantService';
import type { Restaurant, Category } from '../types/foodie';

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: restaurantService.fetchCategories,
    staleTime: 1000 * 60 * 10, // Cache categories for 10 minutes
  });
};

export const useRestaurants = () => {
  return useQuery<Restaurant[], Error>({
    queryKey: ['restaurants'],
    queryFn: restaurantService.fetchRestaurants,
    staleTime: 1000 * 60 * 5, // Cache restaurants for 5 minutes
  });
};

export const useRestaurantDetails = (id: number) => {
  return useQuery<Restaurant, Error>({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantService.fetchRestaurantById(id),
    enabled: !!id && !isNaN(id),
  });
};