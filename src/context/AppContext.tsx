import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDb } from '../data/mockDb';
import type { Property, Lead, Agent, BusinessSettings } from '../data/mockDb';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  properties: Property[];
  leads: Lead[];
  agent: Agent;
  settings: BusinessSettings;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addProperty: (property: Omit<Property, 'id' | 'created_at'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'status' | 'notes' | 'last_contacted' | 'next_followup'>) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  updateAgent: (agent: Agent) => void;
  updateSettings: (settings: BusinessSettings) => void;
  triggerToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('rr_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // DB states
  const [properties, setProperties] = useState<Property[]>(() => mockDb.getProperties());
  const [leads, setLeads] = useState<Lead[]>(() => mockDb.getLeads());
  const [agent, setAgent] = useState<Agent>(() => mockDb.getAgent());
  const [settings, setSettings] = useState<BusinessSettings>(() => mockDb.getSettings());
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('rr_auth_session') === 'true';
  });

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Apply theme class to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('rr_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Trigger toast notifications
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Auth operations
  const login = (email: string, pass: string): boolean => {
    // Mock authentication matching agent email
    if (email.toLowerCase() === agent.email.toLowerCase() && pass === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('rr_auth_session', 'true');
      triggerToast('Signed in successfully!', 'success');
      return true;
    }
    triggerToast('Invalid email or password.', 'error');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rr_auth_session');
    triggerToast('Signed out successfully.', 'info');
  };

  // Property operations
  const addProperty = (newProp: Omit<Property, 'id' | 'created_at'>) => {
    const prop: Property = {
      ...newProp,
      id: `prop-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    const updated = [prop, ...properties];
    setProperties(updated);
    mockDb.saveProperties(updated);
    triggerToast('Property listed successfully!', 'success');
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    const updated = properties.map(p => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    setProperties(updated);
    mockDb.saveProperties(updated);
    triggerToast('Property updated successfully!', 'success');
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter(p => p.id !== id);
    setProperties(updated);
    mockDb.saveProperties(updated);
    triggerToast('Property deleted.', 'info');
  };

  // Lead operations
  const addLead = (newLead: Omit<Lead, 'id' | 'created_at' | 'status' | 'notes' | 'last_contacted' | 'next_followup'>) => {
    const lead: Lead = {
      ...newLead,
      id: `lead-${Date.now()}`,
      status: 'new',
      notes: '',
      last_contacted: null,
      next_followup: null,
      created_at: new Date().toISOString()
    };
    const updated = [lead, ...leads];
    setLeads(updated);
    mockDb.saveLeads(updated);
    
    // Simulate real-time sound/visual notification in admin dashboard if logged in
    triggerToast(`New inquiry from ${newLead.full_name}!`, 'info');
  };

  const updateLead = (id: string, updatedFields: Partial<Lead>) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, ...updatedFields };
      }
      return l;
    });
    setLeads(updated);
    mockDb.saveLeads(updated);
    triggerToast('Lead updated.', 'success');
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    mockDb.saveLeads(updated);
    triggerToast('Lead deleted.', 'info');
  };

  // Profile operations
  const updateAgent = (updatedAgent: Agent) => {
    setAgent(updatedAgent);
    mockDb.saveAgent(updatedAgent);
    triggerToast('Agent profile updated.', 'success');
  };

  // Settings operations
  const updateSettings = (updatedSettings: BusinessSettings) => {
    setSettings(updatedSettings);
    mockDb.saveSettings(updatedSettings);
    triggerToast('Business settings updated.', 'success');
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      properties, leads, agent, settings,
      isAuthenticated, login, logout,
      addProperty, updateProperty, deleteProperty,
      addLead, updateLead, deleteLead,
      updateAgent, updateSettings,
      triggerToast, toast
    }}>
      {children}
      
      {/* Dynamic Toast Element */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slide-in-right ${
          toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
          toast.type === 'error' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
          'bg-blue-500/10 text-blue-500 border-blue-500/20'
        } backdrop-blur-md`}>
          <div className={`w-2 h-2 rounded-full ${
            toast.type === 'success' ? 'bg-emerald-500' :
            toast.type === 'error' ? 'bg-rose-500' :
            'bg-blue-500'
          }`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
