import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'citizen' | 'officer'>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [showOfficerPassword, setShowOfficerPassword] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  // Placeholder for notification
  const showNotif = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 relative overflow-hidden">
      {/* Animated background (particles replacement) */}
      <div className="absolute inset-0 z-0 pointer-events-none animate-pulse bg-gradient-to-tr from-blue-800/40 via-blue-400/10 to-blue-900/40" />
      {/* Notification */}
      {notification && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{notification.message}</div>
      )}
      {/* Glass card */}
      <div className="relative z-10 glass-card rounded-xl p-8 w-full max-w-md mx-4 animate-fade-in bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-blue-400 text-3xl"><i className="fa-solid fa-traffic-light" /></span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">DisasterResponse</h1>
          </div>
          <p className="text-blue-200 text-center">Sign in to access your dashboard</p>
        </div>
        {/* User Type Selector */}
        <div className="flex mb-6 rounded-lg overflow-hidden bg-slate-800">
          <button type="button" className={`flex-1 py-2 text-center transition-all ${userType === 'citizen' ? 'bg-blue-700 text-white font-semibold' : 'text-blue-200 hover:bg-slate-700'}`} onClick={() => setUserType('citizen')}>
            <i className="fa-solid fa-user mr-2" /> Citizen
          </button>
          <button type="button" className={`flex-1 py-2 text-center transition-all ${userType === 'officer' ? 'bg-blue-700 text-white font-semibold' : 'text-blue-200 hover:bg-slate-700'}`} onClick={() => setUserType('officer')}>
            <i className="fa-solid fa-shield-halved mr-2" /> Officer
          </button>
        </div>
        {/* Forms */}
        {userType === 'citizen' ? (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); showNotif('success', 'Logged in as Citizen!'); }}>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-envelope text-blue-400" /></span>
                <input type="email" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-lock text-blue-400" /></span>
                <input type={showPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2 accent-blue-600" />
                <label htmlFor="remember" className="text-sm text-blue-200">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition duration-200">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow btn-glow transition duration-200">Sign In</button>
            <div className="text-center text-sm text-blue-200">Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">Sign up</Link></div>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); showNotif('success', 'Logged in as Officer!'); }}>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Officer ID</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-id-card text-blue-400" /></span>
                <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="TPD-12345" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-lock text-blue-400" /></span>
                <input type={showOfficerPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" />
                <button type="button" onClick={() => setShowOfficerPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <i className={`fa-solid ${showOfficerPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="officer-remember" className="mr-2 accent-blue-600" />
                <label htmlFor="officer-remember" className="text-sm text-blue-200">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition duration-200">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow btn-glow transition duration-200">Officer Sign In</button>
            <div className="text-center text-sm text-blue-200">Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">Register as Officer</Link></div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login; 