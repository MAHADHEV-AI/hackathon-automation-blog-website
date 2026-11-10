'use client';

import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  IndianRupee,
  ShoppingBag,
  Award,
  Truck,
  Store,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminReportsPage() {
  const { orders, products } = useStore();

  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Group by product sales
  const productSalesMap = new Map<string, { name: string; qty: number; revenue: number }>();
  orders.forEach((o) => {
    o.items.forEach((item) => {
      const existing = productSalesMap.get(item.productName);
      if (existing) {
        existing.qty += item.quantity;
        existing.revenue += item.totalPrice;
      } else {
        productSalesMap.set(item.productName, {
          name: item.productName,
          qty: item.quantity,
          revenue: item.totalPrice,
        });
      }
    });
  });

  const bestSellingProducts = Array.from(productSalesMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);

  // Fulfillment breakdown
  const homeDeliveryOrders = orders.filter((o) => o.deliveryType === 'home_delivery');
  const shopPickupOrders = orders.filter((o) => o.deliveryType === 'shop_pickup');

  // Daily simulated data for visual bar chart
  const daysData = [
    { day: 'Mon', revenue: 4200 },
    { day: 'Tue', revenue: 3800 },
    { day: 'Wed', revenue: 5100 },
    { day: 'Thu', revenue: 4600 },
    { day: 'Fri', revenue: 6900 },
    { day: 'Sat', revenue: 11500 },
    { day: 'Sun', revenue: 15800 },
  ];
  const maxDayRevenue = Math.max(...daysData.map((d) => d.revenue));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
          Sales & Revenue Analytics
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Detailed metrics on meat sales, customer demand, and weekly butchery volume in Coimbatore
        </p>
      </div>

      {/* Top 3 High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Total Revenue
          </span>
          <span className="font-display font-black text-3xl text-gray-900 block">
            ₹{totalSales.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            +18.4% compared to last week
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Weekly Meat Volume (Est.)
          </span>
          <span className="font-display font-black text-3xl text-brand-red block">
            ₹51,900
          </span>
          <span className="text-[11px] text-gray-500 mt-1 block">
            Peak volume on Saturday & Sunday
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Average Order Value (AOV)
          </span>
          <span className="font-display font-black text-3xl text-gray-900 block">
            ₹{orders.length > 0 ? Math.round(totalSales / orders.length) : 0}
          </span>
          <span className="text-[11px] text-gray-500 mt-1 block">
            Based on {orders.length} orders
          </span>
        </div>
      </div>

      {/* Weekly Revenue Visual Bar Chart */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-red" />
              <span>Weekly Sales Trend (Coimbatore)</span>
            </h2>
            <p className="text-xs text-gray-400">
              Sunday and weekend biryani demand drives significant surges
            </p>
          </div>
          <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Past 7 Days
          </span>
        </div>

        <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2 sm:px-6">
          {daysData.map((d) => {
            const heightPercent = Math.round((d.revenue / maxDayRevenue) * 100);
            const isWeekend = d.day === 'Sat' || d.day === 'Sun';

            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                <span className="text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{d.revenue}
                </span>
                <div
                  className={`w-full rounded-2xl transition-all duration-300 group-hover:scale-105 ${
                    isWeekend ? 'bg-brand-red' : 'bg-brand-black'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs font-bold text-gray-700 mt-1">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: Best-Selling Cuts + Fulfillment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Best-Sellers */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-gold" />
              <span>Best-Selling Products by Revenue</span>
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {bestSellingProducts.map((p, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-800 font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">{p.name}</span>
                    <span className="text-[11px] text-gray-400">{p.qty} packs ordered</span>
                  </div>
                </div>
                <span className="font-display font-black text-sm text-brand-red">
                  ₹{p.revenue.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fulfillment Distribution */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 space-y-4">
          <h3 className="font-bold text-base text-gray-900 pb-3 border-b border-gray-100">
            Fulfillment Breakdown
          </h3>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-brand-red flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Home Delivery</h4>
                  <p className="text-[11px] text-gray-400">Coimbatore municipal areas</p>
                </div>
              </div>
              <span className="font-display font-black text-base text-gray-900">
                {homeDeliveryOrders.length} orders
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Shop Pickup</h4>
                  <p className="text-[11px] text-gray-400">Cross Cut Road counter</p>
                </div>
              </div>
              <span className="font-display font-black text-base text-gray-900">
                {shopPickupOrders.length} orders
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

