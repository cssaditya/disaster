import React from 'react';
import { AlertTriangle } from 'lucide-react';

const resources = [
  { name: 'Emergency Shelters', allocated: 85, total: 100, critical: false },
  { name: 'Medical Supplies', allocated: 72, total: 80, critical: true },
  { name: 'Rescue Vehicles', allocated: 45, total: 50, critical: false },
  { name: 'Food & Water', allocated: 90, total: 120, critical: false },
  { name: 'Power Generators', allocated: 38, total: 40, critical: true },
];

export const ResourcesList: React.FC = () => {
  return (
    <div className="space-y-4">
      {resources.map((resource, index) => {
        const percentage = Math.round((resource.allocated / resource.total) * 100);
        const isLow = percentage > 90;
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  {resource.name}
                </span>
                {resource.critical && (
                  <span className="ml-2">
                    <AlertTriangle size={14} className="text-emergency-900" />
                  </span>
                )}
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {resource.allocated}/{resource.total}
              </span>
            </div>
            
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  isLow ? 'bg-emergency-900' : 'bg-primary-900'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            {isLow && (
              <p className="text-xs text-emergency-900">
                Low availability! Request additional resources.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};