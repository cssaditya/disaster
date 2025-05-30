import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CrisisMap from './pages/CrisisMap';
import PredictionCenter from './pages/PredictionCenter';
import EmergencyResponse from './pages/EmergencyResponse';
import ResourceManagement from './pages/ResourceManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrbBackground from './components/layout/OrbBackground';

function App() {
  return (
    <>
      <OrbBackground />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<CrisisMap />} />
          <Route path="prediction" element={<PredictionCenter />} />
          <Route path="emergency" element={<EmergencyResponse />} />
          <Route path="resources" element={<ResourceManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;