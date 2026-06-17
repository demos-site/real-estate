import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice, getStatusLabel } from '../components/ui/PropertyCard';
import {
  BedDouble, Bath, Square, Car, Calendar, Compass,
  ChevronLeft, ChevronRight, Maximize2, X, Phone, MessageSquare, Mail,
  MapPin, Check, Download, Building, Landmark, School
} from 'lucide-react';

const PropertyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { properties, addLead, agent, settings } = useApp();

  const property = properties.find(p => p.slug === slug);

  // States
  const [activeImage, setActiveImage] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Inquiry Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Set default active image
  useEffect(() => {
    if (property) {
      setActiveImage(property.featured_image);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Property Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">The property you are looking for does not exist or has been removed.</p>
        <Link to="/properties" className="mt-6 px-6 py-3 bg-primary-500 text-white font-bold rounded-xl shadow-md">
          Go back to Listings
        </Link>
      </div>
    );
  }

  const allImages = [property.featured_image, ...property.gallery_images];

  // Lightbox handlers
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Form submission
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addLead({
        full_name: fullName,
        phone,
        email,
        subject: `Inquiry: ${property.title}`,
        message: message || `Hi, I am interested in "${property.title}" listed for ${formatPrice(property.price, property.status)}. Please share more details.`,
        property_id: property.id
      });
      setIsSubmitting(false);
      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  // Standard Amenities list
  const standardAmenities = [
    "Swimming Pool", "Gym", "Security", "Elevator", "Garden", "Clubhouse", "Power Backup", "Terrace", "Balcony"
  ];

  // Mock Nearby Places
  const nearbyPlaces = [
    { icon: <School className="h-5 w-5 text-indigo-500" />, type: "School", name: "Imperial International Academy", distance: "1.2 km", time: "5 mins" },
    { icon: <Landmark className="h-5 w-5 text-rose-500" />, type: "Hospital", name: "Metro Care Super Speciality", distance: "2.4 km", time: "8 mins" },
    { icon: <Building className="h-5 w-5 text-amber-500" />, type: "Mall", name: "Phoenix Marketcity Plaza", distance: "3.8 km", time: "12 mins" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-dark-950 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary-500 dark:hover:text-gold-500">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-primary-500 dark:hover:text-gold-500">Properties</Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300 truncate">{property.title}</span>
        </div>

        {/* 1. Header Details Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-lg text-white ${
                property.status === 'for_sale' ? 'bg-primary-500' :
                property.status === 'for_rent' ? 'bg-accent-emerald' :
                'bg-slate-500'
              }`}>
                {getStatusLabel(property.status)}
              </span>
              <span className="text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
                {property.property_type}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              <span>{property.address}</span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end flex-shrink-0 bg-white dark:bg-dark-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm md:w-fit">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Request Price
            </span>
            <span className="text-2xl sm:text-3xl font-black text-primary-600 dark:text-gold-500 mt-1">
              {formatPrice(property.price, property.status)}
            </span>
          </div>
        </div>

        {/* 2. Media Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Visual Frame */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-slate-100 group">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => openLightbox(allImages.indexOf(activeImage))}
                className="absolute bottom-4 right-4 p-3 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-sm shadow-md transition-all opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            </div>

            {/* Gallery Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[4/3] w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImage === img
                      ? 'border-primary-500 dark:border-gold-500 scale-[1.02] shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications Cards */}
          <div className="lg:col-span-4 bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
            <h3 className="font-extrabold text-slate-800 dark:text-white mb-4 text-base border-b border-slate-100 dark:border-slate-800 pb-3">
              Property Specs
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {property.bedrooms !== null && (
                <div className="flex gap-3 items-center">
                  <div className="p-2.5 bg-slate-50 dark:bg-dark-900 rounded-xl text-slate-500 dark:text-slate-400">
                    <BedDouble className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bedrooms</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{property.bedrooms} Bed</span>
                  </div>
                </div>
              )}
              {property.bathrooms !== null && (
                <div className="flex gap-3 items-center">
                  <div className="p-2.5 bg-slate-50 dark:bg-dark-900 rounded-xl text-slate-500 dark:text-slate-400">
                    <Bath className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bathrooms</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{property.bathrooms} Bath</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 items-center">
                <div className="p-2.5 bg-slate-50 dark:bg-dark-900 rounded-xl text-slate-500 dark:text-slate-400">
                  <Square className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Built Area</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{property.area > 0 ? `${property.area} sqft` : 'N/A'}</span>
                </div>
              </div>
              {property.parking !== null && (
                <div className="flex gap-3 items-center">
                  <div className="p-2.5 bg-slate-50 dark:bg-dark-900 rounded-xl text-slate-500 dark:text-slate-400">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Parking</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{property.parking} Slot</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 items-center">
                <div className="p-2.5 bg-slate-50 dark:bg-dark-900 rounded-xl text-slate-500 dark:text-slate-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Year Built</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{property.year_built}</span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="p-2.5 bg-slate-50 dark:bg-dark-900 rounded-xl text-slate-500 dark:text-slate-400">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Facing</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{property.facing}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 mt-6 pt-6 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Furnishing</span>
                <span className="capitalize text-slate-800 dark:text-slate-200">{property.furnishing.replace('-', ' ')}</span>
              </div>
              {property.land_area && (
                <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>Land Area</span>
                  <span className="text-slate-800 dark:text-slate-200">{property.land_area} sqft</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Possession Date</span>
                <span className="text-slate-800 dark:text-slate-200">{property.availability}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Ownership</span>
                <span className="text-slate-800 dark:text-slate-200">{property.ownership_type}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Detailed Information & Lead Form Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Description details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Description */}
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                Description
              </h2>
              <div
                className="text-slate-500 dark:text-slate-400 leading-relaxed space-y-4 text-sm font-medium"
                dangerouslySetInnerHTML={{ __html: property.description }}
              />
            </div>

            {/* Amenities Grid */}
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
                Amenities & Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {standardAmenities.map(amenity => {
                  const isActive = property.amenities.includes(amenity);
                  return (
                    <div
                      key={amenity}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isActive
                          ? 'border-emerald-500/20 bg-emerald-500/5 text-slate-800 dark:text-slate-200'
                          : 'border-slate-100 dark:border-slate-800/60 bg-transparent text-slate-400/80 dark:text-slate-600'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-dark-900 text-slate-400 dark:text-slate-700'
                      }`}>
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-bold">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floor Plans */}
            {property.floor_plans.length > 0 && (
              <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Floor Plans
                  </h2>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary-500 dark:text-gold-500 hover:underline">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
                <div className="aspect-[4/3] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 dark:border-slate-800 p-4 flex items-center justify-center">
                  <img
                    src={property.floor_plans[0]}
                    alt="Floor Plan"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Location & Map Section */}
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                Location Map
              </h2>
              {/* Google Maps embed iframe */}
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-slate-100 relative mb-6">
                <iframe
                  title="google-maps"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

              {/* Nearby Places Cards */}
              <h3 className="font-bold text-slate-850 dark:text-slate-200 text-sm mb-4">Nearby Landmarks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-slate-800 rounded-xl flex gap-3">
                    <div className="p-2.5 bg-white dark:bg-dark-800 rounded-lg shadow-sm w-fit h-fit flex-shrink-0">
                      {place.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">{place.type}</span>
                      <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5 line-clamp-1">{place.name}</span>
                      <span className="block text-[11px] text-slate-400 dark:text-slate-450 mt-1 font-semibold">{place.distance} &bull; {place.time} away</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact and Lead Inquiry Form Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Broker profile intro card */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-primary-500 dark:border-gold-500 shadow-md mb-4 bg-slate-100">
                <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">{agent.name}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-gold-200">{agent.designation}</p>
              
              <div className="border-t border-slate-100 dark:border-slate-800 my-4 pt-4 flex flex-col gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 rounded-xl transition-all shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call Advisor
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Hi Rajesh, I would like to enquire about ${property.title} (URL: ${window.location.href}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Inquiry Lead Form Card */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                Inquire About Property
              </h3>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mail@example.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Interested in "${property.title}". Please send info.`}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 font-extrabold text-sm text-white rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {isSubmitting ? 'Sending Request...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <span className="text-sm font-semibold tracking-wider">
              {lightboxIndex + 1} / {allImages.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Large Image Frame */}
          <div className="relative flex-1 flex items-center justify-center p-4">
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <img
              src={allImages[lightboxIndex]}
              alt={`lightbox-${lightboxIndex}`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Stop closing
            />

            <button
              onClick={nextImage}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Lightbox Footer Title */}
          <div className="p-6 text-center text-sm font-bold uppercase tracking-wider text-slate-400 bg-black/45">
            {property.title}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
