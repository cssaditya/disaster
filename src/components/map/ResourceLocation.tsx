import React, { ReactNode } from 'react';
import Badge from '../common/Badge';

interface ResourceLocationProps {
  name: string;
  type: 'shelter' | 'medical' | 'supplies' | 'evacuation' | 'alert';
  status: 'active' | 'critical' | 'inactive' | 'danger';
  capacity: string;
  coordinates: string;
  icon: ReactNode;
}

export const ResourceLocation: React.FC<ResourceLocationProps> = ({
  name,
  type,
  status,
  capacity,
  coordinates,
  icon
}) => {
  const getTypeStyle = () => {
    switch (type) {
      case 'shelter':
        return 'bg-primary-900';
      case 'medical':
        return 'bg-success-500';
      case 'supplies':
        return 'bg-warning-500';
      case 'evacuation':
        return 'bg-neutral-500';
      case 'alert':
        return 'bg-emergency-900';
      default:
        return 'bg-primary-900';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>;
      case 'critical':
        return <Badge variant="emergency" size="sm">Critical</Badge>;
      case 'inactive':
        return <Badge variant="default" size="sm">Inactive</Badge>;
      case 'danger':
        return <Badge variant="emergency" size="sm">Danger</Badge>;
      default:
        return <Badge variant="default" size="sm">Unknown</Badge>;
    }
  };

  return (
    <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${getTypeStyle()} text-white mr-3 mt-1`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-neutral-900 dark:text-white text-sm">{name}</h4>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            Capacity: {capacity}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
            {coordinates}
          </p>
        </div>
      </div>
    </div>
  );
};