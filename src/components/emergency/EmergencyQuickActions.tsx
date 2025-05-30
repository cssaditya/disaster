import React from 'react';
import Button from '../common/Button';
import { 
  AlertTriangle, 
  Phone, 
  Send, 
  Volume2, 
  MapPin, 
  Users, 
  Truck,
  Siren
} from 'lucide-react';

export const EmergencyQuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        variant="emergency" 
        fullWidth 
        icon={<AlertTriangle size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Declare<br />Emergency</span>
      </Button>
      
      <Button 
        variant="emergency" 
        fullWidth 
        icon={<Siren size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Trigger<br />Sirens</span>
      </Button>
      
      <Button 
        variant="primary" 
        fullWidth 
        icon={<Volume2 size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Broadcast<br />Message</span>
      </Button>
      
      <Button 
        variant="primary" 
        fullWidth 
        icon={<Phone size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Emergency<br />Conference</span>
      </Button>
      
      <Button 
        variant="primary" 
        fullWidth 
        icon={<Send size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Mass<br />Notification</span>
      </Button>
      
      <Button 
        variant="primary" 
        fullWidth 
        icon={<MapPin size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Evacuation<br />Routes</span>
      </Button>
      
      <Button 
        variant="outline" 
        fullWidth 
        icon={<Users size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Deploy<br />Personnel</span>
      </Button>
      
      <Button 
        variant="outline" 
        fullWidth 
        icon={<Truck size={16} />}
        className="flex-col h-auto py-4"
      >
        <span className="block mt-1 text-xs">Request<br />Resources</span>
      </Button>
    </div>
  );
};