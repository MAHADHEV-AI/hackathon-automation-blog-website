import React from 'react';
import { ShoppingBag, Scissors, PackageCheck, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: <ShoppingBag className="w-6 h-6 text-brand-red" />,
      title: 'Choose Your Cuts',
      tamil: 'தேவையான இறைச்சியை தேர்வு செய்யுங்கள்',
      desc: 'Browse fresh farm chicken, pasture-fed Salem mutton, morning coastal fish catch, and organic eggs.',
    },
    {
      step: '02',
      icon: <Scissors className="w-6 h-6 text-brand-red" />,
      title: 'Butchered to Order',
      tamil: 'ஆர்டரின்படி தூய்மையாக வெட்டப்படுகிறது',
      desc: 'Expertly trimmed, washed in RO water, and portioned. You only pay for true 100% net weight.',
    },
    {
      step: '03',
      icon: <PackageCheck className="w-6 h-6 text-brand-red" />,
      title: 'Chilled Vacuum Pack',
      tamil: 'குளிர்ந்த காற்றுப்புகா பேக்கிங்',
      desc: 'Packed in food-grade insulated boxes with ice chill pads to preserve farm-fresh moisture at 0-4°C.',
    },
    {
      step: '04',
      icon: <Truck className="w-6 h-6 text-brand-red" />,
      title: 'Doorstep or Pickup',
      tamil: 'வீட்டு டெலிவரி அல்லது கடை பிக்கப்',
      desc: 'Get fast 45-60 min delivery in Coimbatore or pick up in 15 mins at our Cross Cut Road store.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red text-xs font-black uppercase tracking-widest bg-red-50 border border-brand-red/20 px-3.5 py-1 rounded-full">
            Transparent Freshness
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-3 tracking-tight">
            How KOMBAN CUTS Works
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Simple 4-step farm-to-kitchen workflow designed for pure quality and zero hassle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-red/30 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-brand-red group-hover:text-white shadow-sm flex items-center justify-center text-brand-red transition-colors">
                  {s.icon}
                </div>
                <span className="font-mono text-3xl font-black text-gray-200 group-hover:text-brand-redLight transition-colors">
                  {s.step}
                </span>
              </div>

              <h3 className="font-display font-black text-base text-gray-900 group-hover:text-brand-red transition-colors">
                {s.title}
              </h3>
              <p className="text-[11px] text-brand-gold font-medium mt-0.5">
                {s.tamil}
              </p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

