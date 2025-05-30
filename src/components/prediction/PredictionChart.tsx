import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: '24h', medical: 3200, food: 4500, shelter: 2400, transport: 1800, predicted: true },
  { name: '48h', medical: 4800, food: 6000, shelter: 3900, transport: 2700, predicted: true },
  { name: '72h', medical: 5900, food: 8200, shelter: 5600, transport: 4200, predicted: true },
  { name: '96h', medical: 4200, food: 7500, shelter: 6100, transport: 5300, predicted: true },
  { name: '120h', medical: 3600, food: 5900, shelter: 5500, transport: 4800, predicted: true },
];

export const PredictionChart: React.FC = () => {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#616161' }} 
            axisLine={{ stroke: '#e0e0e0' }}
            label={{ value: 'Time Horizon', position: 'insideBottom', offset: -5, fill: '#616161' }}
          />
          <YAxis 
            tick={{ fill: '#616161' }} 
            axisLine={{ stroke: '#e0e0e0' }}
            label={{ value: 'Resources Needed ($)', angle: -90, position: 'insideLeft', fill: '#616161' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Legend />
          <Bar dataKey="medical" name="Medical Supplies" fill="#1a237e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="food" name="Food & Water" fill="#ff9800" radius={[4, 4, 0, 0]} />
          <Bar dataKey="shelter" name="Shelter Needs" fill="#4caf50" radius={[4, 4, 0, 0]} />
          <Bar dataKey="transport" name="Transportation" fill="#9e9e9e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};