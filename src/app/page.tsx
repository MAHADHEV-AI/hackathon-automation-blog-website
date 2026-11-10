'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Send, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { BestSellers } from '@/components/home/BestSellers';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { SpecialOffers } from '@/components/home/SpecialOffers';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CATEGORIES_DATA } from '@/lib/data';

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Section */}
      <section id="categories" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red text-xs font-black uppercase tracking-widest bg-red-50 border border-brand-red/20 px-3.5 py-1 rounded-full">
              Hand-Trimmed Selections
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-3 tracking-tight">
              Explore Our Fresh Categories
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              From fresh morning poultry to prime Coimbatore goat mutton and coastal catches
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES_DATA.map((cat) => (
              <CategoryCard
                key={cat.id}
                id={cat.id}
                name={cat.name}
                tamilName={cat.tamilName}
                slug={cat.slug}
                description={cat.description}
                imageUrl={cat.imageUrl}
                badge={cat.badge}
                itemCount={cat.itemCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Sellers */}
      <BestSellers />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Special Offers */}
      <SpecialOffers />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Customer Testimonials */}
      <TestimonialsSection />

      {/* 8. Newsletter & Coimbatore Direct Dispatch CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-black text-white p-8 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-bold uppercase tracking-widest bg-brand-charcoal px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join the Meat Connoisseurs Club</span>
              </span>

              <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight">
                Get Fresh Cut Alerts & Weekend Special Discounts
              </h2>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                Subscribe to receive early morning catch notifications, Sunday mutton pre-booking alerts, and exclusive subscriber-only coupon codes in Coimbatore.
              </p>

              {newsletterSubscribed ? (
                <div className="mt-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Nandri! You are now subscribed to KOMBAN CUTS specials!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="mt-8 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full bg-brand-charcoal border border-gray-700 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-brand-red hover:bg-brand-redDark text-white text-sm font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

