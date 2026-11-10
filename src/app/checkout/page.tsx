'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Store,
  CreditCard,
  Banknote,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Info,
  Phone,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { COIMBATORE_DELIVERY_ZONES } from '@/lib/data';
import { DeliveryAddress, PaymentMethod, Order } from '@/lib/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discountAmount,
    deliveryFee,
    totalAmount,
    appliedCoupon,
    clearCart,
    deliveryType,
    setDeliveryType,
  } = useCart();

  const { user, isLoggedIn, saveAddress } = useAuth();
  const { settings, placeOrder } = useStore();

  // Load Razorpay checkout script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [houseNo, setHouseNo] = useState(
    user?.savedAddresses?.[0]?.houseNo || ''
  );
  const [street, setStreet] = useState(user?.savedAddresses?.[0]?.street || '');
  const [area, setArea] = useState(
    user?.savedAddresses?.[0]?.area || COIMBATORE_DELIVERY_ZONES[0].areaName
  );
  const [city, setCity] = useState('Coimbatore');
  const [state, setState] = useState('Tamil Nadu');
  const [pincode, setPincode] = useState(
    user?.savedAddresses?.[0]?.pincode || '641012'
  );
  const [deliveryInstructions, setDeliveryInstructions] = useState(
    user?.savedAddresses?.[0]?.deliveryInstructions || ''
  );

  // Delivery & Pickup Slots
  const [deliverySlot, setDeliverySlot] = useState('Express (45-60 mins)');
  const [pickupTime, setPickupTime] = useState('In 20 minutes (Ready at counter)');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If cart is empty, redirect
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-gray-100 shadow-xs">
        <ShoppingBag className="w-12 h-12 text-brand-red mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-xs text-gray-500 mt-2">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block px-6 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleOrderSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Please provide your full name and phone number.');
      return;
    }

    if (deliveryType === 'home_delivery') {
      if (!houseNo.trim() || !street.trim() || !pincode.trim()) {
        setErrorMessage('Please fill in complete street address and pincode.');
        return;
      }
    }

    setIsProcessing(true);

    const addressData: DeliveryAddress = {
      fullName,
      phone,
      email,
      houseNo,
      street,
      area,
      city,
      state,
      pincode,
      deliveryInstructions,
    };

    // Save address to user profile if logged in
    if (isLoggedIn) {
      saveAddress(addressData);
    }

    const orderItems = items.map((i) => ({
      productId: i.productId,
      productName: i.product.name,
      productImage: i.product.imageUrl,
      weightLabel: i.selectedVariant.weightLabel,
      unitPrice: i.selectedVariant.discountPrice ?? i.selectedVariant.price,
      quantity: i.quantity,
      totalPrice:
        (i.selectedVariant.discountPrice ?? i.selectedVariant.price) * i.quantity,
    }));

    // Handle Online Payment (Razorpay)
    if (paymentMethod === 'razorpay') {
      try {
        // Step 1: Create Order on backend
        const res = await fetch('/api/checkout/razorpay-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            currency: 'INR',
            notes: {
              customer_name: fullName,
              phone,
              delivery_type: deliveryType,
            },
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.orderId) {
          throw new Error(data.error || 'Failed to initiate payment.');
        }

        // Check if Razorpay SDK loaded or demo mode fallback
        if (data.isDemo || typeof window.Razorpay === 'undefined') {
          // Process via secure demo verification
          const verifyRes = await fetch('/api/checkout/razorpay-verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: data.orderId,
              razorpay_payment_id: `pay_mock_${Date.now()}`,
              razorpay_signature: 'demo_sig',
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            finalizeOrder('paid', data.orderId, `pay_mock_${Date.now()}`, addressData, orderItems);
            return;
          }
        } else {
          // Open standard Razorpay modal
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_komban',
            amount: data.amount,
            currency: data.currency,
            name: settings.shopName,
            description: 'Fresh Meat Order Payment',
            order_id: data.orderId,
            prefill: {
              name: fullName,
              contact: phone,
              email: email || 'orders@kombancuts.com',
            },
            theme: {
              color: '#D62828',
            },
            handler: async function (response: any) {
              const verifyRes = await fetch('/api/checkout/razorpay-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyData.verified) {
                finalizeOrder(
                  'paid',
                  response.razorpay_order_id,
                  response.razorpay_payment_id,
                  addressData,
                  orderItems
                );
              } else {
                setErrorMessage('Payment verification failed on the server.');
                setIsProcessing(false);
              }
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false);
                setErrorMessage('Online payment cancelled by user.');
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
          return;
        }
      } catch (err: any) {
        console.error('Payment error:', err);
        setErrorMessage(err.message || 'Payment failed. Please try again.');
        setIsProcessing(false);
        return;
      }
    }

    // Cash on Delivery / Shop Pickup
    finalizeOrder('pending', undefined, undefined, addressData, orderItems);
  };

  const finalizeOrder = (
    paymentStatus: 'pending' | 'paid',
    razorpayOrderId?: string,
    razorpayPaymentId?: string,
    addressData?: DeliveryAddress,
    orderItems?: any[]
  ) => {
    const placed = placeOrder({
      customerName: fullName,
      customerPhone: phone,
      customerEmail: email,
      deliveryType,
      deliveryAddress: deliveryType === 'home_delivery' ? addressData : undefined,
      deliverySlot: deliveryType === 'home_delivery' ? deliverySlot : undefined,
      pickupTime: deliveryType === 'shop_pickup' ? pickupTime : undefined,
      items: orderItems || [],
      subtotal,
      discountAmount,
      couponCode: appliedCoupon?.code,
      deliveryFee,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus: 'placed',
      razorpayOrderId,
      razorpayPaymentId,
      notes: deliveryInstructions,
    });

    clearCart();
    setIsProcessing(false);
    router.push(`/track/${placed.id}`);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/cart" className="hover:text-brand-red">
            Cart
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">Checkout</span>
        </div>

        <h1 className="font-display font-black text-3xl text-gray-900 tracking-tight mb-8">
          Complete Your Order
        </h1>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleOrderSubmission}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Details & Delivery */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Fulfillment Mode Selection */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
                <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-black text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Select Delivery or Store Pickup</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Home Delivery */}
                  <label
                    onClick={() => setDeliveryType('home_delivery')}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryType === 'home_delivery'
                        ? 'border-brand-red bg-red-50/30 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100/70 text-brand-red flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={deliveryType === 'home_delivery'}
                        onChange={() => setDeliveryType('home_delivery')}
                        className="w-4 h-4 text-brand-red"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">
                        Home Delivery
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Delivered express to your doorstep across Coimbatore.
                      </p>
                      <span className="inline-block mt-2 text-[11px] font-extrabold text-brand-red">
                        {deliveryFee === 0 ? 'FREE Delivery' : `₹${deliveryFee} Delivery Fee`}
                      </span>
                    </div>
                  </label>

                  {/* Shop Pickup */}
                  <label
                    onClick={() => setDeliveryType('shop_pickup')}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryType === 'shop_pickup'
                        ? 'border-brand-red bg-red-50/30 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Store className="w-5 h-5" />
                      </div>
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={deliveryType === 'shop_pickup'}
                        onChange={() => setDeliveryType('shop_pickup')}
                        className="w-4 h-4 text-brand-red"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">
                        Shop Pickup
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Collect fresh at Cross Cut Road counter in Gandhipuram.
                      </p>
                      <span className="inline-block mt-2 text-[11px] font-extrabold text-emerald-600">
                        ₹0 Delivery Fee (Always Free)
                      </span>
                    </div>
                  </label>
                </div>

                {/* Pickup Address Information Card */}
                {deliveryType === 'shop_pickup' && (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-2">
                    <p className="font-bold text-gray-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-red" />
                      <span>KOMBAN CUTS Store Address:</span>
                    </p>
                    <p className="text-gray-600 pl-5">{settings.address}</p>
                    <div className="pl-5 pt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      <span className="font-semibold">{settings.openingHours}</span>
                    </div>

                    <div className="pt-2">
                      <label className="block font-bold text-gray-800 mb-1">
                        Select Pickup Time:
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand-red"
                      >
                        <option>In 20 minutes (Ready at counter)</option>
                        <option>In 45 minutes</option>
                        <option>Today: 01:00 PM – 02:00 PM</option>
                        <option>Today: 06:00 PM – 07:00 PM</option>
                        <option>Today: 07:30 PM – 09:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Customer Information */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
                <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-black text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Customer Contact Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 84895 42722"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address (Optional, for invoices)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arun@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery Address (Only for Home Delivery) */}
              {deliveryType === 'home_delivery' && (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-black text-white text-xs flex items-center justify-center font-bold">
                        3
                      </span>
                      <span>Coimbatore Delivery Address</span>
                    </h2>
                    <span className="text-[11px] font-bold text-brand-red flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Covai Express Zone</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        House / Flat / Building No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={houseNo}
                        onChange={(e) => setHouseNo(e.target.value)}
                        placeholder="e.g. 14/B, Gokulam Apts"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Street Name / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. 5th Cross, Bharathi Park"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Area / Locality in Coimbatore *
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red focus:bg-white cursor-pointer"
                      >
                        {COIMBATORE_DELIVERY_ZONES.map((zone) => (
                          <option key={zone.id} value={zone.areaName}>
                            {zone.areaName} ({zone.estimatedMinutes} mins)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="641012"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={city}
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={state}
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-600"
                      />
                    </div>

                    {/* Delivery Slot Selector */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Choose Delivery Slot
                      </label>
                      <select
                        value={deliverySlot}
                        onChange={(e) => setDeliverySlot(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red"
                      >
                        <option>Express (45-60 mins) - Immediate Dispatch</option>
                        <option>Morning Slot: 07:00 AM – 09:30 AM</option>
                        <option>Afternoon Slot: 11:30 AM – 01:30 PM</option>
                        <option>Evening Slot: 04:30 PM – 07:00 PM</option>
                        <option>Night Slot: 07:30 PM – 09:30 PM</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Special Cutting / Delivery Instructions
                      </label>
                      <input
                        type="text"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="e.g. Cut into small curry pieces, leave package with gate security"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Payment Method Selection */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
                <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-black text-white text-xs flex items-center justify-center font-bold">
                    {deliveryType === 'home_delivery' ? '4' : '3'}
                  </span>
                  <span>Payment Method</span>
                </h2>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  {settings.codEnabled && (
                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        paymentMethod === 'cod'
                          ? 'border-brand-red bg-red-50/20 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-gray-900">
                            {deliveryType === 'home_delivery'
                              ? 'Cash on Delivery (COD)'
                              : 'Pay at Shop Pickup Counter'}
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            Pay via Cash or UPI QR Code directly upon receiving your meat.
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-brand-red"
                      />
                    </label>
                  )}

                  {/* Online Payment via Razorpay */}
                  {settings.onlinePaymentEnabled && (
                    <label
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        paymentMethod === 'razorpay'
                          ? 'border-brand-red bg-red-50/20 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-gray-900 flex items-center gap-2">
                            <span>Online Payment (Razorpay)</span>
                            <span className="text-[9px] bg-blue-100 text-blue-800 font-extrabold px-1.5 py-0.5 rounded">
                              Instant & Secure
                            </span>
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            UPI (Google Pay, PhonePe, Paytm), Credit / Debit Cards, NetBanking.
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="w-4 h-4 text-brand-red"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Order Review & Placement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-5">
                <h3 className="font-display font-black text-lg text-gray-900 pb-3 border-b border-gray-100">
                  Review Your Order ({items.length} items)
                </h3>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => {
                    const price =
                      item.selectedVariant.discountPrice ?? item.selectedVariant.price;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs py-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 line-clamp-1">
                              {item.product.name}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {item.selectedVariant.weightLabel} × {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-extrabold text-gray-900">
                          ₹{price * item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({appliedCoupon?.code})</span>
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
                    <span>Total Payable</span>
                    <span className="text-xl text-brand-red">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-brand-red hover:bg-brand-redDark text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-brand-red/25 transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>
                        {paymentMethod === 'razorpay'
                          ? `Pay ₹${totalAmount} Online`
                          : `Place Order (₹${totalAmount})`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-brand-red" />
                    <span>KOMBAN CUTS Freshness Guarantee</span>
                  </div>
                  <p>
                    Your meat is freshly cut upon order placement. If you are not satisfied with quality, we offer 100% prompt replacement or refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

