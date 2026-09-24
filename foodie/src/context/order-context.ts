import { createContext } from 'react';
import type { Order, PlaceOrderRequest } from '../types/order';

export type { Order, OrderItem, OrderStatus } from '../types/order';

export interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  addOrder: (order: PlaceOrderRequest) => Promise<Order>;
  cancelOrder: (orderId: number) => Promise<void>;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);
