import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { X, Info } from 'lucide-react';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    name: string;
    price: number;
    type: string;
  };
}

export function BuyModal({ isOpen, onClose, product }: BuyModalProps) {
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState<'grams' | 'kg'>('grams');
  
  if (!isOpen || !product) return null;
  
  const actualQuantity = unit === 'kg' ? quantity * 1000 : quantity;
  const subtotal = product.price * actualQuantity;
  const gst = subtotal * 0.03; // 3% GST
  const total = subtotal + gst;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="max-w-2xl w-full mx-auto my-4 sm:my-8 border-[#FFD700]/30">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-white text-lg sm:text-xl lg:text-2xl">Complete Your Purchase</h3>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Product Info */}
          <div className="glass-card rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm sm:text-base">{product.name}</p>
                <p className="text-xs sm:text-sm text-white/60">{product.type}</p>
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl text-[#FFD700]">₹{product.price}</p>
                <p className="text-xs sm:text-sm text-white/60">per gram</p>
              </div>
            </div>
          </div>
          
          {/* Quantity Input */}
          <div>
            <label className="text-white mb-2 sm:mb-3 block text-sm sm:text-base">Select Quantity</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#FFD700] focus:outline-none text-sm sm:text-base"
                  min="1"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setUnit('grams')}
                  className={`flex-1 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    unit === 'grams'
                      ? 'bg-[#FFD700] text-black'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  Grams
                </button>
                <button
                  onClick={() => setUnit('kg')}
                  className={`flex-1 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    unit === 'kg'
                      ? 'bg-[#FFD700] text-black'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  Kilograms
                </button>
              </div>
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="glass-card rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Info className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs sm:text-sm text-white/80">Price Breakdown</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-white/60 text-xs sm:text-sm">
                <span>Quantity</span>
                <span>{actualQuantity} grams</span>
              </div>
              <div className="flex items-center justify-between text-white/60 text-xs sm:text-sm">
                <span>Rate per gram</span>
                <span>₹{product.price}</span>
              </div>
              <div className="flex items-center justify-between text-white/60 text-xs sm:text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-white/60 text-xs sm:text-sm">
                <span>GST (3%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/10 my-2"></div>
              <div className="flex items-center justify-between text-white text-sm sm:text-base">
                <span>Total Payable</span>
                <span className="text-xl sm:text-2xl text-[#FFD700]">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button variant="secondary" onClick={onClose} className="flex-1 w-full">
              Cancel
            </Button>
            <Button variant="primary" className="flex-1 w-full">
              Proceed to Buy
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}