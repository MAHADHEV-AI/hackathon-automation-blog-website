import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Store,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-brand-black via-[#161616] to-brand-black text-white overflow-hidden py-16 sm:py-24">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-charcoal/80 border border-brand-red/30 text-xs font-semibold text-brand-redLight">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span>Coimbatore’s Trusted Fresh Meat & Seafood Destination</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              FRESH MEAT.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-accent">
                FRESH SEAFOOD.
              </span>
              <br />
              DELIVERED TO YOUR DOOR.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Experience the freshness of quality chicken, mutton, fish and eggs with{' '}
              <strong className="text-white font-bold">KOMBAN CUTS</strong>. Procured daily,
              hygienically butchered to order, and vacuum-sealed for true net weight.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>100% Antibiotic-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>True Net Weight</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>Express 45-Min Covai</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-brand-red hover:bg-brand-redDark text-white text-sm font-extrabold rounded-2xl shadow-xl shadow-brand-red/25 hover:shadow-brand-red/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#categories"
                className="px-7 py-4 bg-brand-charcoal hover:bg-[#2a2a2a] text-white text-sm font-bold rounded-2xl border border-gray-700 hover:border-gray-500 transition-all"
              >
                EXPLORE CATEGORIES
              </Link>
            </div>

            {/* Promo Banner Banner Pill */}
            <div className="pt-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-charcoal to-[#1a1a1a] border border-brand-red/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/20 flex items-center justify-center text-brand-red flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">
                      Freshness You Can Trust – Only at KOMBAN CUTS.
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Flat ₹50 OFF with code <strong className="text-brand-gold">FRESH50</strong> on orders over ₹499!
                    </p>
                  </div>
                </div>
                <Link
                  href="/shop?filter=offers"
                  className="hidden sm:inline-block text-xs font-bold text-brand-red hover:underline whitespace-nowrap"
                >
                  Claim Offer →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Showcase Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-charcoal shadow-2xl aspect-4/3 sm:aspect-square bg-brand-charcoal">
                <Image
                  src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80"
                  alt="Komban Cuts Fresh Meat & Seafood"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-brand-red text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                    Today’s Fresh Cut
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    Pasture-Fed Salem Goat Mutton
                  </h3>
                  <p className="text-xs text-gray-300">
                    Tender curry cuts with ribs, marrow bones, and shoulder
                  </p>
                </div>
              </div>

              {/* Floating Stat Card 1: 45 Min Express */}
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-2xl shadow-2xl border border-gray-100 hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-brand-red">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Coimbatore</p>
                  <p className="text-xs font-black text-gray-900">45-60 Mins Express</p>
                </div>
              </div>

              {/* Floating Stat Card 2: Shop Pickup */}
              <div className="absolute -top-6 -right-6 bg-brand-charcoal text-white p-4 rounded-2xl shadow-2xl border border-gray-700 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-black flex items-center justify-center text-brand-gold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Shop Pickup</p>
                  <p className="text-xs font-black text-brand-gold">Cross Cut Rd, Covai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
