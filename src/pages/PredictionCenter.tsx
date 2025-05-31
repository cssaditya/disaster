import React, { useEffect, useState } from 'react';
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
import apiService from '../services/api';

const cities = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'bhubaneswar', name: 'Bhubaneswar' },
  { id: 'jaipur', name: 'Jaipur' }
];

const PredictionCenter: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0].id);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disasters, setDisasters] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);
      try {
        const [predictionData, disastersData] = await Promise.all([
          apiService.getPredictions(selectedCity),
          apiService.getDisasters()
        ]);
        setPrediction(predictionData);
        setDisasters(disastersData);
      } catch (err) {
        setError('Failed to fetch prediction data');
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, [selectedCity]);

  // Helper: get main prediction for city
  const mainPred = prediction?.predictions?.[0];

  // Resource Demand Forecast Data (Indian values)
  const cityDisasters = disasters.filter((d: any) => d.cityInfo?.id === selectedCity);
  // Synthesize a time series: Now, 24h, 48h, 72h (scale needs for demo)
  let forecastData: any[] = [];
  if (cityDisasters.length > 0) {
    // Use the most severe/active disaster for the city
    const disaster = cityDisasters[0];
    const needs = disaster.resourceNeeds || {};
    forecastData = [
      { name: 'Now', medical: needs.medical_kits || 0, food: needs.food_kits || 0, shelter: needs.tents || 0, transport: needs.water_packets || 0, predicted: false },
      { name: '24h', medical: Math.round((needs.medical_kits || 0) * 1.1), food: Math.round((needs.food_kits || 0) * 1.1), shelter: Math.round((needs.tents || 0) * 1.1), transport: Math.round((needs.water_packets || 0) * 1.1), predicted: true },
      { name: '48h', medical: Math.round((needs.medical_kits || 0) * 1.2), food: Math.round((needs.food_kits || 0) * 1.2), shelter: Math.round((needs.tents || 0) * 1.2), transport: Math.round((needs.water_packets || 0) * 1.2), predicted: true },
      { name: '72h', medical: Math.round((needs.medical_kits || 0) * 1.3), food: Math.round((needs.food_kits || 0) * 1.3), shelter: Math.round((needs.tents || 0) * 1.3), transport: Math.round((needs.water_packets || 0) * 1.3), predicted: true },
    ];
  }

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
          <Button variant="outline" size="sm" icon={<RefreshCw size={16} />} onClick={() => setSelectedCity(selectedCity)}>
            Refresh Models
          </Button>
          <Button variant="primary" size="sm" icon={<Brain size={16} />}>
            Run Analysis
          </Button>
        </div>
      </div>

      {/* City Selector */}
      <div className="flex items-center space-x-2">
        <span className="font-medium text-neutral-700 dark:text-neutral-300">Select City:</span>
        <select
          className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
        >
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
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
              <span className="text-sm">Last update: {prediction?.lastUpdated ? new Date(prediction.lastUpdated).toLocaleString() : '...'}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Loading/Error */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <span className="text-emergency-900 text-lg">{error}</span>
          <Button onClick={() => setSelectedCity(selectedCity)}>Retry</Button>
        </div>
      ) : (
        <>
          {/* Key metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PredictionMetricCard 
              title="Population Impact" 
              value={mainPred?.estimatedImpact?.population?.toLocaleString() || '--'} 
              change={mainPred ? `+${Math.round(mainPred.riskScore * 10)}%` : '--'} 
              trend={mainPred?.riskScore > 0.5 ? 'up' : 'down'}
              timeframe={mainPred?.timeframe || '--'}
              icon={<Eye size={20} />}
            />
            <PredictionMetricCard 
              title="Risk Level" 
              value={mainPred?.riskLevel ? mainPred.riskLevel.charAt(0).toUpperCase() + mainPred.riskLevel.slice(1) : '--'} 
              change={mainPred ? `+${Math.round(mainPred.riskScore * 10)}%` : '--'} 
              trend={mainPred?.riskScore > 0.5 ? 'up' : 'down'}
              timeframe={mainPred?.timeframe || '--'}
              icon={<TrendingUp size={20} />}
            />
            <PredictionMetricCard 
              title="Disaster Type" 
              value={mainPred?.disasterType ? mainPred.disasterType.charAt(0).toUpperCase() + mainPred.disasterType.slice(1) : '--'} 
              change={mainPred ? `${Math.round(mainPred.confidence * 100)}%` : '--'} 
              trend={mainPred?.confidence > 0.7 ? 'up' : 'down'}
              timeframe={mainPred?.timeframe || '--'}
              icon={<Sparkles size={20} />}
            />
            <PredictionMetricCard 
              title="Severity" 
              value={mainPred?.estimatedImpact?.severity?.toString() || '--'} 
              change={mainPred ? `${Math.round(mainPred.confidence * 100)}%` : '--'} 
              trend={mainPred?.confidence > 0.7 ? 'up' : 'down'}
              timeframe={mainPred?.timeframe || '--'}
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
                <PredictionChart data={forecastData} />
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Forecast confidence: <span className="font-medium text-primary-900 dark:text-primary-400">{mainPred ? `${Math.round(mainPred.confidence * 100)}%` : '--'}</span>
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
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white">{mainPred ? `${Math.round(mainPred.confidence * 100)}%` : '--'}</div>
                    <div className="flex items-center text-success-500">
                      <TrendingUp size={16} className="mr-1" />
                      <span className="text-sm font-medium">+{mainPred ? Math.round(mainPred.riskScore * 10) : '--'}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Current evacuation efficiency score based on traffic flow, resource distribution, and population density.
                  </p>
                  <div className="mt-4">
                    <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-900 rounded-full" style={{ width: mainPred ? `${Math.round(mainPred.confidence * 100)}%` : '0%' }}></div>
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
                          strokeDashoffset={mainPred ? 377 - Math.round(mainPred.confidence * 377) : 377} 
                          className="dark:stroke-primary-400"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-neutral-900 dark:text-white">{mainPred ? `${Math.round(mainPred.confidence * 100)}%` : '--'}</span>
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
                  {mainPred?.factors?.map((factor: string, idx: number) => (
                    <AIInsightCard
                      key={idx}
                      title={mainPred.disasterType ? `${mainPred.disasterType.charAt(0).toUpperCase() + mainPred.disasterType.slice(1)} Factor` : 'Factor'}
                      description={factor}
                      confidence={Math.round(mainPred.confidence * 100)}
                      time={mainPred.timeframe || '--'}
                      type="prediction"
                    />
                  ))}
                  {!mainPred?.factors && <span className="text-neutral-500">No insights available.</span>}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PredictionCenter;