import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import apiService from '../../services/api';

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#9e9e9e'];

export const ResourceAllocationChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const dashboard = await apiService.getDashboardData();
        const total = dashboard.overview.totalResources;
        setData([
          { name: 'Food Kits', value: total.food_kits, color: COLORS[0] },
          { name: 'Medical Kits', value: total.medical_kits, color: COLORS[1] },
          { name: 'Tents', value: total.tents, color: COLORS[2] },
          { name: 'Water Packets', value: total.water_packets, color: COLORS[3] },
        ]);
      } catch (err) {
        setError('Failed to fetch allocation data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading allocation data...</div>;
  if (error) return <div className="py-8 text-center text-emergency-900">{error}</div>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value.toLocaleString()}`, undefined]}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};