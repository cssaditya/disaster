import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Disaster {
  id: string;
  name: string;
  type: string;
  severity: number;
  affectedPopulation: number;
  resourceNeeds: {
    food_kits: number;
    medical_kits: number;
    tents: number;
    water_packets: number;
  };
  currentAllocation: {
    food_kits: number;
    medical_kits: number;
    tents: number;
    water_packets: number;
  };
  cityInfo: {
    id: string;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface ResourceHub {
  id: string;
  name: string;
  location?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  resources: {
    food_kits: { available: number; total_capacity: number; allocated: number };
    medical_kits: { available: number; total_capacity: number; allocated: number };
    tents: { available: number; total_capacity: number; allocated: number };
    water_packets: { available: number; total_capacity: number; allocated: number };
  };
  capacity_status?: string;
}

export interface DashboardData {
  overview: {
    totalDisasters: number;
    criticalDisasters: number;
    totalAffected: number;
    totalResources: {
      food_kits: number;
      medical_kits: number;
      tents: number;
      water_packets: number;
    };
  };
  recentAllocations: Array<{
    id: string;
    disasterId: string;
    hubId: string;
    resources: {
      food_kits: number;
      medical_kits: number;
      tents: number;
      water_packets: number;
    };
    status: string;
    timestamp: string;
  }>;
}

export const apiService = {
  // Dashboard
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  // Disasters
  getDisasters: async (): Promise<Disaster[]> => {
    const response = await api.get('/disasters');
    return response.data;
  },

  getDisaster: async (id: string): Promise<Disaster> => {
    const response = await api.get(`/disasters/${id}`);
    return response.data;
  },

  // Resource Hubs
  getResourceHubs: async (): Promise<ResourceHub[]> => {
    const response = await api.get('/hubs');
    return response.data;
  },

  getResourceHub: async (id: string): Promise<ResourceHub> => {
    const response = await api.get(`/hubs/${id}`);
    return response.data;
  },

  // Predictions
  getPredictions: async (cityId: string) => {
    const response = await api.get(`/predictions/${cityId}`);
    return response.data;
  },

  // Resource Allocation
  allocateResources: async (disasterId: string, hubId: string, resources: any) => {
    const response = await api.post('/allocate', {
      disasterId,
      hubId,
      resources,
    });
    return response.data;
  },

  // Allocations history
  getAllocations: async () => {
    const response = await api.get('/allocations');
    return response.data;
  },
};

export default apiService; 