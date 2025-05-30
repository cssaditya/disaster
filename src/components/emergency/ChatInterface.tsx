import React from 'react';
import { AlertTriangle, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';

export const ChatInterface: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* System message */}
      <div className="flex justify-center mb-6">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
          Today, 10:24 AM - Emergency Response Session Started
        </span>
      </div>
      
      {/* Bot message */}
      <div className="flex items-start">
        <div className="bg-primary-900 text-white p-2 rounded-full mr-2 flex-shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
          <p className="text-neutral-900 dark:text-white">
            Welcome to the Emergency Response Hub. I'm here to assist with Hurricane Eliza response operations. What do you need help with today?
          </p>
        </div>
      </div>
      
      {/* User message */}
      <div className="flex items-start justify-end">
        <div className="bg-primary-900 text-white p-3 rounded-lg rounded-tr-none max-w-[80%]">
          <p className="text-white">
            I need a status update on evacuation progress in Zone B
          </p>
        </div>
      </div>
      
      {/* Bot message with map info */}
      <div className="flex items-start">
        <div className="bg-primary-900 text-white p-2 rounded-full mr-2 flex-shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <div className="space-y-3 max-w-[80%]">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none">
            <p className="text-neutral-900 dark:text-white">
              Zone B evacuation is currently at 68% completion. Estimated time to full evacuation: 3.5 hours.
            </p>
          </div>
          
          <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <MapPin size={16} className="text-primary-900 dark:text-primary-400 mr-1" />
              <h4 className="font-medium text-neutral-900 dark:text-white">Evacuation Status - Zone B</h4>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-700 dark:text-neutral-300">Overall Progress</span>
                  <span className="text-xs font-medium text-neutral-900 dark:text-white">68%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-900 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-neutral-700 p-2 rounded">
                  <p className="text-neutral-500 dark:text-neutral-400">Population</p>
                  <p className="font-medium text-neutral-900 dark:text-white">24,560 people</p>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-2 rounded">
                  <p className="text-neutral-500 dark:text-neutral-400">Remaining</p>
                  <p className="font-medium text-emergency-900">7,859 people</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="primary" size="sm" icon={<Clock size={12} />}>
                  3.5 hours remaining
                </Badge>
                <button className="text-xs text-primary-900 dark:text-primary-400 font-medium">
                  View detailed map
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle size={16} className="text-emergency-900 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white">Critical Issues</h4>
                <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300 mt-1 space-y-1">
                  <li>Flooding on Highway 41 slowing eastern evacuation route</li>
                  <li>Shelter at Lincoln High School approaching capacity (92%)</li>
                  <li>Medical support needed at Westside Evacuation Center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User message */}
      <div className="flex items-start justify-end">
        <div className="bg-primary-900 text-white p-3 rounded-lg rounded-tr-none max-w-[80%]">
          <p className="text-white">
            Send additional transportation to eastern route and redirect overflow from Lincoln High to Memorial Stadium shelter
          </p>
        </div>
      </div>
      
      {/* Bot message with confirmation */}
      <div className="flex items-start">
        <div className="bg-primary-900 text-white p-2 rounded-full mr-2 flex-shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <div className="space-y-3 max-w-[80%]">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none">
            <p className="text-neutral-900 dark:text-white">
              I've processed your requests:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300 mt-2 space-y-1">
              <li>10 additional transportation vehicles dispatched to eastern evacuation route</li>
              <li>Traffic management team alerted to Highway 41 situation</li>
              <li>Lincoln High shelter now redirecting to Memorial Stadium (1.5 miles south)</li>
              <li>Notification sent to all field teams in Zone B</li>
            </ul>
          </div>
          
          <div className="bg-success-500/10 dark:bg-success-500/20 border border-success-500/30 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 size={16} className="text-success-500 mr-2" />
              <span className="font-medium text-success-600 dark:text-success-500">All actions confirmed and in progress</span>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
              Estimated resolution time: 45 minutes
            </p>
          </div>
        </div>
      </div>
      
      {/* Typing indicator */}
      <div className="flex items-start">
        <div className="bg-primary-900 text-white p-2 rounded-full mr-2 flex-shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};