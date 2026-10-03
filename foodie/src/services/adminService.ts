import apiClient from '../api/axiosClient';
import type { Order, OrderStatus } from '../types/order';

export interface AdminRestaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number | null;
  deliveryTime: string | null;
  priceRange: string | null;
  location: string | null;
  imageUrl: string | null;
  isOpen: boolean | null;
}

export type RestaurantInput = Omit<AdminRestaurant, 'id'>;

export interface AdminCategory {
  id: number;
  name: string;
  imageUrl: string | null;
}

export type CategoryInput = Omit<AdminCategory, 'id'>;

export interface PageResult<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface AdminFoodItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  isVeg: boolean | null;
  isAvailable: boolean | null;
  imageUrl: string | null;
  restaurantId: number | null;
  restaurantName: string | null;
  categoryId: number | null;
  categoryName: string | null;
}

export interface FoodItemInput {
  name: string;
  description: string | null;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  imageUrl: string | null;
  restaurantId: number;
  categoryId: number | null;
}

// Query keys shared by the admin pages; the public keys are invalidated too so
// customer-facing lists pick up admin changes.
export const adminKeys = {
  restaurants: ['admin', 'restaurants'],
  restaurantOptions: ['admin', 'restaurant-options'],
  categories: ['admin', 'categories'],
  categoryOptions: ['categories'],
  foods: ['admin', 'foods'],
  foodOptions: ['admin', 'food-options'],
  orders: ['admin', 'orders'],
  publicRestaurants: ['restaurants'],
};

export const adminApi = {
  fetchRestaurants: async (page: number, size: number): Promise<PageResult<AdminRestaurant>> =>
    (
      await apiClient.get<PageResult<AdminRestaurant>>('/admin/restaurants', {
        params: { page, size },
      })
    ).data,
  fetchRestaurantOptions: async (): Promise<AdminRestaurant[]> =>
    (await apiClient.get<AdminRestaurant[]>('/admin/restaurants/options')).data,
  createRestaurant: async (input: RestaurantInput): Promise<AdminRestaurant> =>
    (await apiClient.post<AdminRestaurant>('/admin/restaurants', input)).data,
  updateRestaurant: async (id: number, input: RestaurantInput): Promise<AdminRestaurant> =>
    (await apiClient.put<AdminRestaurant>(`/admin/restaurants/${id}`, input)).data,
  deleteRestaurant: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/restaurants/${id}`);
  },

  // Categories are read from the public endpoint
  fetchCategories: async (page: number, size: number): Promise<PageResult<AdminCategory>> =>
    (
      await apiClient.get<PageResult<AdminCategory>>('/admin/categories', {
        params: { page, size },
      })
    ).data,
  fetchCategoryOptions: async (): Promise<AdminCategory[]> =>
    (await apiClient.get<AdminCategory[]>('/categories')).data,
  createCategory: async (input: CategoryInput): Promise<AdminCategory> =>
    (await apiClient.post<AdminCategory>('/admin/categories', input)).data,
  updateCategory: async (id: number, input: CategoryInput): Promise<AdminCategory> =>
    (await apiClient.put<AdminCategory>(`/admin/categories/${id}`, input)).data,
  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/categories/${id}`);
  },

  fetchFoods: async (
    page: number,
    size: number,
    restaurantId: number | null,
  ): Promise<PageResult<AdminFoodItem>> =>
    (
      await apiClient.get<PageResult<AdminFoodItem>>('/admin/foods', {
        params: { page, size, ...(restaurantId === null ? {} : { restaurantId }) },
      })
    ).data,
  fetchFoodOptions: async (): Promise<AdminFoodItem[]> =>
    (await apiClient.get<AdminFoodItem[]>('/admin/foods/options')).data,
  createFood: async (input: FoodItemInput): Promise<AdminFoodItem> =>
    (await apiClient.post<AdminFoodItem>('/admin/foods', input)).data,
  updateFood: async (id: number, input: FoodItemInput): Promise<AdminFoodItem> =>
    (await apiClient.put<AdminFoodItem>(`/admin/foods/${id}`, input)).data,
  deleteFood: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/foods/${id}`);
  },

  fetchOrders: async (): Promise<Order[]> => (await apiClient.get<Order[]>('/admin/orders')).data,
  updateOrderStatus: async (id: number, status: OrderStatus): Promise<Order> =>
    (await apiClient.put<Order>(`/admin/orders/${id}/status`, { status })).data,
};
