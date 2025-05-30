import React from 'react';
import Badge from '../common/Badge';
import { AlertTriangle, Radio, Wind, HomeIcon, Waves } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'Evacuation Order',
    description: 'Zone B coastal areas must evacuate immediately',
    time: '24 minutes ago',
    type: 'Evacuation',
    priority: 'emergency',
    icon: <HomeIcon size={16} />
  },
  {
    id: 2,
    title: 'Flash Flood Warning',
    description: 'Areas near Johnson Creek at risk of rapid flooding',
    time: '45 minutes ago',
    type: 'Warning',
    priority: 'emergency',
    icon: <Waves size={16} />
  },
  {
    id: 3,
    title: 'High Wind Advisory',
    description: 'Expect 60-70 mph gusts through Thursday',
    time: '1 hour ago',
    type: 'Advisory',
    priority: 'warning',
    icon: <Wind size={16} />
  },
  {
    id: 4,
    title: 'Emergency Broadcast',
    description: 'Tune to 89.7 FM for emergency updates',
    time: '1.5 hours ago',
    type: 'Broadcast',
    priority: 'primary',
    icon: <Radio size={16} />
  }
];

export const EmergencyAlerts: React.FC = () => {
  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`p-3 rounded-lg border-l-4 ${
            alert.priority === 'emergency' ? 'border-emergency-900 bg-emergency-50 dark:bg-emergency-900/10' :
            alert.priority === 'warning' ? 'border-warning-500 bg-warning-50 dark:bg-warning-500/10' : 
            'border-primary-900 bg-primary-50 dark:bg-primary-900/10'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className={`p-1 rounded mt-0.5 mr-2 ${
                alert.priority === 'emergency' ? 'bg-emergency-900 text-white' :
                alert.priority === 'warning' ? 'bg-warning-500 text-white' : 
                'bg-primary-900 text-white'
              }`}>
                <AlertTriangle size={14} />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white">{alert.title}</h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{alert.description}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {alert.time}
                  </span>
                  <span className="mx-1 text-neutral-300 dark:text-neutral-600">•</span>
                  <Badge 
                    size="sm" 
                    variant={
                      alert.priority === 'emergency' ? 'emergency' :
                      alert.priority === 'warning' ? 'warning' : 'primary'
                    }
                    icon={alert.icon}
                  >
                    {alert.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}