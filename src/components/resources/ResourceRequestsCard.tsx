import React, { useEffect, useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { AlertTriangle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import apiService from '../../services/api';

export const ResourceRequestsCard: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getAllocations();
        setRequests(data.slice(0, 10)); // Show only the 10 most recent
      } catch (err) {
        setError('Failed to fetch resource requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading requests...</div>;
  if (error) return <div className="py-8 text-center text-emergency-900">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Recent Resource Allocations</h3>
        <Badge variant="primary" size="sm">{requests.length} Recent</Badge>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {requests.map((req, idx) => (
          <div key={req.id || idx} className="p-3 rounded-lg border border-primary-900 bg-primary-50 dark:bg-primary-900/10">
            <div className="flex items-start">
              <AlertTriangle size={18} className="text-primary-900 mt-0.5 mr-2 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-primary-900 dark:text-primary-400">{req.city?.name || req.city || 'Unknown City'} → {req.hub?.name || req.hub || 'Unknown Hub'}</h4>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                      {Object.entries(req.resources).map(([k, v]) => `${k.replace('_', ' ')}: ${v}`).join(', ')}
                    </p>
                  </div>
                  <Badge variant={req.status === 'delivered' ? 'success' : req.status === 'dispatched' ? 'warning' : 'primary'} size="sm">{req.status}</Badge>
                </div>
                <div className="mt-2 flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                  <Clock size={14} className="mr-1" />
                  <span>{new Date(req.timestamp).toLocaleString()}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-neutral-900 dark:text-white">Distance:</span> 
                    <span className="text-neutral-700 dark:text-neutral-300 ml-1">{req.distance} km</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="py-1"
                      icon={<CheckCircle2 size={14} />}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button 
          variant="outline" 
          size="sm"
        >
          View All Allocations
        </Button>
      </div>
    </div>
  );
}