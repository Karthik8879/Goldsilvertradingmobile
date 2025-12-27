import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Holding {
  id: string;
  metal: 'Gold' | 'Silver';
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
}

interface Transaction {
  id: string;
  type: 'Buy' | 'Sell';
  metal: string;
  quantity: number;
  price: number;
  date: string;
}

export function Dashboard() {
  const holdings: Holding[] = [
    { id: '1', metal: 'Gold', quantity: 50, avgBuyPrice: 6200, currentPrice: 6289 },
    { id: '2', metal: 'Silver', quantity: 500, avgBuyPrice: 75.50, currentPrice: 76.50 }
  ];
  
  const transactions: Transaction[] = [
    { id: '1', type: 'Buy', metal: 'Gold 999', quantity: 25, price: 6250, date: '2024-12-24' },
    { id: '2', type: 'Sell', metal: 'Silver 999', quantity: 100, price: 75.20, date: '2024-12-23' },
    { id: '3', type: 'Buy', metal: 'Gold 995', quantity: 25, price: 6205, date: '2024-12-22' },
    { id: '4', type: 'Buy', metal: 'Silver 999', quantity: 200, price: 74.80, date: '2024-12-21' },
  ];
  
  const calculatePL = (holding: Holding) => {
    const pl = (holding.currentPrice - holding.avgBuyPrice) * holding.quantity;
    const plPercent = ((holding.currentPrice - holding.avgBuyPrice) / holding.avgBuyPrice) * 100;
    return { pl, plPercent };
  };
  
  const totalPortfolioValue = holdings.reduce((sum, h) => sum + (h.currentPrice * h.quantity), 0);
  const totalInvestment = holdings.reduce((sum, h) => sum + (h.avgBuyPrice * h.quantity), 0);
  const totalPL = totalPortfolioValue - totalInvestment;
  const totalPLPercent = (totalPL / totalInvestment) * 100;
  
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="mb-12">
        <h2 className="text-white mb-2">My Dashboard</h2>
        <p className="text-white/60 text-lg">Track your portfolio and transactions</p>
      </div>
      
      {/* Portfolio Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="col-span-2 border-[#FFD700]/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Total Portfolio Value</span>
              <Wallet className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl text-white">₹{totalPortfolioValue.toFixed(2)}</span>
            </div>
            <div className={`flex items-center gap-2 ${totalPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPL >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>₹{Math.abs(totalPL).toFixed(2)} ({totalPL >= 0 ? '+' : ''}{totalPLPercent.toFixed(2)}%)</span>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-4">
            <span className="text-white/60">Total Investment</span>
            <div className="text-2xl text-white">₹{totalInvestment.toFixed(2)}</div>
            <Badge variant="gold">Active</Badge>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-4">
            <span className="text-white/60">Wallet Balance</span>
            <div className="text-2xl text-white">₹25,000</div>
            <button className="text-[#FFD700] text-sm">Add Funds</button>
          </div>
        </Card>
      </div>
      
      {/* Holdings */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-white mb-6">Current Holdings</h3>
          <div className="space-y-4">
            {holdings.map((holding) => {
              const { pl, plPercent } = calculatePL(holding);
              return (
                <Card key={holding.id} glowOnHover className="border-[#FFD700]/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white">{holding.metal}</h4>
                        <Badge variant={holding.metal === 'Gold' ? 'gold' : 'silver'}>
                          {holding.quantity}g
                        </Badge>
                      </div>
                      <p className="text-sm text-white/60">Avg Buy: ₹{holding.avgBuyPrice}</p>
                    </div>
                    <div className={`text-right ${pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="flex items-center gap-1 mb-1">
                        {pl >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%</span>
                      </div>
                      <p className="text-sm">₹{Math.abs(pl).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Current Value</span>
                      <span className="text-white">₹{(holding.currentPrice * holding.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Transaction History */}
        <div>
          <h3 className="text-white mb-6">Transaction History</h3>
          <Card className="border-[#FFD700]/20">
            <div className="space-y-4">
              {transactions.map((txn) => (
                <div 
                  key={txn.id}
                  className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      txn.type === 'Buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {txn.type === 'Buy' ? (
                        <ArrowDownRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-white">{txn.metal}</p>
                      <p className="text-sm text-white/60">{txn.quantity}g • {txn.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={txn.type === 'Buy' ? 'text-red-500' : 'text-green-500'}>
                      {txn.type === 'Buy' ? '-' : '+'}₹{(txn.price * txn.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-white/60">@₹{txn.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
