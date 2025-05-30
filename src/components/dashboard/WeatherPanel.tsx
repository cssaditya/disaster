import React from 'react';
import { Wind, CloudRain, Droplets, Thermometer } from 'lucide-react';

export const WeatherPanel: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
            Gulf Coast Region
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Updated 15 minutes ago
          </p>
        </div>
        <div className="flex flex-col items-center">
          <CloudRain size={36} className="text-emergency-900" />
          <span className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
            83°F
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg flex items-center">
          <Wind size={20} className="text-primary-900 dark:text-primary-400 mr-2" />
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Wind Speed</p>
            <p className="font-medium text-neutral-900 dark:text-white">85 mph</p>
          </div>
        </div>
        
        <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg flex items-center">
          <Droplets size={20} className="text-primary-900 dark:text-primary-400 mr-2" />
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Precipitation</p>
            <p className="font-medium text-neutral-900 dark:text-white">4.5 in</p>
          </div>
        </div>
        
        <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg flex items-center">
          <Thermometer size={20} className="text-primary-900 dark:text-primary-400 mr-2" />
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Humidity</p>
            <p className="font-medium text-neutral-900 dark:text-white">95%</p>
          </div>
        </div>
        
        <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg flex items-center">
          <CloudRain size={20} className="text-primary-900 dark:text-primary-400 mr-2" />
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Storm Status</p>
            <p className="font-medium text-emergency-900">Category 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};