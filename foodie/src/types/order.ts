export const ORDER_STATUSES = [
  'PLACED',
  'PREPARING',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PLACED: 'Placed',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

// Delivered and cancelled orders can no longer change status.
export const isFinalStatus = (status: OrderStatus): boolean =>
  status === 'DELIVERED' || status === 'CANCELLED';

export const formatOrderId = (id: number): string => `ORD-${String(id).padStart(4, '0')}`;

export interface OrderItem {
  foodItemId: number | null;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string | null;
  createdAt: string;
}

export interface PlaceOrderRequest {
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
}
