import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Copy, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { settings, agent, addLead, triggerToast } = useApp();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`${label} copied to clipboard!`, 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // General leads (property_id = null)
      addLead({
        full_name: name,
        phone,
        email,
        subject: `General Inquiry: ${subject}`,
        message,
        property_id: null
      });
      setIsSubmitting(false);
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-950 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Connect With Us
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Have questions about a listing or want to explore investment portfolios? Leave a message, and our principal broker will contact you shortly.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Contact Details & Map Card (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address, Phone, Email Card */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
              
              {/* Address */}
              <div className="flex justify-between items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-dark-900 rounded-xl transition-colors">
                <div className="flex gap-3">
                  <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:bg-gold-500/10 dark:text-gold-500 rounded-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Office Headquarters</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1 block leading-relaxed">{settings.office_address}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyText(settings.office_address, 'Office address')}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              {/* Phone */}
              <div className="flex justify-between items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-dark-900 rounded-xl transition-colors">
                <div className="flex gap-3">
                  <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:bg-gold-500/10 dark:text-gold-500 rounded-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Phone Number</span>
                    <a href={`tel:${agent.phone}`} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-primary-500 mt-1 block">
                      {agent.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyText(agent.phone, 'Phone number')}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              {/* Email */}
              <div className="flex justify-between items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-dark-900 rounded-xl transition-colors">
                <div className="flex gap-3">
                  <div className="p-2.5 bg-primary-500/10 text-primary-500 dark:bg-gold-500/10 dark:text-gold-500 rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Email Address</span>
                    <a href={`mailto:${agent.email}`} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-primary-500 mt-1 block">
                      {agent.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyText(agent.email, 'Email address')}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

            </div>

            {/* Embedded Google Map */}
            <div className="bg-white dark:bg-dark-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm h-64 overflow-hidden relative">
              <iframe
                title="office-location-map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.office_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7 bg-white dark:bg-dark-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              Send General Message
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
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

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Seeking Investment Properties"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 font-extrabold text-sm text-white rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Sending inquiry...' : 'Send Message'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
