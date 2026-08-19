import { useContext } from 'react';
import { CartContext } from './cart-context';
import type { CartContextType } from './cart-context';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
