import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Menu, X, MessageCircle } from 'lucide-react';
import { ChatInterface } from '../emergency/ChatInterface';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      {/* Sidebar - no toggle button here */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        {/* Floating Chatbot Widget */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {chatOpen && (
            <div className="mb-2">
              <ChatInterface />
            </div>
          )}
          <button
            className="bg-primary-900 hover:bg-primary-800 text-white rounded-full shadow-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setChatOpen((open) => !open)}
            aria-label="Open chatbot"
          >
            <MessageCircle size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;