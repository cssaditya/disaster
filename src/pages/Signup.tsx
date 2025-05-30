import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [userType, setUserType] = useState<'citizen' | 'officer'>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOfficerPassword, setShowOfficerPassword] = useState(false);
  const [showOfficerConfirmPassword, setShowOfficerConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
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
          <p className="text-blue-200 text-center">Create your account to access the dashboard</p>
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
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); showNotif('success', 'Citizen account created!'); }}>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-user text-blue-400" /></span>
                <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="John Doe" />
              </div>
            </div>
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
                <input type={showPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" onChange={e => checkStrength(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
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
                <input type={showConfirmPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="citizen-terms" className="mr-2 accent-blue-600" />
              <label htmlFor="citizen-terms" className="text-sm text-blue-200">I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a></label>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow btn-glow transition duration-200">Create Citizen Account</button>
            <div className="text-center text-sm text-blue-200">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">Sign in</Link></div>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); showNotif('success', 'Officer account created!'); }}>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-user text-blue-400" /></span>
                <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Officer ID Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-id-card text-blue-400" /></span>
                <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="TPD-12345" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Badge Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-shield-halved text-blue-400" /></span>
                <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="4572" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Department</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-building text-blue-400" /></span>
                <select required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none">
                  <option value="">Select Department</option>
                  <option value="traffic">Traffic Police</option>
                  <option value="patrol">Patrol Division</option>
                  <option value="highway">Highway Patrol</option>
                  <option value="special">Special Operations</option>
                </select>
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><i className="fa-solid fa-chevron-down text-blue-400" /></span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Official Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-envelope text-blue-400" /></span>
                <input type="email" required className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="john.doe@traffic.gov" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-lock text-blue-400" /></span>
                <input type={showOfficerPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" onChange={e => checkStrength(e.target.value)} />
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
                <input type={showOfficerConfirmPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="••••••••" />
                <button type="button" onClick={() => setShowOfficerConfirmPassword(v => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <i className={`fa-solid ${showOfficerConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="officer-terms" className="mr-2 accent-blue-600" />
              <label htmlFor="officer-terms" className="text-sm text-blue-200">I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a></label>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow btn-glow transition duration-200">Create Officer Account</button>
            <div className="text-center text-sm text-blue-200">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">Sign in</Link></div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup; 