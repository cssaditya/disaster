import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, Popup, Circle, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Polyline } from 'react-leaflet'; // Import Polyline

// Custom icons
const resourceIcons = {
  shelter: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2849/2849557.png',
    iconSize: [28, 28]
  }),
  medical: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965300.png',
    iconSize: [28, 28]
  }),
  supplies: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/411/411745.png',
    iconSize: [28, 28]
  }),
  evacuation: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3161/3161837.png',
    iconSize: [28, 28]
  })
};

const IndiaDisasterMap = () => {
  const [activeLayers, setActiveLayers] = useState({
    precipitation: false,
    windSpeed: false,
    impactZones: true,
    infrastructure: false,
    evacuationRoutes: true,
    commOutages: false
  });
  const [baseMap, setBaseMap] = useState('street');
  const [disasterData, setDisasterData] = useState(null);
  const [resources, setResources] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // India center coordinates
  const indiaCenter = [20.5937, 78.9629];

  // Mock cyclone data for demonstration
  const mockCyclone = {
    position: [19.0760, 72.8777], // Mumbai coordinates
    category: 4,
    windSpeed: 220, // km/h
    forecastPath: [
      [19.0760, 72.8777],
      [19.5, 73.1],
      [20.0, 73.5],
      [20.5, 74.0]
    ],
    impactZones: {
      severeFlooding: [
        [19.0, 72.8], [19.0, 73.0], [19.2, 73.0], [19.2, 72.8]
      ],
      evacuation: [
        [18.9, 72.7], [18.9, 73.1], [19.3, 73.1], [19.3, 72.7]
      ]
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls with mock data
        setTimeout(() => {
          setDisasterData({
            cyclone: mockCyclone,
            precipitation: getMockPrecipitationData(),
            windSpeed: getMockWindData(),
            infrastructure: getMockInfrastructureData(),
            commOutages: getMockOutageData()
          });
          
          setResources(getMockResourceData());
          setLastUpdated(new Date());
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Mock data generators
  const getMockResourceData = () => [
    { id: 1, type: 'shelter', location: [19.0760, 72.8777], name: "Mumbai Central Shelter", capacity: 500 },
    { id: 2, type: 'medical', location: [19.1, 72.9], name: "Coastal Medical Center", status: "operational" },
    { id: 3, type: 'supplies', location: [19.05, 72.85], name: "Western Relief Depot", supplies: ["food", "water", "blankets"] },
    { id: 4, type: 'evacuation', location: [19.2, 72.8], name: "Northern Evacuation Point", routes: ["NH8", "Western Express"] }
  ];

  const getMockPrecipitationData = () => ({
    type: "FeatureCollection",
    features: [
      {}
    ]
  });

  const getMockWindData = () => ({
    type: "FeatureCollection",
    features: [
      {}
    ]
  });

  const getMockInfrastructureData = () => ({
    hospitals: [
      {}
    ],
    powerStations: [
      {}
    ]
  });

  const getMockOutageData = () => ({
    type: "FeatureCollection",
    features: [
      {}
    ]
  });

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

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
    return <div className="text-center py-8">Loading disaster data...</div>;
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

        {/* Cyclone Forecast Path */}
        {disasterData?.cyclone && (
          <FeatureGroup>
            <Circle
              center={disasterData.cyclone.position}
              radius={50000} // 50km radius
              color="red"
              fillColor="#f03"
              fillOpacity={0.3}
            />
            <Polyline
              positions={disasterData.cyclone.forecastPath}
              color="red"
              weight={3}
              dashArray="5, 5"
            />
          </FeatureGroup>
        )}

        {/* Impact Zones */}
        {activeLayers.impactZones && disasterData?.cyclone?.impactZones && (
          <>
            <GeoJSON
              data={{
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [disasterData.cyclone.impactZones.severeFlooding]
                }
              }}
              style={{ color: 'blue', fillOpacity: 0.3 }}
            />
            <GeoJSON
              data={{
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [disasterData.cyclone.impactZones.evacuation]
                }
              }}
              style={{ color: 'red', fillOpacity: 0.2, dashArray: "5, 5" }}
            />
          </>
        )}

        {/* Resources */}
        {resources.map(resource => (
          <Marker
            key={resource.id}
            position={resource.location}
            icon={resourceIcons[resource.type]}
          >
            <Popup>
              <div className="resource-popup">
                <h3 className="font-bold">{resource.name}</h3>
                <p className="capitalize text-gray-600">{resource.type.replace(/([A-Z])/g, ' $1').trim()}</p>
                {resource.capacity && <p>Capacity: {resource.capacity} people</p>}
                {resource.supplies && (
                  <div>
                    <p>Supplies:</p>
                    <ul className="list-disc pl-4">
                      {resource.supplies.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* UI Components */}
        <Panel position="topright">
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
              <h4 className="font-medium mb-1">Map Layers</h4>
              {Object.entries(activeLayers).map(([layer, active]) => (
                <div key={layer} className="flex items-center">
                  <input
                    type="checkbox"
                    id={layer}
                    checked={active}
                    onChange={() => toggleLayer(layer)}
                    className="mr-2"
                  />
                  <label htmlFor={layer} className="capitalize">
                    {layer.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Legend position="bottomleft">
          <div className="space-y-3">
            <h3 className="font-bold">Storm Intensity</h3>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-800 mr-2"></div>
              <span>Extreme (Cat 4-5)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-600 mr-2"></div>
              <span>Severe (Cat 3)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 mr-2"></div>
              <span>Moderate (Cat 1-2)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
              <span>Tropical Storm</span>
            </div>

            <h3 className="font-bold mt-4">Resource Types</h3>
            <div className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2849/2849557.png" width="16" className="mr-2" />
              <span>Emergency Shelter</span>
            </div>
            <div className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2965/2965300.png" width="16" className="mr-2" />
              <span>Medical Facility</span>
            </div>
            <div className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/411/411745.png" width="16" className="mr-2" />
              <span>Supply Distribution</span>
            </div>
            <div className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3161/3161837.png" width="16" className="mr-2" />
              <span>Evacuation Point</span>
            </div>

            <h3 className="font-bold mt-4">Impact Zones</h3>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 opacity-30 mr-2"></div>
              <span>Severe Flooding</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 opacity-20 mr-2"></div>
              <span>Evacuation Zone</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 opacity-30 mr-2"></div>
              <span>Safe Zone</span>
            </div>
          </div>
        </Legend>

        <DataFreshnessIndicator position="bottomright" lastUpdated={lastUpdated} />
      </MapContainer>

      {/* Alert Banner */}
      {disasterData?.cyclone && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded shadow-lg z-[1000]">
          <strong>Cyclone Alert:</strong> Category {disasterData.cyclone.category} cyclone approaching. 
          Expected landfall in 6 hours. Evacuation recommended for highlighted areas.
        </div>
      )}
    </div>
  );
};

// UI Component: Panel
const Panel = ({ position = 'topright', children }) => {
  // Implementation of Panel component
};

// UI Component: Legend
const Legend = ({ position = 'bottomleft', children }) => {
  // Implementation of Legend component
};

// UI Component: Data Freshness Indicator
const DataFreshnessIndicator = ({ position = 'bottomright', lastUpdated }) => {
  // Implementation of DataFreshnessIndicator component
};

export default IndiaDisasterMap; 