import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function WorldClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timezone: string) => {
    return time.toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const timezones = [
    { name: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', code: 'IST' },
    { name: 'USA', flag: '🇺🇸', timezone: 'America/New_York', code: 'EST' },
    { name: 'UK', flag: '🇬🇧', timezone: 'Europe/London', code: 'GMT' }
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-6 px-3 sm:px-4 py-1.5 sm:py-2 glass-card rounded-xl">
      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700] hidden sm:block" />
      <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
        {timezones.map((tz, index) => (
          <div key={tz.name} className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl">{tz.flag}</span>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-white/50 leading-tight">{tz.code}</span>
              <span className="text-xs sm:text-sm text-white/90 whitespace-nowrap leading-tight">
                {formatTime(tz.timezone)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}