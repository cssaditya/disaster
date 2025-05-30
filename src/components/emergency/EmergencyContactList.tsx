import React from 'react';
import { Phone, Video, MessageSquare } from 'lucide-react';

export const EmergencyContactList: React.FC = () => {
  return (
    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
      {[
        { name: 'Emergency Operations Center', role: 'Main Command', priority: 'high' },
        { name: 'FEMA Regional Office', role: 'Federal Support', priority: 'high' },
        { name: 'Dr. Sarah Johnson', role: 'Medical Director', priority: 'medium' },
        { name: 'National Weather Service', role: 'Weather Updates', priority: 'medium' },
        { name: 'Police Department', role: 'Security', priority: 'high' },
        { name: 'Fire Department', role: 'Rescue', priority: 'high' },
      ].map((contact, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              contact.priority === 'high' ? 'bg-emergency-900' : 'bg-warning-500'
            }`}></div>
            <div>
              <p className="font-medium text-sm text-neutral-900 dark:text-white">{contact.name}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{contact.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600">
              <Phone size={14} className="text-primary-900 dark:text-primary-400" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600">
              <Video size={14} className="text-primary-900 dark:text-primary-400" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600">
              <MessageSquare size={14} className="text-primary-900 dark:text-primary-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};