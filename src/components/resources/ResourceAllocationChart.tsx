import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Medical', value: 35, color: '#4caf50' },
  { name: 'Food & Water', value: 25, color: '#2196f3' },
  { name: 'Shelter', value: 20, color: '#ff9800' },
  { name: 'Equipment', value: 15, color: '#9e9e9e' },
  { name: 'Transport', value: 5, color: '#ff3d00' },
];

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#9e9e9e', '#ff3d00'];

export const ResourceAllocationChart: React.FC = () => {
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
            formatter={(value: number) => [`${value}%`, undefined]}
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