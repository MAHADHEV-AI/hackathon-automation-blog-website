'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  X,
  Sparkles,
  Filter,
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES_DATA } from '@/lib/data';
import { ProductCategory } from '@/lib/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>(
    'featured'
  );
  const [onlyDiscounted, setOnlyDiscounted] = useState(initialFilter === 'offers');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (initialQuery) setSearch(initialQuery);
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialFilter === 'offers') setOnlyDiscounted(true);
  }, [initialQuery, initialCategory, initialFilter]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter (English name, Tamil name, description, tags)
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTamil = p.tamilName?.toLowerCase().includes(q) || false;
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q)) || false;
          if (!matchName && !matchTamil && !matchDesc && !matchTags) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Offers / Discounted filter
        if (onlyDiscounted && (!p.discountPrice || p.discountPrice >= p.basePrice)) {
          return false;
        }

        // Price filter (based on minimum variant price)
        const minPrice = p.discountPrice ?? p.basePrice;
        if (minPrice > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.basePrice;
        const priceB = b.discountPrice ?? b.basePrice;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, search, selectedCategory, onlyDiscounted, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setOnlyDiscounted(false);
    setMaxPrice(1200);
    setSortBy('featured');
  };

  const hasActiveFilters =
    search !== '' ||
    selectedCategory !== 'all' ||
    onlyDiscounted ||
    maxPrice < 1200 ||
    sortBy !== 'featured';

  return (
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="font-bold text-gray-900">Shop All Products</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Fresh Meat & Seafood Catalogue
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Browse our complete range of antibiotic-free chicken, goat mutton, fresh sea catch, and eggs in Coimbatore.
          </p>
        </div>

        {/* Search, Filter Bar & Sorting */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chicken, mutton, vanjaram, eggs..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl"
            >
              <Filter className="w-4 h-4 text-brand-red" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-brand-red" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 hidden sm:inline-block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-bold text-gray-800 focus:outline-none focus:border-brand-red cursor-pointer"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-red" />
                  <span>Filter Products</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-brand-red hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-extrabold uppercase text-gray-400 tracking-wider block mb-3">
                  Categories
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-brand-red text-white shadow-xs'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{products.length}</span>
                  </button>

                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-brand-red text-white shadow-xs'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] opacity-80">
                        {products.filter((p) => p.category === cat.slug).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Discounts Toggle */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={(e) => setOnlyDiscounted(e.target.checked)}
                    className="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red"
                  />
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-brand-red fill-brand-red" />
                    <span>Special Offers & Deals Only</span>
                  </span>
                </label>
              </div>

              {/* Max Price Slider */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-gray-500">Max Price:</span>
                  <span className="text-brand-red">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-red cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹50</span>
                  <span>₹1200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products List Area */}
          <div className="lg:col-span-3">
            {/* Active filter pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-gray-400">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-800 text-xs px-2.5 py-1 rounded-full">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-800 text-xs px-2.5 py-1 rounded-full">
                    <span>Search: "{search}"</span>
                    <button onClick={() => setSearch('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {onlyDiscounted && (
                  <span className="inline-flex items-center gap-1 bg-red-50 border border-brand-red/30 text-brand-red text-xs px-2.5 py-1 rounded-full">
                    <span>Discounted only</span>
                    <button onClick={() => setOnlyDiscounted(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-brand-red hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="text-xs text-gray-500 font-medium mb-4">
              Showing <strong>{filteredProducts.length}</strong> fresh products
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">No matching cuts found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  We couldn't find any products matching your current filters. Try searching for "chicken", "mutton", or "fish".
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl hover:bg-brand-redDark transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setShowMobileFilters(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 z-10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {/* Category buttons */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${
                      selectedCategory === 'all'
                        ? 'bg-brand-red text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${
                        selectedCategory === cat.slug
                          ? 'bg-brand-red text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={(e) => setOnlyDiscounted(e.target.checked)}
                    className="w-4 h-4 text-brand-red rounded"
                  />
                  <span className="text-xs font-bold text-gray-800">
                    Special Offers Only
                  </span>
                </label>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Max Price:</span>
                  <span className="text-brand-red">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-red"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-brand-red text-white text-xs font-bold rounded-xl"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
