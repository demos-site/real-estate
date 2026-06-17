import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import AgentProfile from './pages/AgentProfile';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';

// Route Guard for Admin Dashboard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/dashboard/login" replace />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public views wrapped in Header/Footer Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/properties" element={<Layout><Properties /></Layout>} />
          <Route path="/properties/:slug" element={<Layout><PropertyDetail /></Layout>} />
          <Route path="/agent" element={<Layout><AgentProfile /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Standalone Views */}
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
