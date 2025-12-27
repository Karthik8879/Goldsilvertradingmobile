import React, { useState } from 'react';
import { Card } from './ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Generate mock data
const generateChartData = (basePrice: number, points: number) => {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < points; i++) {
    price = price + (Math.random() - 0.5) * 20;
    data.push({
      time: `${i}:00`,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000) + 500
    });
  }
  
  return data;
};

export function Charts() {
  const [selectedScript, setSelectedScript] = useState<'gold' | 'silver'>('gold');
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [timeframe, setTimeframe] = useState('1D');
  
  const goldData = generateChartData(2060, 24);
  const silverData = generateChartData(24, 24);
  
  const data = selectedScript === 'gold' ? goldData : silverData;
  const timeframes = ['1M', '5M', '15M', '1H', '1D'];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card px-4 py-2 rounded-lg">
          <p className="text-white">Price: ${payload[0].value}</p>
          <p className="text-white/60 text-sm">{payload[0].payload.time}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-white mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl">Interactive Charts</h2>
        <p className="text-white/60 text-sm sm:text-base lg:text-lg px-4">Real-time market analysis and trends</p>
      </div>
      
      <Card className="border-[#FFD700]/20">
        {/* Chart Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedScript('gold')}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                selectedScript === 'gold'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Gold
            </button>
            <button
              onClick={() => setSelectedScript('silver')}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                selectedScript === 'silver'
                  ? 'bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Silver
            </button>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg ${
                chartType === 'line' ? 'bg-white/10 text-[#FFD700]' : 'text-white/60'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-2 rounded-lg ${
                chartType === 'candlestick' ? 'bg-white/10 text-[#FFD700]' : 'text-white/60'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  timeframe === tf
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        {/* Current Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-4">
            <span className="text-4xl text-white">
              ${data[data.length - 1].price}
            </span>
            <span className="text-green-500 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +2.34%
            </span>
          </div>
          <p className="text-white/60 text-sm mt-1">
            {selectedScript === 'gold' ? 'Gold USD' : 'Silver USD'} • Last updated: Just now
          </p>
        </div>
        
        {/* Chart */}
        <div className="w-full" style={{ height: '400px', minHeight: '400px' }}>
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' ? (
              <LineChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  tick={{ fill: '#999' }}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fill: '#999' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#FFD700" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  tick={{ fill: '#999' }}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fill: '#999' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#FFD700" 
                  strokeWidth={2}
                  fill="url(#colorArea)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}