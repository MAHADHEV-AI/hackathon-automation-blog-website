'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Store,
  CreditCard,
  Banknote,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { OrderStatus, PaymentMethod } from '@/lib/types';

export default function AdminOrdersPage() {
  const { orders, changeOrderStatus, settings } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customerName.toLowerCase().includes(q);
        const matchPhone = o.customerPhone.includes(q);
        if (!matchId && !matchName && !matchPhone) return false;
      }

      // Status
      if (statusFilter !== 'all' && o.orderStatus !== statusFilter) {
        return false;
      }

      // Payment
      if (paymentFilter !== 'all' && o.paymentMethod !== paymentFilter) {
        return false;
      }

      // Fulfillment
      if (fulfillmentFilter !== 'all' && o.deliveryType !== fulfillmentFilter) {
        return false;
      }

      return true;
    });
  }, [orders, search, statusFilter, paymentFilter, fulfillmentFilter]);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Order Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time butchery orders, live status updates, and Coimbatore dispatch control
          </p>
        </div>

        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-brand-black text-brand-gold self-start sm:self-auto">
          {orders.length} Total Orders Recorded
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID (KC-2026-...), customer name, or phone..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red"
          >
            <option value="all">All Statuses</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing Cuts</option>
            <option value="ready_or_out">Ready / Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red"
          >
            <option value="all">All Payment Methods</option>
            <option value="cod">Cash on Delivery / Pickup Pay</option>
            <option value="razorpay">Online (Razorpay)</option>
          </select>

          {/* Fulfillment Filter */}
          <select
            value={fulfillmentFilter}
            onChange={(e) => setFulfillmentFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red"
          >
            <option value="all">All Fulfillments</option>
            <option value="home_delivery">Home Delivery</option>
            <option value="shop_pickup">Shop Pickup</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
            <p className="text-sm font-bold text-gray-500">
              No orders found matching the selected filters.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-2xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Main Row */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: ID & Customer */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-brand-red flex-shrink-0">
                      {order.deliveryType === 'home_delivery' ? (
                        <Truck className="w-6 h-6" />
                      ) : (
                        <Store className="w-6 h-6" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-gray-900">
                          {order.id}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-sm text-gray-800 mt-0.5">
                        {order.customerName}
                      </h3>

                      <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-brand-red" />
                          <span>{order.customerPhone}</span>
                        </span>
                        <span>•</span>
                        <span>{order.items.length} items</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Total & Payment */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
                    <div>
                      <span className="font-display font-black text-xl text-gray-900 block">
                        ₹{order.totalAmount}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.paymentStatus === 'paid' ? 'Paid' : 'COD Pending'}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">
                          ({order.paymentMethod})
                        </span>
                      </div>
                    </div>

                    {/* Status Changer Dropdown */}
                    <div className="w-full sm:w-auto">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Order Status:
                      </label>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          changeOrderStatus(
                            order.id,
                            e.target.value as OrderStatus,
                            e.target.value === 'delivered' ? 'paid' : undefined
                          )
                        }
                        className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-extrabold text-gray-800 focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="placed">1. Placed</option>
                        <option value="confirmed">2. Confirmed</option>
                        <option value="preparing">3. Preparing Cuts</option>
                        <option value="ready_or_out">4. Ready / Out</option>
                        <option value="delivered">5. Delivered</option>
                        <option value="cancelled">6. Cancelled</option>
                      </select>
                    </div>

                    {/* Accordion toggle */}
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 self-end sm:self-auto"
                      aria-label="Toggle Order Details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-6 bg-gray-50/70 border-t border-gray-100 space-y-6 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Items Purchased */}
                      <div className="bg-white p-4 rounded-2xl border border-gray-200/70 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">
                          Items in Order ({order.items.length})
                        </h4>
                        <div className="divide-y divide-gray-100 text-xs">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="py-2 flex items-center justify-between"
                            >
                              <div>
                                <span className="font-bold text-gray-900 block">
                                  {item.productName}
                                </span>
                                <span className="text-[11px] text-gray-500">
                                  {item.weightLabel} × {item.quantity} (₹{item.unitPrice} each)
                                </span>
                              </div>
                              <span className="font-extrabold text-gray-900">
                                ₹{item.totalPrice}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-gray-100 text-xs space-y-1">
                          <div className="flex justify-between text-gray-500">
                            <span>Subtotal:</span>
                            <span>₹{order.subtotal}</span>
                          </div>
                          {order.discountAmount > 0 && (
                            <div className="flex justify-between text-emerald-600 font-semibold">
                              <span>Discount ({order.couponCode}):</span>
                              <span>-₹{order.discountAmount}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-gray-500">
                            <span>Delivery Fee:</span>
                            <span>₹{order.deliveryFee}</span>
                          </div>
                          <div className="flex justify-between font-black text-gray-900 pt-1 border-t border-gray-100">
                            <span>Final Total:</span>
                            <span className="text-brand-red">₹{order.totalAmount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address & Contact Actions */}
                      <div className="bg-white p-4 rounded-2xl border border-gray-200/70 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">
                          Fulfillment & Contact
                        </h4>

                        {order.deliveryType === 'home_delivery' ? (
                          <div className="text-xs text-gray-700 space-y-1.5">
                            <span className="font-bold block text-gray-900">
                              Delivery Location:
                            </span>
                            <p className="text-gray-600">
                              {order.deliveryAddress?.houseNo}, {order.deliveryAddress?.street},{' '}
                              {order.deliveryAddress?.area}, Coimbatore -{' '}
                              {order.deliveryAddress?.pincode}
                            </p>
                            {order.deliverySlot && (
                              <p className="text-gray-500">
                                <strong>Slot:</strong> {order.deliverySlot}
                              </p>
                            )}
                            {order.notes && (
                              <p className="p-2 bg-amber-50 rounded-lg text-amber-900 italic text-[11px]">
                                Note: {order.notes}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-700 space-y-1.5">
                            <span className="font-bold block text-gray-900">
                              Shop Pickup Selected:
                            </span>
                            <p className="text-gray-600">
                              Customer will collect at 142 Cross Cut Road counter.
                            </p>
                            {order.pickupTime && (
                              <p className="text-gray-500">
                                <strong>Pickup Time:</strong> {order.pickupTime}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                          <Link
                            href={`/track/${order.id}`}
                            target="_blank"
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <span>Open Customer Tracking</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>

                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${order.customerName}, your KOMBAN CUTS order ${order.id} is currently ${order.orderStatus}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Notify on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

