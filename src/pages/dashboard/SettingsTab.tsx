import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Agent, BusinessSettings } from '../../data/mockDb';

interface SettingsTabProps {
  agent: Agent;
  settings: BusinessSettings;
  updateAgent: (agent: Agent) => void;
  updateSettings: (settings: BusinessSettings) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  agent,
  settings,
  updateAgent,
  updateSettings
}) => {
  // Agent profile state
  const [agentName, setAgentName] = useState(agent.name);
  const [agentTitle, setAgentTitle] = useState(agent.designation);
  const [agentExp, setAgentExp] = useState(agent.experience);
  const [agentBio, setAgentBio] = useState(agent.bio);
  
  // Business settings state
  const [bizWhatsApp, setBizWhatsApp] = useState(settings.whatsapp_number);
  const [bizAddress, setBizAddress] = useState(settings.office_address);
  const [bizFacebook, setBizFacebook] = useState(settings.facebook);
  const [bizInsta, setBizInsta] = useState(settings.instagram);
  const [bizLinkedIn, setBizLinkedIn] = useState(settings.linkedin);

  const handleSaveSettings = () => {
    updateAgent({
      ...agent,
      name: agentName,
      designation: agentTitle,
      experience: agentExp,
      bio: agentBio
    });

    updateSettings({
      ...settings,
      whatsapp_number: bizWhatsApp,
      office_address: bizAddress,
      facebook: bizFacebook,
      instagram: bizInsta,
      linkedin: bizLinkedIn
    });
  };

  const handleResetSettings = () => {
    setAgentName(agent.name);
    setAgentTitle(agent.designation);
    setAgentExp(agent.experience);
    setAgentBio(agent.bio);
    setBizWhatsApp(settings.whatsapp_number);
    setBizAddress(settings.office_address);
    setBizFacebook(settings.facebook);
    setBizInsta(settings.instagram);
    setBizLinkedIn(settings.linkedin);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Console Configuration</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Configure profile, phone details, copyable links, and portal security.</p>
      </div>

      {/* Agent profile settings */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-left">
        <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b border-slate-50 dark:border-slate-700 pb-3">Agent Profile Settings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
            <input
              type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Designation</label>
            <input
              type="text" value={agentTitle} onChange={(e) => setAgentTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Years of Experience</label>
            <input
              type="text" value={agentExp} onChange={(e) => setAgentExp(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2">Biography (Rich HTML)</label>
            <textarea
              rows={4} value={agentBio} onChange={(e) => setAgentBio(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 resize-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Business Contact Configuration */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-left">
        <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b border-slate-50 dark:border-slate-700 pb-3">Business Settings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
            <input
              type="text" value={bizWhatsApp} onChange={(e) => setBizWhatsApp(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Office Address</label>
            <input
              type="text" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Facebook Page</label>
            <input
              type="text" value={bizFacebook} onChange={(e) => setBizFacebook(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Instagram Handle</label>
            <input
              type="text" value={bizInsta} onChange={(e) => setBizInsta(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">LinkedIn Page</label>
            <input
              type="text" value={bizLinkedIn} onChange={(e) => setBizLinkedIn(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Save Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleResetSettings}
          className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          Reset Configuration
        </button>
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 rounded-xl text-xs font-extrabold text-white flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save System Config
        </button>
      </div>

    </div>
  );
};

export default SettingsTab;
