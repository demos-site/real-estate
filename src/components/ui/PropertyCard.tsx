import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../../data/mockDb';
import { BedDouble, Bath, Square, MapPin, Award } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const formatPrice = (price: number, status: string) => {
  const isRent = status === 'for_rent' || status === 'rented';
  let formatted = '';
  if (price >= 10000000) {
    formatted = `₹ ${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    formatted = `₹ ${(price / 100000).toFixed(2)} Lakh`;
  } else {
    formatted = `₹ ${price.toLocaleString('en-IN')}`;
  }
  return isRent ? `${formatted} / mo` : formatted;
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'for_sale': return 'For Sale';
    case 'for_rent': return 'For Rent';
    case 'sold': return 'Sold Out';
    case 'rented': return 'Rented';
    case 'draft': return 'Draft';
    default: return status;
  }
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const {
    title,
    slug,
    price,
    property_type,
    status,
    bedrooms,
    bathrooms,
    area,
    land_area,
    address,
    featured_image,
    featured
  } = property;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Property Image & Status Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={featured_image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-sm text-white ${
            status === 'for_sale' ? 'bg-primary-500' :
            status === 'for_rent' ? 'bg-accent-emerald' :
            'bg-slate-500'
          }`}>
            {getStatusLabel(status)}
          </span>
          {featured && (
            <span className="flex items-center gap-1 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-gold-500 text-dark-950 rounded-lg shadow-sm">
              <Award className="h-3.5 w-3.5" />
              Featured
            </span>
          )}
        </div>

        {/* Property Type Badge */}
        <span className="absolute bottom-4 right-4 z-10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 dark:bg-dark-900/90 text-slate-800 dark:text-gold-200 rounded-md backdrop-blur-sm shadow-sm">
          {property_type}
        </span>
      </div>

      {/* Card Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Price Tag */}
        <span className="text-xl font-extrabold text-primary-600 dark:text-gold-500">
          {formatPrice(price, status)}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-primary-500 dark:group-hover:text-gold-500 transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Location Address */}
        <div className="flex items-start gap-1.5 text-slate-400 dark:text-slate-400 mt-2 text-xs font-medium">
          <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{address}</span>
        </div>

        {/* Spec Icons Bar */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-4 pt-4 text-slate-500 dark:text-slate-300">
          {bedrooms !== null && (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <BedDouble className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>{bedrooms} Beds</span>
            </div>
          )}
          {bathrooms !== null && (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Bath className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>{bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Square className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            <span>{area > 0 ? `${area} sqft` : `${land_area} sqft Plot`}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <Link
            to={`/properties/${slug}`}
            className="flex items-center justify-center w-full py-2.5 text-sm font-bold bg-slate-50 hover:bg-primary-500 hover:text-white dark:bg-dark-900 dark:hover:bg-gold-500 dark:hover:text-dark-950 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
