import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  HeartHandshake,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-brand-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-charcoal to-brand-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-brand-red text-xs font-black uppercase tracking-widest bg-red-950/70 border border-brand-red/30 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Our Story & Heritage
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
            About KOMBAN CUTS
          </h1>
          <p className="text-lg text-brand-gold font-medium mt-3">
            Fresh Cuts. Pure Quality. Delivered Fresh.
          </p>
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            Born in Coimbatore, Tamil Nadu, KOMBAN CUTS was founded with a singular obsession: to bring back authentic freshness, uncompromising hygiene, and true net-weight transparency to meat shopping.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Section 1: The Komban Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase tracking-wider text-brand-red">
              Butchery Craftsmanship
            </span>
            <h2 className="font-display font-black text-3xl text-gray-900 tracking-tight">
              Raising the Benchmark for Fresh Meat in Coimbatore
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Traditional wet markets often lack temperature control, while supermarket frozen meats lose their vital juices and texture. KOMBAN CUTS fills this gap with our state-of-the-art cutting center in Gandhipuram, Coimbatore.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every morning, our experienced master butchers hand-carve farm-fresh poultry, pasture-fed Salem goat mutton, and direct coastal catches into culinary cuts tailored for Tamil Nadu recipes — from Sunday Kongu Naatu Kozhi Kuzhambu to slow-simmered bone marrow mutton biryani.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="font-black text-2xl text-brand-red block">0-4°C</span>
                <span className="text-xs text-gray-600 font-semibold">Chilled Cutting Room</span>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="font-black text-2xl text-brand-red block">100%</span>
                <span className="text-xs text-gray-600 font-semibold">Net Weight Accuracy</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80"
              alt="Komban Cuts Meat Butchery"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Section 2: Core Values */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-14">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-display font-black text-2xl text-gray-900">
              Our 4 Pillars of Freshness
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Guiding every order from dawn butchery to doorstep dispatch
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-2xs">
              <ShieldCheck className="w-8 h-8 text-brand-red mb-3" />
              <h4 className="font-bold text-sm text-gray-900">Antibiotic-Free</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                We only source chicken and poultry raised on natural feeds with zero harmful chemicals.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-2xs">
              <Sparkles className="w-8 h-8 text-brand-red mb-3" />
              <h4 className="font-bold text-sm text-gray-900">Never Frozen</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Daily cuts butchered within hours of dispatch to preserve natural texture, moisture, and flavor.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-2xs">
              <Award className="w-8 h-8 text-brand-red mb-3" />
              <h4 className="font-bold text-sm text-gray-900">Zero Waste Billing</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                All portions are weighed after cleaning, deskinned, and trimmed. You pay only for edible meat.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-2xs">
              <HeartHandshake className="w-8 h-8 text-brand-red mb-3" />
              <h4 className="font-bold text-sm text-gray-900">Coimbatore Pride</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Local team, local butchery counter, and dedicated express delivery riders across the Manchester of South India.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Visit Us CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-black text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl text-white">
              Experience Freshness at Our Gandhipuram Counter
            </h3>
            <p className="text-xs text-gray-400 max-w-lg">
              Visit 142 Cross Cut Road, Gandhipuram to watch your meat cut in our sanitized transparent butchery, or order online for 45-min doorstep delivery.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-redDark text-white font-extrabold text-xs rounded-xl shadow-lg transition-all whitespace-nowrap"
          >
            Shop Fresh Cuts Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
