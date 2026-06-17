import React, { useMemo } from 'react';
import { TrendingUp, BarChart3, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import type { Property, Lead } from '../../data/mockDb';

interface OverviewTabProps {
  properties: Property[];
  leads: Lead[];
  setActiveTab: (tab: 'overview' | 'properties' | 'leads' | 'settings') => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  properties,
  leads,
  setActiveTab
}) => {
  // Metrics calculation
  const metrics = useMemo(() => {
    const total = properties.length;
    const active = properties.filter(p => p.status === 'for_sale' || p.status === 'for_rent').length;
    const sold = properties.filter(p => p.status === 'sold' || p.status === 'rented').length;
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;

    return { total, active, sold, totalLeads, newLeads };
  }, [properties, leads]);

  // Donut chart property type distribution
  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => {
      counts[p.property_type] = (counts[p.property_type] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      name: key.toUpperCase(),
      value: counts[key]
    }));
  }, [properties]);

  const COLORS = ['#1e3c5e', '#d4af37', '#10b981', '#64748b'];

  // Mock monthly lead growth data (last 6 months)
  const chartData = [
    { month: 'Jan', leads: 4 },
    { month: 'Feb', leads: 7 },
    { month: 'Mar', leads: 12 },
    { month: 'Apr', leads: 9 },
    { month: 'May', leads: 18 },
    { month: 'Jun', leads: 24 },
  ];

  // Lead status badge color helper
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
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Metrics, analytics charts, and recent incoming leads summary.</p>
      </div>

      {/* Metrics cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between h-28">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Listings</span>
          <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{metrics.total}</span>
        </div>

        <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between h-28">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Active Listings</span>
          <span className="text-3xl font-extrabold text-primary-500 dark:text-gold-500">{metrics.active}</span>
        </div>

        <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between h-28">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Closed Deals</span>
          <span className="text-3xl font-extrabold text-emerald-500">{metrics.sold}</span>
        </div>

        <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between h-28">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Inquiries</span>
          <span className="text-3xl font-extrabold text-indigo-500">{metrics.totalLeads}</span>
        </div>

      </div>

      {/* Charts Data Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lead Growth Line Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-6 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary-500" />
            Inbound Lead Growth (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', background: '#0f172a', color: '#fff' }} />
              <Line type="monotone" dataKey="leads" stroke="#1e3c5e" strokeWidth={3} dot={{ r: 5, fill: '#d4af37', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie/Donut Chart Property type */}
        <div className="lg:col-span-4 bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-6 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gold-500" />
            Listing Categories
          </h3>
          <div className="flex-1 flex justify-center items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={typeData}
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {typeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-700">
            {typeData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="truncate">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Leads Table */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 dark:text-white text-sm">Recent Inbound Leads</h3>
          <button
            onClick={() => setActiveTab('leads')}
            className="text-xs font-bold text-primary-500 dark:text-gold-500 hover:underline flex items-center gap-1"
          >
            Manage Leads CRM
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-dark-900 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                <th className="p-4">Contact</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Date</th>
                <th className="p-4">Stage</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map(lead => (
                <tr key={lead.id} className="border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <td className="p-4">
                    <span className="block font-bold text-slate-900 dark:text-white">{lead.full_name}</span>
                    <span className="block text-[11px] text-slate-400 dark:text-slate-500">{lead.phone}</span>
                  </td>
                  <td className="p-4 font-semibold truncate max-w-[200px]">{lead.subject}</td>
                  <td className="p-4 text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full border ${getLeadBadgeColor(lead.status)}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default OverviewTab;
