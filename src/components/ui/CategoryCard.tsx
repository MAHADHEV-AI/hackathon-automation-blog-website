import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  tamilName?: string;
  slug: string;
  description: string;
  imageUrl: string;
  badge?: string;
  itemCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  tamilName,
  slug,
  description,
  imageUrl,
  badge,
  itemCount,
}) => {
  return (
    <Link
      href={`/category/${slug}`}
      className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-end min-h-[340px]"
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      {/* Gradient Overlay for high legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />

      {/* Top Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-brand-red text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
            {badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 text-white">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-extrabold text-2xl tracking-wide group-hover:text-brand-redLight transition-colors">
            {name}
          </h3>
          {itemCount && (
            <span className="text-xs font-bold text-gray-300 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
              {itemCount} cuts
            </span>
          )}
        </div>

        {tamilName && (
          <p className="text-xs text-brand-gold font-medium mb-2">
            {tamilName}
          </p>
        )}

        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white group-hover:text-brand-red transition-colors">
          <span>Explore Cuts</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

