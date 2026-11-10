'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Calendar,
  Clock,
  ArrowRight,
  Truck,
  Store,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { OrderStatus } from '@/lib/types';

export default function MyOrdersPage() {
  const { orders } = useStore();
  const { user } = useAuth();

  const getStatusBadge = (status: OrderStatus) => {
    const config: Record<OrderStatus, { text: string; bg: string; color: string }> = {
      placed: { text: 'Order Placed', bg: 'bg-blue-50', color: 'text-blue-700' },
      confirmed: { text: 'Confirmed', bg: 'bg-indigo-50', color: 'text-indigo-700' },
      preparing: { text: 'Preparing Cuts', bg: 'bg-amber-50', color: 'text-amber-800' },
      ready_or_out: { text: 'Out / Ready', bg: 'bg-purple-50', color: 'text-purple-700' },
      delivered: { text: 'Delivered', bg: 'bg-emerald-50', color: 'text-emerald-700' },
      cancelled: { text: 'Cancelled', bg: 'bg-red-50', color: 'text-red-700' },
    };
    const c = config[status] || config.placed;
    return (
      <span
        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${c.bg} ${c.color}`}
      >
        {c.text}
      </span>
    );
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">My Orders</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-gray-900 tracking-tight">
              My Order History
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Track live progress or reorder your favorite fresh meat cuts
            </p>
          </div>
          <Link
            href="/shop"
            className="px-4 py-2 bg-brand-red text-white text-xs font-bold rounded-xl hover:bg-brand-redDark transition-colors hidden sm:inline-block"
          >
            Order More Cuts →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-gray-900">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-500 mt-1">
              Start shopping to place your first fresh meat order in Coimbatore.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block px-6 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl"
            >
              Browse Meat & Seafood
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-100 hover:border-gray-200 shadow-2xs hover:shadow-md transition-all p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
                      <Package className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-gray-900">
                          {order.id}
                        </span>
                        {getStatusBadge(order.orderStatus)}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          {order.deliveryType === 'home_delivery'
                            ? 'Home Delivery'
                            : 'Shop Pickup'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-display font-black text-lg text-gray-900 block">
                      ₹{order.totalAmount}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">
                      {order.paymentMethod.toUpperCase()} (
                      {order.paymentStatus.toUpperCase()})
                    </span>
                  </div>
                </div>

                {/* Items preview snippet */}
                <div className="py-4 flex flex-wrap items-center gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700"
                    >
                      <span>{item.productName}</span>
                      <span className="text-[10px] text-gray-400">
                        ({item.weightLabel} × {item.quantity})
                      </span>
                    </span>
                  ))}
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Recipient: <strong>{order.customerName}</strong>
                  </span>

                  <Link
                    href={`/track/${order.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-red hover:text-brand-redDark transition-colors"
                  >
                    <span>Track Live Progress</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
