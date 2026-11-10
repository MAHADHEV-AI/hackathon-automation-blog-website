'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  Store,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MapPin,
  Clock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    updateVariant,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryType,
    setDeliveryType,
  } = useCart();

  const { settings } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    setCouponMsg(res);
    if (res.success) setCouponCode('');
  };

  const amountToFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - subtotal);
  const freePercent = Math.min(100, Math.round((subtotal / settings.freeDeliveryThreshold) * 100));

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">Shopping Cart</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-gray-900 tracking-tight">
              Your Shopping Cart
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Review your fresh cuts, customize portions, and choose delivery
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-xs max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Your cart is currently empty</h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Looks like you haven't added any fresh meat, seafood, or eggs yet. Explore our daily cuts!
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-extrabold rounded-xl shadow-md transition-all"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {/* Delivery Selector Bar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <span>Choose Fulfillment Method:</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setDeliveryType('home_delivery')}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      deliveryType === 'home_delivery'
                        ? 'bg-brand-black text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-brand-red" />
                    <span>Home Delivery</span>
                  </button>
                  <button
                    onClick={() => setDeliveryType('shop_pickup')}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      deliveryType === 'shop_pickup'
                        ? 'bg-brand-black text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Shop Pickup (Free)</span>
                  </button>
                </div>
              </div>

              {/* Free Delivery Bar for Home Delivery */}
              {deliveryType === 'home_delivery' && (
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/70 text-xs text-amber-900">
                  {amountToFreeDelivery > 0 ? (
                    <div>
                      <div className="flex items-center justify-between font-medium mb-1.5">
                        <span>
                          Add <strong className="font-extrabold text-brand-red">₹{amountToFreeDelivery}</strong> more to get{' '}
                          <strong>FREE Express Delivery</strong> in Coimbatore!
                        </span>
                        <span className="font-bold">{freePercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-red rounded-full transition-all duration-300"
                          style={{ width: `${freePercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Congratulations! You qualify for FREE Delivery across Coimbatore!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs divide-y divide-gray-100 overflow-hidden">
                {items.map((item) => {
                  const currentPrice =
                    item.selectedVariant.discountPrice ?? item.selectedVariant.price;

                  return (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-brand-red tracking-wider">
                            {item.product.category.replace('-', ' & ')}
                          </span>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-extrabold text-sm sm:text-base text-gray-900 hover:text-brand-red block"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.tamilName && (
                            <p className="text-[11px] text-gray-400">
                              {item.product.tamilName}
                            </p>
                          )}

                          {/* Weight selector */}
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[11px] text-gray-400 font-semibold">Portion:</span>
                            <select
                              value={item.selectedVariant.id}
                              onChange={(e) => {
                                const v = item.product.variants.find(
                                  (variant) => variant.id === e.target.value
                                );
                                if (v) updateVariant(item.id, v);
                              }}
                              className="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red cursor-pointer"
                            >
                              {item.product.variants.map((v) => (
                                <option key={v.id} value={v.id}>
                                  {v.weightLabel} — ₹{v.discountPrice ?? v.price}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-brand-red transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-brand-red transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[70px]">
                          <span className="font-display font-black text-base text-gray-900 block">
                            ₹{currentPrice * item.quantity}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            ₹{currentPrice} each
                          </span>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          aria-label="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-5">
                <h3 className="font-display font-black text-lg text-gray-900 pb-3 border-b border-gray-100">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Have a Coupon Code?
                  </label>
                  {appliedCoupon ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-900">
                          {appliedCoupon.code} (-₹{discountAmount})
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponMsg(null);
                        }}
                        placeholder="Code (e.g. FRESH50)"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-brand-red"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-black hover:bg-brand-charcoal text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMsg && !appliedCoupon && (
                    <p
                      className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                        couponMsg.success ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {couponMsg.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{couponMsg.message}</span>
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-2.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>
                      Delivery Charges{' '}
                      {deliveryType === 'shop_pickup' ? '(Pickup)' : '(Coimbatore)'}
                    </span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-emerald-600 font-bold uppercase text-[11px]">
                          FREE
                        </strong>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100">
                    <span>Final Total</span>
                    <span className="text-xl text-brand-red">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-4 bg-brand-red hover:bg-brand-redDark text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-red/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Estimated Delivery Note */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-600 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {deliveryType === 'home_delivery'
                        ? 'Estimated Delivery Time:'
                        : 'Store Pickup Timing:'}
                    </span>
                    <span>
                      {deliveryType === 'home_delivery'
                        ? '45-60 mins express dispatch inside Coimbatore.'
                        : 'Ready in 15-20 mins at Cross Cut Road counter.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

