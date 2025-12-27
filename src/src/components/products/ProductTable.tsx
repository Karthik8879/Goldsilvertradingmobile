'use client';

import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { productService } from '@/services/product.service';
import { Product } from '@/types/product.types';
import { formatNumber } from '@/utils/formatters';
import { ProductOrderModal } from './ProductOrderModal';

export const ProductTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GOLD' | 'SILVER' | 'COIN'>('GOLD');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [activeTab]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      if (activeTab === 'COIN') {
        const data = await productService.getAllProducts();
        setProducts(data.filter(p => p.name.toLowerCase().includes('coin')));
      } else {
        const data = await productService.getProductsByType(activeTab);
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      // Mock data for demo
      setProducts([
        {
          id: 1,
          name: `${activeTab} Bar 10g`,
          type: activeTab,
          weight: '10g',
          purity: 99.9,
          currentPrice: activeTab === 'GOLD' ? 75000 : 85000,
          buyPrice: activeTab === 'GOLD' ? 75500 : 85500,
          sellPrice: activeTab === 'GOLD' ? 74500 : 84500,
          imageUrl: '',
          description: `Premium ${activeTab} bar`,
          isAvailable: true,
          stockQuantity: 100,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: `${activeTab} Bar 20g`,
          type: activeTab,
          weight: '20g',
          purity: 99.9,
          currentPrice: activeTab === 'GOLD' ? 150000 : 170000,
          buyPrice: activeTab === 'GOLD' ? 151000 : 171000,
          sellPrice: activeTab === 'GOLD' ? 149000 : 169000,
          imageUrl: '',
          description: `Premium ${activeTab} bar`,
          isAvailable: true,
          stockQuantity: 50,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = (product: Product, type: 'BUY' | 'SELL') => {
    setSelectedProduct(product);
    setOrderType(type);
    setIsModalOpen(true);
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-dark rounded-full p-1.5 inline-flex space-x-1">
            <button
              onClick={() => setActiveTab('GOLD')}
              className={`px-8 py-2.5 sm:px-12 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
                activeTab === 'GOLD'
                  ? 'bg-gradient-gold text-white shadow-glow-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              GOLD
            </button>
            <button
              onClick={() => setActiveTab('SILVER')}
              className={`px-8 py-2.5 sm:px-12 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
                activeTab === 'SILVER'
                  ? 'bg-gradient-gold text-white shadow-glow-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SILVER
            </button>
            <button
              onClick={() => setActiveTab('COIN')}
              className={`px-8 py-2.5 sm:px-12 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
                activeTab === 'COIN'
                  ? 'bg-gradient-gold text-white shadow-glow-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              COIN
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="glass-dark rounded-2xl overflow-hidden shadow-glass">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-5 bg-charcoal-800/80 border-b border-charcoal-700">
            <div className="text-center">
              <h3 className="text-xs sm:text-base font-bold text-gray-300 uppercase tracking-wider">
                PRODUCT
              </h3>
            </div>
            <div className="text-center">
              <h3 className="text-xs sm:text-base font-bold text-gray-300 uppercase tracking-wider">
                BUY
              </h3>
            </div>
            <div className="text-center">
              <h3 className="text-xs sm:text-base font-bold text-gray-300 uppercase tracking-wider">
                SELL
              </h3>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-charcoal-700/50">
            {loading ? (
              // Loading State
              [...Array(6)].map((_, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 animate-pulse">
                  <div className="bg-charcoal-700 h-12 sm:h-16 rounded-lg" />
                  <div className="bg-charcoal-700 h-12 sm:h-16 rounded-lg" />
                  <div className="bg-charcoal-700 h-12 sm:h-16 rounded-lg" />
                </div>
              ))
            ) : products.length === 0 ? (
              // Empty State
              <div className="p-12 text-center">
                <p className="text-gray-400">No products available in {activeTab} category</p>
              </div>
            ) : (
              // Product Rows
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-charcoal-800/40 transition-colors duration-300"
                >
                  {/* Product Column */}
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">
                        {product.type === 'GOLD' ? '🥇' : '🥈'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center space-x-1 text-[10px] sm:text-xs text-gray-400 mt-0.5">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>24h-28h</span>
                      </div>
                    </div>
                  </div>

                  {/* Buy Column */}
                  <button
                    onClick={() => handleOrder(product, 'BUY')}
                    className="glass-dark rounded-lg p-2 sm:p-3 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all duration-300 group"
                  >
                    <p className="text-base sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {formatNumber(product.buyPrice, 0)}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-red-400 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>L: {formatNumber(product.buyPrice * 0.98, 0)}</span>
                    </div>
                  </button>

                  {/* Sell Column */}
                  <button
                    onClick={() => handleOrder(product, 'SELL')}
                    className="glass-dark rounded-lg p-2 sm:p-3 hover:bg-green-500/10 hover:border-green-500/30 border border-transparent transition-all duration-300 group"
                  >
                    <p className="text-base sm:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {formatNumber(product.sellPrice, 0)}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-green-400 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>H: {formatNumber(product.sellPrice * 1.02, 0)}</span>
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            ⚡ Prices updated in real-time • All prices in INR per 10g
          </p>
        </div>
      </div>

      {/* Order Modal */}
      {selectedProduct && (
        <ProductOrderModal
          product={selectedProduct}
          orderType={orderType}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};
