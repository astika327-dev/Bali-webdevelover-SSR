'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

interface TrendData {
  name: string;
  traffic: number;
}

const GoogleTrendsChart = () => {
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-trends');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const trendsData = await response.json();

        const formattedData = trendsData
          .map((trend: any) => {
            let trafficValue = 0;
            const trafficStr = trend.traffic || '0';
            if (trafficStr.includes('K+')) {
              trafficValue = parseFloat(trafficStr.replace('K+', '')) * 1000;
            } else if (trafficStr.includes('M+')) {
              trafficValue = parseFloat(trafficStr.replace('M+', '')) * 1000000;
            }
            return {
              name: trend.name,
              traffic: trafficValue,
            };
          })
          .sort((a: TrendData, b: TrendData) => a.traffic - b.traffic);

        setData(formattedData);
      } catch (err: any) {
        setError('Failed to load trends data. It may be updating.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Trends...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Daily Google Trends (ID)</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="traffic" fill="#8884d8" background={{ fill: '#eee' }} isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoogleTrendsChart;
