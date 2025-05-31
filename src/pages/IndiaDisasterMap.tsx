import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, Popup, Circle, FeatureGroup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import apiService from '../services/api';
import { Disaster, ResourceHub } from '../services/api';

// Custom icons
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

const IndiaDisasterMap = () => {
  const [activeLayers, setActiveLayers] = useState({
    disasters: true,
    resourceHubs: true,
    impactZones: true
  });
  const [baseMap, setBaseMap] = useState('street');
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [resourceHubs, setResourceHubs] = useState<ResourceHub[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // India center coordinates
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
          setLastUpdated(new Date());
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load disaster data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getBaseMapUrl = () => {
    switch(baseMap) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'topo':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="text-emergency-900 text-lg">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-900 text-white rounded hover:bg-primary-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={indiaCenter} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Base Map Layer */}
        <TileLayer
          url={getBaseMapUrl()}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Disasters */}
        {activeLayers.disasters && disasters.map(disaster => (
          <Marker
            key={disaster.id}
            position={[disaster.cityInfo.coordinates.lat, disaster.cityInfo.coordinates.lng]}
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
        ))}

        {/* Resource Hubs */}
        {activeLayers.resourceHubs && resourceHubs.map(hub => (
          <Marker
            key={hub.id}
            position={[hub.coordinates.lat, hub.coordinates.lng]}
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

        {/* UI Components */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
          <div className="space-y-4">
            <h3 className="font-bold">Map Layers</h3>
            
            <div>
              <h4 className="font-medium mb-1">Base Map</h4>
              <select 
                className="w-full p-1 border rounded"
                value={baseMap}
                onChange={(e) => setBaseMap(e.target.value)}
              >
                <option value="street">Street Map</option>
                <option value="satellite">Satellite Imagery</option>
                <option value="topo">Topographic</option>
              </select>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Layers</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeLayers.disasters}
                    onChange={() => setActiveLayers(prev => ({ ...prev, disasters: !prev.disasters }))}
                  />
                  <span>Disasters</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeLayers.resourceHubs}
                    onChange={() => setActiveLayers(prev => ({ ...prev, resourceHubs: !prev.resourceHubs }))}
                  />
                  <span>Resource Hubs</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeLayers.impactZones}
                    onChange={() => setActiveLayers(prev => ({ ...prev, impactZones: !prev.impactZones }))}
                  />
                  <span>Impact Zones</span>
                  </label>
                </div>
            </div>
          </div>
            </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
          <h3 className="font-bold mb-2">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <img src={disasterIcons.cyclone.options.iconUrl} alt="Cyclone" className="w-6 h-6" />
              <span>Cyclone</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={disasterIcons.flood.options.iconUrl} alt="Flood" className="w-6 h-6" />
              <span>Flood</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={disasterIcons.earthquake.options.iconUrl} alt="Earthquake" className="w-6 h-6" />
              <span>Earthquake</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={resourceIcons.hub.options.iconUrl} alt="Resource Hub" className="w-6 h-6" />
              <span>Resource Hub</span>
            </div>
            </div>
            </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg z-[1000] text-sm text-gray-600">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default IndiaDisasterMap; 