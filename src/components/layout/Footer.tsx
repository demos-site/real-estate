import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Home } from 'lucide-react';

const Footer: React.FC = () => {
  const { settings, agent } = useApp();

  return (
    <footer className="w-full bg-slate-50 dark:bg-dark-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand and Bio */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary-500 dark:bg-gold-500 rounded-lg">
                <Home className="h-5 w-5 text-white dark:text-dark-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-primary-500 dark:text-gold-500">
                  ROKADIA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold -mt-1">
                  Reality
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
              Bespoke luxury real estate advisors dealing in premium residential, commercial, and beachfront properties. Guiding you home with trust and transparency.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-200 hover:bg-primary-500 hover:text-white dark:bg-dark-800 dark:hover:bg-gold-500 dark:hover:text-dark-950 text-slate-600 dark:text-slate-400 transition-all duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-200 hover:bg-primary-500 hover:text-white dark:bg-dark-800 dark:hover:bg-gold-500 dark:hover:text-dark-950 text-slate-600 dark:text-slate-400 transition-all duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-200 hover:bg-primary-500 hover:text-white dark:bg-dark-800 dark:hover:bg-gold-500 dark:hover:text-dark-950 text-slate-600 dark:text-slate-400 transition-all duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/agent" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Agent Profile
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=villa" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Bespoke Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Luxury Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Commercial Spaces
                </Link>
              </li>
              <li>
                <Link to="/properties?type=plot" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-gold-500 transition-colors">
                  Residential Plots
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Contact Office
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-5 w-5 text-primary-500 dark:text-gold-500 flex-shrink-0" />
                <span>{settings.office_address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Phone className="h-4 w-4 text-primary-500 dark:text-gold-500 flex-shrink-0" />
                <a href={`tel:${agent.phone}`} className="hover:text-primary-500 dark:hover:text-gold-500">
                  {agent.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="h-4 w-4 text-primary-500 dark:text-gold-500 flex-shrink-0" />
                <a href={`mailto:${agent.email}`} className="hover:text-primary-500 dark:hover:text-gold-500">
                  {agent.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Rokadia Reality. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
