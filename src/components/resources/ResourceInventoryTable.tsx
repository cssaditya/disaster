import React, { useEffect, useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { AlertTriangle, Edit, ChevronDown } from 'lucide-react';
import apiService, { ResourceHub } from '../../services/api';

interface AggregatedResource {
  name: string;
  category: string;
  unit: string;
  quantity: number;
  available: number;
  allocated: number;
  status: string;
  location: string;
}

export const ResourceInventoryTable: React.FC = () => {
  const [resources, setResources] = useState<AggregatedResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const hubs: ResourceHub[] = await apiService.getResourceHubs();
        // Aggregate resources from all hubs
        const resourceMap: { [key: string]: AggregatedResource } = {};
        hubs.forEach(hub => {
          Object.entries(hub.resources).forEach(([key, val]) => {
            const name = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const category =
              key === 'food_kits' ? 'Food & Water' :
              key === 'medical_kits' ? 'Medical' :
              key === 'tents' ? 'Shelter' :
              key === 'water_packets' ? 'Food & Water' : 'Other';
            const unit = key === 'tents' ? 'tents' : key === 'food_kits' ? 'kits' : key === 'medical_kits' ? 'kits' : key === 'water_packets' ? 'packets' : 'units';
            const id = `${key}-${hub.id}`;
            const available = val.available;
            const allocated = val.allocated ?? ((val.total_capacity ?? 0) - (val.available ?? 0));
            const quantity = val.total_capacity ?? 0;
            const percent = quantity > 0 ? available / quantity : 0;
            let status = 'good';
            if (percent < 0.2) status = 'critical';
            else if (percent < 0.4) status = 'low';
            else if (percent < 0.7) status = 'medium';
            resourceMap[id] = {
              name,
              category,
              unit,
              quantity,
              available,
              allocated,
              status,
              location: hub.name
            };
          });
        });
        setResources(Object.values(resourceMap));
      } catch (err) {
        setError('Failed to fetch resource data');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

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

  if (loading) return <div className="py-8 text-center">Loading resources...</div>;
  if (error) return <div className="py-8 text-center text-emergency-900">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
        <thead className="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Resource</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Available</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Location</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
          {resources.map((resource, idx) => {
            if (!resource || typeof resource.quantity !== 'number' || typeof resource.available !== 'number') {
              // Skip or render a fallback row if resource is malformed
              return (
                <tr key={idx} className="bg-warning-50 dark:bg-warning-900/5">
                  <td colSpan={7} className="px-4 py-3 text-center text-warning-900">Resource data missing or invalid</td>
                </tr>
              );
            }
            return (
              <tr key={idx} className={resource.status === 'critical' ? 'bg-emergency-50 dark:bg-emergency-900/5' : ''}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {resource.status === 'critical' && (
                      <AlertTriangle size={16} className="text-emergency-900 mr-2 flex-shrink-0" />
                    )}
                    <div className="text-sm font-medium text-neutral-900 dark:text-white">
                      {resource.name || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">{resource.category || 'N/A'}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    {(resource.quantity ?? 0).toLocaleString()} {resource.unit || ''}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    {(resource.available ?? 0).toLocaleString()} {resource.unit || ''}
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        resource.status === 'critical' ? 'bg-emergency-900' :
                        resource.status === 'low' ? 'bg-warning-500' :
                        resource.status === 'medium' ? 'bg-primary-900' : 'bg-success-500'
                      }`}
                      style={{ width: `${(resource.quantity ? (resource.available / resource.quantity) * 100 : 0)}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(resource.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">{resource.location || 'N/A'}</div>
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
            );
          })}
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