import React from 'react';

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
  <div className="flex items-center mb-2">
    <div className={`w-4 h-4 rounded ${color} mr-2`}></div>
    <span className="text-xs text-neutral-700 dark:text-neutral-300">{label}</span>
  </div>
);

export const MapLegend: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          Storm Intensity
        </h4>
        <div>
          <LegendItem color="bg-emergency-900" label="Extreme (Cat 4-5)" />
          <LegendItem color="bg-emergency-700" label="Severe (Cat 3)" />
          <LegendItem color="bg-emergency-500" label="Moderate (Cat 1-2)" />
          <LegendItem color="bg-emergency-300" label="Tropical Storm" />
        </div>
      </div>
      
      <div>
        <h4 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          Resource Types
        </h4>
        <div>
          <LegendItem color="bg-primary-900" label="Emergency Shelter" />
          <LegendItem color="bg-success-500" label="Medical Facility" />
          <LegendItem color="bg-warning-500" label="Supply Distribution" />
          <LegendItem color="bg-neutral-500" label="Evacuation Point" />
        </div>
      </div>
      
      <div>
        <h4 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          Impact Zones
        </h4>
        <div>
          <LegendItem color="bg-emergency-900/50" label="Severe Flooding" />
          <LegendItem color="bg-emergency-700/50" label="Power Outage" />
          <LegendItem color="bg-warning-500/50" label="Evacuation Zone" />
          <LegendItem color="bg-success-500/50" label="Safe Zone" />
        </div>
      </div>
    </div>
  );
};