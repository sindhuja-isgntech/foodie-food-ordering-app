import { useContext } from 'react';
import { OrderContext } from './order-context';
import type { OrderContextType } from './order-context';

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
