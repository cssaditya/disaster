import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { 
  MapPin, 
  Layers, 
  List, 
  Search, 
  Plus, 
  Minus,
  AlertTriangle, 
  Truck, 
  Home, 
  Users, 
  Thermometer
} from 'lucide-react';
import { MapControlPanel } from '../components/map/MapControlPanel';
import { MapLegend } from '../components/map/MapLegend';
import { ResourceLocation } from '../components/map/ResourceLocation';

const CrisisMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'resources'>('map');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Crisis Map</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time visualization of the disaster zone and resources
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-4">
              <button
                className={`flex-1 pb-3 text-center font-medium ${
                  activeTab === 'map'
                    ? 'text-primary-900 dark:text-primary-400 border-b-2 border-primary-900 dark:border-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
                onClick={() => setActiveTab('map')}
              >
                <Layers size={18} className="inline mr-1" /> Map Layers
              </button>
              <button
                className={`flex-1 pb-3 text-center font-medium ${
                  activeTab === 'resources'
                    ? 'text-primary-900 dark:text-primary-400 border-b-2 border-primary-900 dark:border-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                <List size={18} className="inline mr-1" /> Resources
              </button>
            </div>

            {activeTab === 'map' ? (
              <MapControlPanel />
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900"
                    placeholder="Search resources..."
                  />
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  <ResourceLocation 
                    name="Emergency Shelter - Lincoln High School" 
                    type="shelter" 
                    status="active" 
                    capacity="350/500"
                    coordinates="30.4213° N, 87.2169° W"
                    icon={<Home size={16} />}
                  />
                  <ResourceLocation 
                    name="Medical Center - Gulf Coast Hospital" 
                    type="medical" 
                    status="critical" 
                    capacity="98% Full"
                    coordinates="30.4001° N, 87.2010° W"
                    icon={<Thermometer size={16} />}
                  />
                  <ResourceLocation 
                    name="Supply Distribution - Community Center" 
                    type="supplies" 
                    status="active" 
                    capacity="4,500 kits available"
                    coordinates="30.4111° N, 87.2154° W"
                    icon={<Truck size={16} />}
                  />
                  <ResourceLocation 
                    name="Evacuation Point - Marina" 
                    type="evacuation" 
                    status="active" 
                    capacity="Processing 200/hr"
                    coordinates="30.3901° N, 87.1988° W"
                    icon={<Users size={16} />}
                  />
                  <ResourceLocation 
                    name="Alert Zone - Downtown Flooding" 
                    type="alert" 
                    status="danger" 
                    capacity="Immediate evacuation"
                    coordinates="30.4088° N, 87.2074° W"
                    icon={<AlertTriangle size={16} />}
                  />
                </div>
              </div>
            )}
          </Card>

          <Card title="Map Legend" className="hidden md:block">
            <MapLegend />
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] relative overflow-hidden">
            {/* Map placeholder - in a real app, this would be replaced with a proper map component */}
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-primary-900 dark:text-primary-400" />
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Interactive crisis map would render here using Leaflet or MapBox
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  With real-time disaster data, resource locations, and impact zones
                </p>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
              <Button variant="primary" size="sm" icon={<Plus size={16} />} aria-label="Zoom in" />
              <Button variant="primary" size="sm" icon={<Minus size={16} />} aria-label="Zoom out" />
            </div>

            {/* Alert banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-emergency-900 text-white p-3 rounded-lg flex items-center z-10">
              <AlertTriangle size={20} className="mr-2" />
              <div>
                <h3 className="font-bold">Hurricane Impact Zone</h3>
                <p className="text-sm">Expected landfall in 6 hours. Evacuation recommended for highlighted areas.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrisisMap;