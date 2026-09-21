import type { Category } from '../types/foodie';
import { mockApi } from './mockApi';

export const fetchCategories = async (categories: Category[]): Promise<Category[]> => {
  return mockApi(categories, 300);
};
