import { createContext } from 'react';

export type OrderStatus = 'Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  cancelOrder: (orderId: string) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);
