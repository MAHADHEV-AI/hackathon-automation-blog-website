'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useStore } from '@/context/StoreContext';

export const BestSellers: React.FC = () => {
  const { products } = useStore();
  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-red text-xs font-black uppercase tracking-widest bg-red-50 border border-brand-red/20 px-3.5 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 fill-brand-red" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Best Selling Fresh Cuts
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Hand-picked daily favorites loved by Coimbatore meat connoisseurs
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-red hover:text-brand-redDark group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
