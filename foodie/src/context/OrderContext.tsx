import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderContext } from './order-context';
import type { PlaceOrderRequest } from '../types/order';
import { useAuth } from './AuthContext';
import {
  cancelOrder as cancelOrderApi,
  fetchMyOrders,
  placeOrder,
} from '../services/orderService';

const MY_ORDERS_KEY = ['my-orders'];

// Orders live on the backend so admins can see them and update their status.
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCustomer } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: MY_ORDERS_KEY,
    queryFn: fetchMyOrders,
    enabled: isCustomer,
  });

  const addOrder = async (newOrder: PlaceOrderRequest) => {
    const created = await placeOrder(newOrder);
    await queryClient.invalidateQueries({ queryKey: MY_ORDERS_KEY });
    return created;
  };

  const cancelOrder = async (orderId: number) => {
    await cancelOrderApi(orderId);
    await queryClient.invalidateQueries({ queryKey: MY_ORDERS_KEY });
  };

  return (
    <OrderContext.Provider value={{ orders, isLoading, error, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
