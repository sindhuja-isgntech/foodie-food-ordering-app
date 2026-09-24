import apiClient from '../api/axiosClient';
import type { Order, PlaceOrderRequest } from '../types/order';

export const placeOrder = async (order: PlaceOrderRequest): Promise<Order> => {
  const response = await apiClient.post<Order>('/orders', order);
  return response.data;
};

export const fetchMyOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>('/orders');
  return response.data;
};

export const cancelOrder = async (orderId: number): Promise<Order> => {
  const response = await apiClient.put<Order>(`/orders/${orderId}/cancel`);
  return response.data;
};

// Pulls the backend's `message` out of an axios error for display.
export const getErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  const message = (error as { response?: { data?: { message?: unknown } } })?.response?.data
    ?.message;
  return typeof message === 'string' && message ? message : fallback;
};
