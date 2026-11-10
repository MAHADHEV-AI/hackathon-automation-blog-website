import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  PackageCheck,
  BadgePercent,
  Truck,
  Store,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles className="w-6 h-6 text-brand-red" />,
      title: 'Fresh and Quality Products',
      tamil: 'தினசரி புத்தம் புதிய இறைச்சி',
      description:
        'Daily morning butchering. 100% antibiotic-residue-free chicken, tender grass-fed goat mutton, and fresh ocean-to-counter seafood.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-red" />,
      title: 'Hygienic Preparation',
      tamil: 'சுகாதாரமான வெட்டுமுறை',
      description:
        'Sanitized stainless steel butchery surfaces, RO-water washing, temperature-controlled 0-4°C cutting environment for zero contamination.',
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-brand-red" />,
      title: 'Quality Packaging',
      tamil: 'உயர்தர சீல் செய்யப்பட்ட பேக்கிங்',
      description:
        'Food-grade vacuum packs with chilled ice gel packs ensure true net weight and maximum kitchen-ready freshness right to your door.',
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-brand-red" />,
      title: 'Affordable Pricing',
      tamil: 'நியாயமான சிறந்த விலை',
      description:
        'Transparent net-weight pricing. You never pay for waste fat, feathers, or unwanted bones. Regular special discounts and weekly deals.',
    },
    {
      icon: <Truck className="w-6 h-6 text-brand-red" />,
      title: 'Convenient Home Delivery',
      tamil: 'விரைவான வீட்டு டெலிவரி',
      description:
        'Express 45-60 min delivery across Coimbatore (RS Puram, Gandhipuram, Peelamedu, Saibaba Colony, etc.) in temperature-regulated delivery bags.',
    },
    {
      icon: <Store className="w-6 h-6 text-brand-red" />,
      title: 'Easy Shop Pickup',
      tamil: 'நேரடி கடை பிக்கப் (₹0 கட்டணம்)',
      description:
        'Order online, skip the weekend queue, and collect your vacuum-sealed cuts fresh at our Cross Cut Road store counter in Gandhipuram.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50/70 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red text-xs font-black uppercase tracking-widest bg-red-50 border border-brand-red/20 px-3.5 py-1 rounded-full">
            The Komban Cuts Standard
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-3 tracking-tight">
            Why Choose KOMBAN CUTS?
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            We are redefining how Coimbatore buys fresh meat. From farm sourcing to hygienic cutting and
            speedy delivery, here is why Covai families trust us daily.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-colors mb-6">
                <span className="group-hover:text-white text-brand-red transition-colors">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-lg text-gray-900 group-hover:text-brand-red transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-brand-gold font-medium mt-0.5">
                {item.tamil}
              </p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

