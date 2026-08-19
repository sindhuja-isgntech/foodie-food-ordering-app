import { createContext } from 'react';
import type { FoodItem } from '../types/foodie';

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
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
