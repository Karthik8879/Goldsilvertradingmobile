import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceCardProps {
  name: string;
  price: number;
  change: number;
  type: string;
  currency: string;
}

export function PriceCard({ name, price, change, type, currency }: PriceCardProps) {
  const isPositive = change >= 0;
  const formattedPrice = currency === 'INR' 
    ? `₹${price.toFixed(2)}` 
    : `$${price.toFixed(2)}`;

  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FFD700]/50 transition-all hover:shadow-xl hover:shadow-yellow-500/10">
      {/* SPOT Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-white/60">{name}</span>
        <span className="px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-xs text-[#FFD700]">
          {type}
        </span>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="text-3xl text-white tabular-nums">{formattedPrice}</div>
      </div>

      {/* Change */}
      <div className={`flex items-center gap-2 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPositive ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )}
        <span className="text-sm">
          {isPositive ? '+' : ''}{change.toFixed(2)}
        </span>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFD700]/0 to-[#FFA500]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFA500]/5 transition-all pointer-events-none"></div>
    </div>
  );
}
