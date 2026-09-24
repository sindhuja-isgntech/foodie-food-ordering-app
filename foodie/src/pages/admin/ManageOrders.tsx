import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MapPin, Store, User } from 'lucide-react';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { AdminPageHeader, ErrorBanner } from '../../components/admin/AdminUi';
import { adminApi, adminKeys } from '../../services/adminService';
import { getErrorMessage } from '../../services/orderService';
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  formatOrderId,
  isFinalStatus,
} from '../../types/order';
import type { Order, OrderStatus } from '../../types/order';

const STATUS_STYLES: Record<OrderStatus, string> = {
  PLACED: 'bg-blue-50 text-blue-700 border-blue-200',
  PREPARING: 'bg-amber-50 text-amber-700 border-amber-200',
  OUT_FOR_DELIVERY: 'bg-purple-50 text-purple-700 border-purple-200',
  DELIVERED: 'bg-green-50 text-green-700 border-green-200',
  CANCELLED: 'bg-red-50 text-red-700 border-red-200',
};

type StatusFilter = OrderStatus | 'ALL' | 'ACTIVE';

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'ALL', label: 'All' },
  ...ORDER_STATUSES.map((status) => ({ value: status, label: ORDER_STATUS_LABELS[status] })),
];

const matchesFilter = (order: Order, filter: StatusFilter) =>
  filter === 'ALL' ||
  (filter === 'ACTIVE' ? !isFinalStatus(order.status) : order.status === filter);

export const ManageOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<StatusFilter>('ACTIVE');
  const [actionError, setActionError] = useState('');

  const { data: orders = [], isLoading, error, refetch } = useQuery({
    queryKey: adminKeys.orders,
    queryFn: adminApi.fetchOrders,
    // Keep the board fresh as customers place orders
    refetchInterval: 30_000,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      adminApi.updateOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminKeys.orders }),
    onError: (err) => setActionError(getErrorMessage(err, 'Could not update order status.')),
  });

  const handleStatusChange = (order: Order, status: OrderStatus) => {
    if (status === order.status) return;
    if (
      status === 'CANCELLED' &&
      !window.confirm(`Cancel ${formatOrderId(order.id)}? This cannot be undone.`)
    ) {
      return;
    }
    setActionError('');
    statusMutation.mutate({ id: order.id, status });
  };

  const visibleOrders = orders.filter((order) => matchesFilter(order, filter));

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <AdminPageHeader
        title="Orders"
        description="Track incoming orders and move them through preparation and delivery."
      />

      <div role="group" aria-label="Filter orders by status" className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map(({ value, label }) => {
          const count = orders.filter((order) => matchesFilter(order, value)).length;
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                active
                  ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {label} <span className={active ? 'text-orange-100' : 'text-gray-400'}>{count}</span>
            </button>
          );
        })}
      </div>

      {actionError && <ErrorBanner message={actionError} />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={getErrorMessage(error, error.message)} onRetry={() => refetch()} />
      ) : visibleOrders.length === 0 ? (
        <p className="py-16 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
          No orders to show.
        </p>
      ) : (
        <ol className="space-y-4">
          {visibleOrders.map((order) => {
            const final = isFinalStatus(order.status);
            const isUpdating =
              statusMutation.isPending && statusMutation.variables?.id === order.id;
            return (
              <li
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-gray-900">
                        {formatOrderId(order.id)}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${STATUS_STYLES[order.status]}`}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm text-gray-700">
                      <User className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="font-semibold">{order.customerName}</span>
                      <span className="text-gray-400 break-all">{order.customerEmail}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-sm text-gray-700">
                      <Store className="w-4 h-4 text-orange-500 shrink-0" />
                      {order.restaurantName}
                    </p>
                    {order.deliveryAddress && (
                      <p className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        {order.deliveryAddress}
                      </p>
                    )}
                  </div>

                  <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">
                    Update status
                    <select
                      value={order.status}
                      disabled={final || isUpdating}
                      onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {ORDER_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                    {final && <span className="font-normal text-gray-400">Order is closed</span>}
                  </label>
                </div>

                <ul className="px-4 sm:px-5 py-3 divide-y divide-gray-100 text-sm">
                  {order.items.map((item, index) => (
                    <li key={`${item.foodItemId}-${index}`} className="py-2 flex justify-between gap-4">
                      <span className="text-gray-800">
                        <span className="font-bold text-orange-600">{item.quantity}x</span>{' '}
                        {item.name}
                      </span>
                      <span className="font-semibold text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between text-sm">
                  <span className="font-semibold text-gray-600">Total</span>
                  <span className="font-black text-orange-600">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};

export default ManageOrders;
