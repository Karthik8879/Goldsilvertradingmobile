import { ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';

interface ProductCardProps {
  name: string;
  purity: number;
  buyPrice: number;
  sellPrice: number;
  change: number;
  metal: 'GOLD' | 'SILVER';
  onBuyClick: () => void;
}

export function ProductCard({ name, purity, buyPrice, sellPrice, change, metal, onBuyClick }: ProductCardProps) {
  const isPositive = change >= 0;
  const borderColor = metal === 'GOLD' ? 'border-[#FFD700]/30' : 'border-[#C0C0C0]/30';
  const accentColor = metal === 'GOLD' ? 'text-[#FFD700]' : 'text-[#C0C0C0]';
  const gradientFrom = metal === 'GOLD' ? 'from-[#FFD700]' : 'from-[#C0C0C0]';
  const gradientTo = metal === 'GOLD' ? 'to-[#FFA500]' : 'to-[#A8A8A8]';

  return (
    <div className={`bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border ${borderColor} rounded-2xl p-6 hover:border-opacity-60 transition-all hover:shadow-xl hover:shadow-${metal === 'GOLD' ? 'yellow' : 'gray'}-500/10`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white mb-1">{name}</h3>
          <div className={`inline-block px-3 py-1 bg-${metal === 'GOLD' ? 'yellow' : 'gray'}-500/10 border border-${metal === 'GOLD' ? 'yellow' : 'gray'}-500/30 rounded-full text-xs ${accentColor}`}>
            {purity} Purity
          </div>
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
        </div>
      </div>

      {/* Prices */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Buy Price</span>
          <span className="text-xl text-white tabular-nums">₹{buyPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Sell Price</span>
          <span className="text-xl text-white tabular-nums">₹{sellPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Buy Button */}
      <button 
        onClick={onBuyClick}
        className={`w-full py-3 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl text-black hover:shadow-lg hover:shadow-${metal === 'GOLD' ? 'yellow' : 'gray'}-500/50 transition-all flex items-center justify-center gap-2`}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Buy Now</span>
      </button>
    </div>
  );
}
