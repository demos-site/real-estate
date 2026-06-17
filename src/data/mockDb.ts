export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  property_type: 'apartment' | 'villa' | 'plot' | 'commercial';
  status: 'for_sale' | 'for_rent' | 'sold' | 'rented' | 'draft';
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  area: number; // built-up in sqft
  land_area: number | null;
  address: string;
  latitude: number;
  longitude: number;
  featured_image: string;
  gallery_images: string[];
  floor_plans: string[];
  featured: boolean;
  year_built: number;
  availability: string; // ISO date
  facing: string;
  furnishing: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
  floor_number: number | null;
  total_floors: number | null;
  ownership_type: string;
  city: string;
  state: string;
  amenities: string[]; // List of active amenities
  video_url?: string;
  created_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'follow_up' | 'site_visit' | 'negotiation' | 'closed';
  notes: string;
  property_id: string | null;
  last_contacted: string | null;
  next_followup: string | null;
  created_at: string;
}

export interface Agent {
  name: string;
  photo: string;
  designation: string;
  experience: string;
  bio: string;
  phone: string;
  email: string;
  languages_spoken: string[];
}

export interface BusinessSettings {
  whatsapp_number: string;
  office_address: string;
  maps_api_key: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  seo_title: string;
  seo_description: string;
  seo_image: string;
}

