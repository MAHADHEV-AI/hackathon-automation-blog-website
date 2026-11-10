'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Store,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { Logo } from '@/components/layout/Logo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAdmin, loginAsAdmin, logout } = useAuth();
  const { orders, products } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in as admin, show an authentication screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-brand-charcoal text-white rounded-3xl p-8 border border-gray-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-red text-white flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-display font-black text-2xl text-white">
              KOMBAN CUTS Admin Portal
            </h1>
            <p className="text-xs text-gray-400 mt-2">
              Role-based authorization required. This area is restricted to store managers and butchers in Coimbatore.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-gray-700 text-left text-xs space-y-2">
            <p className="font-bold text-gray-300">Quick Evaluation Access:</p>
            <p className="text-gray-400">
              Click below to instantly authenticate as the Store Administrator for testing products, orders, and business settings.
            </p>
          </div>

          <button
            onClick={loginAsAdmin}
            className="w-full py-3.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-brand-red/25"
          >
            Authenticate as Admin (1-Click)
          </button>

          <div>
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingOrdersCount = orders.filter(
    (o) => o.orderStatus === 'placed' || o.orderStatus === 'preparing'
  ).length;

  const lowStockCount = products.filter((p) => p.stockQuantity < 20).length;

  const navItems = [
    {
      name: 'Overview',
      href: '/admin',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
    },
    {
      name: 'Products & Cuts',
      href: '/admin/products',
      icon: <Package className="w-4 h-4" />,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : null,
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: 'Sales Reports',
      href: '/admin/reports',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      name: 'Business Settings',
      href: '/admin/settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-brand-black text-white px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-extrabold text-sm tracking-wider">
            KOMBAN <span className="text-brand-red">ADMIN</span>
          </span>
        </div>
        <Link
          href="/"
          className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1"
        >
          <span>Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-black text-gray-300 flex flex-col justify-between p-5 transform transition-transform duration-200 border-r border-brand-charcoal ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo / Header */}
          <div className="pb-4 border-b border-brand-charcoal">
            <Logo variant="dark" size="sm" showTagline={false} />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase bg-brand-charcoal text-brand-gold px-2 py-0.5 rounded tracking-wider">
                Store Admin
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                v1.0 • Coimbatore
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-brand-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white text-brand-red'
                          : 'bg-brand-red text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-brand-charcoal space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-brand-charcoal transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" />
              <span>View Customer Store</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-950/30 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

