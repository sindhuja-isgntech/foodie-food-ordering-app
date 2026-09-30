import { createContext } from 'react';
import type { FoodItem } from '../types/foodie';

export interface CartItem extends FoodItem {
  // Identifies a cart line. Menu data comes from both the backend and local mock lists whose
  // ids overlap, so the id alone can't tell two different dishes apart.
  cartKey: string;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (cartKey: string) => void;
  increaseQuantity: (cartKey: string) => void;
  decreaseQuantity: (cartKey: string) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
