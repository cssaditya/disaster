import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { 
  Package, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  Search, 
  RefreshCw,
  AlertTriangle,
  Truck,
  ArrowRight,
  BarChart3,
  CircleDollarSign
} from 'lucide-react';
import { ResourceInventoryTable } from '../components/resources/ResourceInventoryTable';
import { ResourceAllocationChart } from '../components/resources/ResourceAllocationChart';
import { ResourceRequestsCard } from '../components/resources/ResourceRequestsCard';

const ResourceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'requests' | 'logistics'>('inventory');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Resource Management</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track and manage emergency supplies and equipment
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" icon={<RefreshCw size={16} />}>
            Refresh Data
          </Button>
          <Button variant="primary" size="sm" icon={<Plus size={16} />}>
            Add Resources
          </Button>
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg mr-4">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <p className="text-primary-100">Total Resources</p>
              <h2 className="text-2xl font-bold">₹12.4 Cr</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center text-primary-100">
            <BarChart3 size={16} className="mr-1" />
            <span className="text-xs">Utilization: 78% of total inventory</span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-warning-500 to-warning-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg mr-4">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <div>
              <p className="text-warning-100">Critical Supplies</p>
              <h2 className="text-2xl font-bold">6 Categories</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center text-warning-100">
            <Truck size={16} className="mr-1" />
            <span className="text-xs">Restocking ETA: 6-12 hours</span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-success-500 to-success-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg mr-4">
              <CircleDollarSign size={24} className="text-white" />
            </div>
            <div>
              <p className="text-success-100">Budget Remaining</p>
              <h2 className="text-2xl font-bold">₹8.2 Cr</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center text-success-100">
            <ArrowRight size={16} className="mr-1" />
            <span className="text-xs">Projected for 14 more days</span>
          </div>
        </Card>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'inventory'
                ? 'border-primary-900 text-primary-900 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requests'
                ? 'border-primary-900 text-primary-900 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'logistics'
                ? 'border-primary-900 text-primary-900 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Logistics
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900"
                placeholder="Search resources..."
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" icon={<Filter size={16} />}>
                Filter
              </Button>
              <Button variant="outline" size="sm" icon={<ArrowUpDown size={16} />}>
                Sort
              </Button>
            </div>
          </div>

          {/* Critical resources warning */}
          <div className="bg-emergency-50 dark:bg-emergency-900/10 border-l-4 border-emergency-900 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle size={20} className="text-emergency-900 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-emergency-900">Critical Resources Alert</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                  6 essential resources are below 20% stock level. These items require immediate attention.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 border-emergency-900 text-emergency-900 hover:bg-emergency-50"
                >
                  View Critical Items
                </Button>
              </div>
            </div>
          </div>

          {/* Inventory table */}
          <Card>
            <ResourceInventoryTable />
          </Card>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Resource Requests" icon={<Package size={20} className="text-primary-900 dark:text-primary-400" />}>
              <ResourceRequestsCard />
            </Card>
          </div>
          
          <div>
            <Card title="Resource Allocation" icon={<BarChart3 size={20} className="text-primary-900 dark:text-primary-400" />}>
              <ResourceAllocationChart />
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <p>Current allocation shows high demand for medical supplies and shelter resources.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Optimize Allocation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'logistics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Transportation Fleet" icon={<Truck size={20} className="text-primary-900 dark:text-primary-400" />}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Vehicle Status</h3>
                <Badge variant="success">28 Active</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Heavy Trucks</span>
                    <span className="text-sm">12/15</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-900 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>In Use</span>
                    <span>Available</span>
                  </div>
                </div>
                
                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Ambulances</span>
                    <span className="text-sm">8/10</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-900 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>In Use</span>
                    <span>Available</span>
                  </div>
                </div>
                
                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Helicopters</span>
                    <span className="text-sm">3/5</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-900 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>In Use</span>
                    <span>Available</span>
                  </div>
                </div>
                
                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Boats</span>
                    <span className="text-sm">5/8</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-900 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>In Use</span>
                    <span>Available</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                icon={<Plus size={16} />}
              >
                Request Additional Vehicles
              </Button>
            </div>
          </Card>
          
          <Card title="Supply Chain Status" icon={<Package size={20} className="text-primary-900 dark:text-primary-400" />}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Route Conditions</h3>
                <Badge variant="warning">2 Disruptions</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-emergency-900 bg-emergency-50 dark:bg-emergency-900/10">
                  <div className="flex items-start">
                    <AlertTriangle size={16} className="text-emergency-900 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-emergency-900">I-75 North - Blocked</h4>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                        Flooding at mile marker 134. Estimated clearance: 24 hours.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 border-emergency-900 text-emergency-900 hover:bg-emergency-50 text-xs"
                      >
                        View Alternate Routes
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-warning-500 bg-warning-50 dark:bg-warning-500/10">
                  <div className="flex items-start">
                    <AlertTriangle size={16} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-warning-600 dark:text-warning-500">Highway 41 - Partial Closure</h4>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                        One lane open with traffic control. Delays of 45-60 minutes expected.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-success-500 bg-success-500/10 dark:bg-success-500/5">
                  <div className="flex items-start">
                    <div className="bg-success-500 text-white p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-success-600 dark:text-success-500">Highway 301 - Clear</h4>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                        All lanes open. Recommended for supply transports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Incoming Shipments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Medical Supplies</p>
                      <p className="text-xs text-neutral-500">From State Warehouse</p>
                    </div>
                    <Badge variant="primary">ETA: 3h 20m</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Food & Water</p>
                      <p className="text-xs text-neutral-500">From FEMA</p>
                    </div>
                    <Badge variant="primary">ETA: 5h 45m</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Power Generators</p>
                      <p className="text-xs text-neutral-500">From Private Contractor</p>
                    </div>
                    <Badge variant="primary">ETA: 8h 10m</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResourceManagement;