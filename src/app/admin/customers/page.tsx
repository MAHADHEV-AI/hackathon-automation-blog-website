'use client';

import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, ShoppingBag, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminCustomersPage() {
  const { orders } = useStore();
  const [search, setSearch] = useState('');

  // Group orders by customer
  const customerMap = new Map<
    string,
    {
      name: string;
      phone: string;
      email?: string;
      orderCount: number;
      totalSpent: number;
      lastOrderDate: string;
      recentAddress?: string;
    }
  >();

  orders.forEach((o) => {
    const key = o.customerPhone || o.customerName;
    const existing = customerMap.get(key);
    const addr = o.deliveryAddress
      ? `${o.deliveryAddress.area}, Coimbatore`
      : 'Store Pickup';

    if (existing) {
      existing.orderCount += 1;
      existing.totalSpent += o.totalAmount;
      if (new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = o.createdAt;
        existing.recentAddress = addr;
      }
    } else {
      customerMap.set(key, {
        name: o.customerName,
        phone: o.customerPhone,
        email: o.customerEmail,
        orderCount: 1,
        totalSpent: o.totalAmount,
        lastOrderDate: o.createdAt,
        recentAddress: addr,
      });
    }
  });

  const customers = Array.from(customerMap.values()).filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Customer Directory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Registered buyers, order history counts, and total spend across Coimbatore
          </p>
        </div>

        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-brand-black text-brand-gold self-start sm:self-auto">
          {customers.length} Active Buyers
        </span>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-2xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or phone..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:bg-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-black text-white flex items-center justify-center font-extrabold text-base">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{c.name}</h3>
                  <span className="text-[11px] text-gray-400">
                    Last active:{' '}
                    {new Date(c.lastOrderDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span className="font-semibold text-gray-900">{c.phone}</span>
                </div>
                {c.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-red" />
                    <span>{c.email}</span>
                  </div>
                )}
                {c.recentAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    <span className="truncate">{c.recentAddress}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold">
                  Orders Placed
                </span>
                <span className="font-black text-gray-900">
                  {c.orderCount} {c.orderCount === 1 ? 'order' : 'orders'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block uppercase font-bold">
                  Total Spent
                </span>
                <span className="font-display font-black text-brand-red text-sm">
                  ₹{c.totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

