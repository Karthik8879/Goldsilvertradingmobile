'use client';

import { useState, useCallback } from 'react';
import { livePriceService, LivePrice } from '@/services/liveprice.service';

export const useLivePrices = () => {
  const [prices, setPrices] = useState<LivePrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await livePriceService.getAllLivePrices();
      setPrices(data);
    } catch (err) {
      setError('Failed to fetch live prices');
      console.error(err);
      
      // Mock data for demo purposes
      setPrices([
        {
          metalType: 'GOLD',
          spotPrice: 75234,
          priceChange: 234,
          priceChangePercentage: 0.31,
          dayHigh: 75500,
          dayLow: 74800,
          openPrice: 75000,
          lastUpdated: new Date().toISOString(),
          trend: 'UP',
        },
        {
          metalType: 'SILVER',
          spotPrice: 85123,
          priceChange: -123,
          priceChangePercentage: -0.14,
          dayHigh: 85400,
          dayLow: 84900,
          openPrice: 85246,
          lastUpdated: new Date().toISOString(),
          trend: 'DOWN',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    prices,
    loading,
    error,
    fetchPrices,
  };
};
