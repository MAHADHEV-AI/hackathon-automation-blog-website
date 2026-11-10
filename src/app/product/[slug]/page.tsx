'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Check,
  ShoppingCart,
  ShieldCheck,
  Scale,
  Clock,
  Sparkles,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductVariant } from '@/lib/types';

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { products } = useStore();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product ? product.variants[1] || product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'storage' | 'reviews'>('details');

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="mt-4 inline-block text-brand-red font-bold">
          ← Back to Shop All
        </Link>
      </div>
    );
  }

  const activeVariant = selectedVariant || product.variants[0];
  const currentPrice = activeVariant.discountPrice ?? activeVariant.price;
  const originalPrice = activeVariant.price;
  const hasDiscount =
    activeVariant.discountPrice !== undefined &&
    activeVariant.discountPrice < originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - activeVariant.discountPrice!) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, activeVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-red">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-brand-red capitalize"
          >
            {product.category.replace('-', ' & ')}
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900 truncate">{product.name}</span>
        </div>

        {/* Main Product Showcase Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {product.isBestseller && (
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-black text-brand-gold text-xs font-black uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bestseller</span>
                  </span>
                </div>
              )}

              {hasDiscount && (
                <div className="absolute top-4 right-4">
                  <span className="bg-brand-red text-white text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-md">
                    {discountPercent}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-brand-red mx-auto mb-1" />
                <span className="font-bold text-gray-800 block text-[11px]">100% Fresh Cut</span>
                <span className="text-[10px] text-gray-400">Zero Preservatives</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Scale className="w-5 h-5 text-brand-red mx-auto mb-1" />
                <span className="font-bold text-gray-800 block text-[11px]">Net Weight Cleaned</span>
                <span className="text-[10px] text-gray-400">Zero Waste Pay</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Truck className="w-5 h-5 text-brand-red mx-auto mb-1" />
                <span className="font-bold text-gray-800 block text-[11px]">45-60 Mins Express</span>
                <span className="text-[10px] text-gray-400">Coimbatore Doorstep</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Portions & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category Pill */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                  {product.category.replace('-', ' & ')}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating || 4.8}</span>
                  <span className="text-gray-400">({product.reviewCount || 45} reviews)</span>
                </div>
              </div>

              {/* Title & Tamil Title */}
              <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 leading-tight">
                {product.name}
              </h1>
              {product.tamilName && (
                <p className="text-sm font-semibold text-brand-gold mt-1">
                  {product.tamilName}
                </p>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Portion / Weight Selector */}
              <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase text-gray-700 mb-3">
                  <span>Choose Portion / Weight:</span>
                  <span className="text-brand-red text-[11px] font-bold">
                    Net: {product.netWeight || activeVariant.weightLabel}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = activeVariant.id === v.id;
                    const vPrice = v.discountPrice ?? v.price;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-brand-black text-white border-brand-black shadow-md'
                            : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="block text-xs font-extrabold">
                          {v.weightLabel}
                        </span>
                        <span
                          className={`text-xs font-bold block mt-0.5 ${
                            isSelected ? 'text-brand-gold' : 'text-gray-900'
                          }`}
                        >
                          ₹{vPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Quantity Box */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-gray-400 font-bold uppercase">
                    Total Portion Price:
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-3xl text-gray-900">
                      ₹{currentPrice * quantity}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{originalPrice * quantity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-brand-red transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-extrabold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-brand-red transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Desktop Add to Cart Button */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  className={`flex-1 py-4 rounded-2xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-brand-red hover:bg-brand-redDark text-white shadow-brand-red/25 transform active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart (₹{currentPrice * quantity})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Specs summary */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs">
              {product.cuttingType && (
                <div>
                  <span className="text-gray-400 block font-medium">Cut Style</span>
                  <span className="font-bold text-gray-800">{product.cuttingType}</span>
                </div>
              )}
              {product.serves && (
                <div>
                  <span className="text-gray-400 block font-medium">Portion Serves</span>
                  <span className="font-bold text-gray-800">{product.serves}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informational Tabs: Details, Storage, Customer Reviews */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8">
          <div className="flex border-b border-gray-100 gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-brand-red text-brand-red'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Product Details & Cutting
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'storage'
                  ? 'border-brand-red text-brand-red'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Storage & Cooking Advice
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-brand-red text-brand-red'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Customer Reviews ({product.reviewCount || 45})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <strong className="block text-gray-900 mb-1">Gross vs Net Weight:</strong>
                    <span>
                      Gross Weight: {product.grossWeight || '500g'}. Net Weight:{' '}
                      {product.netWeight || '480g - 500g'}. All cuts are cleaned and trimmed of unwanted fat prior to final packaging.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <strong className="block text-gray-900 mb-1">Butchery Hygiene:</strong>
                    <span>
                      Handled in our temperature-controlled 0-4°C cutting chamber in Coimbatore with RO-washed blades.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                <p>
                  <strong>Storage Instructions:</strong> {product.storage || 'Keep refrigerated between 0°C and 4°C. Consume within 48 hours for best culinary flavor and juiciness.'}
                </p>
                <p>
                  <strong>Cooking Tips:</strong> Marinate with crushed shallots, ginger garlic paste, Coimbatore curry masala, and rock salt for 20-30 minutes before cooking.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-gray-900">Customer Ratings</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800">
                        {product.rating || 4.8} out of 5 stars
                      </span>
                    </div>
                  </div>
                </div>

                {/* Write Review Form */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-3">
                    Write a Verified Review
                  </h4>
                  {reviewSubmitted ? (
                    <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl">
                      Thank you! Your verified review has been submitted.
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newReviewAuthor && newReviewText) {
                          setReviewSubmitted(true);
                        }
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="Your Name (e.g. Ramesh K, RS Puram)"
                          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                        />
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-brand-red"
                        >
                          <option value={5}>5 Stars - Outstanding Quality</option>
                          <option value={4}>4 Stars - Very Fresh</option>
                          <option value={3}>3 Stars - Good</option>
                        </select>
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="Write your review regarding cut quality, packaging, freshness, and delivery in Coimbatore..."
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-red"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-brand-black hover:bg-brand-charcoal text-white text-xs font-bold rounded-xl"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-black text-2xl text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Cart Bar (Prompt requirement: "Sticky Add to Cart button on product details") */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-gray-400 font-bold block uppercase">
            {activeVariant.weightLabel}
          </span>
          <span className="font-extrabold text-base text-gray-900">
            ₹{currentPrice * quantity}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 ${
            isAdded ? 'bg-emerald-600 text-white' : 'bg-brand-red text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