// Initial Mock Data
const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "The Oakridge Grand Manor",
    slug: "oakridge-grand-manor",
    description: "<p>The Oakridge Grand Manor represents the pinnacle of luxury living. Nestled in the prestigious hills, this estate offers panoramic views of the city skyline, coupled with unmatched privacy.</p><p>Features include a double-height grand foyer, a private infinity pool, a temperature-controlled wine cellar, and state-of-the-art home automation. The master suite occupies its own wing, featuring dual walk-in closets and a spa-like bathroom.</p>",
    price: 85000000,
    property_type: "villa",
    status: "for_sale",
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    area: 5500,
    land_area: 7200,
    address: "Road No. 4, Jubilee Hills, Hyderabad",
    latitude: 17.4325,
    longitude: 78.4071,
    featured_image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5f4769d?auto=format&fit=crop&w=800&q=80"
    ],
    floor_plans: [
      "https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    year_built: 2024,
    availability: "2026-07-01",
    facing: "East",
    furnishing: "fully-furnished",
    floor_number: 0,
    total_floors: 2,
    ownership_type: "Freehold",
    city: "Hyderabad",
    state: "Telangana",
    amenities: ["Swimming Pool", "Gym", "Security", "Garden", "Power Backup", "Balcony", "Clubhouse"],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    created_at: "2026-05-10T12:00:00Z"
  },
  {
    id: "prop-2",
    title: "Vanguard Sky Penthouse",
    slug: "vanguard-sky-penthouse",
    description: "<p>Perched high above Worli, the Vanguard Sky Penthouse offers single-level floor plans with 360-degree views of the Arabian Sea. Enjoy spectacular sunsets from your 100ft long private glass balcony.</p><p>Crafted for connoisseurs, this penthouse offers an Italian marble floor system, a professional chef's kitchen, custom acoustics, and direct elevator access.</p>",
    price: 120000000,
    property_type: "apartment",
    status: "for_sale",
    bedrooms: 4,
    bathrooms: 5,
    parking: 2,
    area: 4200,
    land_area: null,
    address: "Worli Sea Face, Mumbai",
    latitude: 19.0015,
    longitude: 72.8169,
    featured_image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ],
    floor_plans: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    year_built: 2023,
    availability: "Immediate",
    facing: "West",
    furnishing: "semi-furnished",
    floor_number: 42,
    total_floors: 45,
    ownership_type: "Co-operative Society",
    city: "Mumbai",
    state: "Maharashtra",
    amenities: ["Swimming Pool", "Gym", "Security", "Elevator", "Power Backup", "Balcony", "Clubhouse"],
    created_at: "2026-05-15T14:30:00Z"
  },
  {
    id: "prop-3",
    title: "Crestview Heights Apartment",
    slug: "crestview-heights-apartment",
    description: "<p>A bright, modern 3 BHK apartment in Bengaluru's tech corridor. Ideal for families and professionals, it features open-concept living, custom oak cabinetry, and high-efficiency lighting systems.</p><p>Located in a gated community with excellent connectivity to major IT parks, international schools, and shopping zones.</p>",
    price: 65000,
    property_type: "apartment",
    status: "for_rent",
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    area: 1650,
    land_area: null,
    address: "Varthur Road, Whitefield, Bengaluru",
    latitude: 12.9698,
    longitude: 77.7499,
    featured_image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    floor_plans: [],
    featured: true,
    year_built: 2021,
    availability: "2026-06-25",
    facing: "North",
    furnishing: "semi-furnished",
    floor_number: 8,
    total_floors: 12,
    ownership_type: "Freehold",
    city: "Bengaluru",
    state: "Karnataka",
    amenities: ["Gym", "Security", "Elevator", "Garden", "Power Backup", "Balcony"],
    created_at: "2026-05-20T08:15:00Z"
  },
  {
    id: "prop-4",
    title: "Oceanfront Vista Estate",
    slug: "oceanfront-vista-estate",
    description: "<p>A premium villa situated on a coastal ridge in Goa, offering private beach access and breathtaking ocean views. Features Spanish colonial architecture, sweeping courtyards, and native gardens.</p><p>Perfect as a luxury holiday home or an exclusive rental property generating high yield.</p>",
    price: 145000000,
    property_type: "villa",
    status: "for_sale",
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    area: 4800,
    land_area: 6000,
    address: "Candolim Beach Road, Candolim, Goa",
    latitude: 15.5164,
    longitude: 73.7632,
    featured_image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    floor_plans: [],
    featured: false,
    year_built: 2022,
    availability: "Immediate",
    facing: "West",
    furnishing: "fully-furnished",
    floor_number: 0,
    total_floors: 2,
    ownership_type: "Freehold",
    city: "Goa",
    state: "Goa",
    amenities: ["Swimming Pool", "Security", "Garden", "Power Backup", "Balcony", "Terrace"],
    created_at: "2026-05-25T11:00:00Z"
  },
  {
    id: "prop-5",
    title: "Aura Premium Commercial Suites",
    slug: "aura-premium-commercial-suites",
    description: "<p>Ready-to-occupy corporate office space in the heart of Mumbai's primary financial district, BKC. Features high-speed fiber connectivity, modern executive cabins, and an open layout setup with 24 workstations.</p><p>Equipped with central air conditioning, glass partitions, and private washrooms.</p>",
    price: 210000,
    property_type: "commercial",
    status: "for_rent",
    bedrooms: null,
    bathrooms: 2,
    parking: 2,
    area: 2500,
    land_area: null,
    address: "G-Block, Bandra Kurla Complex, Mumbai",
    latitude: 19.0596,
    longitude: 72.8641,
    featured_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
    ],
    floor_plans: [],
    featured: false,
    year_built: 2020,
    availability: "Immediate",
    facing: "North-East",
    furnishing: "fully-furnished",
    floor_number: 5,
    total_floors: 15,
    ownership_type: "Leasehold",
    city: "Mumbai",
    state: "Maharashtra",
    amenities: ["Security", "Elevator", "Power Backup"],
    created_at: "2026-05-28T09:40:00Z"
  },
  {
    id: "prop-6",
    title: "Golden Meadows Villa Plot",
    slug: "golden-meadows-villa-plot",
    description: "<p>A south-facing corner plot located inside a highly secured luxury gated community on the scenic East Coast Road. Clear titles, premium layout, black-top roads, and avenue plantation are ready.</p><p>Build your dream beach villa in a quiet, serene location away from the hustle of Chennai city, yet reachable in 20 minutes.</p>",
    price: 18500000,
    property_type: "plot",
    status: "for_sale",
    bedrooms: null,
    bathrooms: null,
    parking: null,
    area: 0,
    land_area: 4400,
    address: "Golden Avenue, ECR Road, Chennai",
    latitude: 12.8251,
    longitude: 80.2396,
    featured_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    ],
    floor_plans: [],
    featured: true,
    year_built: 2025,
    availability: "Immediate",
    facing: "South",
    furnishing: "unfurnished",
    floor_number: null,
    total_floors: null,
    ownership_type: "Freehold",
    city: "Chennai",
    state: "Tamil Nadu",
    amenities: ["Security", "Garden", "Clubhouse"],
    created_at: "2026-06-01T15:20:00Z"
  }
];

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    full_name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    subject: "Inquiry: The Oakridge Grand Manor",
    message: "Hi, I am interested in viewing this property this weekend. Please contact me with the location details and slot timings.",
    status: "new",
    notes: "Client seems very interested. Looking to move in by July.",
    property_id: "prop-1",
    last_contacted: null,
    next_followup: "2026-06-18",
    created_at: "2026-06-16T10:15:00Z"
  },
  {
    id: "lead-2",
    full_name: "Priya Patel",
    phone: "+91 99887 76655",
    email: "priya.patel@example.com",
    subject: "Inquiry: Vanguard Sky Penthouse",
    message: "Could you send over the detailed floor plans and info on monthly maintenance charges?",
    status: "contacted",
    notes: "Sent floor plans via WhatsApp. Waiting for reply.",
    property_id: "prop-2",
    last_contacted: "2026-06-17",
    next_followup: "2026-06-20",
    created_at: "2026-06-15T11:45:00Z"
  },
  {
    id: "lead-3",
    full_name: "Amit Verma",
    phone: "+91 98234 56789",
    email: "amit.verma@example.com",
    subject: "Inquiry: Crestview Heights Apartment",
    message: "Is the security deposit negotiable? I would like to schedule a virtual tour.",
    status: "site_visit",
    notes: "Scheduled physical site visit for Thursday at 4 PM.",
    property_id: "prop-3",
    last_contacted: "2026-06-16",
    next_followup: "2026-06-18",
    created_at: "2026-06-14T09:30:00Z"
  },
  {
    id: "lead-4",
    full_name: "Sanjay Singhania",
    phone: "+91 90000 11111",
    email: "sanjay@singhaniagroup.com",
    subject: "General Business Consultation",
    message: "I am looking for multi-office plots on ECR for commercial purposes. Let's arrange a call.",
    status: "negotiation",
    notes: "Offered ECR plot for 1.8 Cr. Negotiations on progress.",
    property_id: "prop-6",
    last_contacted: "2026-06-17",
    next_followup: "2026-06-19",
    created_at: "2026-06-12T14:20:00Z"
  }
];

