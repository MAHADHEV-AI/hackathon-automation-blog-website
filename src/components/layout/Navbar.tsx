'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Tag,
  ShieldCheck,
  Package,
  LogOut,
  MapPin,
  Flame,
} from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CATEGORIES_DATA } from '@/lib/data';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const { user, isLoggedIn, isAdmin, logout, loginAsAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const accountRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Left: Mobile menu toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-brand-red hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Logo variant="light" size="md" />
          </div>

          {/* 2. Middle: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-gray-700">
            <Link
              href="/"
              className="hover:text-brand-red transition-colors py-2"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="hover:text-brand-red transition-colors py-2"
            >
              Shop All
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1.5 hover:text-brand-red transition-colors py-2 focus:outline-none"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    categoriesOpen ? 'rotate-180 text-brand-red' : ''
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 w-64 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {CATEGORIES_DATA.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-red-50/50 hover:text-brand-red transition-colors group"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 group-hover:text-brand-red">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-normal">
                          {cat.tamilName}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold bg-gray-100 group-hover:bg-brand-redLight group-hover:text-brand-red px-2 py-0.5 rounded-full text-gray-600">
                        {cat.itemCount} items
                      </span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2 px-3">
                    <Link
                      href="/shop"
                      onClick={() => setCategoriesOpen(false)}
                      className="block text-center text-xs font-bold text-brand-red hover:underline py-1"
                    >
                      View Full Catalogue →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/shop?filter=offers"
              className="flex items-center gap-1 text-brand-red hover:text-brand-redDark transition-colors py-2"
            >
              <Flame className="w-4 h-4 fill-brand-red" />
              <span>Offers</span>
            </Link>

            <Link
              href="/about"
              className="hover:text-brand-red transition-colors py-2"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="hover:text-brand-red transition-colors py-2"
            >
              Contact
            </Link>
          </nav>

          {/* 3. Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken, mutton, vanjaram..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-redLight transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* 4. Right: Account & Cart Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account Menu */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-xl text-gray-700 hover:text-brand-red hover:bg-gray-50 transition-colors focus:outline-none"
                aria-label="Account Menu"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-brand-red hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[11px] text-gray-400 leading-tight">Hello,</span>
                  <span className="text-xs font-bold text-gray-800 truncate max-w-[100px]">
                    {isLoggedIn ? user?.fullName : 'Sign In'}
                  </span>
                </div>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user?.fullName}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 text-[10px] font-extrabold uppercase bg-brand-black text-brand-gold px-2 py-0.5 rounded">
                            Store Administrator
                          </span>
                        )}
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-red"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile & Addresses</span>
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-red"
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders & Tracking</span>
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100 text-center">
                        <p className="text-xs text-gray-600 mb-2">
                          Sign in to manage orders & addresses
                        </p>
                        <Link
                          href="/account"
                          onClick={() => setAccountMenuOpen(false)}
                          className="block w-full py-2 bg-brand-red text-white text-xs font-bold rounded-lg hover:bg-brand-redDark transition-colors"
                        >
                          Customer Sign In
                        </Link>
                      </div>

                      <button
                        onClick={() => {
                          loginAsAdmin();
                          setAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Quick Admin Login (Demo)</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-brand-black hover:bg-brand-charcoal text-white px-3.5 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95 focus:outline-none"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-red text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border-2 border-brand-black">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase font-semibold leading-none">
                  Cart
                </span>
                <span className="text-xs font-bold leading-tight">
                  ₹{subtotal}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken, mutton, fish..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Categories Quick Grid */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Browse Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES_DATA.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg border border-gray-100 hover:border-brand-red bg-gray-50 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-gray-800">{cat.name}</span>
                  <span className="text-[10px] text-gray-400">{cat.itemCount}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 text-sm font-semibold text-gray-700 pt-2 border-t border-gray-100">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-red"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-red"
            >
              Shop All Products
            </Link>
            <Link
              href="/shop?filter=offers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-brand-red flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4" />
              <span>Special Offers & Deals</span>
            </Link>
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-red"
            >
              My Orders & Live Tracking
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-red"
            >
              About Komban Cuts
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-brand-red"
            >
              Contact Coimbatore Store
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-amber-600 flex items-center gap-1.5 font-bold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
