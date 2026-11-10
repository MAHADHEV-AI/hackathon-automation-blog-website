'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Store,
  MapPin,
  Phone,
  MessageCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { OrderStatus } from '@/lib/types';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { orders, settings } = useStore();

  const [order, setOrder] = useState(() => {
    return orders.find((o) => o.id.toLowerCase() === orderId?.toLowerCase());
  });

  useEffect(() => {
    const found = orders.find((o) => o.id.toLowerCase() === orderId?.toLowerCase());
    if (found) setOrder(found);
  }, [orders, orderId]);

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-gray-100 shadow-xs">
        <AlertCircle className="w-12 h-12 text-brand-red mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900">Order Not Found</h2>
        <p className="text-xs text-gray-500 mt-2">
          We could not find an order with ID: <strong>{orderId}</strong>.
        </p>
        <Link
          href="/orders"
          className="mt-6 inline-block px-6 py-2.5 bg-brand-black text-white text-xs font-bold rounded-xl"
        >
          View All My Orders
        </Link>
      </div>
    );
  }

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    {
      key: 'placed',
      label: 'Order Placed',
      desc: 'Order received & dispatched to butchery floor',
    },
    {
      key: 'confirmed',
      label: 'Order Confirmed',
      desc: 'Fresh cuts reserved & assigned to head butcher',
    },
    {
      key: 'preparing',
      label: 'Preparing Your Order',
      desc: 'Hygienically hand-trimmed & chill-pack sealed',
    },
    {
      key: 'ready_or_out',
      label:
        order.deliveryType === 'home_delivery'
          ? 'Out for Delivery'
          : 'Ready for Store Pickup',
      desc:
        order.deliveryType === 'home_delivery'
          ? 'On the road with temperature chill bag'
          : 'Ready at 142 Cross Cut Road counter',
    },
    {
      key: 'delivered',
      label: order.deliveryType === 'home_delivery' ? 'Delivered' : 'Collected',
      desc: 'Delivered fresh to your hands. Enjoy your meal!',
    },
  ];

  const statusHierarchy: Record<OrderStatus, number> = {
    placed: 1,
    confirmed: 2,
    preparing: 3,
    ready_or_out: 4,
    delivered: 5,
    cancelled: 0,
  };

  const currentStepNum = statusHierarchy[order.orderStatus] || 1;

  // Format pre-filled WhatsApp Order Notification
  const handleSendWhatsAppNotification = () => {
    const itemsSummary = order.items
      .map((i) => `• ${i.productName} (${i.weightLabel}) x${i.quantity} = ₹${i.totalPrice}`)
      .join('\n');

    const addressText =
      order.deliveryType === 'home_delivery'
        ? `*Delivery Address:* ${order.deliveryAddress?.houseNo}, ${order.deliveryAddress?.street}, ${order.deliveryAddress?.area}, Coimbatore - ${order.deliveryAddress?.pincode}`
        : `*Pickup:* KOMBAN CUTS Store (Cross Cut Rd, Coimbatore)`;

    const text = `*KOMBAN CUTS — Order Update Notification* 🥩\n\n*Order ID:* ${order.id}\n*Customer:* ${order.customerName} (${order.customerPhone})\n*Status:* ${order.orderStatus.toUpperCase()}\n\n*Items Ordered:*\n${itemsSummary}\n\n*Total Amount:* ₹${order.totalAmount} (${order.paymentMethod.toUpperCase()} - ${order.paymentStatus.toUpperCase()})\n\n${addressText}\n\nThank you for choosing Komban Cuts!`;

    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/orders" className="hover:text-brand-red">
            My Orders
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">Live Order Tracking</span>
        </div>

        {/* Order Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-extrabold text-brand-red bg-red-50 border border-brand-red/20 px-3 py-1 rounded-lg">
                  {order.id}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <h1 className="font-display font-black text-2xl text-gray-900">
                {order.orderStatus === 'cancelled'
                  ? 'Order Cancelled'
                  : order.orderStatus === 'delivered'
                  ? 'Order Delivered Successfully'
                  : 'Your Order Is on Track!'}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Customer: <strong>{order.customerName}</strong> ({order.customerPhone})
              </p>
            </div>

            {/* WhatsApp notification CTA */}
            <button
              onClick={handleSendWhatsAppNotification}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Summary to WhatsApp</span>
            </button>
          </div>

          {/* Visual Tracking Timeline */}
          {order.orderStatus === 'cancelled' ? (
            <div className="py-8 text-center text-red-600 font-bold text-sm">
              This order has been cancelled. Please contact customer support for assistance.
            </div>
          ) : (
            <div className="pt-8 pb-4">
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-gray-200 -z-0">
                  <div
                    className="h-full bg-brand-red transition-all duration-500"
                    style={{
                      width: `${((currentStepNum - 1) / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                  {steps.map((st, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum <= currentStepNum;
                    const isCurrent = stepNum === currentStepNum;

                    return (
                      <div
                        key={st.key}
                        className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                            isDone
                              ? 'bg-brand-red text-white'
                              : 'bg-white border-2 border-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-red-100 scale-110' : ''}`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                        </div>

                        <div>
                          <h4
                            className={`text-xs font-bold ${
                              isDone ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {st.label}
                          </h4>
                          <p className="text-[10px] text-gray-500 max-w-[140px] hidden sm:block mt-0.5">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Two Column Layout: Order Details + Delivery/Pickup Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Items & Financial Breakdown */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-black text-base text-gray-900 pb-3 border-b border-gray-100">
              Purchased Items ({order.items.length})
            </h3>

            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">
                        {item.productName}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {item.weightLabel} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-gray-900">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₹{order.subtotal}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({order.couponCode})</span>
                  <span>-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {order.deliveryFee === 0 ? (
                    <strong className="text-emerald-600 font-bold uppercase text-[11px]">
                      FREE
                    </strong>
                  ) : (
                    `₹${order.deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-brand-red">₹{order.totalAmount}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 bg-gray-50 rounded-xl text-xs flex items-center justify-between">
                <span className="text-gray-500">Payment Status:</span>
                <span
                  className={`font-black uppercase text-[11px] px-2.5 py-0.5 rounded-full ${
                    order.paymentStatus === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.paymentStatus === 'paid' ? 'Paid Online' : 'Pay on Delivery'}
                </span>
              </div>
            </div>
          </div>

          {/* Fulfillment Info & Support */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-4">
              <h3 className="font-display font-black text-base text-gray-900 pb-3 border-b border-gray-100">
                Fulfillment Information
              </h3>

              {order.deliveryType === 'home_delivery' ? (
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 block">
                        Delivery Address:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {order.deliveryAddress?.houseNo}, {order.deliveryAddress?.street},{' '}
                        {order.deliveryAddress?.area}, Coimbatore -{' '}
                        {order.deliveryAddress?.pincode}
                      </p>
                    </div>
                  </div>

                  {order.deliverySlot && (
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block">
                          Delivery Slot:
                        </span>
                        <p className="text-gray-600">{order.deliverySlot}</p>
                      </div>
                    </div>
                  )}

                  {order.notes && (
                    <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-600">
                      <strong>Customer note:</strong> {order.notes}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Store className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 block">
                        Shop Pickup Location:
                      </span>
                      <p className="text-gray-600 mt-0.5">{settings.address}</p>
                    </div>
                  </div>

                  {order.pickupTime && (
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block">
                          Scheduled Pickup Time:
                        </span>
                        <p className="text-gray-600">{order.pickupTime}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Need Assistance Card */}
            <div className="bg-brand-black text-white rounded-3xl p-6 space-y-3">
              <h4 className="font-bold text-sm">Need Help With Your Order?</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Our Coimbatore butchery team is available directly on WhatsApp and phone for immediate assistance.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2.5 bg-brand-charcoal hover:bg-gray-800 text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span>Call Store</span>
                </a>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Komban Cuts, I have a query about my order ${order.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
