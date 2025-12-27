import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Download, Search, Filter, Clock, CheckCircle, XCircle, BarChart3, FileText } from 'lucide-react';

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

interface Order {
  id: string;
  deal: string;
  login: string;
  time: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  margin?: number;
  tradeFrom?: string;
}

export function TradingTerminal({ theme, showAccountDetails, setShowAccountDetails, showSymbolProperty, setShowSymbolProperty, showProfile, setShowProfile }: TradingTerminalProps) {
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'gold' | 'silver' | 'coin'>('all');
  const [showTradeSuccess, setShowTradeSuccess] = useState(false);
  const [showTradeRejected, setShowTradeRejected] = useState(false);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL' | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // All Products - Same as website
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

  const pendingOrders: Order[] = [];
  const openOrders: Order[] = [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(price);
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(product => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'coin') return product.category === 'goldcoin' || product.category === 'silvercoin';
    return product.category === categoryFilter;
  });

  return (
    <div className={`min-h-screen pt-24 pb-8 px-4 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Trading <span className="gold-text">Terminal</span>
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                Hello, KnightHusky
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className={`rounded-2xl border p-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20' 
              : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Balance</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>₹0.00</p>
          </div>

          <div className={`rounded-2xl border p-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Used Margin</span>
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>₹0.00</p>
          </div>

          <div className={`rounded-2xl border p-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/5 border-[#FFD700]/20' 
              : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Free Margin</span>
              <Clock className="w-4 h-4 text-[#FFD700]" />
            </div>
            <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>0</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Product List */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl border overflow-hidden ${
              theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
              {/* Market Watch Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-3">
                <p className="text-white text-xs text-center">
                  Market Watch - {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>

              {/* Column Headers */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 grid grid-cols-[1fr_80px_80px] gap-2">
                <div className="text-white text-xs uppercase">Symbol</div>
                <div className="text-white text-xs uppercase text-center">Bid</div>
                <div className="text-white text-xs uppercase text-center">Ask</div>
              </div>

              {/* Category Filter */}
              <div className={`px-4 py-3 border-b ${
                theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      categoryFilter === 'all'
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                        : theme === 'dark'
                        ? 'bg-white/5 text-white/70 hover:bg-white/10'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCategoryFilter('gold')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      categoryFilter === 'gold'
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                        : theme === 'dark'
                        ? 'bg-white/5 text-white/70 hover:bg-white/10'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Gold
                  </button>
                  <button
                    onClick={() => setCategoryFilter('silver')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      categoryFilter === 'silver'
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                        : theme === 'dark'
                        ? 'bg-white/5 text-white/70 hover:bg-white/10'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Silver
                  </button>
                  <button
                    onClick={() => setCategoryFilter('coin')}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      categoryFilter === 'coin'
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                        : theme === 'dark'
                        ? 'bg-white/5 text-white/70 hover:bg-white/10'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Coin
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className={`px-4 py-3 border-b ${
                theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white placeholder-white/40'
                        : 'bg-white border-gray-200 text-black placeholder-gray-400'
                    } outline-none focus:border-[#FFD700]/50`}
                  />
                </div>
              </div>

              {/* Product List */}
              <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full px-4 py-3 border-b transition-all text-left ${
                      selectedProduct?.id === product.id
                        ? theme === 'dark'
                          ? 'bg-[#FFD700]/10 border-[#FFD700]/30'
                          : 'bg-yellow-50 border-yellow-300'
                        : theme === 'dark'
                        ? 'bg-[#1a1a1a] border-white/5 hover:bg-[#252525]'
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="grid grid-cols-[1fr_80px_80px] gap-2 items-start">
                      {/* Symbol Column */}
                      <div className="flex items-start gap-2">
                        <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedProduct?.id === product.id
                            ? 'border-[#FFD700]'
                            : theme === 'dark' ? 'border-white/30' : 'border-gray-300'
                        }`}>
                          {selectedProduct?.id === product.id && (
                            <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs uppercase leading-tight mb-1 ${
                            theme === 'dark' ? 'text-white/90' : 'text-gray-800'
                          }`}>
                            {product.name}
                          </p>
                          <p className="text-[10px] text-[#FFD700]">
                            Time: {new Date().toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit', 
                              second: '2-digit',
                              hour12: true 
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Bid Column */}
                      <div className="text-center">
                        <p className={`text-sm font-medium mb-0.5 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          {product.buyPrice.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] text-gray-400">
                          H: {Math.round(product.buyPrice * 1.02).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] text-gray-400">
                          L: {Math.round(product.buyPrice * 0.98).toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Ask Column */}
                      <div className="text-center">
                        <p className={`text-sm font-medium mb-0.5 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          {product.sellPrice.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] text-gray-400">
                          H: {Math.round(product.sellPrice * 1.02).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] text-gray-400">
                          L: {Math.round(product.sellPrice * 0.98).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Orders */}
          <div className="lg:col-span-6">
            {/* Date Filter */}
            <div className={`rounded-2xl border p-4 mb-4 ${
              theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs mb-2 ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white [color-scheme:dark]'
                        : 'bg-gray-50 border-gray-200 text-black'
                    } outline-none focus:border-[#FFD700]/50`}
                  />
                </div>
                <div>
                  <label className={`block text-xs mb-2 ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white [color-scheme:dark]'
                        : 'bg-gray-50 border-gray-200 text-black'
                    } outline-none focus:border-[#FFD700]/50`}
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={`rounded-2xl border mb-6 ${
              theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('open')}
                  className={`flex-1 px-6 py-3 text-sm transition-all ${
                    activeTab === 'open'
                      ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
                      : theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setActiveTab('closed')}
                  className={`flex-1 px-6 py-3 text-sm transition-all ${
                    activeTab === 'closed'
                      ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
                      : theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}
                >
                  Closed
                </button>
              </div>

              <div className="overflow-x-auto max-h-[250px] overflow-y-auto custom-scrollbar">
                <table className="w-full">
                  <thead className={`sticky top-0 ${
                    theme === 'dark' ? 'bg-[#FFD700]/5' : 'bg-yellow-50'
                  }`}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>Symbol</th>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>B/S</th>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>Qty</th>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center">
                        <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          {activeTab === 'open' ? 'No Open Orders' : 'No Closed Orders'}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Orders */}
            <div className={`rounded-2xl border mb-6 ${
              theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Pending Orders</h3>
                <button className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  theme === 'dark'
                    ? 'border-white/10 text-white/70 hover:bg-white/5'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Download className="w-4 h-4 inline mr-2" />
                  Export to Excel
                </button>
              </div>
              <div className="overflow-x-auto max-h-[250px] overflow-y-auto custom-scrollbar">
                <table className="w-full">
                  <thead className={`${
                    theme === 'dark' ? 'bg-[#FFD700]/5' : 'bg-yellow-50'
                  }`}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>Symbol</th>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>B/S</th>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>Qty</th>
                      <th className={`px-4 py-3 text-left text-xs ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center">
                        <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                          No Pending Orders
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Trading Panel */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl border p-6 sticky top-24 ${
              theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
              {/* New Order Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  New Order
                </h3>
              </div>

              {/* Order Type Toggle */}
              <div className={`flex gap-2 p-1 rounded-xl mb-6 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
              }`}>
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2.5 rounded-lg text-sm transition-all ${
                    orderType === 'market'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-lg'
                      : theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-2.5 rounded-lg text-sm transition-all ${
                    orderType === 'limit'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-lg'
                      : theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}
                >
                  Limit
                </button>
              </div>

              {/* Symbol Selection */}
              <div className="mb-6">
                <label className={`block text-sm mb-2 ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Symbol
                </label>
                <select
                  value={selectedProduct?.name || ''}
                  onChange={(e) => setSelectedProduct(allProducts.find(p => p.name === e.target.value) || null)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-black'
                  } outline-none focus:border-[#FFD700]/50`}
                >
                  <option value="">Select a product</option>
                  {allProducts.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className={`block text-sm mb-2 ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-black'
                  } outline-none focus:border-[#FFD700]/50`}
                />
              </div>

              {/* Price Display */}
              {selectedProduct && (
                <div className={`rounded-xl p-4 mb-6 ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Buy Price
                    </span>
                    <span className={`text-lg ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      ₹{selectedProduct.buyPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Sell Price
                    </span>
                    <span className={`text-lg ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                      ₹{selectedProduct.sellPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    if (!selectedProduct) {
                      setShowTradeRejected(true);
                      return;
                    }
                    setTradeType('SELL');
                    setShowTradeSuccess(true);
                  }}
                  className="py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-xl hover:shadow-red-500/50 transition-all"
                >
                  SELL
                </button>
                <button 
                  onClick={() => {
                    if (!selectedProduct) {
                      setShowTradeRejected(true);
                      return;
                    }
                    setTradeType('BUY');
                    setShowTradeSuccess(true);
                  }}
                  className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl hover:shadow-green-500/50 transition-all"
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Modal */}
        {showAccountDetails && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowAccountDetails(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl ${
                theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Account Details
                  </h2>
                  <button
                    onClick={() => setShowAccountDetails(false)}
                    className={`p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-black'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Account Balance</p>
                      <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>₹0.00</p>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Available Margin</p>
                      <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>₹0.00</p>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Used Margin</p>
                      <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>₹0.00</p>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Total P&L</p>
                      <p className={`text-2xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>₹0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Profile Modal */}
        {showProfile && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowProfile(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl ${
                theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Profile
                  </h2>
                  <button
                    onClick={() => setShowProfile(false)}
                    className={`p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-black'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                      <span className="text-3xl text-black">KH</span>
                    </div>
                    <div>
                      <h3 className={`text-xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>KnightHusky</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Premium Trader</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Authorised Name</label>
                      <input 
                        type="text" 
                        value="KnightHusky"
                        readOnly
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-black'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Company Name</label>
                      <input 
                        type="text" 
                        value="GoldJar Trading"
                        readOnly
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-black'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Mobile Number</label>
                      <input 
                        type="text" 
                        value="+91 98765 43210"
                        readOnly
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-black'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Symbol Property Modal */}
        {showSymbolProperty && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowSymbolProperty(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl ${
                theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Symbol Property
                  </h2>
                  <button
                    onClick={() => setShowSymbolProperty(false)}
                    className={`p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-black'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  {selectedProduct ? (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Symbol Name</p>
                        <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{selectedProduct.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Bid Price</p>
                          <p className={`text-xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>₹{selectedProduct.buyPrice.toLocaleString('en-IN')}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Ask Price</p>
                          <p className={`text-xl ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>₹{selectedProduct.sellPrice.toLocaleString('en-IN')}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Type</p>
                          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{selectedProduct.type}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Purity</p>
                          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{selectedProduct.purity}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Category</p>
                          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{selectedProduct.category}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Change</p>
                          <p className={`text-lg ${
                            selectedProduct.change >= 0
                              ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                              : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                          }`}>
                            {selectedProduct.change >= 0 ? '+' : ''}{selectedProduct.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                        Please select a symbol from the market watch
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}