import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  RefreshCw,
  ChevronRight,
  Brain,
  Eye
} from 'lucide-react';
import { AIInsightCard } from '../components/prediction/AIInsightCard';
import { PredictionMetricCard } from '../components/prediction/PredictionMetricCard';
import { PredictionChart } from '../components/prediction/PredictionChart';

const PredictionCenter: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">AI Prediction Center</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Advanced analytics and predictive insights for proactive response
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" icon={<RefreshCw size={16} />}>
            Refresh Models
          </Button>
          <Button variant="primary" size="sm" icon={<Brain size={16} />}>
            Run Analysis
          </Button>
        </div>
      </div>

      {/* AI Status */}
      <Card className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg mr-4">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Prediction System</h2>
              <p className="text-primary-100">Analyzing real-time data from 245 sources</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-success-500 mr-2 animate-pulse"></div>
              <span className="text-sm">Models active</span>
            </div>
            <span className="mx-3 text-primary-300">|</span>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-primary-200" />
              <span className="text-sm">Last update: 5 minutes ago</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Key metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PredictionMetricCard 
          title="Population Impact" 
          value="327,500" 
          change="+12.8%" 
          trend="up"
          timeframe="Next 24 hours"
          icon={<Eye size={20} />}
        />
        <PredictionMetricCard 
          title="Resource Demand" 
          value="$6.2M" 
          change="+18.5%" 
          trend="up"
          timeframe="Next 48 hours"
          icon={<TrendingUp size={20} />}
        />
        <PredictionMetricCard 
          title="Expected Rainfall" 
          value="14.2 in" 
          change="+3.7 in" 
          trend="up"
          timeframe="Next 12 hours"
          icon={<TrendingUp size={20} />}
        />
        <PredictionMetricCard 
          title="Displacement Risk" 
          value="High" 
          change="+12%" 
          trend="up"
          timeframe="Coastal regions"
          icon={<TrendingUp size={20} />}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - charts */}
        <div className="lg:col-span-2 space-y-6">
          <Card 
            title="Resource Demand Forecast" 
            icon={<BarChart3 size={20} className="text-primary-900 dark:text-primary-400" />}
          >
            <PredictionChart />
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Forecast confidence: <span className="font-medium text-primary-900 dark:text-primary-400">87%</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
              >
                View Detailed Forecast
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              title="Evacuation Route Efficiency" 
              icon={<TrendingUp size={20} className="text-primary-900 dark:text-primary-400" />}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-neutral-900 dark:text-white">76%</div>
                <div className="flex items-center text-success-500">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Current evacuation efficiency score based on traffic flow, resource distribution, and population density.
              </p>
              <div className="mt-4">
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-900 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                  <span>Critical (0-40%)</span>
                  <span>Optimal (70-100%)</span>
                </div>
              </div>
            </Card>

            <Card 
              title="Storm Path Confidence" 
              icon={<Eye size={20} className="text-primary-900 dark:text-primary-400" />}
            >
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative">
                  <svg className="w-36 h-36">
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      fill="none" 
                      stroke="#e0e0e0" 
                      strokeWidth="12" 
                      className="dark:stroke-neutral-700"
                    />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      fill="none" 
                      stroke="#1a237e" 
                      strokeWidth="12" 
                      strokeDasharray="377" 
                      strokeDashoffset="94" 
                      className="dark:stroke-primary-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-neutral-900 dark:text-white">75%</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Confidence</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 text-center">
                  Current predictive accuracy based on multiple atmospheric models
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Right column - AI insights */}
        <div className="space-y-6">
          <Card 
            title="AI Generated Insights" 
            icon={<Sparkles size={20} className="text-primary-900 dark:text-primary-400" />}
          >
            <div className="space-y-4">
              <AIInsightCard 
                title="Resource Allocation Recommendation"
                description="Shift 30% of medical supplies from western district to coastal evacuation centers within next 6 hours."
                confidence={92}
                time="15 minutes ago"
                type="recommendation"
              />
              
              <AIInsightCard 
                title="Flooding Risk Alert"
                description="Johnson Creek watershed predicted to exceed flood stage by 3ft in next 12 hours. Recommend immediate evacuation of zones B4-B7."
                confidence={87}
                time="32 minutes ago"
                type="alert"
              />
              
              <AIInsightCard 
                title="Supply Chain Disruption"
                description="I-75 North predicted to become impassable within 8 hours. Reroute supply convoys via Highway 301 alternate route."
                confidence={78}
                time="1 hour ago"
                type="prediction"
              />
              
              <AIInsightCard 
                title="Power Restoration Estimate"
                description="Power grid analysis predicts 72% restoration within 36 hours post-landfall, prioritize hospitals and water treatment facilities."
                confidence={65}
                time="1.5 hours ago"
                type="forecast"
              />
            </div>
            
            <div className="mt-4">
              <Button 
                variant="primary" 
                fullWidth
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
              >
                View All AI Insights
              </Button>
            </div>
          </Card>

          <Card 
            title="Model Performance" 
            icon={<Brain size={20} className="text-primary-900 dark:text-primary-400" />}
          >
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    Resource Demand Prediction
                  </span>
                  <span className="text-sm text-success-500 font-medium">92%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-success-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    Population Movement
                  </span>
                  <span className="text-sm text-success-500 font-medium">88%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-success-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    Weather Pattern Analysis
                  </span>
                  <span className="text-sm text-primary-900 dark:text-primary-400 font-medium">78%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-900 dark:bg-primary-400 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    Infrastructure Impact
                  </span>
                  <span className="text-sm text-warning-500 font-medium">65%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-warning-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">
                Last model training: 4 hours ago
              </span>
              <Button variant="outline" size="sm">
                Retrain Models
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PredictionCenter;