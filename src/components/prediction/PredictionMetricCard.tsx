import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';

interface PredictionMetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  icon: ReactNode;
}

export const PredictionMetricCard: React.FC<PredictionMetricCardProps> = ({
  title,
  value,
  change,
  trend,
  timeframe,
  icon
}) => {
  return (
    <Card className="hover:translate-y-[-4px] transition-transform">
      <div className="flex items-center justify-between">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
          <div className="text-primary-900 dark:text-primary-400">
            {icon}
          </div>
        </div>
        <div className="flex items-center">
          {trend === 'up' ? (
            <TrendingUp size={16} className="text-emergency-900" />
          ) : (
            <TrendingDown size={16} className="text-success-500" />
          )}
          <span className={`text-sm ml-1 ${trend === 'up' ? 'text-emergency-900' : 'text-success-500'}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{title}</p>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">{value}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{timeframe}</p>
      </div>
    </Card>
  );
};