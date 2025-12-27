'use client';

import React from 'react';
import { LivePriceCircles } from './LivePriceCircles';
import { ProductTable } from '@/components/products/ProductTable';

export const ProductTabs: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-charcoal-900 via-charcoal-900 to-charcoal-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Live <span className="text-gradient-gold">Trading Prices</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Real-time market rates for premium gold & silver
          </p>
        </div>

        {/* Live Price Circles */}
        <LivePriceCircles />

        {/* Product Table */}
        <ProductTable />
      </div>
    </section>
  );
};
