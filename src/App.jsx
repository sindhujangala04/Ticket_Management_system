import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("userRole");
  
  if (!userRole) return <Navigate to="/login" />;
  if (allowedRole && userRole !== allowedRole) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        

        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-Based Dashboards */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/client-dashboard" 
          element={
            <ProtectedRoute allowedRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/technician-dashboard" 
          element={
            <ProtectedRoute allowedRole="technician">
              <TechnicianDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
import Navbar from './components/Navbar';


export default App;