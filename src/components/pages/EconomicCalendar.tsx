'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface EconomicCalendarProps {
  theme: 'dark' | 'light';
}

interface Event {
  id: number;
  time: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  forecast: string;
  previous: string;
}

export function EconomicCalendar({ theme }: EconomicCalendarProps) {
  const [selectedDate, setSelectedDate] = useState('26 Dec, 2025');

  const events: Event[] = [
    {
      id: 1,
      time: '10:30 AM',
      event: 'US GDP Growth Rate (Q4)',
      impact: 'high',
      forecast: '2.8%',
      previous: '2.6%'
    },
    {
      id: 2,
      time: '12:00 PM',
      event: 'Gold Reserves Report',
      impact: 'high',
      forecast: '---',
      previous: '21,200 tons'
    },
    {
      id: 3,
      time: '2:30 PM',
      event: 'Federal Reserve Statement',
      impact: 'high',
      forecast: 'No Change',
      previous: '5.25%'
    },
    {
      id: 4,
      time: '3:45 PM',
      event: 'Silver Production Data',
      impact: 'medium',
      forecast: '---',
      previous: '26,000 tons'
    },
    {
      id: 5,
      time: '5:00 PM',
      event: 'India Inflation Rate',
      impact: 'medium',
      forecast: '5.4%',
      previous: '5.6%'
    },
    {
      id: 6,
      time: '7:00 PM',
      event: 'Trade Balance Report',
      impact: 'low',
      forecast: '-$68B',
      previous: '-$65B'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-[#FFD700]';
      case 'low':
        return 'text-green-500';
      default:
        return theme === 'dark' ? 'text-white/60' : 'text-gray-600';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium':
        return 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30';
      case 'low':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Economic Calendar
        </h2>
        <p className={`text-base sm:text-lg ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          Track important economic events that impact precious metal prices
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Date Selector */}
        <Card className="border-[#FFD700]/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {selectedDate}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-white/5 text-white/60 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-black'
              }`}>
                Previous Day
              </button>
              <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg text-xs sm:text-sm">
                Today
              </button>
              <button className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-white/5 text-white/60 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-black'
              }`}>
                Next Day
              </button>
            </div>
          </div>
        </Card>

        {/* Info Banner */}
        <Card className={`border-blue-500/30 ${
          theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-50'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className={`text-xs sm:text-sm ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-700'
            }`}>
              <strong className={theme === 'dark' ? 'text-white' : 'text-black'}>Tip:</strong> High-impact events 
              can cause significant price volatility in gold and silver markets. Plan your trades accordingly.
            </p>
          </div>
        </Card>

        {/* Events List */}
        <div className="space-y-3 sm:space-y-4">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className={`border-white/10 hover:border-[#FFD700]/30 transition-all duration-300 cursor-pointer ${
                theme === 'dark' ? '' : 'hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Time */}
                <div className="flex items-center gap-2 sm:w-32 flex-shrink-0">
                  <Clock className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                  }`}>
                    {event.time}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <h4 className={`mb-1 sm:mb-2 text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {event.event}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                      Forecast: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        {event.forecast}
                      </span>
                    </span>
                    <span className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                      Previous: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        {event.previous}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Impact Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs uppercase border ${getImpactBadge(event.impact)}`}>
                    {event.impact}
                  </span>
                  <TrendingUp className={`w-4 h-4 ${getImpactColor(event.impact)}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className="border-[#FFD700]/20">
          <div>
            <h4 className={`mb-3 sm:mb-4 text-base sm:text-lg ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Impact Legend
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  High Impact - Major price movement expected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div>
                <span className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Medium Impact - Moderate price changes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Low Impact - Minor price fluctuations
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
