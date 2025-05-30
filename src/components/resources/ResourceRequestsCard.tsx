import React from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { AlertTriangle, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const ResourceRequestsCard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Pending Requests</h3>
        <Badge variant="primary" size="sm">12 Active Requests</Badge>
      </div>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        <div className="p-3 rounded-lg border border-emergency-900 bg-emergency-50 dark:bg-emergency-900/10">
          <div className="flex items-start">
            <AlertTriangle size={18} className="text-emergency-900 mt-0.5 mr-2 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-emergency-900">Medical Supplies - Urgent</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                    Request for antibiotics, IV fluids, and wound care supplies
                  </p>
                </div>
                <Badge variant="emergency" size="sm">Critical</Badge>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                <Clock size={14} className="mr-1" />
                <span>Requested 35 minutes ago by Medical Team Alpha</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-neutral-900 dark:text-white">Quantity:</span> 
                  <span className="text-neutral-700 dark:text-neutral-300 ml-1">250 units</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="py-1 border-emergency-900 text-emergency-900 hover:bg-emergency-50"
                    icon={<XCircle size={14} />}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="py-1"
                    icon={<CheckCircle2 size={14} />}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border border-warning-500 bg-warning-50 dark:bg-warning-500/10">
          <div className="flex items-start">
            <AlertTriangle size={18} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-warning-600 dark:text-warning-500">Portable Generators</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                    Request for emergency power supply at Westside Evacuation Center
                  </p>
                </div>
                <Badge variant="warning" size="sm">High</Badge>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                <Clock size={14} className="mr-1" />
                <span>Requested 1.2 hours ago by Engineering Unit</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-neutral-900 dark:text-white">Quantity:</span> 
                  <span className="text-neutral-700 dark:text-neutral-300 ml-1">5 units</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="py-1"
                    icon={<XCircle size={14} />}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="py-1"
                    icon={<CheckCircle2 size={14} />}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border border-primary-900 bg-primary-50 dark:bg-primary-900/10">
          <div className="flex items-start">
            <div className="bg-primary-900 text-white p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-primary-900 dark:text-primary-400">Bottled Water</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                    Request for drinking water supply at Lincoln High School shelter
                  </p>
                </div>
                <Badge variant="primary" size="sm">Medium</Badge>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                <Clock size={14} className="mr-1" />
                <span>Requested 2.5 hours ago by Shelter Management</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-neutral-900 dark:text-white">Quantity:</span> 
                  <span className="text-neutral-700 dark:text-neutral-300 ml-1">2,500 bottles</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="py-1"
                    icon={<XCircle size={14} />}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="py-1"
                    icon={<CheckCircle2 size={14} />}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
          <div className="flex items-start">
            <div className="bg-neutral-500 text-white p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white">Emergency Blankets</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                    Request for additional blankets at Memorial Stadium shelter
                  </p>
                </div>
                <Badge variant="default" size="sm">Standard</Badge>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                <Clock size={14} className="mr-1" />
                <span>Requested 3.8 hours ago by Shelter Management</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-neutral-900 dark:text-white">Quantity:</span> 
                  <span className="text-neutral-700 dark:text-neutral-300 ml-1">500 blankets</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="py-1"
                    icon={<XCircle size={14} />}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="py-1"
                    icon={<CheckCircle2 size={14} />}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          size="sm"
        >
          View All Requests
        </Button>
      </div>
    </div>
  );
};