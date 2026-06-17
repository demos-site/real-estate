import React, { useState, useMemo } from 'react';
import { Plus, Search, Award, Edit3, Trash2, X, Save } from 'lucide-react';
import type { Property } from '../../data/mockDb';
import { formatPrice, getStatusLabel } from '../../components/ui/PropertyCard';

interface ListingsTabProps {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'created_at'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
}

const ListingsTab: React.FC<ListingsTabProps> = ({
  properties,
  addProperty,
  updateProperty,
  deleteProperty
}) => {
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [propertySearch, setPropertySearch] = useState('');

  // Form states for Property
  const [propTitle, setPropTitle] = useState('');
  const [propPrice, setPropPrice] = useState<number>(0);
  const [propType, setPropType] = useState<'apartment' | 'villa' | 'plot' | 'commercial'>('apartment');
  const [propStatus, setPropStatus] = useState<'for_sale' | 'for_rent' | 'sold' | 'rented' | 'draft'>('for_sale');
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
    setPropType(prop.property_type as any);
    setPropStatus(prop.status as any);
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

  return (
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
                    <tr key={prop.id} className="border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-350">
                      
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

          <form onSubmit={handlePropertySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            
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
  );
};

export default ListingsTab;
