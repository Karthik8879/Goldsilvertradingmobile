import React from 'react';
import { Card } from './ui/Card';
import { Clock, TrendingUp } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'market' | 'analysis' | 'update';
}

export function News() {
  const news: NewsItem[] = [
    {
      id: '1',
      title: 'Gold Prices Surge Amid Global Economic Uncertainty',
      description: 'International gold prices reached a new high this week as investors seek safe-haven assets during market volatility.',
      timestamp: '2 hours ago',
      category: 'market'
    },
    {
      id: '2',
      title: 'Silver Demand Increases in Industrial Sector',
      description: 'Manufacturing sector drives silver prices higher with increased demand for electronics and solar panels.',
      timestamp: '5 hours ago',
      category: 'analysis'
    },
    {
      id: '3',
      title: 'Federal Reserve Policy Impact on Precious Metals',
      description: 'Recent Fed announcements suggest continued influence on gold and silver market trends.',
      timestamp: '1 day ago',
      category: 'update'
    },
    {
      id: '4',
      title: 'Investment Strategy: Diversifying with Bullion',
      description: 'Expert analysis on how gold and silver can provide portfolio stability during uncertain times.',
      timestamp: '1 day ago',
      category: 'analysis'
    },
    {
      id: '5',
      title: 'India Gold Imports Rise 25% This Quarter',
      description: 'Domestic demand for gold jewelry and investment bars shows strong growth in recent months.',
      timestamp: '2 days ago',
      category: 'market'
    },
    {
      id: '6',
      title: 'Central Banks Continue Gold Accumulation',
      description: 'Global central banks add to gold reserves as part of monetary policy diversification.',
      timestamp: '3 days ago',
      category: 'update'
    }
  ];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market':
        return 'text-green-500';
      case 'analysis':
        return 'text-blue-500';
      case 'update':
        return 'text-[#FFD700]';
      default:
        return 'text-white/60';
    }
  };
  
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-white mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl">Market News & Updates</h2>
        <p className="text-white/60 text-sm sm:text-base lg:text-lg px-4">Stay informed with the latest market insights</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {news.map((item) => (
          <Card key={item.id} glowOnHover className="cursor-pointer group">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className={`text-xs uppercase tracking-wider ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-white/40 text-xs whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </div>
              </div>
              
              <h4 className="text-white group-hover:text-[#FFD700] transition-colors text-base sm:text-lg">
                {item.title}
              </h4>
              
              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <button className="text-[#FFD700] text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Read More
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}