'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateVariant,
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
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const amountToFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(
    100,
    Math.round((subtotal / settings.freeDeliveryThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 bg-brand-black text-white flex items-center justify-between border-b border-brand-charcoal">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">Your Meat Cart</h3>
                <p className="text-xs text-gray-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-brand-charcoal transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Mode Toggle (Home Delivery vs Shop Pickup) */}
          <div className="bg-gray-100 p-2 m-4 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setDeliveryType('home_delivery')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                deliveryType === 'home_delivery'
                  ? 'bg-white text-brand-black shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Truck className="w-4 h-4 text-brand-red" />
              <span>Home Delivery</span>
            </button>
            <button
              onClick={() => setDeliveryType('shop_pickup')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                deliveryType === 'shop_pickup'
                  ? 'bg-white text-brand-black shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Shop Pickup (₹0)</span>
            </button>
          </div>

          {/* Free Delivery Goal Bar */}
          {deliveryType === 'home_delivery' && items.length > 0 && (
            <div className="px-5 py-2.5 bg-amber-50/70 border-y border-amber-100 text-xs text-amber-900">
              {amountToFreeDelivery > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5 font-medium">
                    <span>
                      Add <strong className="font-extrabold text-brand-red">₹{amountToFreeDelivery}</strong> more for{' '}
                      <strong>FREE Delivery</strong>
                    </span>
                    <span className="font-bold">{freeDeliveryPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-red rounded-full transition-all duration-300"
                      style={{ width: `${freeDeliveryPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>You unlocked FREE Delivery across Coimbatore! 🎉</span>
                </div>
              )}
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="text-base font-bold text-gray-800">Your cart is empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Fresh antibiotic-free chicken, tender mutton, sea fish and country eggs are waiting for you!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl hover:bg-brand-redDark shadow-md transition-all"
                >
                  Explore Fresh Cuts
                </button>
              </div>
            ) : (
              items.map((item) => {
                const currentPrice =
                  item.selectedVariant.discountPrice ?? item.selectedVariant.price;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-gray-100 bg-white shadow-2xs hover:border-gray-200 transition-all flex gap-3"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-xs font-bold text-gray-900 hover:text-brand-red line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                            aria-label="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Weight selector dropdown */}
                        <div className="mt-1">
                          <select
                            value={item.selectedVariant.id}
                            onChange={(e) => {
                              const variant = item.product.variants.find(
                                (v) => v.id === e.target.value
                              );
                              if (variant) {
                                updateVariant(item.id, variant);
                              }
                            }}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-gray-700 focus:outline-none focus:border-brand-red cursor-pointer"
                          >
                            {item.product.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.weightLabel} - ₹{v.discountPrice ?? v.price}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-gray-600 hover:text-brand-red transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-gray-600 hover:text-brand-red transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-gray-900">
                            ₹{currentPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/70 space-y-3">
              {/* Coupon Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-800">
                        {appliedCoupon.code} applied (-₹{discountAmount})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-red-600 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponFeedback(null);
                      }}
                      placeholder="Coupon Code (e.g. FRESH50)"
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-brand-red"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-black hover:bg-brand-charcoal text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !appliedCoupon && (
                  <p
                    className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                      couponFeedback.success ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {couponFeedback.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{couponFeedback.message}</span>
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Delivery Fee{' '}
                    {deliveryType === 'shop_pickup' ? '(Pickup)' : '(Coimbatore)'}
                  </span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-600 uppercase font-bold text-[11px]">
                        FREE
                      </strong>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-red">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-redDark text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-red/20 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-semibold text-gray-500 hover:text-brand-red underline"
                >
                  View Full Cart Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

