import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Bell, AlertTriangle, Menu, X } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 shadow-sm py-2 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-2 p-2 rounded-full bg-primary-900 text-white shadow hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <h1 className="text-xl font-semibold text-primary-900 dark:text-white">
          DisasterResponse
        </h1>
        <span className="hidden md:inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 rounded-full">
          COMMAND CENTER
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Alerts */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <Bell size={20} className="text-neutral-600 dark:text-neutral-300" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-emergency-900 rounded-full">
              3
            </span>
          </button>
        </div>

        {/* Emergency Alert */}
        <div className="hidden md:flex items-center px-3 py-1 bg-emergency-50 dark:bg-emergency-900/20 text-emergency-900 dark:text-emergency-900 rounded-full">
          <AlertTriangle size={16} className="mr-1 text-emergency-900" />
          <span className="text-xs font-medium">Active Emergency</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-neutral-300" />
          ) : (
            <Moon size={20} className="text-neutral-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;