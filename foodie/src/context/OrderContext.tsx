import React, { useState, useEffect } from 'react';
import { OrderContext } from './order-context';
import type { Order, OrderStatus } from './order-context';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('foodie_orders');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'ORD-9824',
            date: '2026-08-16 14:30',
            restaurantName: 'Taj Mahal Palace',
            items: [
              { id: 501, name: 'Butter Chicken', price: 15.99, quantity: 1 },
              { id: 504, name: 'Garlic Butter Naan', price: 3.49, quantity: 2 },
            ],
            totalAmount: 26.96,
            status: 'Delivered',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('foodie_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      status: 'Placed',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId && order.status !== 'Delivered'
          ? { ...order, status: 'Cancelled' as OrderStatus }
          : order,
      ),
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
