import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  ClipboardList,
  Wallet,
  LayoutGrid,
  Plus,
  Store,
  UtensilsCrossed,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminApi, adminKeys } from '../../services/adminService';
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STYLES,
  formatOrderId,
  isFinalStatus,
} from '../../types/order';
import type { OrderStatus } from '../../types/order';

const STATUS_BAR_COLORS: Record<OrderStatus, string> = {
  PLACED: 'bg-blue-500',
  PREPARING: 'bg-amber-500',
  OUT_FOR_DELIVERY: 'bg-purple-500',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-400',
};

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const timeAgo = (iso: string) => {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (Number.isNaN(minutes)) return '';
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
};

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`block animate-pulse rounded-md bg-gray-200/80 ${className}`} />
);

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const restaurants = useQuery({
    queryKey: adminKeys.restaurantOptions,
    queryFn: adminApi.fetchRestaurantOptions,
  });
  const categories = useQuery({
    queryKey: adminKeys.categoryOptions,
    queryFn: adminApi.fetchCategoryOptions,
  });
  const foods = useQuery({ queryKey: adminKeys.foodOptions, queryFn: adminApi.fetchFoodOptions });
  const orders = useQuery({ queryKey: adminKeys.orders, queryFn: adminApi.fetchOrders });

  const allOrders = orders.data ?? [];
  const activeOrders = allOrders.filter((order) => !isFinalStatus(order.status));
  const revenue = allOrders
    .filter((order) => order.status === 'DELIVERED')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const cards = [
    {
      to: '/admin/restaurants',
      label: 'Restaurants',
      icon: Store,
      tone: 'bg-orange-50 text-orange-600 ring-orange-100',
      surface: 'border-orange-200/70 bg-orange-50/70',
      loading: restaurants.isLoading,
      value: restaurants.data?.length,
      hint: `${restaurants.data?.filter((r) => r.isOpen !== false).length ?? 0} open now`,
    },
    {
      to: '/admin/categories',
      label: 'Categories',
      icon: LayoutGrid,
      tone: 'bg-sky-50 text-sky-600 ring-sky-100',
      surface: 'border-sky-200/70 bg-sky-50/70',
      loading: categories.isLoading,
      value: categories.data?.length,
      hint: 'Menu groupings',
    },
    {
      to: '/admin/foods',
      label: 'Food Items',
      icon: UtensilsCrossed,
      tone: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
      surface: 'border-emerald-200/70 bg-emerald-50/70',
      loading: foods.isLoading,
      value: foods.data?.length,
      hint: `${foods.data?.filter((f) => f.isAvailable === false).length ?? 0} unavailable`,
    },
    {
      to: '/admin/orders',
      label: 'Active Orders',
      icon: ClipboardList,
      tone: 'bg-violet-50 text-violet-600 ring-violet-100',
      surface: 'border-violet-200/70 bg-violet-50/70',
      loading: orders.isLoading,
      value: orders.data ? activeOrders.length : undefined,
      hint: `${allOrders.length} total orders`,
    },
  ];

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-[calc(100dvh-5rem)] bg-gradient-to-br from-orange-50/70 via-slate-50 to-sky-50/60">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Page header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">{today}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {greeting()}, {user?.name ?? 'Admin'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here&apos;s what&apos;s happening across Foodie today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
            >
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              Manage orders
            </Link>
            <Link
              to="/admin/restaurants"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition hover:bg-orange-600"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add restaurant
            </Link>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ to, label, icon: Icon, tone, surface, loading, value, hint }) => (
            <Link
              key={to}
              to={to}
              className={`group relative rounded-2xl border ${surface} p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{label}</p>
                  {loading ? (
                    <Skeleton className="mt-2 h-9 w-16" />
                  ) : (
                    <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900 tabular-nums">
                      {value ?? '—'}
                    </p>
                  )}
                </div>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${tone}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
                <span className="text-gray-500">{hint}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-gray-400 transition group-hover:text-orange-600">
                  View
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order status breakdown */}
          <div className="rounded-2xl border border-gray-200/70 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-semibold text-gray-900">Orders by status</h2>
              <p className="text-xs text-gray-500">Distribution across all orders</p>
            </div>

            <ul className="space-y-4 p-5">
              {ORDER_STATUSES.map((status) => {
                const count = allOrders.filter((order) => order.status === status).length;
                const percent = allOrders.length ? (count / allOrders.length) * 100 : 0;
                return (
                  <li key={status}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <span
                          className={`h-2 w-2 rounded-full ${STATUS_BAR_COLORS[status]}`}
                          aria-hidden="true"
                        />
                        {ORDER_STATUS_LABELS[status]}
                      </span>
                      <span className="font-semibold text-gray-900 tabular-nums">{count}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${STATUS_BAR_COLORS[status]}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between rounded-b-2xl border-t border-gray-100 bg-gray-50/70 px-5 py-4">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Wallet className="h-4 w-4 text-green-600" aria-hidden="true" />
                Delivered revenue
              </span>
              <span className="font-bold text-gray-900 tabular-nums">${revenue.toFixed(2)}</span>
            </div>
          </div>

          {/* Active orders */}
          <div className="flex flex-col rounded-2xl border border-gray-200/70 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">Orders needing attention</h2>
                <p className="text-xs text-gray-500">Placed, preparing or out for delivery</p>
              </div>
              <Link
                to="/admin/orders"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                View all
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {orders.isLoading ? (
              <ul className="divide-y divide-gray-100">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </li>
                ))}
              </ul>
            ) : activeOrders.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-5 py-12 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-100">
                  <CircleCheck className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-3 font-semibold text-gray-900">You&apos;re all caught up</p>
                <p className="mt-1 text-sm text-gray-500">No active orders right now.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {activeOrders.slice(0, 5).map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-gray-50/70"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-600">
                        {order.customerName.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatOrderId(order.id)}
                          <span className="font-normal text-gray-500"> · {order.customerName}</span>
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {order.restaurantName} · {order.items.length}{' '}
                          {order.items.length === 1 ? 'item' : 'items'} · {timeAgo(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-900 tabular-nums">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ORDER_STATUS_STYLES[order.status]}`}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
