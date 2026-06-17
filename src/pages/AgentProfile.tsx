import React from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/ui/PropertyCard';
import { Phone, Mail, Award, Copy } from 'lucide-react';

const AgentProfile: React.FC = () => {
  const { agent, properties, triggerToast } = useApp();

  // Filter properties represented by this broker (publicly active listings)
  const agentProperties = properties.filter(p => p.status !== 'draft');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`${label} copied to clipboard!`, 'success');
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-950 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Agent Profile Card Hero */}
        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Photo Column */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="absolute inset-0 bg-primary-500/5 dark:bg-gold-500/5 rounded-3xl rotate-2" />
              <div className="relative aspect-[4/5] w-full max-w-sm rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg bg-slate-100">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Summary Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="flex items-center gap-1 w-fit px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-gold-500/10 text-gold-600 dark:text-gold-500 border border-gold-500/20 rounded-lg">
                  <Award className="h-4 w-4" />
                  Primary Broker Advisor
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4">
                  {agent.name}
                </h1>
                <p className="text-base font-semibold text-slate-500 dark:text-gold-200 mt-1">
                  {agent.designation} &bull; <span className="text-primary-500 dark:text-gold-500">{agent.experience} Experience</span>
                </p>
              </div>

              {/* Bio Summary */}
              <div
                className="text-slate-500 dark:text-slate-400 leading-relaxed space-y-4 text-sm font-medium"
                dangerouslySetInnerHTML={{ __html: agent.bio }}
              />

              {/* Contact Details Copy Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                
                {/* Phone Card */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-dark-800 text-slate-500 dark:text-slate-400 rounded-xl shadow-sm">
                      <Phone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Phone Number</span>
                      <a href={`tel:${agent.phone}`} className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-gold-500 transition-colors">
                        {agent.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(agent.phone, 'Phone number')}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-dark-800 rounded-lg transition-all"
                    title="Copy Phone"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                {/* Email Card */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-dark-800 text-slate-500 dark:text-slate-400 rounded-xl shadow-sm">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Email Address</span>
                      <a href={`mailto:${agent.email}`} className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-gold-500 transition-colors">
                        {agent.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(agent.email, 'Email address')}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-dark-800 rounded-lg transition-all"
                    title="Copy Email"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

              </div>

              {/* Languages Spoken Chips */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Languages Spoken</span>
                <div className="flex flex-wrap gap-2">
                  {agent.languages_spoken.map(lang => (
                    <span
                      key={lang}
                      className="px-3.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-dark-900 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200/20"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Agent Listings Grid */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
            Agent Listings ({agentProperties.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentProfile;
