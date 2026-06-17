import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/ui/PropertyCard';
import { ShieldCheck, UserCheck, Compass, FileText, ArrowRight, MessageSquare, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const { properties, agent, settings } = useApp();
  const featuredProperties = properties.filter(p => p.featured && p.status !== 'draft').slice(0, 6);

  const valueProps = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary-500 dark:text-gold-500" />,
      title: "Verified Listings",
      desc: "Every property goes through a detailed verification process check for title, permissions, and quality."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-primary-500 dark:text-gold-500" />,
      title: "Personalized Service",
      desc: "Bespoke matchmaking tailored strictly to your location preferences, investment budget, and timeline."
    },
    {
      icon: <Compass className="h-8 w-8 text-primary-500 dark:text-gold-500" />,
      title: "Local Expertise",
      desc: "Deep knowledge of micro-markets, upcoming infrastructure developments, and pricing trends."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-500 dark:text-gold-500" />,
      title: "Transparent Process",
      desc: "Clean paperwork, verified registry check, and legal compliance support from deal initiation to handover."
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-dark-950 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
            alt="Rokadia Reality Luxury Hero"
            className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/60 to-dark-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-500 dark:text-gold-500 border border-gold-500/30 bg-gold-500/10 rounded-full animate-fade-in">
            Luxury Real Estate Advisors
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight animate-fade-in-up">
            Crafting Spaces. <br />
            <span className="text-gradient-gold">Shaping Realities.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up">
            Discover bespoke residential estates, premium penthouses, and strategic commercial holdings in India's prime markets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-dark-950 text-base font-bold rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Browse Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold rounded-xl backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center"
            >
              Contact Advisor
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce-slow">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
          <div className="w-1.5 h-6 rounded-full bg-white/30 relative overflow-hidden">
            <div className="w-full h-2.5 rounded-full bg-gold-500 absolute top-1 left-0 animate-pulse-slow" />
          </div>
        </div>
      </section>

      {/* 2. Featured Properties */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-primary-500 dark:text-gold-500">
              Handpicked Portfolios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="group flex items-center gap-1.5 text-sm font-bold text-primary-600 dark:text-gold-500 hover:underline mt-4 md:mt-0"
          >
            Explore all properties
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-24 bg-slate-50 dark:bg-dark-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-primary-500 dark:text-gold-500">
              Brilliant Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              Why Choose Rokadia Reality?
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              We redefine your property transaction journey by applying rigorous screening, absolute transparency, and professional representation at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="p-8 bg-white dark:bg-dark-800/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3.5 bg-slate-50 dark:bg-dark-900 rounded-xl w-fit mb-6">
                  {prop.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{prop.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Agent Introduction */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-primary-700 dark:from-gold-500 dark:to-gold-600 rounded-3xl transform rotate-3 scale-[1.01] opacity-10 group-hover:rotate-1 transition-transform duration-300" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl bg-slate-100">
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-primary-500 dark:text-gold-500 bg-primary-500/10 dark:bg-gold-500/10 px-3 py-1 rounded-full">
                Founders Message
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
                {agent.name}
              </h2>
              <p className="text-base font-semibold text-slate-500 dark:text-gold-200 mt-1">
                {agent.designation} &bull; <span className="text-primary-500 dark:text-gold-500">{agent.experience} Experince</span>
              </p>
            </div>

            <div
              className="text-slate-500 dark:text-slate-400 leading-relaxed space-y-4 text-base"
              dangerouslySetInnerHTML={{ __html: agent.bio }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {agent.languages_spoken.map(lang => (
                <span
                  key={lang}
                  className="px-3.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 rounded-md"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`tel:${agent.phone}`}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-dark-950 font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Agent
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Hi Rajesh, I was browsing Rokadia Reality website and would like to discuss luxury property options.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Chat
              </a>
              <Link
                to="/agent"
                className="px-6 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-dark-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner Section */}
      <section className="bg-primary-500 dark:bg-gradient-to-r dark:from-primary-700 dark:to-primary-900 py-20 text-white text-center transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Discover Your Next Sanctuary?
          </h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto leading-relaxed">
            Reach out to our principal broker for tailored listings, investment portfolios, or a confidential site visit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-primary-600 hover:bg-slate-100 font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${agent.phone}`}
              className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 dark:bg-white/10 dark:hover:bg-white/20 border border-white/20 font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Phone className="h-4.5 w-4.5" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Hi Rajesh, I am looking to schedule a property consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
