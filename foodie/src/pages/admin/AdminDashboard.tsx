import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ClipboardList, LayoutGrid, Store, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminApi, adminKeys } from '../../services/adminService';
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  formatOrderId,
  isFinalStatus,
} from '../../types/order';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const restaurants = useQuery({
    queryKey: adminKeys.restaurants,
    queryFn: adminApi.fetchRestaurants,
  });
  const categories = useQuery({ queryKey: adminKeys.categories, queryFn: adminApi.fetchCategories });
  const foods = useQuery({ queryKey: adminKeys.foods, queryFn: adminApi.fetchFoods });
  const orders = useQuery({ queryKey: adminKeys.orders, queryFn: adminApi.fetchOrders });

  const allOrders = orders.data ?? [];
  const activeOrders = allOrders.filter((order) => !isFinalStatus(order.status));

  const cards = [
    {
      to: '/admin/restaurants',
      label: 'Restaurants',
      icon: Store,
      value: restaurants.data?.length,
      hint: `${restaurants.data?.filter((r) => r.isOpen !== false).length ?? 0} open`,
    },
    {
      to: '/admin/categories',
      label: 'Categories',
      icon: LayoutGrid,
      value: categories.data?.length,
      hint: 'Menu groupings',
    },
    {
      to: '/admin/foods',
      label: 'Food Items',
      icon: UtensilsCrossed,
      value: foods.data?.length,
      hint: `${foods.data?.filter((f) => f.isAvailable === false).length ?? 0} unavailable`,
    },
    {
      to: '/admin/orders',
      label: 'Active Orders',
      icon: ClipboardList,
      value: orders.data ? activeOrders.length : undefined,
      hint: `${allOrders.length} total`,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        Welcome back, {user?.name ?? 'Admin'}
      </h1>
      <p className="text-sm text-gray-500 mt-1 mb-8">
        Manage restaurants, categories, food items and order status.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ to, label, icon: Icon, value, hint }) => (
          <Link
            key={to}
            to={to}
            className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition" />
            </div>
            <p className="text-3xl font-black text-gray-900 tabular-nums">{value ?? '—'}</p>
            <p className="font-bold text-gray-700">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Orders by status</h2>
          <ul className="space-y-2.5 text-sm">
            {ORDER_STATUSES.map((status) => (
              <li key={status} className="flex justify-between">
                <span className="text-gray-600">{ORDER_STATUS_LABELS[status]}</span>
                <span className="font-bold text-gray-900 tabular-nums">
                  {allOrders.filter((order) => order.status === status).length}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Orders needing attention</h2>
            <Link to="/admin/orders" className="text-sm font-semibold text-orange-600 hover:underline">
              View all
            </Link>
          </div>
          {activeOrders.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">
              {orders.isLoading ? 'Loading orders...' : 'No active orders right now.'}
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 text-sm">
              {activeOrders.slice(0, 5).map((order) => (
                <li key={order.id} className="py-2.5 flex flex-wrap justify-between gap-2">
                  <span>
                    <span className="font-bold text-gray-900">{formatOrderId(order.id)}</span>{' '}
                    <span className="text-gray-500">· {order.customerName}</span>
                  </span>
                  <span className="font-semibold text-orange-600">
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
