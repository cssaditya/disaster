import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { time: '00:00', highPriority: 5, mediumPriority: 10, lowPriority: 15 },
  { time: '04:00', highPriority: 7, mediumPriority: 12, lowPriority: 14 },
  { time: '08:00', highPriority: 10, mediumPriority: 15, lowPriority: 12 },
  { time: '12:00', highPriority: 15, mediumPriority: 20, lowPriority: 10 },
  { time: '16:00', highPriority: 12, mediumPriority: 18, lowPriority: 8 },
  { time: '20:00', highPriority: 18, mediumPriority: 22, lowPriority: 9 },
  { time: '24:00', highPriority: 20, mediumPriority: 25, lowPriority: 12 },
];

export const ActivityChart: React.FC = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorHighPriority" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff3d00" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff3d00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMediumPriority" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff9800" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorLowPriority" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a237e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1a237e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#616161' }} 
            axisLine={{ stroke: '#e0e0e0' }} 
          />
          <YAxis 
            tick={{ fill: '#616161' }} 
            axisLine={{ stroke: '#e0e0e0' }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="highPriority" 
            stroke="#ff3d00" 
            fillOpacity={1} 
            fill="url(#colorHighPriority)" 
            name="High Priority"
          />
          <Area 
            type="monotone" 
            dataKey="mediumPriority" 
            stroke="#ff9800" 
            fillOpacity={1} 
            fill="url(#colorMediumPriority)" 
            name="Medium Priority"
          />
          <Area 
            type="monotone" 
            dataKey="lowPriority" 
            stroke="#1a237e" 
            fillOpacity={1} 
            fill="url(#colorLowPriority)" 
            name="Low Priority"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};