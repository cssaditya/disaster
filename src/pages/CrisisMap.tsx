import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { 
  Layers, 
  List, 
  Search, 
  Plus, 
  Minus,
  AlertTriangle, 
  Home
} from 'lucide-react';
import { MapControlPanel } from '../components/map/MapControlPanel';
import { MapLegend } from '../components/map/MapLegend';
import { ResourceLocation } from '../components/map/ResourceLocation';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import apiService, { Disaster, ResourceHub } from '../services/api';

const disasterIcons = {
  cyclone: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2849/2849557.png',
    iconSize: [32, 32]
  }),
  flood: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965300.png',
    iconSize: [32, 32]
  }),
  earthquake: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/411/411745.png',
    iconSize: [32, 32]
  }),
  drought: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3161/3161837.png',
    iconSize: [32, 32]
  })
};

const resourceIcons = {
  hub: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2849/2849557.png',
    iconSize: [28, 28]
  })
};

const CrisisMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'resources'>('map');
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [resourceHubs, setResourceHubs] = useState<ResourceHub[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const indiaCenter: LatLngTuple = [20.5937, 78.9629];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [disastersData, hubsData] = await Promise.all([
          apiService.getDisasters(),
          apiService.getResourceHubs()
        ]);
        setDisasters(disastersData);
        setResourceHubs(hubsData);
        setError(null);
      } catch (err) {
        setError('Failed to load map data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Crisis Map</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time visualization of the disaster zone and resources
          </p>
        </div>
      </div>
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-full max-w-xs space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card p-4">
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
                  {resourceHubs.map(hub => (
                    <ResourceLocation 
                      key={hub.id}
                      name={hub.name}
                      type="shelter"
                      status="active"
                      capacity={`Food: ${hub.resources.food_kits.available}, Medical: ${hub.resources.medical_kits.available}`}
                      coordinates={`${hub.coordinates.lat}, ${hub.coordinates.lng}`}
                      icon={<Home size={16} />}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card p-4 hidden md:block">
            <h3 className="font-bold mb-2">Map Legend</h3>
            <MapLegend />
          </div>
        </div>
        {/* Map Area */}
        <div className="flex-1 relative h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <AlertTriangle size={32} className="text-emergency-900" />
              <p className="text-neutral-900 dark:text-white">{error}</p>
            </div>
          ) : (
            <MapContainer center={indiaCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Disaster Markers and Red Circles */}
              {disasters.map(disaster => (
                <React.Fragment key={disaster.id}>
                  <Circle
                    center={[disaster.cityInfo.coordinates.lat, disaster.cityInfo.coordinates.lng] as LatLngTuple}
                    radius={disaster.severity * 20000 + 20000}
                    pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.25, weight: 2 }}
                  />
                  <Marker
                    position={[disaster.cityInfo.coordinates.lat, disaster.cityInfo.coordinates.lng] as LatLngTuple}
                    icon={disasterIcons[disaster.type as keyof typeof disasterIcons]}
                  >
                    <Popup>
                      <div className="disaster-popup">
                        <h3 className="font-bold text-lg">{disaster.name}</h3>
                        <p className="text-gray-600 capitalize">{disaster.type}</p>
                        <p className="mt-2">
                          <span className="font-medium">Severity:</span> {disaster.severity}/5
                        </p>
                        <p>
                          <span className="font-medium">Affected Population:</span> {disaster.affectedPopulation.toLocaleString()}
                        </p>
                        <div className="mt-2">
                          <h4 className="font-medium">Resource Needs:</h4>
                          <ul className="list-disc pl-4">
                            <li>Food Kits: {disaster.resourceNeeds.food_kits}</li>
                            <li>Medical Kits: {disaster.resourceNeeds.medical_kits}</li>
                            <li>Tents: {disaster.resourceNeeds.tents}</li>
                            <li>Water Packets: {disaster.resourceNeeds.water_packets}</li>
                          </ul>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              ))}
              {/* Resource Hubs */}
              {resourceHubs.map(hub => (
                <Marker
                  key={hub.id}
                  position={[hub.coordinates.lat, hub.coordinates.lng] as LatLngTuple}
                  icon={resourceIcons.hub}
                >
                  <Popup>
                    <div className="hub-popup">
                      <h3 className="font-bold text-lg">{hub.name}</h3>
                      <div className="mt-2">
                        <h4 className="font-medium">Available Resources:</h4>
                        <ul className="list-disc pl-4">
                          <li>Food Kits: {hub.resources.food_kits.available}</li>
                          <li>Medical Kits: {hub.resources.medical_kits.available}</li>
                          <li>Tents: {hub.resources.tents.available}</li>
                          <li>Water Packets: {hub.resources.water_packets.available}</li>
                        </ul>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
            <Button variant="primary" size="sm" icon={<Plus size={16} />} aria-label="Zoom in" />
            <Button variant="primary" size="sm" icon={<Minus size={16} />} aria-label="Zoom out" />
          </div>
          {/* Alert banner */}
          <div className="absolute bottom-4 left-4 right-4 bg-emergency-900 text-white p-3 rounded-lg flex items-center z-10">
            <AlertTriangle size={20} className="mr-2" />
            <div>
              <h3 className="font-bold">Disaster Impact Zone</h3>
              <p className="text-sm">Red circles show areas currently under disaster. Click markers for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisMap;