'use client';

import React, { useState } from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { BuyModal } from '@/components/modals/BuyModal';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  type: 'Retail' | 'RTGS' | 'GST';
  purity: '995' | '999';
  buyPrice: number;
  sellPrice: number;
  change: number;
}

interface ProductsProps {
  theme: 'dark' | 'light';
}

export function Products({ theme }: ProductsProps) {
  const [activeTab, setActiveTab] = useState<'gold' | 'silver' | 'coin'>('gold');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Product images
  const goldImage = "https://images.unsplash.com/photo-1634979149913-430f1ee6fa2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYmFyJTIwYnVsbGlvbnxlbnwxfHx8fDE3NjY4MjE4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const silverImage = "https://images.unsplash.com/photo-1641324113963-073b4b8dc86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBiYXIlMjBidWxsaW9ufGVufDF8fHx8MTc2NjgyNDQ4OXww&ixlib=rb-4.1.0&q=80&w=1080";
  const goldCoinImage = "https://images.unsplash.com/photo-1643393669656-3c4548dd5aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY29pbiUyMGJ1bGxpb258ZW58MXx8fHwxNzY2ODI1NzkyfDA&ixlib=rb-4.1.0&q=80&w=1080";
  const silverCoinImage = "https://images.unsplash.com/photo-1643393669656-3c4548dd5aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBjb2luJTIwYnVsbGlvbnxlbnwxfHx8fDE3NjY4MjU3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
  
  const goldProducts: Product[] = [
    { id: '1', name: 'Gold Retail 999', type: 'Retail', purity: '999', buyPrice: 6289, sellPrice: 6250, change: 1.2 },
    { id: '2', name: 'Gold RTGS 999', type: 'RTGS', purity: '999', buyPrice: 6285, sellPrice: 6246, change: 1.1 },
    { id: '3', name: 'Gold GST 999', type: 'GST', purity: '999', buyPrice: 6292, sellPrice: 6253, change: 1.3 },
    { id: '4', name: 'Gold Retail 995', type: 'Retail', purity: '995', buyPrice: 6245, sellPrice: 6206, change: 1.0 },
    { id: '5', name: 'Gold RTGS 995', type: 'RTGS', purity: '995', buyPrice: 6241, sellPrice: 6202, change: 0.9 },
    { id: '6', name: 'Gold GST 995', type: 'GST', purity: '995', buyPrice: 6248, sellPrice: 6209, change: 1.1 },
  ];
  
  const silverProducts: Product[] = [
    { id: '1', name: 'Silver Retail 999', type: 'Retail', purity: '999', buyPrice: 76.50, sellPrice: 75.20, change: -0.5 },
    { id: '2', name: 'Silver RTGS 999', type: 'RTGS', purity: '999', buyPrice: 76.45, sellPrice: 75.15, change: -0.4 },
    { id: '3', name: 'Silver GST 999', type: 'GST', purity: '999', buyPrice: 76.55, sellPrice: 75.25, change: -0.6 },
    { id: '4', name: 'Silver Retail 995', type: 'Retail', purity: '995', buyPrice: 76.20, sellPrice: 74.90, change: -0.3 },
    { id: '5', name: 'Silver RTGS 995', type: 'RTGS', purity: '995', buyPrice: 76.15, sellPrice: 74.85, change: -0.2 },
    { id: '6', name: 'Silver GST 995', type: 'GST', purity: '995', buyPrice: 76.25, sellPrice: 74.95, change: -0.4 },
  ];
  
  const goldCoinProducts: Product[] = [
    { id: '1', name: 'Gold Coin 5g', type: 'Retail', purity: '999', buyPrice: 31450, sellPrice: 31200, change: 1.5 },
    { id: '2', name: 'Gold Coin 10g', type: 'Retail', purity: '999', buyPrice: 62900, sellPrice: 62400, change: 1.4 },
    { id: '3', name: 'Gold Coin 20g', type: 'Retail', purity: '999', buyPrice: 125800, sellPrice: 124800, change: 1.6 },
  ];

  const silverCoinProducts: Product[] = [
    { id: '4', name: 'Silver Coin 50g', type: 'Retail', purity: '999', buyPrice: 3825, sellPrice: 3760, change: -0.3 },
    { id: '5', name: 'Silver Coin 100g', type: 'Retail', purity: '999', buyPrice: 7650, sellPrice: 7520, change: -0.5 },
    { id: '6', name: 'Silver Coin 500g', type: 'Retail', purity: '999', buyPrice: 38250, sellPrice: 37600, change: -0.4 },
  ];

  const coinProducts = [...goldCoinProducts, ...silverCoinProducts];
  
  const products = activeTab === 'gold' ? goldProducts : 
                   activeTab === 'silver' ? silverProducts : 
                   coinProducts;

  const currentImage = activeTab === 'gold' ? goldImage : 
                       activeTab === 'silver' ? silverImage : 
                       activeTab === 'coin' ? goldCoinImage : silverCoinImage;
  
  const handleOrder = (product: Product, type: 'BUY' | 'SELL') => {
    setSelectedProduct(product);
    setOrderType(type);
    setIsModalOpen(true);
  };
  
  return (
    <section id="products" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Live <span className="text-gradient-gold">Trading Prices</span>
        </h2>
        <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time market rates for premium gold & silver
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <div className="glass-card rounded-full p-1.5 inline-flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('gold')}
            className={`px-6 py-2 sm:px-12 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'gold'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`
            }`}
          >
            GOLD
          </button>
          <button
            onClick={() => setActiveTab('silver')}
            className={`px-6 py-2 sm:px-12 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'silver'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`
            }`}
          >
            SILVER
          </button>
          <button
            onClick={() => setActiveTab('coin')}
            className={`px-6 py-2 sm:px-12 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'coin'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`
            }`}
          >
            COIN
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className={`grid grid-cols-[2fr_1fr_1fr] gap-2 sm:gap-4 p-4 sm:p-5 border-b ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'
        }`}>
          <div className="text-left pl-4">
            <h3 className={`text-xs sm:text-base uppercase tracking-wider ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              PRODUCT
            </h3>
          </div>
          <div className="text-center">
            <h3 className={`text-xs sm:text-base uppercase tracking-wider ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              BUY
            </h3>
          </div>
          <div className="text-center">
            <h3 className={`text-xs sm:text-base uppercase tracking-wider ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              SELL
            </h3>
          </div>
        </div>

        {/* Table Body */}
        {activeTab === 'coin' ? (
          <div>
            {/* Gold Coins Section */}
            <div className={`px-4 sm:px-6 py-3 bg-gradient-to-r from-[#FFD700]/10 to-transparent border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <h4 className="text-sm sm:text-base text-gradient-gold uppercase tracking-wider flex items-center">
                <span className="mr-2">🪙</span> Gold Coins
              </h4>
            </div>
            <div className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-200'}`}>
              {goldCoinProducts.map((product) => (
                <div
                  key={product.id}
                  className={`grid grid-cols-[2fr_1fr_1fr] gap-2 sm:gap-4 p-3 sm:p-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[#FFD700]/30">
                      <ImageWithFallback
                        src={goldCoinImage}
                        alt="gold coin"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm sm:text-base lg:text-lg truncate ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {product.name}
                      </p>
                      <div className={`flex items-center space-x-1 text-[10px] sm:text-xs mt-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>24h-28h</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrder(product, 'BUY')}
                    className={`rounded-lg p-2 sm:p-3 border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-transparent hover:bg-red-500/10 hover:border-red-500/30'
                        : 'bg-gray-50 border-transparent hover:bg-red-50 hover:border-red-200'
                    }`}
                  >
                    <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      ₹{product.buyPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-red-400 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>L: ₹{(product.buyPrice * 0.98).toFixed(0)}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleOrder(product, 'SELL')}
                    className={`rounded-lg p-2 sm:p-3 border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-transparent hover:bg-green-500/10 hover:border-green-500/30'
                        : 'bg-gray-50 border-transparent hover:bg-green-50 hover:border-green-200'
                    }`}
                  >
                    <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      ₹{product.sellPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-green-400 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>H: ₹{(product.sellPrice * 1.02).toFixed(0)}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Silver Coins Section */}
            <div className={`px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-400/10 to-transparent border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <h4 className={`text-sm sm:text-base uppercase tracking-wider flex items-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="mr-2">🪙</span> Silver Coins
              </h4>
            </div>
            <div className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-200'}`}>
              {silverCoinProducts.map((product) => (
                <div
                  key={product.id}
                  className={`grid grid-cols-[2fr_1fr_1fr] gap-2 sm:gap-4 p-3 sm:p-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[#FFD700]/30">
                      <ImageWithFallback
                        src={silverCoinImage}
                        alt="silver coin"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm sm:text-base lg:text-lg truncate ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {product.name}
                      </p>
                      <div className={`flex items-center space-x-1 text-[10px] sm:text-xs mt-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>24h-28h</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrder(product, 'BUY')}
                    className={`rounded-lg p-2 sm:p-3 border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-transparent hover:bg-red-500/10 hover:border-red-500/30'
                        : 'bg-gray-50 border-transparent hover:bg-red-50 hover:border-red-200'
                    }`}
                  >
                    <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      ₹{product.buyPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-red-400 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>L: ₹{(product.buyPrice * 0.98).toFixed(0)}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleOrder(product, 'SELL')}
                    className={`rounded-lg p-2 sm:p-3 border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-transparent hover:bg-green-500/10 hover:border-green-500/30'
                        : 'bg-gray-50 border-transparent hover:bg-green-50 hover:border-green-200'
                    }`}
                  >
                    <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      ₹{product.sellPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-green-400 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>H: ₹{(product.sellPrice * 1.02).toFixed(0)}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-200'}`}>
            {products.map((product) => (
              <div
                key={product.id}
                className={`grid grid-cols-[2fr_1fr_1fr] gap-2 sm:gap-4 p-3 sm:p-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[#FFD700]/30">
                    <ImageWithFallback
                      src={currentImage}
                      alt={`${activeTab} product`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm sm:text-base lg:text-lg truncate ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {product.name}
                    </p>
                    <div className={`flex items-center space-x-1 text-[10px] sm:text-xs mt-0.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>24h-28h</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOrder(product, 'BUY')}
                  className={`rounded-lg p-2 sm:p-3 border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-transparent hover:bg-red-500/10 hover:border-red-500/30'
                      : 'bg-gray-50 border-transparent hover:bg-red-50 hover:border-red-200'
                  }`}
                >
                  <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    ₹{product.buyPrice.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-red-400 mt-1">
                    <TrendingDown className="w-3 h-3" />
                    <span>L: ₹{(product.buyPrice * 0.98).toFixed(0)}</span>
                  </div>
                </button>

                <button
                  onClick={() => handleOrder(product, 'SELL')}
                  className={`rounded-lg p-2 sm:p-3 border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-transparent hover:bg-green-500/10 hover:border-green-500/30'
                      : 'bg-gray-50 border-transparent hover:bg-green-50 hover:border-green-200'
                  }`}
                >
                  <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    ₹{product.sellPrice.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-xs text-green-400 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>H: ₹{(product.sellPrice * 1.02).toFixed(0)}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center">
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          ⚡ Prices updated in real-time • All prices in INR per gram
        </p>
      </div>

      {/* Buy/Sell Modal */}
      {selectedProduct && (
        <BuyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName={selectedProduct.name}
          productType={orderType}
          price={orderType === 'BUY' ? selectedProduct.buyPrice : selectedProduct.sellPrice}
          theme={theme}
        />
      )}
    </section>
  );
}
