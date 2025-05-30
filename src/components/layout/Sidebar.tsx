import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Sparkles, 
  Radio, 
  Package, 
  Settings, 
  LogOut,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const navItems = [
    { name: 'Command Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Crisis Map', path: '/map', icon: <Map size={20} /> },
    { name: 'AI Prediction Center', path: '/prediction', icon: <Sparkles size={20} /> },
    { name: 'Emergency Response', path: '/emergency', icon: <Radio size={20} /> },
    { name: 'Resource Management', path: '/resources', icon: <Package size={20} /> },
  ];

  const sidebarClasses = `fixed z-20 inset-y-0 left-0 w-64 bg-primary-900 text-white flex flex-col transition-transform transition-opacity duration-300 ease-in-out
    ${open ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'}`;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300" 
          style={{ pointerEvents: open ? 'auto' : 'none' }}
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="p-4 border-b border-primary-800">
          <div className="flex items-center justify-center">
            <Radio size={24} className="text-white mr-2" />
            <h2 className="text-xl font-bold">DisasterResponse</h2>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="mx-4 my-3 p-2 bg-emergency-900 rounded-lg flex items-center text-white animate-pulse-slow">
          <AlertTriangle size={18} className="mr-2" />
          <div className="text-sm">
            <p className="font-medium">Hurricane Warning</p>
            <p className="text-xs opacity-80">Gulf Coast - Level 3</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white text-primary-900 font-medium'
                        : 'text-white hover:bg-primary-800'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-800">
          <div className="flex items-center px-4 py-2 text-sm">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="User"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">Emma Wilson</p>
              <p className="text-xs text-primary-200">Emergency Coordinator</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <button className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-primary-800 rounded-lg">
              <Settings size={18} className="mr-3" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-primary-800 rounded-lg">
              <LogOut size={18} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;