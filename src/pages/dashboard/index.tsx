import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import OverviewTab from './OverviewTab';
import ListingsTab from './ListingsTab';
import LeadsTab from './LeadsTab';
import SettingsTab from './SettingsTab';

const Dashboard: React.FC = () => {
  const {
    properties,
    leads,
    agent,
    settings,
    logout,
    addProperty,
    updateProperty,
    deleteProperty,
    updateLead,
    deleteLead,
    updateAgent,
    updateSettings
  } = useApp();

  // Active dashboard tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'leads' | 'settings'>('overview');

  // New leads count for sidebar badge
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 transition-colors duration-300 flex flex-col md:flex-row text-left">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        newLeadsCount={newLeadsCount}
        agent={agent}
        logout={logout}
      />

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {activeTab === 'overview' && (
          <OverviewTab
            properties={properties}
            leads={leads}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'properties' && (
          <ListingsTab
            properties={properties}
            addProperty={addProperty}
            updateProperty={updateProperty}
            deleteProperty={deleteProperty}
          />
        )}

        {activeTab === 'leads' && (
          <LeadsTab
            leads={leads}
            properties={properties}
            updateLead={updateLead}
            deleteLead={deleteLead}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            agent={agent}
            settings={settings}
            updateAgent={updateAgent}
            updateSettings={updateSettings}
          />
        )}

      </main>
    </div>
  );
};

export default Dashboard;
