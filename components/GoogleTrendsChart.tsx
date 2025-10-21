'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type TrendData = {
  query: string;
  value: number;
};

// Fungsi untuk memetakan nilai ke skala 0-100
const scaleValue = (value: number, maxValue: number) => (value / maxValue) * 100;

export default function GoogleTrendsChart() {
  const [data, setData] = useState<TrendData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await fetch('/api/get-trends');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const trends: TrendData[] = await response.json();
        setData(trends);
      } catch (e) {
        setError('Failed to load trends data. It may be updating.');
      } finally {
        setLoading(false);
      }
    }

    fetchTrends();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-gray-500">Loading Trends...</div>;
  }

  if (error || !data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-red-500">{error || 'No trends data available.'}</div>;
  }

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="w-full h-full">
      <ul className="space-y-4">
        {data.map((trend, index) => (
          <li key={trend.query}>
            <p className="text-sm font-medium text-gray-700 truncate">{trend.query}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <motion.div
                className="bg-amber-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scaleValue(trend.value, maxValue)}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
