'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calculator, Info } from 'lucide-react';

interface TDSCalculatorProps {
  theme: 'dark' | 'light';
}

export function TDSCalculator({ theme }: TDSCalculatorProps) {
  const [metalType, setMetalType] = useState<'gold' | 'silver'>('gold');
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('sell');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('');
  
  const calculateTDS = () => {
    const qty = parseFloat(quantity) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const period = parseInt(holdingPeriod) || 0;
    
    const purchaseValue = qty * buy;
    const saleValue = qty * sell;
    const capitalGain = saleValue - purchaseValue;
    
    // TDS is 1% on sale value if transaction > 1 lakh for seller
    const tdsRate = 0.01;
    const tdsAmount = saleValue > 100000 ? saleValue * tdsRate : 0;
    
    // Capital Gains Tax
    let taxRate = 0;
    if (period > 36) {
      // Long term capital gains - 20% with indexation
      taxRate = 0.20;
    } else {
      // Short term capital gains - based on income slab (assuming 30%)
      taxRate = 0.30;
    }
    
    const taxAmount = capitalGain > 0 ? capitalGain * taxRate : 0;
    const netProfit = capitalGain - tdsAmount - taxAmount;
    
    return {
      purchaseValue,
      saleValue,
      capitalGain,
      tdsAmount,
      taxAmount,
      netProfit,
      taxRate: taxRate * 100
    };
  };
  
  const results = calculateTDS();
  
  return (
    <section id="tds-calculator" className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          TDS Calculator
        </h2>
        <p className={`text-base sm:text-lg ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          Calculate Tax Deducted at Source and Capital Gains on your bullion transactions
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Input Section */}
        <Card className="border-[#FFD700]/20">
          <div className="space-y-4 sm:space-y-6">
            <div className={`flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Transaction Details
              </h3>
            </div>
            
            {/* Metal Type */}
            <div>
              <label className={`block mb-2 sm:mb-3 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}>
                Metal Type
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => setMetalType('gold')}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                    metalType === 'gold'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                      : theme === 'dark'
                      ? 'bg-white/5 text-white/60 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:text-black'
                  }`}
                >
                  Gold
                </button>
                <button
                  onClick={() => setMetalType('silver')}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                    metalType === 'silver'
                      ? 'bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8] text-black'
                      : theme === 'dark'
                      ? 'bg-white/5 text-white/60 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:text-black'
                  }`}
                >
                  Silver
                </button>
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <label className={`block mb-2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}>
                Quantity (grams)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity in grams"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                    : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                } focus:outline-none`}
              />
            </div>
            
            {/* Buy Price */}
            <div>
              <label className={`block mb-2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}>
                Purchase Price (₹/gram)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="Enter purchase price"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                    : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                } focus:outline-none`}
              />
            </div>
            
            {/* Sell Price */}
            <div>
              <label className={`block mb-2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}>
                Sale Price (₹/gram)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="Enter sale price"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                    : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                } focus:outline-none`}
              />
            </div>
            
            {/* Holding Period */}
            <div>
              <label className={`block mb-2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}>
                Holding Period (months)
              </label>
              <input
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                placeholder="Enter holding period"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                    : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                } focus:outline-none`}
              />
            </div>
          </div>
        </Card>
        
        {/* Results Section */}
        <Card className={`border-[#FFD700]/20 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-[#FFD700]/5 to-transparent' 
            : 'bg-gradient-to-br from-[#FFD700]/10 to-transparent'
        }`}>
          <div className="space-y-4 sm:space-y-6">
            <div className={`flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Calculation Results
              </h3>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className={`flex items-center justify-between pb-2 sm:pb-3 border-b ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-100'
              }`}>
                <span className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Purchase Value
                </span>
                <span className={`text-base sm:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  ₹{results.purchaseValue.toFixed(2)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between pb-2 sm:pb-3 border-b ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-100'
              }`}>
                <span className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Sale Value
                </span>
                <span className={`text-base sm:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  ₹{results.saleValue.toFixed(2)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between pb-2 sm:pb-3 border-b ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-100'
              }`}>
                <span className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Capital Gain
                </span>
                <span className={`text-base sm:text-lg ${
                  results.capitalGain >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  ₹{results.capitalGain.toFixed(2)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between pb-2 sm:pb-3 border-b ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-100'
              }`}>
                <span className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  TDS Amount (1%)
                </span>
                <span className="text-base sm:text-lg text-[#FFD700]">
                  ₹{results.tdsAmount.toFixed(2)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between pb-2 sm:pb-3 border-b ${
                theme === 'dark' ? 'border-white/5' : 'border-gray-100'
              }`}>
                <span className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Capital Gains Tax ({results.taxRate}%)
                </span>
                <span className="text-base sm:text-lg text-[#FFD700]">
                  ₹{results.taxAmount.toFixed(2)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between pt-2 sm:pt-3 border-t-2 ${
                theme === 'dark' ? 'border-[#FFD700]/30' : 'border-[#FFD700]/50'
              }`}>
                <span className={`text-base sm:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Net Profit/Loss
                </span>
                <span className={`text-xl sm:text-2xl ${
                  results.netProfit >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  ₹{results.netProfit.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className={`glass-card rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 ${
              theme === 'dark' ? '' : 'bg-blue-50'
            }`}>
              <p className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-white/70' : 'text-gray-700'
              }`}>
                <strong className={theme === 'dark' ? 'text-white' : 'text-black'}>Note:</strong> TDS of 1% is applicable on sale transactions exceeding ₹1 lakh. 
                Long-term capital gains (holding &gt; 36 months) are taxed at 20% with indexation benefit, while short-term gains are taxed as per your income tax slab.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
