import React from 'react';
import { AlertTriangle, Sparkles, TrendingUp, Clock } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  description: string;
  confidence: number;
  time: string;
  type: 'alert' | 'recommendation' | 'prediction' | 'forecast';
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  description,
  confidence,
  time,
  type
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={16} className="text-emergency-900" />;
      case 'recommendation':
        return <Sparkles size={16} className="text-primary-900 dark:text-primary-400" />;
      case 'prediction':
        return <TrendingUp size={16} className="text-warning-500" />;
      case 'forecast':
        return <Clock size={16} className="text-primary-900 dark:text-primary-400" />;
      default:
        return <Sparkles size={16} className="text-primary-900 dark:text-primary-400" />;
    }
  };

  const getTypeBg = () => {
    switch (type) {
      case 'alert':
        return 'bg-emergency-50 dark:bg-emergency-900/10 border-l-4 border-emergency-900';
      case 'recommendation':
        return 'bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-900';
      case 'prediction':
        return 'bg-warning-50 dark:bg-warning-500/10 border-l-4 border-warning-500';
      case 'forecast':
        return 'bg-neutral-50 dark:bg-neutral-800 border-l-4 border-primary-900';
      default:
        return 'bg-neutral-50 dark:bg-neutral-800';
    }
  };

  const getConfidenceColor = () => {
    if (confidence >= 85) return 'text-success-500';
    if (confidence >= 70) return 'text-primary-900 dark:text-primary-400';
    return 'text-warning-500';
  };

  return (
    <div className={`p-3 rounded-lg ${getTypeBg()}`}>
      <div className="flex items-start">
        <div className="mt-0.5 mr-2">
          {getTypeIcon()}
        </div>
        <div>
          <h4 className="font-medium text-neutral-900 dark:text-white">{title}</h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{description}</p>
          <div className="flex items-center mt-2 text-xs">
            <span className={`font-medium ${getConfidenceColor()}`}>
              {confidence}% confidence
            </span>
            <span className="mx-2 text-neutral-300 dark:text-neutral-600">•</span>
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center">
              <Clock size={12} className="mr-1" />
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};