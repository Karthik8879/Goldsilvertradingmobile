'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, DollarSign, Info } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product } from '@/types/product.types';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { toast } from 'sonner';

interface ProductOrderModalProps {
  product: Product;
  orderType: 'BUY' | 'SELL';
  isOpen: boolean;
  onClose: () => void;
}

export const ProductOrderModal: React.FC<ProductOrderModalProps> = ({
  product,
  orderType,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const price = orderType === 'BUY' ? product.buyPrice : product.sellPrice;
  const totalAmount = price * quantity;
  const gstAmount = totalAmount * 0.03; // 3% GST
  const tdsAmount = orderType === 'SELL' ? totalAmount * 0.01 : 0; // 1% TDS on sell
  const finalAmount = orderType === 'BUY' 
    ? totalAmount + gstAmount 
    : totalAmount - tdsAmount;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(
        `${orderType} order placed successfully for ${quantity} × ${product.name}`,
        { duration: 3000 }
      );
      setQuantity(1);
      onClose();
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${orderType} ${product.name}`}
      size="md"
    >
      <div className="space-y-6">
        {/* Order Type Badge */}
        <div className="flex items-center justify-between">
          <Badge 
            variant={orderType === 'BUY' ? 'error' : 'success'} 
            className="text-base sm:text-lg px-4 py-2"
          >
            {orderType} ORDER
          </Badge>
          <Badge variant="info">{product.type}</Badge>
        </div>

        {/* Product Details Card */}
        <div className="glass-dark p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-3 pb-3 border-b border-charcoal-700">
            <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-2xl">
                {product.type === 'GOLD' ? '🥇' : '🥈'}
              </span>
            </div>
            <div>
              <h4 className="text-white font-bold">{product.name}</h4>
              <p className="text-sm text-gray-400">
                {product.weight} • {product.purity}% Purity
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price per unit</span>
            <span className="text-2xl font-bold text-gradient-gold">
              {formatCurrency(price)}
            </span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="glass-dark p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Quantity</span>
            <span className="text-sm text-gray-500">
              Max: {product.stockQuantity} units
            </span>
          </div>
          <div className="flex items-center justify-center space-x-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-12 h-12 rounded-full p-0"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <span className="text-5xl font-bold text-gradient-gold block leading-none">
                {quantity}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">units</span>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stockQuantity}
              className="w-12 h-12 rounded-full p-0"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="glass-dark p-5 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-4 h-4 text-gold-400" />
            <h4 className="font-semibold text-white">Price Breakdown</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-charcoal-700/50">
              <span className="text-gray-400">Subtotal ({quantity} units)</span>
              <span className="text-white font-semibold">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            {orderType === 'BUY' && (
              <div className="flex justify-between items-center py-2 border-b border-charcoal-700/50">
                <span className="text-gray-400">GST (3%)</span>
                <span className="text-yellow-400 font-semibold">
                  + {formatCurrency(gstAmount)}
                </span>
              </div>
            )}

            {orderType === 'SELL' && (
              <div className="flex justify-between items-center py-2 border-b border-charcoal-700/50">
                <span className="text-gray-400">TDS (1%)</span>
                <span className="text-red-400 font-semibold">
                  - {formatCurrency(tdsAmount)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3">
              <span className="text-lg text-white font-bold">Total Amount</span>
              <span className="text-3xl font-bold text-gradient-gold">
                {formatCurrency(finalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <p className="text-xs sm:text-sm text-blue-300 text-center">
            {orderType === 'BUY' 
              ? '🔒 Delivery within 24-28 hours after payment confirmation'
              : '💰 Amount will be credited within 2-3 business days'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant={orderType === 'BUY' ? 'primary' : 'outline'}
            className={`flex-1 ${orderType === 'SELL' ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white' : ''}`}
            onClick={handleSubmitOrder}
            loading={loading}
          >
            {orderType === 'BUY' ? (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Confirm Buy
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5 mr-2" />
                Confirm Sell
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
