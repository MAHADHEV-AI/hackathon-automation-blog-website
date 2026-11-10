'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Plus,
  Trash2,
  LogOut,
  ShieldCheck,
  Package,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { COIMBATORE_DELIVERY_ZONES } from '@/lib/data';
import { DeliveryAddress } from '@/lib/types';

export default function AccountPage() {
  const {
    user,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
    saveAddress,
    deleteAddress,
    loginAsAdmin,
  } = useAuth();

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [authMsg, setAuthMsg] = useState<{ success: boolean; message: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Address form modal states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newHouseNo, setNewHouseNo] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState(COIMBATORE_DELIVERY_ZONES[0].areaName);
  const [newPincode, setNewPincode] = useState('641012');
  const [newInstructions, setNewInstructions] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMsg(null);
    const res = await login(email, password);
    setAuthLoading(false);
    if (!res.success) {
      setAuthMsg({ success: false, message: res.message || 'Login failed.' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMsg(null);
    const res = await register(fullName, email, phone, password);
    setAuthLoading(false);
    if (!res.success) {
      setAuthMsg({ success: false, message: res.message || 'Registration failed.' });
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHouseNo.trim() || !newStreet.trim() || !newPincode.trim()) return;

    const newAddr: DeliveryAddress = {
      fullName: user?.fullName || 'Customer',
      phone: user?.phone || '+91 84895 42722',
      houseNo: newHouseNo,
      street: newStreet,
      area: newArea,
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: newPincode,
      deliveryInstructions: newInstructions,
    };

    saveAddress(newAddr);
    setShowAddressForm(false);
    setNewHouseNo('');
    setNewStreet('');
    setNewInstructions('');
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">My Account</span>
        </div>

        {!isLoggedIn || !user ? (
          /* Authentication Form */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center text-white mx-auto mb-3 shadow-md">
                <User className="w-6 h-6" />
              </div>
              <h1 className="font-display font-black text-2xl text-gray-900">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {authMode === 'login'
                  ? 'Sign in to access your orders and saved Coimbatore addresses'
                  : 'Register for faster express meat delivery and member discounts'}
              </p>
            </div>

            {authMsg && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  authMsg.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {authMsg.success ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{authMsg.message}</span>
              </div>
            )}

            {/* Toggle tabs */}
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl mb-6 text-xs font-bold">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthMsg(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'login'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500'
                }`}
              >
                Customer Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthMsg(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'register'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500'
                }`}
              >
                Register
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-redDark text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-red/20 transition-all"
                >
                  {authLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Arun Kumar"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number *
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arun@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-redDark text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-red/20 transition-all"
                >
                  {authLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Quick Demo Switch */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-[11px] text-gray-400 mb-3">Testing & Evaluation Shortcuts:</p>
              <button
                onClick={loginAsAdmin}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Log in as Store Administrator</span>
              </button>
            </div>
          </div>
        ) : (
          /* Profile & Address Book Dashboard */
          <div className="space-y-8">
            {/* Profile Overview Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-black text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-xl text-gray-900">
                      {user.fullName}
                    </h2>
                    {isAdmin && (
                      <span className="bg-brand-black text-brand-gold text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-brand-red" />
                      <span>{user.phone}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-red" />
                      <span>{user.email}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-brand-black hover:bg-brand-charcoal text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 border border-gray-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Address Book Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900">
                    Saved Delivery Addresses
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage your delivery locations in Coimbatore
                  </p>
                </div>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-red text-white text-xs font-bold rounded-xl hover:bg-brand-redDark shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <form
                  onSubmit={handleAddAddress}
                  className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 animate-in fade-in duration-200"
                >
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                    Enter New Coimbatore Address
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        House / Flat No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={newHouseNo}
                        onChange={(e) => setNewHouseNo(e.target.value)}
                        placeholder="14/2, Vasanth Apts"
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Street Name / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="West Club Road"
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Area *
                      </label>
                      <select
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        {COIMBATORE_DELIVERY_ZONES.map((z) => (
                          <option key={z.id} value={z.areaName}>
                            {z.areaName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        placeholder="641012"
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">
                        Delivery Instructions
                      </label>
                      <input
                        type="text"
                        value={newInstructions}
                        onChange={(e) => setNewInstructions(e.target.value)}
                        placeholder="e.g. Ring the bell twice"
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-brand-red text-white text-xs font-bold rounded-xl hover:bg-brand-redDark"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Saved addresses cards */}
              {user.savedAddresses.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">
                  No saved addresses found. Add one above for quick one-click checkout.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.savedAddresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-gray-200 bg-white shadow-2xs hover:border-brand-red/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-brand-red" />
                            <span>Address #{idx + 1}</span>
                          </span>
                          <button
                            onClick={() => deleteAddress(idx)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded"
                            aria-label="Delete Address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {addr.houseNo}, {addr.street}
                          <br />
                          {addr.area}, {addr.city} – {addr.pincode}
                        </p>
                        {addr.deliveryInstructions && (
                          <p className="text-[11px] text-gray-400 mt-2 italic">
                            Note: {addr.deliveryInstructions}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
