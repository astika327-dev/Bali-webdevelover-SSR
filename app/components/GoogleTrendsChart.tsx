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
        const response = await fetch('/api/trends');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const trendsData = await response.json();

        const formattedData = trendsData.default.trendingSearchesDays[0].trendingSearches
          .slice(0, 10)
          .map((trend: any) => {
            let traffic = 0;
            const trafficStr = trend.formattedTraffic;
            if (trafficStr.endsWith('K+')) {
              traffic = parseFloat(trafficStr) * 1000;
            } else if (trafficStr.endsWith('M+')) {
              traffic = parseFloat(trafficStr) * 1000000;
            }
            return {
              name: trend.title.query,
              traffic: traffic,
            };
          })
          .sort((a: TrendData, b: TrendData) => b.traffic - a.traffic);

        setData(formattedData);
      } catch (err: any) {
        setError(`Failed to load trends: ${err.message}`);
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
    return <div>Error loading trends. The data may be temporarily unavailable.</div>;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3 style={{textAlign: 'center'}}>Daily Google Trends (Indonesia)</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip />
          <Legend />
          <Bar dataKey="traffic" fill="#8884d8" background={{ fill: '#eee' }} isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoogleTrendsChart;
