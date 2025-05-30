import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { 
  BarChart3, 
  Wind, 
  AlertTriangle, 
  Users, 
  Truck, 
  Package, 
  Activity, 
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { StatisticsCard } from '../components/dashboard/StatisticsCard';
import { ResourcesList } from '../components/dashboard/ResourcesList';
import { WeatherPanel } from '../components/dashboard/WeatherPanel';
import { EmergencyAlerts } from '../components/dashboard/EmergencyAlerts';
import { ActivityChart } from '../components/dashboard/ActivityChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Command Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time overview of ongoing emergency operations
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" icon={<RefreshCw size={16} />}>
            Refresh Data
          </Button>
          <Button variant="emergency" size="sm" icon={<AlertTriangle size={16} />}>
            Declare Emergency
          </Button>
        </div>
      </div>
      
      {/* Active incidents banner */}
      <div className="bg-emergency-900 text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center">
          <AlertTriangle size={24} className="mr-2" />
          <div>
            <h2 className="font-bold text-lg">Hurricane Eliza - Category 3</h2>
            <p className="text-emergency-100">Gulf Coast Region - Evacuation in Progress</p>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button variant="outline" className="border-white text-white hover:bg-emergency-800">
            View Details
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-emergency-800">
            Response Plan
          </Button>
        </div>
      </div>

      {/* Statistics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard 
          title="Affected Population" 
          value="284,512" 
          trend="+12.5%" 
          icon={<Users size={20} />} 
          trendType="up"
        />
        <StatisticsCard 
          title="Deployed Personnel" 
          value="1,248" 
          trend="+64" 
          icon={<Users size={20} />} 
          trendType="up"
        />
        <StatisticsCard 
          title="Resources Deployed" 
          value="$4.2M" 
          trend="+$840K" 
          icon={<Package size={20} />} 
          trendType="up"
        />
        <StatisticsCard 
          title="Evacuation Rate" 
          value="68%" 
          trend="+5.4%" 
          icon={<Truck size={20} />} 
          trendType="up"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <Card 
            title="Emergency Response Activity" 
            icon={<Activity size={20} className="text-primary-900 dark:text-primary-400" />}
          >
            <ActivityChart />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <Badge variant="emergency">High Priority</Badge>
                <Badge variant="warning">Medium Priority</Badge>
                <Badge variant="primary">Low Priority</Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
              >
                View All Activities
              </Button>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Emergency Alerts" icon={<AlertTriangle size={20} className="text-emergency-900" />} urgent>
              <EmergencyAlerts />
            </Card>
            
            <Card title="Weather Conditions" icon={<Wind size={20} className="text-primary-900 dark:text-primary-400" />}>
              <WeatherPanel />
            </Card>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Card 
            title="Resource Allocation" 
            icon={<BarChart3 size={20} className="text-primary-900 dark:text-primary-400" />}
          >
            <ResourcesList />
            <div className="mt-4">
              <Button 
                variant="primary" 
                fullWidth
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
              >
                Manage Resources
              </Button>
            </div>
          </Card>

          <Card title="Recent Updates" className="overflow-hidden">
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-3 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                  <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-2 mt-1">
                    <Activity size={16} className="text-primary-900 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      Emergency shelter at Lincoln High School at capacity
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        10 minutes ago
                      </span>
                      <span className="mx-1 text-neutral-300 dark:text-neutral-600">•</span>
                      <Badge size="sm" variant="primary">Shelter</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;