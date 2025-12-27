'use client';

import React, { useEffect } from 'react';
import { useLivePrices } from '@/hooks/useLivePrices';
import { formatNumber } from '@/utils/formatters';

export const LivePriceCircles: React.FC = () => {
  const { prices, loading, fetchPrices } = useLivePrices();

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const goldPrice = prices.find((p) => p.metalType === 'GOLD');
  const silverPrice = prices.find((p) => p.metalType === 'SILVER');

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 px-4 py-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-charcoal-700 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-8">
      {/* Gold Costing */}
      <div className="flex justify-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Outer Circle - Animated */}
          <div className="absolute inset-0 rounded-full border-4 border-gold-500/30 animate-pulse-slow" />
          
          {/* Middle Circle */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border-4 border-gold-500/50" />
          
          {/* Inner Content */}
          <div className="relative text-center px-2">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-1">Gold Costing</p>
            <p className="text-lg sm:text-2xl font-bold text-gradient-gold leading-tight">
              {goldPrice ? formatNumber(goldPrice.spotPrice, 0) : '---'}
            </p>
            <p className="text-[10px] sm:text-xs text-gold-400 mt-1">
              {goldPrice ? `L: ${formatNumber(goldPrice.dayLow, 0)}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Gold */}
      <div className="flex justify-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full border-4 border-gold-500/30 animate-pulse-slow" 
            style={{ animationDelay: '0.5s' }} 
          />
          <div className="absolute inset-2 sm:inset-3 rounded-full border-4 border-gold-500/50" />
          <div className="relative text-center px-2">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-1">Gold</p>
            <p className="text-lg sm:text-2xl font-bold text-gradient-gold leading-tight">
              {goldPrice ? formatNumber(goldPrice.spotPrice, 0) : '---'}
            </p>
            <p className="text-[10px] sm:text-xs text-gold-400 mt-1">
              {goldPrice ? `H: ${formatNumber(goldPrice.dayHigh, 0)}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* INR/Silver */}
      <div className="flex justify-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full border-4 border-gold-500/30 animate-pulse-slow" 
            style={{ animationDelay: '1s' }} 
          />
          <div className="absolute inset-2 sm:inset-3 rounded-full border-4 border-gold-500/50" />
          <div className="relative text-center px-2">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-1">INR</p>
            <p className="text-lg sm:text-2xl font-bold text-gradient-gold leading-tight">
              {silverPrice ? formatNumber(silverPrice.spotPrice, 0) : '---'}
            </p>
            <p className="text-[10px] sm:text-xs text-red-400 mt-1">
              {silverPrice ? `L: ${formatNumber(silverPrice.dayLow, 0)}` : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
