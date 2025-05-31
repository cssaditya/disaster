import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import IndiaDisasterMap from './pages/IndiaDisasterMap';
import PredictionCenter from './pages/PredictionCenter';
import EmergencyResponse from './pages/EmergencyResponse';
import ResourceManagement from './pages/ResourceManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CrisisMap from './pages/CrisisMap';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
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