import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, Filter, ChevronDown } from 'lucide-react';

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  flag: string;
  event: string;
  importance: 'high' | 'medium' | 'low';
  actual: string;
  forecast: string;
  previous: string;
}

interface EconomicCalendarProps {
  theme?: 'dark' | 'light';
}

export function EconomicCalendar({ theme = 'dark' }: EconomicCalendarProps) {
  const [selectedDate, setSelectedDate] = useState('26 Dec, 2025');
  const [filterImportance, setFilterImportance] = useState<string>('all');
  const [filterCurrency, setFilterCurrency] = useState<string>('all');
  
  const events: EconomicEvent[] = [
    {
      id: '1',
      time: '5:00',
      currency: 'JPY',
      flag: '🇯🇵',
      event: 'Jobs to Applicants Ratio',
      importance: 'low',
      actual: '1.18',
      forecast: '1.18',
      previous: '1.18'
    },
    {
      id: '2',
      time: '5:20',
      currency: 'JPY',
      flag: '🇯🇵',
      event: 'Retail Sales m/m',
      importance: 'high',
      actual: 'N/D',
      forecast: '-',
      previous: '-'
    },
    {
      id: '3',
      time: '5:20',
      currency: 'JPY',
      flag: '🇯🇵',
      event: 'Retail Sales y/y',
      importance: 'low',
      actual: 'N/D',
      forecast: '-',
      previous: '-'
    },
    {
      id: '4',
      time: '5:20',
      currency: 'JPY',
      flag: '🇯🇵',
      event: 'Large Retailer\'s Sales y/y',
      importance: 'medium',
      actual: 'N/D',
      forecast: '-',
      previous: '-'
    },
    {
      id: '5',
      time: '5:20',
      currency: 'JPY',
      flag: '🇯🇵',
      event: 'Industrial Production m/m',
      importance: 'medium',
      actual: 'N/D',
      forecast: '-',
      previous: '-'
    },
    {
      id: '6',
      time: '17:00',
      currency: 'INR',
      flag: '🇮🇳',
      event: 'Bank Loan Growth y/y',
      importance: 'low',
      actual: 'N/D',
      forecast: '11.7%',
      previous: '11.5%'
    },
    {
      id: '7',
      time: '17:00',
      currency: 'INR',
      flag: '🇮🇳',
      event: 'Deposit Growth y/y',
      importance: 'low',
      actual: 'N/D',
      forecast: '10.1%',
      previous: '10.2%'
    },
    {
      id: '8',
      time: '17:00',
      currency: 'INR',
      flag: '🇮🇳',
      event: 'Foreign Exchange Reserves',
      importance: 'low',
      actual: 'N/D',
      forecast: '$702.918 B',
      previous: '$688.949 B'
    },
    {
      id: '9',
      time: '23:00',
      currency: 'BRL',
      flag: '🇧🇷',
      event: 'Foreign Exchange Flows',
      importance: 'low',
      actual: 'N/D',
      forecast: '-',
      previous: '-'
    },
    {
      id: '10',
      time: '23:30',
      currency: 'USD',
      flag: '🇺🇸',
      event: 'Baker Hughes US Oil Rig Count',
      importance: 'medium',
      actual: 'N/D',
      forecast: '-',
      previous: '406'
    },
    {
      id: '11',
      time: '23:30',
      currency: 'USD',
      flag: '🇺🇸',
      event: 'Baker Hughes US Total Rig Count',
      importance: 'medium',
      actual: 'N/D',
      forecast: '-',
      previous: '542'
    },
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const filteredEvents = events.filter(event => {
    if (filterImportance !== 'all' && event.importance !== filterImportance) return false;
    if (filterCurrency !== 'all' && event.currency !== filterCurrency) return false;
    return true;
  });

  const currencies = Array.from(new Set(events.map(e => e.currency)));

  return (
    <section className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#FFD700]" />
            <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Live Economic Data</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
            Economic <span className="gold-text">Calendar</span>
          </h1>
          <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
            Track key economic events and indicators affecting gold & silver markets
          </p>
        </div>

        {/* Date and Time Header */}
        <div className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Date</p>
              <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{selectedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Current Time</p>
              <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>20:13 (GMT +5:30)</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6`}>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#FFD700]" />
            <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Filters</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Importance Filter */}
            <div>
              <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                Importance
              </label>
              <select
                value={filterImportance}
                onChange={(e) => setFilterImportance(e.target.value)}
                className={`w-full px-4 py-2 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:border-[#FFD700]/50'
                    : 'bg-white border-gray-300 text-black focus:border-[#FFD700]'
                } outline-none`}
              >
                <option value="all">All Events</option>
                <option value="high">High Impact</option>
                <option value="medium">Medium Impact</option>
                <option value="low">Low Impact</option>
              </select>
            </div>

            {/* Currency Filter */}
            <div>
              <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                Currency
              </label>
              <select
                value={filterCurrency}
                onChange={(e) => setFilterCurrency(e.target.value)}
                className={`w-full px-4 py-2 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:border-[#FFD700]/50'
                    : 'bg-white border-gray-300 text-black focus:border-[#FFD700]'
                } outline-none`}
              >
                <option value="all">All Currencies</option>
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>

            {/* Legend */}
            <div>
              <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                Impact Legend
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className={`text-xs ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className={`text-xs ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className={`text-xs ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className={`glass-card rounded-2xl sm:rounded-3xl overflow-hidden`}>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                    Time
                  </th>
                  <th className={`px-6 py-4 text-left text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                    Currency
                  </th>
                  <th className={`px-6 py-4 text-left text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                    Event
                  </th>
                  <th className={`px-6 py-4 text-center text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                    Actual
                  </th>
                  <th className={`px-6 py-4 text-center text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                    Forecast
                  </th>
                  <th className={`px-6 py-4 text-center text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                    Previous
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`border-t transition-colors ${
                      theme === 'dark'
                        ? 'border-white/10 hover:bg-white/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {event.time}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getImportanceColor(event.importance)}`}></div>
                        <span className="text-xl">{event.flag}</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>
                          {event.currency}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {event.event}
                    </td>
                    <td className={`px-6 py-4 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {event.actual}
                    </td>
                    <td className={`px-6 py-4 text-center ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                      {event.forecast}
                    </td>
                    <td className={`px-6 py-4 text-center ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                      {event.previous}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getImportanceColor(event.importance)}`}></div>
                    <span className="text-xl">{event.flag}</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>
                      {event.currency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FFD700]" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {event.time}
                    </span>
                  </div>
                </div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {event.event}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Actual
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {event.actual}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Forecast
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                      {event.forecast}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                      Previous
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                      {event.previous}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-white/20' : 'text-gray-300'}`} />
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                No events found for selected filters
              </p>
            </div>
          )}
        </div>

        {/* Info Notice */}
        <div className={`mt-6 p-4 rounded-xl ${
          theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
        }`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
            ℹ️ <strong>Note:</strong> Economic calendar events are updated in real-time. High-impact events (red indicator) may cause significant price movements in gold and silver markets.
          </p>
        </div>
      </div>
    </section>
  );
}
