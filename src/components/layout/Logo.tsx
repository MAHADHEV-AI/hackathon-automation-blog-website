import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
}) => {
  const isLight = variant === 'light'; // Light background (dark text)

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', tag: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', tag: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', tag: 'text-xs' },
  }[size];

  return (
    <Link href="/" className="group flex items-center gap-2.5 select-none">
      {/* Custom Meat Cleaver & Komban Horn Emblem SVG */}
      <div
        className={`relative ${sizeClasses.icon} rounded-xl bg-gradient-to-br from-brand-red to-brand-crimson p-1.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Cleaver Blade */}
          <path
            d="M3 5C3 4.44772 3.44772 4 4 4H14C14.5523 4 15 4.44772 15 5V14C15 15.6569 13.6569 17 12 17H4C3.44772 17 3 16.5523 3 16V5Z"
            fill="currentColor"
          />
          {/* Cleaver Hole */}
          <circle cx="12" cy="7" r="1" fill="#D62828" />
          {/* Cleaver Handle */}
          <path
            d="M15 14L20.5 19.5C21.1667 20.1667 20.8333 21 20 21.5L18.5 21C18 20.5 14 16 14 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Komban Accent Horn Notch */}
          <path
            d="M3 9L7 5"
            stroke="#FEF9C3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-wider font-extrabold leading-none">
          <span className={`font-display ${isLight ? 'text-brand-black' : 'text-white'} ${sizeClasses.text}`}>
            KOMBAN
          </span>
          <span className={`font-display text-brand-red ml-1.5 ${sizeClasses.text}`}>
            CUTS
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-widest uppercase mt-0.5 ${
              isLight ? 'text-gray-500' : 'text-gray-400'
            } ${sizeClasses.tag}`}
          >
            Fresh Cuts • Pure Quality • Coimbatore
          </span>
        )}
      </div>
    </Link>
  );
};
