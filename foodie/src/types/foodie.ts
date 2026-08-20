export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  time: string;
  img: string;
  tag: string;
}

export interface FoodItem {
  id: number;
  name: string;
  price: string;
  img: string;
  description: string;
  category: string;
  isVegetarian?: boolean;
  isAvailable?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  time: string;
  img: string;
  tag: string;
  description?: string;
  address?: string;
  menu?: {
    categories: string[];
    items: FoodItem[];
  };
}
