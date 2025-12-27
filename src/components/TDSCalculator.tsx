import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Calculator, Info } from 'lucide-react';

export function TDSCalculator() {
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
    <section id="tds-calculator" className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-white mb-4">
          TDS Calculator
        </h2>
        <p className="text-white/60 text-lg">
          Calculate Tax Deducted at Source and Capital Gains on your bullion transactions
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-[#FFD700]/20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <Calculator className="w-6 h-6 text-[#FFD700]" />
              <h3 className="text-white">Transaction Details</h3>
            </div>
            
            {/* Metal Type */}
            <div>
              <label className="block text-white/80 mb-3">Metal Type</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setMetalType('gold')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
                    metalType === 'gold'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                      : 'glass-card text-white/80 hover:text-white'
                  }`}
                >
                  Gold
                </button>
                <button
                  onClick={() => setMetalType('silver')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
                    metalType === 'silver'
                      ? 'bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8] text-black'
                      : 'glass-card text-white/80 hover:text-white'
                  }`}
                >
                  Silver
                </button>
              </div>
            </div>
            
            {/* Transaction Type */}
            <div>
              <label className="block text-white/80 mb-3">Transaction Type</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTransactionType('buy')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
                    transactionType === 'buy'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-500'
                      : 'glass-card text-white/80 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTransactionType('sell')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
                    transactionType === 'sell'
                      ? 'bg-red-500/20 border border-red-500/50 text-red-500'
                      : 'glass-card text-white/80 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <label className="block text-white/80 mb-2">
                Quantity (in grams)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
              />
            </div>
            
            {/* Buy Price */}
            <div>
              <label className="block text-white/80 mb-2">
                Purchase Price (₹ per gram)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="Enter buy price"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
              />
            </div>
            
            {/* Sell Price */}
            <div>
              <label className="block text-white/80 mb-2">
                Sale Price (₹ per gram)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="Enter sell price"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
              />
            </div>
            
            {/* Holding Period */}
            <div>
              <label className="block text-white/80 mb-2">
                Holding Period (months)
              </label>
              <input
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                placeholder="Enter holding period"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
              />
            </div>
            
            {/* Info Box */}
            <div className="glass-card border border-blue-500/30 rounded-xl p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/70">
                <p className="mb-2">
                  <strong className="text-blue-400">TDS:</strong> 1% applicable on sale value above ₹1 lakh
                </p>
                <p>
                  <strong className="text-blue-400">Capital Gains:</strong> Long-term (&gt;36 months) = 20% | Short-term = 30%
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Results Section */}
        <Card className="border-[#FFD700]/20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#FFD700]" />
              </div>
              <h3 className="text-white">Calculation Results</h3>
            </div>
            
            <div className="space-y-4">
              {/* Purchase Value */}
              <div className="glass-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white/80">Purchase Value</span>
                <span className="text-xl text-white">₹{results.purchaseValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              
              {/* Sale Value */}
              <div className="glass-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white/80">Sale Value</span>
                <span className="text-xl text-white">₹{results.saleValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              
              {/* Capital Gain */}
              <div className="glass-card border border-[#FFD700]/30 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white/80">Capital Gain</span>
                <span className={`text-xl ${results.capitalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ₹{results.capitalGain.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
              
              {/* TDS Amount */}
              <div className="glass-card border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">TDS Amount (1%)</span>
                  <span className="text-xl text-orange-400">₹{results.tdsAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                {results.saleValue <= 100000 && (
                  <p className="text-xs text-white/60">No TDS as sale value is below ₹1 lakh</p>
                )}
              </div>
              
              {/* Capital Gains Tax */}
              <div className="glass-card border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Capital Gains Tax ({results.taxRate}%)</span>
                  <span className="text-xl text-red-400">₹{results.taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <p className="text-xs text-white/60">
                  {parseInt(holdingPeriod) > 36 ? 'Long-term capital gains' : 'Short-term capital gains'}
                </p>
              </div>
              
              {/* Net Profit */}
              <div className="glass-card border border-green-500/50 rounded-xl p-6 bg-gradient-to-br from-green-500/10 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-white">Net Profit</span>
                  <span className={`text-3xl ${results.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ₹{results.netProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
            
            <Button variant="primary" className="w-full">
              Download Report
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}