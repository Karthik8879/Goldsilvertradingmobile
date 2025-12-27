'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

interface PriceData {
  id: string;
  name: string;
  price: number;
  change: number;
  isSpot: boolean;
  currency: string;
}

interface LivePricesProps {
  theme: 'dark' | 'light';
}

export function LivePrices({ theme }: LivePricesProps) {
  const [prices, setPrices] = useState<PriceData[]>([
    { id: '1', name: 'Gold USD', price: 2063.45, change: 2.34, isSpot: true, currency: '$' },
    { id: '2', name: 'Silver USD', price: 24.12, change: -0.45, isSpot: true, currency: '$' },
    { id: '3', name: 'USD → INR', price: 83.24, change: 0.12, isSpot: false, currency: '₹' },
    { id: '4', name: 'Gold INR', price: 171789, change: 1.89, isSpot: false, currency: '₹' },
    { id: '5', name: 'Silver INR', price: 2008, change: -0.32, isSpot: false, currency: '₹' },
  ]);
  
  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(price => ({
        ...price,
        price: price.price + (Math.random() - 0.5) * 2,
        change: price.change + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="live-prices" className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
          <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] animate-pulse" />
          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Live Market Data</span>
        </div>
        <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl`}>Live Market Prices</h2>
        <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-sm sm:text-base lg:text-lg px-4`}>Real-time bullion market rates updated every second</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {prices.map((price) => (
          <Card key={price.id} glowOnHover className="relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>{price.name}</span>
                {price.isSpot && <Badge variant="spot">SPOT</Badge>}
              </div>
              
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>{price.currency}</span>
                  <span className={`text-2xl sm:text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {price.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 text-sm sm:text-base ${price.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {price.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="">{price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
