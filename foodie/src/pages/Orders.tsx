import React, { useState } from 'react';
import {
  ShoppingBag,
  Clock,
  Store,
  AlertCircle,
  CheckCircle2,
  Truck,
  Package,
  XCircle,
} from 'lucide-react';
import { useOrders } from '../context/useOrders';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { getErrorMessage } from '../services/orderService';
import { ORDER_STATUS_LABELS, formatOrderId } from '../types/order';
import type { OrderStatus } from '../types/order';

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'PLACED':
      return { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock };
    case 'PREPARING':
      return { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: Package };
    case 'OUT_FOR_DELIVERY':
      return { bg: 'bg-purple-50 text-purple-700 border-purple-200', icon: Truck };
    case 'DELIVERED':
      return { bg: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 };
    case 'CANCELLED':
      return { bg: 'bg-red-50 text-red-700 border-red-200', icon: XCircle };
    default:
      return { bg: 'bg-gray-50 text-gray-700 border-gray-200', icon: AlertCircle };
  }
};

export const Orders: React.FC = () => {
  const { orders, isLoading, error, cancelOrder } = useOrders();
  const [cancelError, setCancelError] = useState('');

  const handleCancel = async (orderId: number) => {
    setCancelError('');
    try {
      await cancelOrder(orderId);
    } catch (err) {
      setCancelError(getErrorMessage(err, 'Could not cancel this order.'));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="max-w-4xl mx-auto my-16 px-4">
        <ErrorState message={getErrorMessage(error, 'Could not load your orders.')} />
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="max-w-4xl mx-auto my-16 px-4 text-center" aria-labelledby="orders-heading">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 id="orders-heading" className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
        <a
          href="/restaurants"
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          Explore Restaurants
        </a>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8" aria-labelledby="orders-heading">
      <h1 id="orders-heading" className="text-3xl font-extrabold text-gray-900 mb-8">
        Your Orders
      </h1>

      {cancelError && (
        <p role="alert" className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {cancelError}
        </p>
      )}

      <ol className="space-y-6">
        {orders.map((order) => {
          const statusStyle = getStatusBadge(order.status);
          const StatusIcon = statusStyle.icon;

          return (
            <li key={order.id}>
            <article
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Order Card Header */}
              <div className="p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-gray-900">{formatOrderId(order.id)}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                    <Store className="w-4 h-4 text-orange-500" />
                    {order.restaurantName}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${statusStyle.bg}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>

                  {(order.status === 'PLACED' || order.status === 'PREPARING') && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-full transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order Items Breakdown */}
              <ul className="p-4 sm:p-6 divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <li key={`${item.foodItemId}-${index}`} className="py-2.5 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 font-bold text-xs px-2 py-0.5 rounded">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-800 font-medium">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Order Card Footer */}
              <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-600">Total Amount</span>
                <span className="text-lg font-black text-orange-600">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Orders;
