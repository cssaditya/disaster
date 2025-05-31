import React, { useEffect, useState } from 'react';
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
import apiService, { DashboardData, Disaster } from '../services/api';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashboardResponse, disastersResponse] = await Promise.all([
        apiService.getDashboardData(),
        apiService.getDisasters()
      ]);
      setDashboardData(dashboardResponse);
      setDisasters(disastersResponse);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <AlertTriangle size={32} className="text-emergency-900" />
        <p className="text-neutral-900 dark:text-white">{error}</p>
        <Button variant="primary" onClick={fetchData} icon={<RefreshCw size={16} />}>
          Retry
        </Button>
      </div>
    );
  }

  const activeDisaster = disasters.find(d => d.severity >= 4);

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
          <Button variant="outline" size="sm" icon={<RefreshCw size={16} />} onClick={fetchData}>
            Refresh Data
          </Button>
          <Button variant="emergency" size="sm" icon={<AlertTriangle size={16} />}>
            Declare Emergency
          </Button>
        </div>
      </div>
      
      {/* Active incidents banner */}
      {activeDisaster && (
        <div className="bg-emergency-900 text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center">
            <AlertTriangle size={24} className="mr-2" />
            <div>
              <h2 className="font-bold text-lg">{activeDisaster.name}</h2>
              <p className="text-emergency-100">{activeDisaster.cityInfo.name} - Severity Level {activeDisaster.severity}</p>
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
      )}

      {/* Statistics row */}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard 
            title="Total Disasters" 
            value={dashboardData.overview.totalDisasters.toString()} 
            trend={`${dashboardData.overview.criticalDisasters} Critical`} 
            icon={<AlertTriangle size={20} />} 
            trendType="up"
          />
          <StatisticsCard 
            title="Affected Population" 
            value={dashboardData.overview.totalAffected.toLocaleString()} 
            trend="Active" 
            icon={<Users size={20} />} 
            trendType="up"
          />
          <StatisticsCard 
            title="Medical Kits Available" 
            value={dashboardData.overview.totalResources.medical_kits.toString()} 
            trend="In Stock" 
            icon={<Package size={20} />} 
            trendType="up"
          />
          <StatisticsCard 
            title="Food Kits Available" 
            value={dashboardData.overview.totalResources.food_kits.toString()} 
            trend="In Stock" 
            icon={<Truck size={20} />} 
            trendType="up"
          />
        </div>
      )}

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
              {dashboardData?.recentAllocations.map((allocation) => (
                <div key={allocation.id} className="flex items-start space-x-3 pb-3 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                  <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-2 mt-1">
                    <Activity size={16} className="text-primary-900 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      Resources allocated to {allocation.disasterId}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(allocation.timestamp).toLocaleString()}
                      </span>
                      <span className="mx-1 text-neutral-300 dark:text-neutral-600">•</span>
                      <Badge size="sm" variant={allocation.status === 'delivered' ? 'success' : 'primary'}>
                        {allocation.status}
                      </Badge>
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