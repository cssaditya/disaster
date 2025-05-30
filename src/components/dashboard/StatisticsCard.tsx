import React, { ReactNode } from 'react';
import Card from '../common/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: ReactNode;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendType, 
  icon 
}) => {
  const trendColor = {
    up: 'text-emergency-900',
    down: 'text-success-500',
    neutral: 'text-neutral-500 dark:text-neutral-400'
  };

  const trendIcon = {
    up: <TrendingUp size={16} className="text-emergency-900" />,
    down: <TrendingDown size={16} className="text-success-500" />,
    neutral: null
  };

  return (
    <Card className="hover:translate-y-[-4px] transition-transform">
      <div className="flex items-center justify-between">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
          <div className="text-primary-900 dark:text-primary-400">
            {icon}
          </div>
        </div>
        <div className="flex items-center">
          {trendIcon[trendType]}
          <span className={`text-sm ml-1 ${trendColor[trendType]}`}>
            {trend}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{title}</p>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">{value}</p>
      </div>
    </Card>
  );
};