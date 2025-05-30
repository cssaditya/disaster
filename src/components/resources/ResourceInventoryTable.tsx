import React from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { AlertTriangle, Edit, ChevronDown } from 'lucide-react';

export const ResourceInventoryTable: React.FC = () => {
  const resources = [
    { 
      id: 1, 
      name: 'Bottled Water', 
      category: 'Food & Water', 
      quantity: 14500, 
      unit: 'bottles', 
      available: 6200, 
      allocated: 8300,
      status: 'low',
      location: 'Main Warehouse'
    },
    { 
      id: 2, 
      name: 'Emergency Meals', 
      category: 'Food & Water', 
      quantity: 7200, 
      unit: 'meals', 
      available: 3100, 
      allocated: 4100,
      status: 'medium',
      location: 'Distribution Center'
    },
    { 
      id: 3, 
      name: 'First Aid Kits', 
      category: 'Medical', 
      quantity: 2500, 
      unit: 'kits', 
      available: 450, 
      allocated: 2050,
      status: 'critical',
      location: 'Medical Depot'
    },
    { 
      id: 4, 
      name: 'Emergency Blankets', 
      category: 'Shelter', 
      quantity: 8000, 
      unit: 'blankets', 
      available: 1200, 
      allocated: 6800,
      status: 'low',
      location: 'Shelter Supply Center'
    },
    { 
      id: 5, 
      name: 'Portable Generators', 
      category: 'Equipment', 
      quantity: 120, 
      unit: 'units', 
      available: 18, 
      allocated: 102,
      status: 'critical',
      location: 'Equipment Yard'
    },
    { 
      id: 6, 
      name: 'N95 Respirators', 
      category: 'Medical', 
      quantity: 12000, 
      unit: 'masks', 
      available: 8200, 
      allocated: 3800,
      status: 'good',
      location: 'Medical Depot'
    },
    { 
      id: 7, 
      name: 'Hand Sanitizer', 
      category: 'Medical', 
      quantity: 3600, 
      unit: 'bottles', 
      available: 900, 
      allocated: 2700,
      status: 'low',
      location: 'Distribution Center'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="emergency" size="sm">Critical</Badge>;
      case 'low':
        return <Badge variant="warning" size="sm">Low</Badge>;
      case 'medium':
        return <Badge variant="primary" size="sm">Medium</Badge>;
      case 'good':
        return <Badge variant="success" size="sm">Good</Badge>;
      default:
        return <Badge variant="default" size="sm">Unknown</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
        <thead className="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Resource
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Total Quantity
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Available
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
          {resources.map((resource) => (
            <tr key={resource.id} className={resource.status === 'critical' ? 'bg-emergency-50 dark:bg-emergency-900/5' : ''}>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  {resource.status === 'critical' && (
                    <AlertTriangle size={16} className="text-emergency-900 mr-2 flex-shrink-0" />
                  )}
                  <div className="text-sm font-medium text-neutral-900 dark:text-white">
                    {resource.name}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-neutral-700 dark:text-neutral-300">{resource.category}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-neutral-700 dark:text-neutral-300">
                  {resource.quantity.toLocaleString()} {resource.unit}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-neutral-700 dark:text-neutral-300">
                  {resource.available.toLocaleString()} {resource.unit}
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full ${
                      resource.status === 'critical' ? 'bg-emergency-900' :
                      resource.status === 'low' ? 'bg-warning-500' :
                      resource.status === 'medium' ? 'bg-primary-900' : 'bg-success-500'
                    }`}
                    style={{ width: `${(resource.available / resource.quantity) * 100}%` }}
                  ></div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {getStatusBadge(resource.status)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-neutral-700 dark:text-neutral-300">{resource.location}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="py-1 px-2"
                    icon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="py-1 px-2"
                    icon={<ChevronDown size={14} />}
                  >
                    Actions
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-neutral-700 dark:text-neutral-300">
          Showing 7 of 42 resources
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};