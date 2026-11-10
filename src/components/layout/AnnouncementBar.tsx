'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Clock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  if (!settings.promoBannerActive) return null;

  return (
    <div className="bg-brand-black text-gray-200 text-xs py-2 px-4 border-b border-brand-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Location & Opening Hours */}
        <div className="flex items-center gap-4 text-gray-300">
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
            <span>Coimbatore, Tamil Nadu</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
            <span>Open: 06:30 AM – 09:30 PM</span>
          </span>
        </div>

        {/* Promo Message */}
        <div className="flex items-center gap-2 text-center text-white">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse flex-shrink-0" />
          <span className="font-semibold text-brand-goldLight">{settings.promoBannerText}</span>
        </div>

        {/* Contact info & Shop Pickup notification */}
        <div className="hidden lg:flex items-center gap-4 text-gray-300">
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>{settings.phone}</span>
          </a>
          <Link
            href="/admin"
            className="text-[11px] text-gray-400 hover:text-brand-gold transition-colors font-mono"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
};
