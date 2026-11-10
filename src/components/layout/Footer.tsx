import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-gray-300 border-t border-brand-charcoal pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-brand-charcoal">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-red flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Fresh Daily Cut</h4>
              <p className="text-xs text-gray-400 mt-0.5">Never frozen, butchered to order every day</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-red flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Hygienic Temperature Control</h4>
              <p className="text-xs text-gray-400 mt-0.5">0-4°C chill-pack sealed packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-red flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Express Covai Delivery</h4>
              <p className="text-xs text-gray-400 mt-0.5">45-60 min doorstep delivery across Coimbatore</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-red flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Flexible Payments</h4>
              <p className="text-xs text-gray-400 mt-0.5">UPI, Cards, NetBanking & Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mt-3">
              KOMBAN CUTS is Coimbatore's premier online fresh meat, seafood, and egg destination.
              We deliver antibiotic-free chicken, pasture-fed mutton, morning coastal fish catch,
              and farm eggs straight to your kitchen.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/918489542722"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Line</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2.5">
              Fresh Categories
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/category/chicken" className="hover:text-white transition-colors">
                  Fresh Broiler & Naatu Kozhi
                </Link>
              </li>
              <li>
                <Link href="/category/mutton" className="hover:text-white transition-colors">
                  Tender Goat & Mutton Cuts
                </Link>
              </li>
              <li>
                <Link href="/category/fish-seafood" className="hover:text-white transition-colors">
                  Ocean Fish, Prawns & Crab
                </Link>
              </li>
              <li>
                <Link href="/category/eggs" className="hover:text-white transition-colors">
                  Country Eggs & Farm Egg Trays
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=offers" className="text-brand-red hover:underline font-semibold">
                  Today's Meat Special Deals →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2.5">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Profile & Saved Addresses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Komban Cuts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Store Locator & Contact
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  FAQs & Freshness Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Coimbatore Store Details */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2.5">
              Coimbatore Store
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>142, Cross Cut Road, Gandhipuram, Coimbatore – 641012</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>+91 84895 42722</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>orders@kombancuts.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>06:30 AM – 09:30 PM (All 7 Days)</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-brand-gold border border-brand-charcoal hover:border-brand-gold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-charcoal flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} KOMBAN CUTS. All Rights Reserved. Coimbatore, Tamil Nadu, India.
          </div>
          <div className="flex items-center gap-4">
            <span>Fresh Cuts • Pure Quality • Delivered Fresh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