const INITIAL_AGENT: Agent = {
  name: "Rajesh Rokadia",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  designation: "Founder & Principal Broker",
  experience: "15+ Years",
  bio: "<p>Rajesh Rokadia is a veteran real estate consultant with over 15 years of transaction and advisory experience across luxury residential, commercial, and land investments. Under his guidance, Rokadia Reality has closed transactions valued at over 500 Crores, earning the trust of HNIs, corporate leaders, and families alike.</p><p>Rajesh specializes in legal compliance, high-value negotiations, and bespoke property sourcing. His customer-first policy guarantees transparent, hassle-free transactions from consultation to final handover.</p>",
  phone: "+91 99300 12345",
  email: "rajesh@rokadiareality.com",
  languages_spoken: ["English", "Hindi", "Gujarati", "Marathi"]
};

const INITIAL_SETTINGS: BusinessSettings = {
  whatsapp_number: "+919930012345",
  office_address: "102, Rokadia Towers, BKC G-Block, Bandra East, Mumbai - 400051",
  maps_api_key: "MOCK_GOOGLE_MAPS_KEY_XYZ",
  facebook: "https://facebook.com/rokadiareality",
  instagram: "https://instagram.com/rokadiareality",
  linkedin: "https://linkedin.com/company/rokadiareality",
  seo_title: "Rokadia Reality | Luxury Real Estate & Investments",
  seo_description: "Discover premium apartments, bespoke villas, commercial plots, and investments in Mumbai and primary beach locations with Rokadia Reality.",
  seo_image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
};

// State helper functions
const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStoredData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to store data", e);
  }
};

export const mockDb = {
  getProperties: (): Property[] => getStoredData('rr_properties', INITIAL_PROPERTIES),
  saveProperties: (properties: Property[]) => setStoredData('rr_properties', properties),
  
  getLeads: (): Lead[] => getStoredData('rr_leads', INITIAL_LEADS),
  saveLeads: (leads: Lead[]) => setStoredData('rr_leads', leads),
  
  getAgent: (): Agent => getStoredData('rr_agent', INITIAL_AGENT),
  saveAgent: (agent: Agent) => setStoredData('rr_agent', agent),
  
  getSettings: (): BusinessSettings => getStoredData('rr_settings', INITIAL_SETTINGS),
  saveSettings: (settings: BusinessSettings) => setStoredData('rr_settings', settings),
  
  resetDatabase: (): void => {
    localStorage.removeItem('rr_properties');
    localStorage.removeItem('rr_leads');
    localStorage.removeItem('rr_agent');
    localStorage.removeItem('rr_settings');
  }
};
