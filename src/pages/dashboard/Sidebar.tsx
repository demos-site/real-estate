import React from 'react';
import { Building, LayoutDashboard, Users, Settings as SettingsIcon, LogOut } from 'lucide-react';
import type { Agent } from '../../data/mockDb';

interface SidebarProps {
  activeTab: 'overview' | 'properties' | 'leads' | 'settings';
  setActiveTab: (tab: 'overview' | 'properties' | 'leads' | 'settings') => void;
  newLeadsCount: number;
  agent: Agent;
  logout: () => void;
  setIsAddingProperty?: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  newLeadsCount,
  agent,
  logout,
  setIsAddingProperty
}) => {
  const handleTabClick = (tab: 'overview' | 'properties' | 'leads' | 'settings') => {
    setActiveTab(tab);
    if (setIsAddingProperty) {
      setIsAddingProperty(false);
    }
  };

  return (
    <aside className="w-full md:w-64 bg-primary-700 dark:bg-dark-900 text-white flex flex-col justify-between p-6 border-r border-transparent dark:border-slate-800">
      <div className="space-y-8">
        
        {/* Brand header */}
        <div className="flex items-center gap-2 border-b border-white/10 dark:border-slate-800 pb-5">
          <div className="p-2 bg-white/10 rounded-lg">
            <Building className="h-5 w-5 text-gold-500" />
          </div>
          <div>
            <span className="block font-black text-sm uppercase tracking-wider text-gold-500">RR Console</span>
            <span className="block text-[10px] text-white/50 tracking-widest font-semibold uppercase">Management</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2">
          
          <button
            onClick={() => handleTabClick('overview')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-white/15 dark:bg-gold-500/15 text-white dark:text-gold-500'
                : 'text-white/75 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Overview
          </button>

          <button
            onClick={() => handleTabClick('properties')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'properties'
                ? 'bg-white/15 dark:bg-gold-500/15 text-white dark:text-gold-500'
                : 'text-white/75 hover:bg-white/5'
            }`}
          >
            <Building className="h-4.5 w-4.5" />
            Listings Manager
          </button>

          <button
            onClick={() => handleTabClick('leads')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
              activeTab === 'leads'
                ? 'bg-white/15 dark:bg-gold-500/15 text-white dark:text-gold-500'
                : 'text-white/75 hover:bg-white/5'
            }`}
          >
            <Users className="h-4.5 w-4.5" />
            Leads CRM
            {newLeadsCount > 0 && (
              <span className="absolute right-4 px-2 py-0.5 text-[10px] font-black bg-rose-500 text-white rounded-full">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabClick('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-white/15 dark:bg-gold-500/15 text-white dark:text-gold-500'
                : 'text-white/75 hover:bg-white/5'
            }`}
          >
            <SettingsIcon className="h-4.5 w-4.5" />
            Settings
          </button>

        </nav>
      </div>

      {/* Footer Logout */}
      <div className="mt-8 pt-4 border-t border-white/10 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={agent.photo}
            alt={agent.name}
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
          <div className="text-left">
            <span className="block text-xs font-bold truncate max-w-[120px]">{agent.name}</span>
            <span className="block text-[9px] text-white/50 uppercase tracking-widest font-semibold">Active Agent</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-xs font-bold text-rose-300 hover:bg-rose-500/10 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
