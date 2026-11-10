'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Copy, Check, ArrowRight, Percent } from 'lucide-react';
import { INITIAL_COUPONS } from '@/lib/data';

export const SpecialOffers: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-brand-black via-brand-charcoal to-brand-black text-white relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-black uppercase tracking-widest bg-brand-charcoal border border-brand-gold/30 px-3.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Time Savings</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Exclusive Coimbatore Meat Offers
            </h2>
            <p className="text-sm text-gray-300 mt-1 max-w-xl">
              Apply these coupon codes during checkout to enjoy flat discounts and free delivery on fresh cuts.
            </p>
          </div>

          <Link
            href="/shop?filter=offers"
            className="px-6 py-3.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-extrabold rounded-xl transition-all shadow-lg shadow-brand-red/20 flex items-center gap-2"
          >
            <span>SHOP ALL DISCOUNTED CUTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Coupon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_COUPONS.map((coupon) => (
            <div
              key={coupon.code}
              className="p-6 rounded-3xl bg-brand-charcoal/90 border border-gray-700 hover:border-brand-red/60 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-brand-red/20 flex items-center justify-center text-brand-red">
                    <Percent className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    Active Coupon
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl text-white tracking-wide">
                  {coupon.discountType === 'flat'
                    ? `₹${coupon.discountValue} FLAT OFF`
                    : `${coupon.discountValue}% OFF`}
                </h3>

                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  {coupon.description}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  Min order value: <strong>₹{coupon.minOrderAmount}</strong>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700/80 flex items-center justify-between">
                <div className="font-mono text-sm font-black text-brand-gold bg-black/50 px-3 py-1.5 rounded-lg border border-brand-gold/30">
                  {coupon.code}
                </div>

                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
