const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and performance middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Adds various HTTP headers for security
app.use(compression()); // Compresses response bodies
app.use(morgan('dev')); // HTTP request logger
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Load JSON data with better error handling
const loadJSONData = (filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    console.log(`Loading data from: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return { disasters: [], cities: [], hubs: [], allocations: [] };
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`Successfully loaded ${filename}`);
    return parsedData;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return { disasters: [], cities: [], hubs: [], allocations: [] };
  }
};

// Load all data files
console.log('Loading data files...');
let cities = loadJSONData('cities.json');
let resourceHubs = loadJSONData('resource-hubs.json');
let activeDisasters = loadJSONData('active-disasters.json');
let predictions = loadJSONData('predictions.json');
let allocationHistory = loadJSONData('allocation-history.json');

// Validate loaded data
console.log('Validating loaded data...');
if (!cities.cities || !resourceHubs.hubs || !activeDisasters.disasters || !allocationHistory.allocations) {
  console.error('Error: One or more data files failed to load properly');
  process.exit(1);
}

// Enhanced distance calculation with road network consideration
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Add road network factor (simplified for hackathon)
  // In India, road network efficiency varies by region
  const roadEfficiencyFactor = 1.2; // 20% additional distance due to road network
  return Math.round(distance * roadEfficiencyFactor);
};

// Enhanced resource allocation algorithm
const optimizeResourceAllocation = (disasterId) => {
  const disaster = activeDisasters.disasters.find(d => d.id === disasterId);
  if (!disaster) return null;

  const city = cities.cities.find(c => c.id === disaster.cityId);
  if (!city) return null;

  // Calculate remaining needs with priority weighting
  const remainingNeeds = {};
  const priorityWeights = {
    food_kits: 1.0,
    medical_kits: 1.5,  // Medical supplies have higher priority
    tents: 1.2,         // Shelter is second priority
    water_packets: 1.3  // Water is critical
  };

  Object.keys(disaster.resourceNeeds).forEach(resource => {
    const needed = disaster.resourceNeeds[resource] - (disaster.currentAllocation[resource] || 0);
    remainingNeeds[resource] = needed * priorityWeights[resource];
  });

  // Find best hub for allocation with enhanced scoring
  const hubOptions = resourceHubs.hubs.map(hub => {
    const distance = calculateDistance(
      city.coordinates.lat, city.coordinates.lng,
      hub.coordinates.lat, hub.coordinates.lng
    );
    
    // Calculate allocation capacity score with priority consideration
    let capacityScore = 0;
    let canAllocate = true;
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.keys(remainingNeeds).forEach(resource => {
      const needed = disaster.resourceNeeds[resource] - (disaster.currentAllocation[resource] || 0);
      const available = hub.resources[resource]?.available || 0;
      const weight = priorityWeights[resource];
      
      if (needed > 0) {
        if (available >= needed) {
          capacityScore += 1 * weight;
        } else if (available > 0) {
          capacityScore += (available / needed) * weight;
        } else {
          canAllocate = false;
        }
        totalWeight += weight;
      }
    });

    // Normalize capacity score
    capacityScore = totalWeight > 0 ? capacityScore / totalWeight : 0;

    // Calculate accessibility score based on city's accessibility rating
    const accessibilityScore = city.accessibility || 0.5;

    // Calculate hub reliability score based on historical allocations
    const hubHistory = allocationHistory.allocations.filter(a => a.hubId === hub.id);
    const reliabilityScore = hubHistory.length > 0 
      ? hubHistory.filter(a => a.status === 'delivered').length / hubHistory.length 
      : 0.5;

    // Final score calculation
    const score = canAllocate 
      ? (capacityScore * 0.4 + 
         (1 / (distance / 100 + 1)) * 0.3 + 
         accessibilityScore * 0.2 + 
         reliabilityScore * 0.1)
      : 0;

    return {
      hub,
      distance,
      capacityScore,
      accessibilityScore,
      reliabilityScore,
      canAllocate,
      score
    };
  }).filter(option => option.canAllocate)
    .sort((a, b) => b.score - a.score);

  return hubOptions.length > 0 ? hubOptions[0] : null;
};

// Enhanced prediction algorithm
const generatePredictions = (cityId) => {
  const city = cities.cities.find(c => c.id === cityId);
  if (!city) return null;

  // Calculate base risk score from city characteristics
  const baseRiskScore = city.primaryRisks.reduce((score, risk) => {
    const riskWeights = {
      'cyclone': 0.8,
      'flood': 0.7,
      'earthquake': 0.6,
      'drought': 0.5
    };
    return score + (riskWeights[risk] || 0.3);
  }, 0) / city.primaryRisks.length;

  // Adjust for city type
  const typeFactors = {
    'coastal': 1.2,
    'river': 1.1,
    'inland': 0.9
  };

  // Adjust for population density
  const populationFactor = Math.min(city.population / 1000000, 1);

  // Calculate final risk score
  const finalRiskScore = baseRiskScore * 
                        (typeFactors[city.type] || 1) * 
                        (1 + populationFactor * 0.2);

  return {
    cityId,
    riskScore: Math.min(finalRiskScore, 1),
    riskLevel: finalRiskScore > 0.7 ? 'high' : finalRiskScore > 0.4 ? 'moderate' : 'low',
    confidence: 0.85,
    factors: [
      'City characteristics',
      'Historical patterns',
      'Population density',
      'Geographic location'
    ],
    lastUpdated: new Date().toISOString()
  };
};

// API Routes
app.get('/api/dashboard', (req, res) => {
  try {
    console.log('Processing dashboard request...');
    
  const totalDisasters = activeDisasters.disasters.length;
  const criticalDisasters = activeDisasters.disasters.filter(d => d.severity >= 4).length;
  const totalAffected = activeDisasters.disasters.reduce((sum, d) => sum + d.affectedPopulation, 0);
  
    console.log('Calculating total resources...');
  const totalResources = resourceHubs.hubs.reduce((sum, hub) => {
      const hubResources = hub.resources || {};
    return {
        food_kits: sum.food_kits + (hubResources.food_kits?.available || 0),
        medical_kits: sum.medical_kits + (hubResources.medical_kits?.available || 0),
        tents: sum.tents + (hubResources.tents?.available || 0),
        water_packets: sum.water_packets + (hubResources.water_packets?.available || 0)
    };
  }, { food_kits: 0, medical_kits: 0, tents: 0, water_packets: 0 });

    console.log('Getting recent allocations...');
  const recentAllocations = allocationHistory.allocations
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

    const response = {
    overview: {
      totalDisasters,
      criticalDisasters,
      totalAffected,
      totalResources
    },
    recentAllocations
    };

    console.log('Sending dashboard response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error in /api/dashboard:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard data',
      details: error.message
    });
  }
});

// Get all active disasters
app.get('/api/disasters', (req, res) => {
  try {
  const disastersWithCityInfo = activeDisasters.disasters.map(disaster => {
    const city = cities.cities.find(c => c.id === disaster.cityId);
    return {
      ...disaster,
        cityInfo: city || { id: disaster.cityId, name: 'Unknown City', coordinates: { lat: 0, lng: 0 } }
    };
  });
  
  res.json(disastersWithCityInfo);
  } catch (error) {
    console.error('Error in /api/disasters:', error);
    res.status(500).json({ error: 'Failed to fetch disasters' });
  }
});

// Get specific disaster
app.get('/api/disasters/:id', (req, res) => {
  try {
  const disaster = activeDisasters.disasters.find(d => d.id === req.params.id);
  if (!disaster) {
    return res.status(404).json({ error: 'Disaster not found' });
  }
  
  const city = cities.cities.find(c => c.id === disaster.cityId);
  res.json({
    ...disaster,
      cityInfo: city || { id: disaster.cityId, name: 'Unknown City', coordinates: { lat: 0, lng: 0 } }
  });
  } catch (error) {
    console.error('Error in /api/disasters/:id:', error);
    res.status(500).json({ error: 'Failed to fetch disaster details' });
  }
});

// Get resource hubs
app.get('/api/hubs', (req, res) => {
  try {
  res.json(resourceHubs.hubs);
  } catch (error) {
    console.error('Error in /api/hubs:', error);
    res.status(500).json({ error: 'Failed to fetch resource hubs' });
  }
});

// Get specific hub
app.get('/api/hubs/:id', (req, res) => {
  try {
  const hub = resourceHubs.hubs.find(h => h.id === req.params.id);
  if (!hub) {
      return res.status(404).json({ error: 'Resource hub not found' });
  }
  res.json(hub);
  } catch (error) {
    console.error('Error in /api/hubs/:id:', error);
    res.status(500).json({ error: 'Failed to fetch hub details' });
  }
});

// Get predictions for a city
app.get('/api/predictions/:cityId', (req, res) => {
  try {
    const cityPredictions = predictions.predictions.filter(p => p.cityId === req.params.cityId);
    if (!cityPredictions || cityPredictions.length === 0) {
      return res.status(404).json({ error: 'Prediction not found' });
    }
  res.json({
      predictions: cityPredictions,
      lastUpdated: predictions.lastUpdated,
      nextUpdate: predictions.nextUpdate
  });
  } catch (error) {
    console.error('Error in /api/predictions/:cityId:', error);
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

// Get allocation history
app.get('/api/allocations', (req, res) => {
  const allocationsWithDetails = allocationHistory.allocations.map(allocation => {
    const disaster = activeDisasters.disasters.find(d => d.id === allocation.disasterId);
    const hub = resourceHubs.hubs.find(h => h.id === allocation.hubId);
    const city = disaster ? cities.cities.find(c => c.id === disaster.cityId) : null;
    
    return {
      ...allocation,
      disaster,
      hub,
      city
    };
  });
  
  res.json(allocationsWithDetails);
});

// Optimize allocation for a disaster
app.post('/api/optimize/:disasterId', (req, res) => {
  const bestAllocation = optimizeResourceAllocation(req.params.disasterId);
  
  if (!bestAllocation) {
    return res.status(404).json({ error: 'No suitable allocation found' });
  }
  
  const disaster = activeDisasters.disasters.find(d => d.id === req.params.disasterId);
  const city = cities.cities.find(c => c.id === disaster.cityId);
  
  // Calculate what can be allocated
  const allocation = {};
  const remainingNeeds = {};
  
  Object.keys(disaster.resourceNeeds).forEach(resource => {
    const needed = disaster.resourceNeeds[resource] - (disaster.currentAllocation[resource] || 0);
    const available = bestAllocation.hub.resources[resource]?.available || 0;
    remainingNeeds[resource] = needed;
    allocation[resource] = Math.min(needed, available);
  });
  
  // Estimate delivery time based on distance
  const deliveryHours = Math.ceil(bestAllocation.distance / 80); // Assuming 80 km/h average speed
  
  res.json({
    disasterId: req.params.disasterId,
    hubId: bestAllocation.hub.id,
    distance: bestAllocation.distance,
    deliveryTime: `${deliveryHours} hours`,
    allocation,
    remainingNeeds,
    city: city.name,
    hubName: bestAllocation.hub.name,
    score: bestAllocation.score
  });
});

// Allocate resources (simulate allocation)
app.post('/api/allocate', (req, res) => {
  const { disasterId, hubId, resources } = req.body;
  
  // Find disaster and hub
  const disaster = activeDisasters.disasters.find(d => d.id === disasterId);
  const hub = resourceHubs.hubs.find(h => h.id === hubId);
  
  if (!disaster || !hub) {
    return res.status(404).json({ error: 'Disaster or hub not found' });
  }
  
  // Update allocations (in memory)
  Object.keys(resources).forEach(resource => {
    if (hub.resources[resource] && resources[resource] > 0) {
      // Decrease available resources
      hub.resources[resource].available -= resources[resource];
      hub.resources[resource].allocated += resources[resource];
      
      // Increase disaster allocation
      if (!disaster.currentAllocation[resource]) {
        disaster.currentAllocation[resource] = 0;
      }
      disaster.currentAllocation[resource] += resources[resource];
    }
  });
  
  // Create allocation record
  const city = cities.cities.find(c => c.id === disaster.cityId);
  const distance = calculateDistance(
    city.coordinates.lat, city.coordinates.lng,
    hub.coordinates.lat, hub.coordinates.lng
  );
  
  const newAllocation = {
    id: `alloc-${Date.now()}`,
    disasterId,
    hubId,
    resources,
    distance,
    estimatedDeliveryTime: `${Math.ceil(distance / 80)} hours`,
    status: 'dispatched',
    timestamp: new Date().toISOString(),
    priority: disaster.priority
  };
  
  allocationHistory.allocations.push(newAllocation);
  
  res.json({
    success: true,
    allocation: newAllocation,
    message: 'Resources allocated successfully'
  });
});

// Get cities data
app.get('/api/cities', (req, res) => {
  res.json(cities.cities);
});

// Chatbot endpoint (simple responses)
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  const lowerMessage = message.toLowerCase();
  
  let response = "I'm here to help with disaster relief information. You can ask about active disasters, resource availability, or allocation status.";
  
  // List all active disasters
  if (lowerMessage.includes('all disasters') || lowerMessage.includes('list disasters')) {
    if (activeDisasters.disasters.length === 0) {
      response = 'There are currently no active disasters.';
    } else {
      response = 'Active disasters:\n' + activeDisasters.disasters.map(d => `- ${d.name} in ${cities.cities.find(c => c.id === d.cityId)?.name || d.cityId} (${d.type}, severity ${d.severity})`).join('\n');
    }
  }
  // List all resource hubs
  else if (lowerMessage.includes('all hubs') || lowerMessage.includes('list hubs') || lowerMessage.includes('resource hubs')) {
    response = 'Resource hubs:\n' + resourceHubs.hubs.map(h => `- ${h.name} (${h.location}): ${h.capacity_status} capacity`).join('\n');
  }
  // Resource availability by city or hub
  else if (lowerMessage.match(/resources? (in|at) (.+)/)) {
    const match = lowerMessage.match(/resources? (in|at) (.+)/);
    const place = match[2].trim();
    // Try city first
    const city = cities.cities.find(c => c.name.toLowerCase() === place);
    if (city) {
      // Find hub in that city
      const hub = resourceHubs.hubs.find(h => h.location.toLowerCase() === place);
      if (hub) {
        response = `${hub.name} (${hub.location}) resources:\n` +
          `Food kits: ${hub.resources.food_kits.available}\n` +
          `Medical kits: ${hub.resources.medical_kits.available}\n` +
          `Tents: ${hub.resources.tents.available}\n` +
          `Water packets: ${hub.resources.water_packets.available}`;
      } else {
        response = `No resource hub found in ${city.name}.`;
      }
    } else {
      // Try hub by name
      const hub = resourceHubs.hubs.find(h => h.name.toLowerCase().includes(place));
      if (hub) {
        response = `${hub.name} (${hub.location}) resources:\n` +
          `Food kits: ${hub.resources.food_kits.available}\n` +
          `Medical kits: ${hub.resources.medical_kits.available}\n` +
          `Tents: ${hub.resources.tents.available}\n` +
          `Water packets: ${hub.resources.water_packets.available}`;
      } else {
        response = `No resource hub or city found matching '${place}'.`;
      }
    }
  }
  // Disaster status by city
  else if (lowerMessage.match(/disaster (in|at) (.+)/)) {
    const match = lowerMessage.match(/disaster (in|at) (.+)/);
    const place = match[2].trim();
    const city = cities.cities.find(c => c.name.toLowerCase() === place);
    if (city) {
      const disaster = activeDisasters.disasters.find(d => d.cityId === city.id);
      if (disaster) {
        response = `Disaster in ${city.name}: ${disaster.name} (${disaster.type}, severity ${disaster.severity}). Affected population: ${disaster.affectedPopulation.toLocaleString()}.`;
      } else {
        response = `No active disaster reported in ${city.name}.`;
      }
    } else {
      response = `City '${place}' not found.`;
    }
  }
  // How to request resources
  else if (lowerMessage.includes('request resource') || lowerMessage.includes('how to request')) {
    response = 'To request resources, please use the Resource Management section of the dashboard or contact your regional command center.';
  }
  // How to contact emergency support
  else if (lowerMessage.includes('contact support') || lowerMessage.includes('emergency contact')) {
    response = 'For emergency support, contact the National Emergency Helpline at 112 or your local command center.';
  }
  // Existing logic for disaster/resource/status
  else if (lowerMessage.includes('disaster') || lowerMessage.includes('emergency')) {
    const activeCount = activeDisasters.disasters.filter(d => d.status === 'active').length;
    response = `Currently, we have ${activeCount} active disasters. The most critical is in ${cities.cities.find(c => c.id === activeDisasters.disasters[0]?.cityId)?.name || 'various locations'} with severity level ${activeDisasters.disasters[0]?.severity || 'unknown'}.`;
  } else if (lowerMessage.includes('resource') || lowerMessage.includes('supply')) {
    response = "Our resource hubs have food kits, medical supplies, tents, and water packets available. Delhi hub has the highest capacity currently.";
  } else if (lowerMessage.includes('help') || lowerMessage.includes('status')) {
    response = "I can provide information about:\n- Active disasters and their severity\n- Resource hub availability\n- Allocation status and delivery times\n- Risk predictions for different cities";
  } else {
    response = "Sorry, I didn't understand that. You can ask about: active disasters, resource hubs, resource availability, disaster status by city, or how to request help.";
  }
  
  res.json({
    response,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/dashboard');
  console.log('- GET /api/disasters');
  console.log('- GET /api/hubs');
  console.log('- GET /api/predictions/:cityId');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});