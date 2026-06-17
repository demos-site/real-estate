import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Property, Lead } from '../data/mockDb';
import { formatPrice, getStatusLabel } from '../components/ui/PropertyCard';
import {
  LayoutDashboard, Building, Users, Settings as SettingsIcon, LogOut,
  Plus, Edit3, Trash2, Award, ArrowUpRight, Search, X, Calendar, Save,
  TrendingUp, BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  const {
    properties, leads, agent, settings, logout,
    addProperty, updateProperty, deleteProperty,
    updateLead, deleteLead, updateAgent, updateSettings
  } = useApp();

  // Active dashboard tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'leads' | 'settings'>('overview');

  // ----------------------------------------------------
  // OVERVIEW DATA & METRICS
  // ----------------------------------------------------
  const metrics = useMemo(() => {
    const total = properties.length;
    const active = properties.filter(p => p.status === 'for_sale' || p.status === 'for_rent').length;
    const sold = properties.filter(p => p.status === 'sold' || p.status === 'rented').length;
    const rent = properties.filter(p => p.status === 'for_rent').length;
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;

    return { total, active, sold, rent, totalLeads, newLeads };
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

  // ----------------------------------------------------
  // PROPERTY MANAGEMENT & CRUD STATE
  // ----------------------------------------------------
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [propertySearch, setPropertySearch] = useState('');

  // Form states for Property
  const [propTitle, setPropTitle] = useState('');
  const [propPrice, setPropPrice] = useState<number>(0);
  const [propType, setPropType] = useState<any>('apartment');
  const [propStatus, setPropStatus] = useState<any>('for_sale');
  const [propAddress, setPropAddress] = useState('');
  const [propBeds, setPropBeds] = useState<number | ''>('');
  const [propBaths, setPropBaths] = useState<number | ''>('');
  const [propArea, setPropArea] = useState<number>(0);
  const [propLandArea, setPropLandArea] = useState<number | ''>('');
  const [propFeatured, setPropFeatured] = useState(false);
  const [propImage, setPropImage] = useState('');
  const [propDesc, setPropDesc] = useState('');

  // Setup form fields on edit click
  const handleEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setPropTitle(prop.title);
    setPropPrice(prop.price);
    setPropType(prop.property_type);
    setPropStatus(prop.status);
    setPropAddress(prop.address);
    setPropBeds(prop.bedrooms === null ? '' : prop.bedrooms);
    setPropBaths(prop.bathrooms === null ? '' : prop.bathrooms);
    setPropArea(prop.area);
    setPropLandArea(prop.land_area === null ? '' : prop.land_area);
    setPropFeatured(prop.featured);
    setPropImage(prop.featured_image);
    setPropDesc(prop.description);
    setIsAddingProperty(true); // show form
  };

  const handleCreateNewClick = () => {
    setEditingProperty(null);
    setPropTitle('');
    setPropPrice(0);
    setPropType('apartment');
    setPropStatus('for_sale');
    setPropAddress('');
    setPropBeds('');
    setPropBaths('');
    setPropArea(0);
    setPropLandArea('');
    setPropFeatured(false);
    setPropImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80');
    setPropDesc('<p>New premium listed property.</p>');
    setIsAddingProperty(true);
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataPayload = {
      title: propTitle,
      slug: propTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: propDesc,
      price: Number(propPrice),
      property_type: propType,
      status: propStatus,
      bedrooms: propBeds === '' ? null : Number(propBeds),
      bathrooms: propBaths === '' ? null : Number(propBaths),
      parking: 1,
      area: Number(propArea),
      land_area: propLandArea === '' ? null : Number(propLandArea),
      address: propAddress,
      latitude: 19.076,
      longitude: 72.877,
      featured_image: propImage,
      gallery_images: [propImage],
      floor_plans: [],
      featured: propFeatured,
      year_built: 2026,
      availability: new Date().toISOString().split('T')[0],
      facing: 'East',
      furnishing: 'semi-furnished' as const,
      floor_number: 1,
      total_floors: 4,
      ownership_type: 'Freehold',
      city: 'Mumbai',
      state: 'Maharashtra',
      amenities: ['Security', 'Power Backup', 'Balcony']
    };

    if (editingProperty) {
      updateProperty(editingProperty.id, dataPayload);
    } else {
      addProperty(dataPayload);
    }

    setIsAddingProperty(false);
    setEditingProperty(null);
  };

  const filteredAdminProperties = useMemo(() => {
    return properties.filter(p =>
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.city.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.status.toLowerCase().includes(propertySearch.toLowerCase())
    );
  }, [properties, propertySearch]);

  // ----------------------------------------------------
  // LEADS CRM & SIDE PANEL STATE
  // ----------------------------------------------------
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  
  // CRM notes state
  const [leadNotes, setLeadNotes] = useState('');
  const [leadStatusVal, setLeadStatusVal] = useState<any>('new');
  const [nextFollowupVal, setNextFollowupVal] = useState('');

  const handleOpenLeadPanel = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || '');
    setLeadStatusVal(lead.status);
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

  // ----------------------------------------------------
  // SETTINGS EDIT STATE
  // ----------------------------------------------------
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 transition-colors duration-300 flex flex-col md:flex-row">
      
      {/* Sidebar Controls */}
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
              onClick={() => { setActiveTab('overview'); setIsAddingProperty(false); }}
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
              onClick={() => { setActiveTab('properties'); setIsAddingProperty(false); }}
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
              onClick={() => { setActiveTab('leads'); setIsAddingProperty(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
                activeTab === 'leads'
                  ? 'bg-white/15 dark:bg-gold-500/15 text-white dark:text-gold-500'
                  : 'text-white/75 hover:bg-white/5'
              }`}
            >
              <Users className="h-4.5 w-4.5" />
              Leads CRM
              {metrics.newLeads > 0 && (
                <span className="absolute right-4 px-2 py-0.5 text-[10px] font-black bg-rose-500 text-white rounded-full">
                  {metrics.newLeads}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setIsAddingProperty(false); }}
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

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        
        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'overview' && (
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
                      <span>{d.name}: {d.value}</span>
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
                          <span className="block text-[11px] text-slate-450 dark:text-slate-500">{lead.phone}</span>
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
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: LISTINGS MANAGER (CRUD) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Form Toggle Check */}
            {!isAddingProperty ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Properties Listings Manager</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">View, search, edit, toggle features, or add new property listings.</p>
                  </div>
                  <button
                    onClick={handleCreateNewClick}
                    className="px-5 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 font-extrabold text-sm text-white rounded-xl shadow-md flex items-center gap-2 w-fit"
                  >
                    <Plus className="h-4.5 w-4.5 stroke-[3]" />
                    Add Listing
                  </button>
                </div>

                {/* Search box */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-800 border border-slate-100 dark:border-slate-800 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>

                {/* Admin Properties table */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-dark-900 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                          <th className="p-4">Property</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Featured</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAdminProperties.map(prop => (
                          <tr key={prop.id} className="border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                            
                            {/* Thumbnail & Title */}
                            <td className="p-4 flex items-center gap-3">
                              <img
                                src={prop.featured_image}
                                alt={prop.title}
                                className="w-12 h-9 rounded-md object-cover flex-shrink-0"
                              />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[200px]">{prop.title}</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-semibold">{prop.city}, {prop.state}</span>
                              </div>
                            </td>

                            <td className="p-4 capitalize text-xs font-semibold">{prop.property_type}</td>
                            
                            <td className="p-4">
                              <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md border ${
                                prop.status === 'for_sale' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                prop.status === 'for_rent' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                'bg-slate-500/10 text-slate-500 border-slate-500/20'
                              }`}>
                                {getStatusLabel(prop.status)}
                              </span>
                            </td>

                            <td className="p-4 font-bold text-xs">{formatPrice(prop.price, prop.status)}</td>
                            
                            <td className="p-4">
                              <button
                                onClick={() => updateProperty(prop.id, { featured: !prop.featured })}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  prop.featured
                                    ? 'bg-gold-500/10 border-gold-500/20 text-gold-500'
                                    : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 hover:text-slate-400'
                                }`}
                                title="Toggle Featured"
                              >
                                <Award className="h-4 w-4" />
                              </button>
                            </td>

                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditProperty(prop)}
                                  className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-dark-900 dark:hover:bg-dark-950 text-slate-600 dark:text-slate-350 rounded-xl"
                                  title="Edit"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteProperty(prop.id)}
                                  className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              // Add / Edit Property Form
              <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-md max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                    {editingProperty ? 'Edit Property Listing' : 'Create New Listing'}
                  </h3>
                  <button
                    onClick={() => setIsAddingProperty(false)}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handlePropertySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Title</label>
                    <input
                      type="text" required value={propTitle} onChange={(e) => setPropTitle(e.target.value)}
                      placeholder="e.g. Luxurious Penthouse"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Price (INR)</label>
                    <input
                      type="number" required value={propPrice} onChange={(e) => setPropPrice(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
                    <select
                      value={propType} onChange={(e) => setPropType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-250 cursor-pointer"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Status</label>
                    <select
                      value={propStatus} onChange={(e) => setPropStatus(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-250 cursor-pointer"
                    >
                      <option value="for_sale">For Sale</option>
                      <option value="for_rent">For Rent</option>
                      <option value="sold">Sold Out</option>
                      <option value="rented">Rented</option>
                      <option value="draft">Draft (Private)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Address Location</label>
                    <input
                      type="text" required value={propAddress} onChange={(e) => setPropAddress(e.target.value)}
                      placeholder="Street name, landmark, City"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Bedrooms</label>
                    <input
                      type="number" value={propBeds} onChange={(e) => setPropBeds(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Null for Plot"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Bathrooms</label>
                    <input
                      type="number" value={propBaths} onChange={(e) => setPropBaths(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Null for Plot"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Built-up Area (sqft)</label>
                    <input
                      type="number" required value={propArea} onChange={(e) => setPropArea(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Land Area (sqft)</label>
                    <input
                      type="number" value={propLandArea} onChange={(e) => setPropLandArea(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Optional"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Featured Image URL</label>
                    <input
                      type="text" required value={propImage} onChange={(e) => setPropImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Detailed Description</label>
                    <textarea
                      rows={5} required value={propDesc} onChange={(e) => setPropDesc(e.target.value)}
                      placeholder="HTML or rich text content"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 resize-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="form-featured"
                      checked={propFeatured}
                      onChange={(e) => setPropFeatured(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-350 dark:border-slate-800 text-primary-500 dark:text-gold-500 focus:ring-primary-500/20"
                    />
                    <label htmlFor="form-featured" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                      Mark as Featured Listing (Displays on Homepage)
                    </label>
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddingProperty(false)}
                      className="px-6 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 rounded-xl text-xs font-extrabold text-white flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {editingProperty ? 'Save Changes' : 'Add Property'}
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: LEADS CRM */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fade-in relative">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Leads CRM Pipeline</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage incoming property inquiries, track deal stages, and maintain follow-up notes.</p>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-dark-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
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
                        <tr key={lead.id} className="border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-355">
                          
                          <td className="p-4">
                            <span className="block font-bold text-slate-900 dark:text-white">{lead.full_name}</span>
                            <span className="block text-[10px] text-slate-400 dark:text-slate-500">{lead.phone} &bull; {lead.email}</span>
                          </td>

                          <td className="p-4 font-semibold max-w-[150px] truncate">{lead.subject}</td>

                          <td className="p-4 text-xs">
                            {matchedProp ? (
                              <Link to={`/properties/${matchedProp.slug}`} target="_blank" className="text-primary-500 dark:text-gold-500 hover:underline font-bold">
                                {matchedProp.title}
                              </Link>
                            ) : (
                              <span className="text-slate-400">General Inquiry</span>
                            )}
                          </td>

                          <td className="p-4">
                            <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full border ${getLeadBadgeColor(lead.status)}`}>
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleOpenLeadPanel(lead)}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-dark-900 dark:hover:bg-dark-955 text-xs font-bold text-slate-700 dark:text-slate-250 rounded-xl"
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
                  <div className="space-y-6">
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
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: SETTINGS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'settings' && (
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
                  <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
                  <input
                    type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2">Designation</label>
                  <input
                    type="text" value={agentTitle} onChange={(e) => setAgentTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">Years of Experience</label>
                  <input
                    type="text" value={agentExp} onChange={(e) => setAgentExp(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">Biography (Rich HTML)</label>
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
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
                  <input
                    type="text" value={bizWhatsApp} onChange={(e) => setBizWhatsApp(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">Office Address</label>
                  <input
                    type="text" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">Facebook Page</label>
                  <input
                    type="text" value={bizFacebook} onChange={(e) => setBizFacebook(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">Instagram Handle</label>
                  <input
                    type="text" value={bizInsta} onChange={(e) => setBizInsta(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2">LinkedIn Page</label>
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
                onClick={() => {
                  setAgentName(agent.name);
                  setAgentTitle(agent.designation);
                  setAgentExp(agent.experience);
                  setAgentBio(agent.bio);
                  setBizWhatsApp(settings.whatsapp_number);
                  setBizAddress(settings.office_address);
                  setBizFacebook(settings.facebook);
                  setBizInsta(settings.instagram);
                  setBizLinkedIn(settings.linkedin);
                }}
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
        )}

      </main>
    </div>
  );
};

export default Dashboard;
