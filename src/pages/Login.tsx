import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const { isAuthenticated, login, agent } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check redirects
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const success = login(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-dark-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-md">
        
        {/* Title branding */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary-500/10 dark:bg-gold-500/10 text-primary-500 dark:text-gold-500 flex items-center justify-center shadow-inner">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Agent Portal
          </h2>
          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            Sign in to manage properties, listings, and leads CRM pipeline.
          </p>
        </div>

        {/* Mock Helper box */}
        <div className="p-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-left space-y-1">
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-extrabold">Demo Credentials</span>
          <span className="block text-xs font-bold text-slate-700 dark:text-slate-350">Email: <code className="text-slate-900 dark:text-gold-500">{agent.email}</code></span>
          <span className="block text-xs font-bold text-slate-700 dark:text-slate-350">Password: <code className="text-slate-900 dark:text-gold-500">admin123</code></span>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Agent Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-dark-900 border-0 focus:ring-1 focus:ring-primary-500/20 rounded-xl text-xs outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-extrabold rounded-xl text-white bg-primary-500 hover:bg-primary-600 dark:bg-gold-500 dark:text-dark-950 dark:hover:bg-gold-600 shadow-md transition-all hover:scale-[1.01]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-white/50 dark:text-dark-950/50 group-hover:text-white/80 dark:group-hover:text-dark-950/80 transition-colors" />
              </span>
              Sign In to Dashboard
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
