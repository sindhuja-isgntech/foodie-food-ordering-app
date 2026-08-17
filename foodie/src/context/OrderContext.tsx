import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('foodie_orders');
    return saved ? JSON.parse(saved) : [
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
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};