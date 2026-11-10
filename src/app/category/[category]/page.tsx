'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES_DATA } from '@/lib/data';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const { products } = useStore();

  const categoryInfo = CATEGORIES_DATA.find((c) => c.slug === categorySlug);

  if (!categoryInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link href="/shop" className="mt-4 inline-block text-brand-red font-bold">
          ← Back to Shop All
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.category === categorySlug);

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      {/* Category Hero Banner */}
      <div className="relative bg-brand-black text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image
            src={categoryInfo.imageUrl}
            alt={categoryInfo.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Categories</span>
          </Link>

          <div className="max-w-2xl">
            <span className="inline-block bg-brand-red text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full mb-3 tracking-widest">
              {categoryInfo.badge || 'Fresh Cut Daily'}
            </span>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              {categoryInfo.name}
            </h1>

            {categoryInfo.tamilName && (
              <p className="text-sm font-semibold text-brand-gold mt-1">
                {categoryInfo.tamilName}
              </p>
            )}

            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              {categoryInfo.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-red" />
                <span>100% Sanitized Butchery</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-brand-red" />
                <span>Net Weight Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red" />
                <span>Delivered Fresh to Coimbatore</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-2xl text-gray-900">
              All {categoryInfo.name} Cuts ({categoryProducts.length})
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Select your required portion (250g, 500g, 1kg) and add to cart
            </p>
          </div>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
            <p className="text-sm text-gray-600 font-bold">No products currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Other Categories Navigation Cards */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h3 className="font-display font-bold text-lg text-gray-900 mb-6">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORIES_DATA.filter((c) => c.slug !== categorySlug).map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-brand-red shadow-xs flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-brand-red transition-colors">
                    {c.name}
                  </h4>
                  <p className="text-[11px] text-gray-400">{c.tamilName}</p>
                </div>
                <span className="text-xs font-extrabold text-brand-red">
                  View →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

