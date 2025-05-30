import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { 
  Radio, 
  Send, 
  Mic, 
  Menu, 
  AlertTriangle, 
  MessageSquare, 
  Plus,
  Phone,
  Volume2,
  MapPin,
  Clock
} from 'lucide-react';
import { EmergencyQuickActions } from '../components/emergency/EmergencyQuickActions';
import { ChatInterface } from '../components/emergency/ChatInterface';
import { EmergencyContactList } from '../components/emergency/EmergencyContactList';

const EmergencyResponse: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Emergency Response Hub</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Coordinate emergency response and communication
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" icon={<Phone size={16} />}>
            Emergency Call
          </Button>
          <Button variant="emergency" size="sm" icon={<AlertTriangle size={16} />}>
            Broadcast Alert
          </Button>
        </div>
      </div>

      {/* Emergency status banner */}
      <Card className="bg-emergency-900 text-white border-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center">
            <Volume2 size={24} className="mr-3 animate-pulse" />
            <div>
              <h2 className="text-xl font-bold">Emergency Status: ACTIVE</h2>
              <p className="text-emergency-100">Hurricane Eliza - Gulf Coast Region - Level 3 Response</p>
            </div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full mr-3">
              <Clock size={16} className="mr-1" />
              <span className="text-sm">48:12:35 active</span>
            </div>
            <Badge variant="emergency" size="md">Evacuation in Progress</Badge>
          </div>
        </div>
      </Card>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="space-y-6">
          <Card title="Quick Actions" icon={<AlertTriangle size={20} className="text-emergency-900" />}>
            <EmergencyQuickActions />
          </Card>
          
          <Card title="Emergency Contacts" icon={<Phone size={20} className="text-primary-900 dark:text-primary-400" />}>
            <EmergencyContactList />
            <div className="mt-4">
              <Button 
                variant="outline" 
                fullWidth
                icon={<Plus size={16} />}
                size="sm"
              >
                Add New Contact
              </Button>
            </div>
          </Card>
          
          <Card title="Active Field Teams" icon={<MapPin size={20} className="text-primary-900 dark:text-primary-400" />}>
            <div className="space-y-3">
              {[
                { name: 'Medical Team Alpha', location: 'Downtown Hospital', status: 'active' },
                { name: 'Rescue Squad 7', location: 'Coastal Zone B', status: 'critical' },
                { name: 'Supply Distribution C', location: 'Red Cross Shelter', status: 'active' },
                { name: 'Engineering Unit 2', location: 'Power Station', status: 'active' }
              ].map((team, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-neutral-900 dark:text-white">{team.name}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{team.location}</p>
                  </div>
                  <Badge 
                    variant={team.status === 'critical' ? 'emergency' : 'success'} 
                    size="sm"
                  >
                    {team.status === 'critical' ? 'Critical' : 'Active'}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-center text-neutral-600 dark:text-neutral-400">
              <a href="#" className="text-primary-900 dark:text-primary-400 font-medium">
                View all 16 teams →
              </a>
            </div>
          </Card>
        </div>

        {/* Center and right - Chat interface */}
        <div className="lg:col-span-2">
          <Card className="h-[700px] p-0 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-primary-900 text-white p-2 rounded-lg mr-3">
                  <Radio size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-white">Emergency Response AI Assistant</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="inline-flex h-2 w-2 rounded-full bg-success-500 mr-1"></span>
                    Online - Ready to assist
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <Menu size={20} className="text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            
            {/* Chat messages area */}
            <ChatInterface />
            
            {/* Chat input */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
              <div className="flex items-end gap-2">
                <div className="relative flex-1">
                  <textarea
                    className="w-full p-3 pr-12 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 min-h-[80px] resize-none"
                    placeholder="Type your message or request..."
                    rows={3}
                  ></textarea>
                  <button className="absolute bottom-3 right-3 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                    <Mic size={18} className="text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>
                <Button 
                  variant="primary" 
                  className="px-4 h-10" 
                  icon={<Send size={16} />}
                >
                  Send
                </Button>
              </div>
              <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>Voice commands available</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponse;