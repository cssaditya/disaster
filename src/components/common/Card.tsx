import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  urgent?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  children, 
  className = '',
  urgent = false 
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-neutral-800 
        rounded-lg shadow-card hover:shadow-card-hover 
        transition-all duration-300
        ${urgent ? 'border-l-4 border-emergency-900' : ''} 
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <h3 className="font-medium text-neutral-900 dark:text-white">{title}</h3>
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;