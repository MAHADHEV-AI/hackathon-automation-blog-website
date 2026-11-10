'use client';

import React from 'react';
import Link from 'next/link';
import {
  IndianRupee,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Package,
  Store,
  Truck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { OrderStatus } from '@/lib/types';

export default function AdminOverviewPage() {
  const { orders, products, changeOrderStatus } = useStore();

  // Metrics Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Today's sales (last 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const todaySales = orders
    .filter((o) => o.createdAt >= oneDayAgo)
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.orderStatus === 'placed' || o.orderStatus === 'confirmed' || o.orderStatus === 'preparing'
  ).length;

  const completedOrders = orders.filter((o) => o.orderStatus === 'delivered').length;

  // Unique customer phones or names
  const uniqueCustomers = new Set(orders.map((o) => o.customerPhone)).size;

  // Low stock products (< 30 units)
  const lowStockProducts = products.filter((p) => p.stockQuantity < 30);

  const recentOrders = orders.slice(0, 5);

  const statCards = [
    {
      title: 'Total Sales Revenue',
      value: `₹${totalSales.toLocaleString('en-IN')}`,
      sub: 'All-time gross sales',
      icon: <IndianRupee className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 text-emerald-800',
    },
    {
      title: "Today's Sales",
      value: `₹${todaySales.toLocaleString('en-IN')}`,
      sub: 'Last 24 hours butchery sales',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 text-blue-800',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      sub: 'Orders placed on KOMBAN CUTS',
      icon: <ShoppingBag className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 text-purple-800',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      sub: 'Requires cutting or delivery dispatch',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 text-amber-800',
    },
    {
      title: 'Completed Orders',
      value: completedOrders,
      sub: 'Delivered / Collected successfully',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 text-emerald-800',
    },
    {
      title: 'Registered Customers',
      value: Math.max(uniqueCustomers, 4),
      sub: 'Active Coimbatore buyers',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 text-indigo-800',
    },
    {
      title: 'Low-Stock Products',
      value: lowStockProducts.length,
      sub: 'Requires butchery restock',
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      bg: 'bg-red-50 text-red-800',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Store Performance Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time butchery orders, sales revenue, and inventory status in Coimbatore
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Manage Products & Cuts
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-brand-black hover:bg-brand-charcoal text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Manage Orders ({orders.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500">{card.title}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.bg}`}>
                {card.icon}
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl text-gray-900 block">
                {card.value}
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5 block">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Orders + Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-base text-gray-900">
                Recent Orders in Coimbatore
              </h2>
              <p className="text-xs text-gray-400">
                Latest transactions awaiting processing or out for delivery
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-extrabold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold uppercase text-gray-400">
                  <th className="py-2.5">Order ID</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 font-mono font-bold text-gray-900">
                      <Link href={`/track/${o.id}`} className="hover:text-brand-red">
                        {o.id}
                      </Link>
                    </td>
                    <td className="py-3">
                      <span className="font-bold text-gray-800 block">
                        {o.customerName}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {o.customerPhone}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600">
                        {o.deliveryType === 'home_delivery' ? (
                          <>
                            <Truck className="w-3 h-3 text-brand-red" />
                            <span>Delivery</span>
                          </>
                        ) : (
                          <>
                            <Store className="w-3 h-3 text-emerald-600" />
                            <span>Pickup</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 font-extrabold text-gray-900">
                      ₹{o.totalAmount}
                    </td>
                    <td className="py-3">
                      <select
                        value={o.orderStatus}
                        onChange={(e) =>
                          changeOrderStatus(o.id, e.target.value as OrderStatus)
                        }
                        className="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold text-gray-800 focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready_or_out">Ready / Out</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/track/${o.id}`}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-brand-red hover:text-white rounded-lg text-[11px] font-bold transition-colors inline-block"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low-Stock Products Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Low Stock Alerts</span>
              </h2>
              <p className="text-xs text-gray-400">Products with stock under 30</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-brand-red hover:underline"
            >
              Restock
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">
                All fresh meat products have healthy inventory!
              </p>
            ) : (
              lowStockProducts.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 capitalize">
                      {p.category.replace('-', ' & ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black">
                      {p.stockQuantity} left
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

