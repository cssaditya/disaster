import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [showOfficerPassword, setShowOfficerPassword] = useState(false);
  const [showOfficerConfirmPassword, setShowOfficerConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [officerId, setOfficerId] = useState('');
  const [officerPassword, setOfficerPassword] = useState('');
  const [officerConfirmPassword, setOfficerConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Password strength logic (simple)
  const checkStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    setPasswordStrength(score);
  };

  // Notification placeholder
  const showNotif = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[officerId]) {
      showNotif('error', 'Officer already exists.');
      return;
    }
    if (officerPassword !== officerConfirmPassword) {
      showNotif('error', 'Passwords do not match.');
      return;
    }
    users[officerId] = { password: officerPassword, type: 'officer' };
    localStorage.setItem('users', JSON.stringify(users));
    showNotif('success', 'Officer account created!');
    setTimeout(() => navigate('/login'), 1000);
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
          <p className="text-blue-200 text-center">Register as Officer</p>
        </div>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-1">Officer ID Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-id-card text-blue-400" /></span>
              <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="TPD-12345" value={officerId} onChange={e => setOfficerId(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-lock text-blue-400" /></span>
              <input type={showOfficerPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" value={officerPassword} onChange={e => { setOfficerPassword(e.target.value); checkStrength(e.target.value); }} />
              <button type="button" onClick={() => setShowOfficerPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                <i className={`fa-solid ${showOfficerPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded mt-2 overflow-hidden">
              <div className={`h-2 rounded transition-all duration-300 ${passwordStrength === 0 ? 'w-0' : passwordStrength === 1 ? 'w-1/4 bg-red-500' : passwordStrength === 2 ? 'w-2/4 bg-yellow-500' : passwordStrength === 3 ? 'w-3/4 bg-blue-500' : 'w-full bg-green-500'}`}></div>
            </div>
            <p className="text-xs text-blue-300 mt-1">Password strength: <span className="font-medium">{['Weak', 'Fair', 'Good', 'Strong', 'Excellent'][passwordStrength]}</span></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-1">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-lock text-blue-400" /></span>
              <input type={showOfficerConfirmPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" value={officerConfirmPassword} onChange={e => setOfficerConfirmPassword(e.target.value)} />
              <button type="button" onClick={() => setShowOfficerConfirmPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                <i className={`fa-solid ${showOfficerConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow btn-glow transition duration-200">Create Officer Account</button>
          <div className="text-center text-sm text-blue-200">Already have an account? <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">Sign in</a></div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 