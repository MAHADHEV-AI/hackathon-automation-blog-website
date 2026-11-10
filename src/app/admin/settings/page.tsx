'use client';

import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Store,
  Phone,
  MessageCircle,
  Truck,
  IndianRupee,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useStore();

  const [shopName, setShopName] = useState(settings.shopName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [email, setEmail] = useState(settings.email);
  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [minOrderAmount, setMinOrderAmount] = useState(settings.minOrderAmount);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(
    settings.freeDeliveryThreshold
  );
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryFee);
  const [pickupAvailable, setPickupAvailable] = useState(settings.pickupAvailable);
  const [codEnabled, setCodEnabled] = useState(settings.codEnabled);
  const [onlinePaymentEnabled, setOnlinePaymentEnabled] = useState(
    settings.onlinePaymentEnabled
  );
  const [promoBannerText, setPromoBannerText] = useState(settings.promoBannerText);
  const [promoBannerActive, setPromoBannerActive] = useState(settings.promoBannerActive);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      shopName,
      tagline,
      address,
      phone,
      whatsappNumber,
      email,
      openingHours,
      minOrderAmount,
      freeDeliveryThreshold,
      deliveryFee,
      pickupAvailable,
      codEnabled,
      onlinePaymentEnabled,
      promoBannerText,
      promoBannerActive,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Business & Store Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure store contact information, Coimbatore delivery fees, pickup slots, and payment gateways
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Brand & General Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
          <h2 className="font-bold text-base text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
            <Store className="w-4 h-4 text-brand-red" />
            <span>Store Profile & Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Shop Name *
              </label>
              <input
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">
                Coimbatore Shop Address *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Customer Support Phone *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                WhatsApp Business Number *
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Butchery Opening Hours
              </label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery & Fulfillment Rules */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
          <h2 className="font-bold text-base text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
            <Truck className="w-4 h-4 text-brand-red" />
            <span>Delivery Fees & Minimum Orders</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Standard Delivery Fee (₹)
              </label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Free Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Minimum Order Value (₹)
              </label>
              <input
                type="number"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={pickupAvailable}
                onChange={(e) => setPickupAvailable(e.target.checked)}
                className="w-4 h-4 text-brand-red rounded"
              />
              <span className="text-xs font-bold text-gray-800">
                Enable Store Counter Pickup Option (₹0 delivery charge)
              </span>
            </label>
          </div>
        </div>

        {/* 3. Payment Gateway Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
          <h2 className="font-bold text-base text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
            <IndianRupee className="w-4 h-4 text-brand-red" />
            <span>Payment Methods</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer p-3 rounded-2xl border border-gray-100 bg-gray-50">
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="w-4 h-4 text-brand-red rounded"
              />
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  Enable Cash on Delivery (COD) / Pay on Pickup
                </span>
                <span className="text-[11px] text-gray-500">
                  Customers can pay via cash or UPI QR upon receiving their package.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer p-3 rounded-2xl border border-gray-100 bg-gray-50">
              <input
                type="checkbox"
                checked={onlinePaymentEnabled}
                onChange={(e) => setOnlinePaymentEnabled(e.target.checked)}
                className="w-4 h-4 text-brand-red rounded"
              />
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  Enable Razorpay Online Payments
                </span>
                <span className="text-[11px] text-gray-500">
                  Accept UPI (GPay, PhonePe, Paytm), Credit & Debit cards, and NetBanking.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* 4. Promotional Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
          <h2 className="font-bold text-base text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sparkles className="w-4 h-4 text-brand-red" />
            <span>Top Promotional Announcement Banner</span>
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={promoBannerActive}
                onChange={(e) => setPromoBannerActive(e.target.checked)}
                className="w-4 h-4 text-brand-red rounded"
              />
              <span className="font-bold text-gray-800">
                Display Announcement Banner on all customer pages
              </span>
            </label>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Banner Text
              </label>
              <textarea
                rows={2}
                value={promoBannerText}
                onChange={(e) => setPromoBannerText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-brand-red/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

