import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Home, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Agent Profile', path: '/agent' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-gold-500 dark:to-gold-700 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105">
              <Home className="h-6 w-6 text-white dark:text-dark-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-primary-500 dark:text-gold-500">
                ROKADIA
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold -mt-1">
                Reality
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600 dark:text-gold-500 border-b-2 border-primary-600 dark:border-gold-500 pb-1'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-gold-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>


          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-dark-950/95 backdrop-blur-md transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-primary-50/50 dark:bg-gold-500/10 text-primary-600 dark:text-gold-500'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-800'
                }`}
              >
                {link.name}
              </Link>
            ))}


          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
