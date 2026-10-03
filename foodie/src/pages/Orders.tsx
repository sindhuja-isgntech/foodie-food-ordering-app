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
import { useFeedback } from '../context/useFeedback';
import { ORDER_STATUS_LABELS, ORDER_STATUS_STYLES, formatOrderId } from '../types/order';
import type { OrderStatus } from '../types/order';

const STATUS_ICONS: Record<OrderStatus, typeof Clock> = {
  PLACED: Clock,
  PREPARING: Package,
  OUT_FOR_DELIVERY: Truck,
  DELIVERED: CheckCircle2,
  CANCELLED: XCircle,
};

const getStatusBadge = (status: OrderStatus) => ({
  bg: ORDER_STATUS_STYLES[status] ?? 'bg-stone-50 text-stone-700 border-stone-200',
  icon: STATUS_ICONS[status] ?? AlertCircle,
});

export const Orders: React.FC = () => {
  const { orders, isLoading, error, cancelOrder } = useOrders();
  const [cancelError, setCancelError] = useState('');
  const { showToast, confirm } = useFeedback();

  const handleCancel = async (orderId: number) => {
    const confirmed = await confirm({
      title: `Cancel ${formatOrderId(orderId)}?`,
      message:
        'Your order will be cancelled and the restaurant will stop preparing it. This cannot be undone.',
      confirmLabel: 'Cancel order',
      cancelLabel: 'Keep order',
    });
    if (!confirmed) return;

    setCancelError('');
    try {
      await cancelOrder(orderId);
      showToast({
        title: 'Order cancelled',
        description: `${formatOrderId(orderId)} has been cancelled.`,
      });
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
      <section
        className="max-w-4xl mx-auto my-16 px-4 text-center"
        aria-labelledby="orders-heading"
      >
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h1 id="orders-heading" className="text-2xl font-bold text-stone-800 mb-2">
          No Orders Yet
        </h1>
        <p className="text-stone-500 mb-6">Looks like you haven't placed any orders yet.</p>
        <a
          href="/restaurants"
          className="rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-orange-700"
        >
          Explore Restaurants
        </a>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8" aria-labelledby="orders-heading">
      <h1 id="orders-heading" className="text-3xl font-extrabold text-stone-900 mb-8">
        Your Orders
      </h1>

      {cancelError && (
        <p
          role="alert"
          className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl"
        >
          {cancelError}
        </p>
      )}

      <ol className="space-y-6">
        {orders.map((order) => {
          const statusStyle = getStatusBadge(order.status);
          const StatusIcon = statusStyle.icon;

          return (
            <li key={order.id}>
              <article className="overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm">
                {/* Order Card Header */}
                <div className="p-4 sm:p-6 bg-stone-50/50 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-extrabold text-stone-900">
                        {formatOrderId(order.id)}
                      </span>
                      <span className="text-stone-400 text-sm">•</span>
                      <span className="text-xs text-stone-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-stone-700">
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
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Items Breakdown */}
                <ul className="p-4 sm:p-6 divide-y divide-stone-100">
                  {order.items.map((item, index) => (
                    <li
                      key={`${item.foodItemId}-${index}`}
                      className="py-2.5 flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-700 font-bold text-xs px-2 py-0.5 rounded">
                          {item.quantity}x
                        </span>
                        <span className="text-stone-800 font-medium">{item.name}</span>
                      </div>
                      <span className="font-semibold text-stone-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Order Card Footer */}
                <div className="px-4 sm:px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-between items-center text-sm">
                  <span className="font-semibold text-stone-600">Total Amount</span>
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
