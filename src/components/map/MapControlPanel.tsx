import React from 'react';
import { Check, CloudRain, Building, AlertTriangle, Map, Wind, WifiOff } from 'lucide-react';

export const MapControlPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Base Map</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="baseMap" 
              className="form-radio text-primary-900 focus:ring-primary-900"
              defaultChecked
            />
            <span className="text-sm text-neutral-900 dark:text-white">Satellite Imagery</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="baseMap" 
              className="form-radio text-primary-900 focus:ring-primary-900"
            />
            <span className="text-sm text-neutral-900 dark:text-white">Street Map</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="baseMap" 
              className="form-radio text-primary-900 focus:ring-primary-900"
            />
            <span className="text-sm text-neutral-900 dark:text-white">Topographic</span>
          </label>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Map Layers</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <CloudRain size={16} className="text-primary-900 dark:text-primary-400 mr-2" />
              <span className="text-sm text-neutral-900 dark:text-white">Precipitation</span>
            </div>
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 text-primary-900 rounded focus:ring-primary-900" 
              defaultChecked
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <Wind size={16} className="text-primary-900 dark:text-primary-400 mr-2" />
              <span className="text-sm text-neutral-900 dark:text-white">Wind Speed</span>
            </div>
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 text-primary-900 rounded focus:ring-primary-900" 
              defaultChecked
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <AlertTriangle size={16} className="text-emergency-900 mr-2" />
              <span className="text-sm text-neutral-900 dark:text-white">Impact Zones</span>
            </div>
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 text-primary-900 rounded focus:ring-primary-900" 
              defaultChecked
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <Building size={16} className="text-primary-900 dark:text-primary-400 mr-2" />
              <span className="text-sm text-neutral-900 dark:text-white">Critical Infrastructure</span>
            </div>
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 text-primary-900 rounded focus:ring-primary-900" 
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <Map size={16} className="text-primary-900 dark:text-primary-400 mr-2" />
              <span className="text-sm text-neutral-900 dark:text-white">Evacuation Routes</span>
            </div>
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 text-primary-900 rounded focus:ring-primary-900" 
              defaultChecked
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <WifiOff size={16} className="text-primary-900 dark:text-primary-400 mr-2" />
              <span className="text-sm text-neutral-900 dark:text-white">Communication Outages</span>
            </div>
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 text-primary-900 rounded focus:ring-primary-900" 
            />
          </label>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Data Freshness</h3>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg flex items-center justify-between">
          <span className="text-sm text-neutral-900 dark:text-white flex items-center">
            <Check size={16} className="text-success-500 mr-1" />
            Data updated 2 minutes ago
          </span>
          <button className="text-xs text-primary-900 dark:text-primary-400 font-medium">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};