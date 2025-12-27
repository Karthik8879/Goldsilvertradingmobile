'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TradingTerminalProps {
  theme: 'dark' | 'light';
  showAccountDetails: boolean;
  setShowAccountDetails: (show: boolean) => void;
  showSymbolProperty: boolean;
  setShowSymbolProperty: (show: boolean) => void;
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
}

interface Product {
  id: string;
  name: string;
  type: 'Retail' | 'RTGS' | 'GST';
  purity: '995' | '999';
  buyPrice: number;
  sellPrice: number;
  change: number;
  category: 'gold' | 'silver' | 'goldcoin' | 'silvercoin';
}

export function TradingTerminal({ theme }: TradingTerminalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'gold' | 'silver' | 'coin'>('all');

  const allProducts: Product[] = [
    // Gold Products
    { id: 'g1', name: 'Gold Retail 999', type: 'Retail', purity: '999', buyPrice: 6289, sellPrice: 6250, change: 1.2, category: 'gold' },
    { id: 'g2', name: 'Gold RTGS 999', type: 'RTGS', purity: '999', buyPrice: 6285, sellPrice: 6246, change: 1.1, category: 'gold' },
    { id: 'g3', name: 'Gold GST 999', type: 'GST', purity: '999', buyPrice: 6292, sellPrice: 6253, change: 1.3, category: 'gold' },
    { id: 'g4', name: 'Gold Retail 995', type: 'Retail', purity: '995', buyPrice: 6245, sellPrice: 6206, change: 1.0, category: 'gold' },
    { id: 'g5', name: 'Gold RTGS 995', type: 'RTGS', purity: '995', buyPrice: 6241, sellPrice: 6202, change: 0.9, category: 'gold' },
    { id: 'g6', name: 'Gold GST 995', type: 'GST', purity: '995', buyPrice: 6248, sellPrice: 6209, change: 1.1, category: 'gold' },
    
    // Silver Products
    { id: 's1', name: 'Silver Retail 999', type: 'Retail', purity: '999', buyPrice: 76.50, sellPrice: 75.20, change: -0.5, category: 'silver' },
    { id: 's2', name: 'Silver RTGS 999', type: 'RTGS', purity: '999', buyPrice: 76.45, sellPrice: 75.15, change: -0.4, category: 'silver' },
    { id: 's3', name: 'Silver GST 999', type: 'GST', purity: '999', buyPrice: 76.55, sellPrice: 75.25, change: -0.6, category: 'silver' },
    { id: 's4', name: 'Silver Retail 995', type: 'Retail', purity: '995', buyPrice: 76.20, sellPrice: 74.90, change: -0.3, category: 'silver' },
    { id: 's5', name: 'Silver RTGS 995', type: 'RTGS', purity: '995', buyPrice: 76.15, sellPrice: 74.85, change: -0.2, category: 'silver' },
    { id: 's6', name: 'Silver GST 995', type: 'GST', purity: '995', buyPrice: 76.25, sellPrice: 74.95, change: -0.4, category: 'silver' },
    
    // Gold Coins
    { id: 'gc1', name: 'Gold Coin 5g', type: 'Retail', purity: '999', buyPrice: 31450, sellPrice: 31200, change: 1.5, category: 'goldcoin' },
    { id: 'gc2', name: 'Gold Coin 10g', type: 'Retail', purity: '999', buyPrice: 62900, sellPrice: 62400, change: 1.4, category: 'goldcoin' },
    { id: 'gc3', name: 'Gold Coin 20g', type: 'Retail', purity: '999', buyPrice: 125800, sellPrice: 124800, change: 1.6, category: 'goldcoin' },
    
    // Silver Coins
    { id: 'sc1', name: 'Silver Coin 50g', type: 'Retail', purity: '999', buyPrice: 3825, sellPrice: 3760, change: -0.3, category: 'silvercoin' },
    { id: 'sc2', name: 'Silver Coin 100g', type: 'Retail', purity: '999', buyPrice: 7650, sellPrice: 7520, change: -0.5, category: 'silvercoin' },
    { id: 'sc3', name: 'Silver Coin 500g', type: 'Retail', purity: '999', buyPrice: 38250, sellPrice: 37600, change: -0.4, category: 'silvercoin' },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(product => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'coin') return product.category === 'goldcoin' || product.category === 'silvercoin';
    return product.category === categoryFilter;
  });

  const handleTrade = (product: Product, type: 'BUY' | 'SELL') => {
    setSelectedProduct(product);
    alert(`${type} order for ${quantity}g of ${product.name} at ₹${type === 'BUY' ? product.buyPrice : product.sellPrice}/g`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1920px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Products List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-[#FFD700]/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-[#FFD700]" />
                  <h2 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Market Watch
                  </h2>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
                          : 'bg-white border-gray-200 text-black placeholder:text-gray-400'
                      } focus:outline-none focus:border-[#FFD700]/50`}
                    />
                  </div>

                  <div className="flex gap-2">
                    {['all', 'gold', 'silver', 'coin'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setCategoryFilter(filter as any)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          categoryFilter === filter
                            ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                            : theme === 'dark'
                            ? 'bg-white/5 text-white/60 hover:text-white'
                            : 'bg-gray-100 text-gray-600 hover:text-black'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                        <th className={`text-left py-3 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          Product
                        </th>
                        <th className={`text-center py-3 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          Buy
                        </th>
                        <th className={`text-center py-3 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          Sell
                        </th>
                        <th className={`text-center py-3 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          Change
                        </th>
                        <th className={`text-right py-3 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.id}
                          className={`border-b transition-colors ${
                            theme === 'dark'
                              ? 'border-white/5 hover:bg-white/5'
                              : 'border-gray-100 hover:bg-gray-50'
                          }`}
                        >
                          <td className="py-3">
                            <div>
                              <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                {product.name}
                              </p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`}>
                                {product.type} • {product.purity}
                              </p>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                              ₹{product.buyPrice.toLocaleString()}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                              ₹{product.sellPrice.toLocaleString()}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className={`text-sm flex items-center justify-center gap-1 ${
                              product.change >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {product.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {Math.abs(product.change)}%
                            </span>
                          </td>
                          <td className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleTrade(product, 'BUY')}
                                className="px-3 py-1 bg-green-500/20 text-green-500 rounded text-xs hover:bg-green-500/30 transition-colors"
                              >
                                BUY
                              </button>
                              <button
                                onClick={() => handleTrade(product, 'SELL')}
                                className="px-3 py-1 bg-red-500/20 text-red-500 rounded text-xs hover:bg-red-500/30 transition-colors"
                              >
                                SELL
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Panel */}
          <div className="space-y-4">
            <Card className="border-[#FFD700]/20">
              <div className="space-y-4">
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Quick Trade
                </h3>

                {selectedProduct ? (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {selectedProduct.name}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                        {selectedProduct.type} • {selectedProduct.purity}
                      </p>
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>
                        Quantity (grams)
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min={1}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-white/5 border-white/10 text-white'
                            : 'bg-white border-gray-200 text-black'
                        } focus:outline-none focus:border-[#FFD700]/50`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="primary"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleTrade(selectedProduct, 'BUY')}
                      >
                        BUY @ ₹{selectedProduct.buyPrice.toLocaleString()}
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleTrade(selectedProduct, 'SELL')}
                      >
                        SELL @ ₹{selectedProduct.sellPrice.toLocaleString()}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                    Select a product to trade
                  </p>
                )}
              </div>
            </Card>

            {/* Portfolio Summary */}
            <Card className="border-[#FFD700]/20">
              <div className="space-y-4">
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Portfolio Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Balance
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      ₹1,00,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Holdings
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      ₹2,50,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      P/L
                    </span>
                    <span className="text-green-500">
                      +₹12,500 (5.2%)
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
