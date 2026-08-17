import React from 'react';
import { ShoppingBag, Clock, Store, AlertCircle, CheckCircle2, Truck, Package, XCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import type { OrderStatus } from '../context/OrderContext';

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'Placed':
      return { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock };
    case 'Preparing':
      return { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: Package };
    case 'Out for Delivery':
      return { bg: 'bg-purple-50 text-purple-700 border-purple-200', icon: Truck };
    case 'Delivered':
      return { bg: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 };
    case 'Cancelled':
      return { bg: 'bg-red-50 text-red-700 border-red-200', icon: XCircle };
    default:
      return { bg: 'bg-gray-50 text-gray-700 border-gray-200', icon: AlertCircle };
  }
};

export const Orders: React.FC = () => {
  const { orders, cancelOrder } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-16 px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
        <a
          href="/restaurants"
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          Explore Restaurants
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const statusStyle = getStatusBadge(order.status);
          const StatusIcon = statusStyle.icon;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Order Card Header */}
              <div className="p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-gray-900">{order.id}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-xs text-gray-500">{order.date}</span>
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
                    {order.status}
                  </span>

                  {(order.status === 'Placed' || order.status === 'Preparing') && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-full transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="p-4 sm:p-6 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 font-bold text-xs px-2 py-0.5 rounded">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-800 font-medium">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Card Footer */}
              <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-600">Total Amount</span>
                <span className="text-lg font-black text-orange-600">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;