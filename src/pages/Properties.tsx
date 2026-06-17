import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/ui/PropertyCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Building } from 'lucide-react';

const Properties: React.FC = () => {
  const { properties } = useApp();
  const location = useLocation();

  // Get initial type from URL search parameters if arriving from quick category links
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') as any;

  // State filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'for_sale' | 'for_rent'>('all');
  const [selectedBeds, setSelectedBeds] = useState<number | null>(null);
  const [selectedBaths, setSelectedBaths] = useState<number | null>(null);
  
  // Price and area filters
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minArea, setMinArea] = useState<number | ''>('');
  const [maxArea, setMaxArea] = useState<number | ''>('');

  // Sort and mobile sidebar state
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle property types
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Filter listings
  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        // Exclude drafts from public view
        if (p.status === 'draft') return false;

        // Search Query (title, address, city)
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(query);
          const matchAddress = p.address.toLowerCase().includes(query);
          const matchCity = p.city.toLowerCase().includes(query);
          if (!matchTitle && !matchAddress && !matchCity) return false;
        }

        // Property Type
        if (selectedTypes.length > 0 && !selectedTypes.includes(p.property_type)) {
          return false;
        }

        // Status
        if (selectedStatus !== 'all' && p.status !== selectedStatus) {
          return false;
        }

        // Bedrooms
        if (selectedBeds !== null) {
          if (p.bedrooms === null || p.bedrooms < selectedBeds) return false;
        }

        // Bathrooms
        if (selectedBaths !== null) {
          if (p.bathrooms === null || p.bathrooms < selectedBaths) return false;
        }

        // Min Price
        if (minPrice !== '' && p.price < minPrice) return false;

        // Max Price
        if (maxPrice !== '' && p.price > maxPrice) return false;

        // Area (Built up area or land area)
        const areaToCompare = p.area > 0 ? p.area : (p.land_area || 0);
        if (minArea !== '' && areaToCompare < minArea) return false;
        if (maxArea !== '' && areaToCompare > maxArea) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        // Default newest
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [properties, searchQuery, selectedTypes, selectedStatus, selectedBeds, selectedBaths, minPrice, maxPrice, minArea, maxArea, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedStatus('all');
    setSelectedBeds(null);
    setSelectedBaths(null);
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Available Listings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse our handpicked luxury properties, apartments, and land options.
          </p>
        </div>

        {/* Search Bar & Mobile Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white dark:bg-dark-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, location, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-gold-500/20 rounded-xl text-slate-800 dark:text-slate-200 text-sm outline-none placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-dark-900 px-3 py-1.5 rounded-xl border border-transparent focus-within:border-slate-200 dark:focus-within:border-slate-800">
              <ArrowUpDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none border-none pr-8 cursor-pointer"
              >
                <option value="newest">Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 font-bold rounded-xl text-sm"
            >
              <SlidersHorizontal className="h-4.5 w-4.5" />
              Filters
            </button>
          </div>
        </div>

        {/* Main Grid & Filters Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <SlidersHorizontal className="h-4 w-4 text-primary-500 dark:text-gold-500" />
                Filter Options
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-rose-500 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Status Option */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Listing Status
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(['all', 'for_sale', 'for_rent'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      // Clear prices when status changes to avoid mismatching sale/rent budgets
                      setMinPrice('');
                      setMaxPrice('');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg transition-colors border ${
                      selectedStatus === status
                        ? 'bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 border-transparent'
                        : 'bg-slate-50 dark:bg-dark-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {status === 'all' ? 'All' : status === 'for_sale' ? 'Buy' : 'Rent'}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Option */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Property Type
              </h3>
              <div className="space-y-2">
                {['apartment', 'villa', 'plot', 'commercial'].map(type => (
                  <label key={type} className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-800 text-primary-500 dark:text-gold-500 focus:ring-primary-500/20 dark:focus:ring-gold-500/20"
                    />
                    <span className="capitalize">{type === 'plot' ? 'Residential Plot' : type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bedrooms Toggle */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Bedrooms
              </h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedBeds(selectedBeds === num ? null : num)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedBeds === num
                        ? 'bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 border-transparent shadow-sm'
                        : 'bg-slate-50 dark:bg-dark-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms Toggle */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Bathrooms
              </h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedBaths(selectedBaths === num ? null : num)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedBaths === num
                        ? 'bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 border-transparent shadow-sm'
                        : 'bg-slate-50 dark:bg-dark-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Price Budget Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Budget {selectedStatus === 'for_rent' ? '(Rent in ₹)' : '(Sale in ₹)'}
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Area Size Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Area Size (sqft)
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          </aside>

          {/* Properties Listings Grid */}
          <main className="md:col-span-3">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-dark-800 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm animate-fade-in">
                <div className="p-4 bg-slate-100 dark:bg-dark-900 rounded-full mb-4">
                  <Building className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No matching properties found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-2">
                  We couldn't find any listings matching your current filter set. Try clearing some filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 text-sm font-bold rounded-xl shadow-md transition-all hover:scale-[1.01]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sidebar Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-[300px] h-full bg-white dark:bg-dark-800 p-6 flex flex-col justify-between shadow-2xl relative overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                  Filter Options
                </span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Option */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Listing Status
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['all', 'for_sale', 'for_rent'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                      className={`py-2 text-xs font-bold rounded-lg transition-colors border ${
                        selectedStatus === status
                          ? 'bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950'
                          : 'bg-slate-50 dark:bg-dark-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {status === 'all' ? 'All' : status === 'for_sale' ? 'Buy' : 'Rent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type Option */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Property Type
                </h3>
                <div className="space-y-2">
                  {['apartment', 'villa', 'plot', 'commercial'].map(type => (
                    <label key={type} className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-800 text-primary-500 dark:text-gold-500"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms Toggle */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Bedrooms
                </h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => setSelectedBeds(selectedBeds === num ? null : num)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        selectedBeds === num
                          ? 'bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 border-transparent shadow-sm'
                          : 'bg-slate-50 dark:bg-dark-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Budget Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Budget {selectedStatus === 'for_rent' ? '(Rent in ₹)' : '(Sale in ₹)'}
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* Area Size Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Area Size (sqft)
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={resetFilters}
                className="w-1/2 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-dark-900 font-bold rounded-xl text-sm text-slate-700 dark:text-slate-300"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-1/2 py-3 bg-primary-500 dark:bg-gold-500 text-white dark:text-dark-950 font-bold rounded-xl text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
