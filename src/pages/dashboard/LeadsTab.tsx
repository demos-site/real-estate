import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar } from 'lucide-react';
import type { Lead, Property } from '../../data/mockDb';

interface LeadsTabProps {
  leads: Lead[];
  properties: Property[];
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

const LeadsTab: React.FC<LeadsTabProps> = ({
  leads,
  properties,
  updateLead,
  deleteLead
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  
  // CRM notes state
  const [leadNotes, setLeadNotes] = useState('');
  const [leadStatusVal, setLeadStatusVal] = useState<'new' | 'contacted' | 'follow_up' | 'site_visit' | 'negotiation' | 'closed'>('new');
  const [nextFollowupVal, setNextFollowupVal] = useState('');

  const handleOpenLeadPanel = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || '');
    setLeadStatusVal(lead.status as any);
    setNextFollowupVal(lead.next_followup || '');
  };

  const handleUpdateLeadCRM = () => {
    if (selectedLead) {
      updateLead(selectedLead.id, {
        notes: leadNotes,
        status: leadStatusVal,
        next_followup: nextFollowupVal || null,
        last_contacted: new Date().toISOString().split('T')[0]
      });
      setSelectedLead(null);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchSearch =
        l.full_name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.phone.toLowerCase().includes(leadSearch.toLowerCase());
      
      const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [leads, leadSearch, leadStatusFilter]);

  // Get lead status badge color helper
  const getLeadBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'contacted': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'follow_up': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'site_visit': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'negotiation': return 'bg-teal-500/10 text-teal-500 border-teal-500/20';
      case 'closed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Leads CRM Pipeline</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage incoming property inquiries, track deal stages, and maintain follow-up notes.</p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-dark-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-left">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search leads by name, email, or phone..."
            value={leadSearch}
            onChange={(e) => setLeadSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-dark-900 px-3 py-1.5 rounded-xl border border-transparent">
          <select
            value={leadStatusFilter}
            onChange={(e) => setLeadStatusFilter(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 outline-none border-none pr-8 cursor-pointer"
          >
            <option value="all">All Stages</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="follow_up">Follow Up</option>
            <option value="site_visit">Site Visit</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed">Closed / Deal Done</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-dark-900 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                <th className="p-4">Contact Detail</th>
                <th className="p-4">Inquiry Subject</th>
                <th className="p-4">Property interested</th>
                <th className="p-4">Stage Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => {
                const matchedProp = properties.find(p => p.id === lead.property_id);
                return (
                  <tr key={lead.id} className="border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-350">
                    
                    <td className="p-4 text-left">
                      <span className="block font-bold text-slate-900 dark:text-white">{lead.full_name}</span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500">{lead.phone} &bull; {lead.email}</span>
                    </td>

                    <td className="p-4 font-semibold max-w-[150px] truncate text-left">{lead.subject}</td>

                    <td className="p-4 text-xs text-left">
                      {matchedProp ? (
                        <Link to={`/properties/${matchedProp.slug}`} target="_blank" className="text-primary-500 dark:text-gold-500 hover:underline font-bold">
                          {matchedProp.title}
                        </Link>
                      ) : (
                        <span className="text-slate-400">General Inquiry</span>
                      )}
                    </td>

                    <td className="p-4 text-left">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full border ${getLeadBadgeColor(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenLeadPanel(lead)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-dark-900 dark:hover:bg-dark-950 text-xs font-bold text-slate-700 dark:text-slate-250 rounded-xl"
                      >
                        Review Lead
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar CRM Panel Overlay */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end animate-fade-in" onClick={() => setSelectedLead(null)}>
          <div
            className="w-[450px] max-w-full h-full bg-white dark:bg-dark-800 p-8 flex flex-col justify-between shadow-2xl relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  Lead details review
                </span>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Lead info card */}
              <div className="space-y-3 bg-slate-50 dark:bg-dark-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Customer Name</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedLead.full_name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Phone</span>
                    <a href={`tel:${selectedLead.phone}`} className="text-xs font-bold text-primary-500 hover:underline">{selectedLead.phone}</a>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-xs font-bold text-primary-500 hover:underline block truncate">{selectedLead.email}</a>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Inquiry Date</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{new Date(selectedLead.created_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Inquiry Message */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Customer Message</span>
                <div className="p-4 bg-slate-50 dark:bg-dark-900 rounded-xl text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800/80 font-medium">
                  "{selectedLead.message}"
                </div>
              </div>

              {/* CRM Pipeline status selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  CRM Pipeline stage
                </label>
                <select
                  value={leadStatusVal}
                  onChange={(e) => setLeadStatusVal(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 cursor-pointer font-bold"
                >
                  <option value="new">New (Unreviewed)</option>
                  <option value="contacted">Contacted (Emailed/Called)</option>
                  <option value="follow_up">Follow Up Pending</option>
                  <option value="site_visit">Site Visit Arranged</option>
                  <option value="negotiation">Active Negotiation</option>
                  <option value="closed">Deal Completed / Closed</option>
                </select>
              </div>

              {/* Follow up Date Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Next Follow-up date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="date"
                    value={nextFollowupVal}
                    onChange={(e) => setNextFollowupVal(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 cursor-pointer font-bold"
                  />
                </div>
              </div>

              {/* Private Notes details */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Private CRM notes (Agent only)
                </label>
                <textarea
                  rows={4}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Log meeting discussions, preference comments, or deal details..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 resize-none font-medium"
                />
              </div>

            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <button
                onClick={() => deleteLead(selectedLead.id)}
                className="w-1/3 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold rounded-xl text-xs"
              >
                Delete Lead
              </button>
              <button
                onClick={handleUpdateLeadCRM}
                className="w-2/3 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 font-extrabold rounded-xl text-xs text-white"
              >
                Save CRM Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LeadsTab;
