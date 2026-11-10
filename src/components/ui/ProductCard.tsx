'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Check, Sparkles, Scale, Info } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items } = useCart();
  // Default to 500g or the middle/first variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[1] || product.variants[0]
  );
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = selectedVariant.discountPrice ?? selectedVariant.price;
  const originalPrice = selectedVariant.price;
  const hasDiscount = selectedVariant.discountPrice !== undefined && selectedVariant.discountPrice < originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - selectedVariant.discountPrice!) / originalPrice) * 100)
    : 0;

  // Check if currently in cart
  const cartItemId = `${product.id}-${selectedVariant.weightLabel}`;
  const cartItem = items.find((i) => i.id === cartItemId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden block">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-brand-black text-brand-gold text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 tracking-wider">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              <span>Bestseller</span>
            </span>
          )}
          {hasDiscount && (
            <span className="bg-brand-red text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-gray-800 text-[11px] font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400 text-[9px]">({product.reviewCount})</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Cutting Type */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
            <span className="uppercase font-bold tracking-wider text-brand-red">
              {product.category.replace('-', ' & ')}
            </span>
            {product.netWeight && (
              <span className="flex items-center gap-1 text-gray-500">
                <Scale className="w-3 h-3 text-gray-400" />
                <span>Net: {product.netWeight}</span>
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-brand-red transition-colors">
            <h3 className="font-extrabold text-gray-900 text-base leading-snug">
              {product.name}
            </h3>
            {product.tamilName && (
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {product.tamilName}
              </p>
            )}
          </Link>

          {/* Short description */}
          <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Weight Selection Pills */}
          <div className="mt-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Select Portion / Weight:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-brand-black text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {v.weightLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-gray-900">
                ₹{currentPrice}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Fresh in Stock
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 transform active:scale-95 shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-red hover:bg-brand-redDark text-white shadow-brand-red/20'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

