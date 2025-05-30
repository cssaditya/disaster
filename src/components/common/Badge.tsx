import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'emergency' | 'success' | 'warning';
  size?: 'sm' | 'md';
  icon?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
}) => {
  const baseStyle = 'inline-flex items-center font-medium rounded-full';
  
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200',
    primary: 'bg-primary-100 text-primary-900 dark:bg-primary-900/20 dark:text-primary-300',
    emergency: 'bg-emergency-100 text-emergency-900 dark:bg-emergency-900/20 dark:text-emergency-300',
    success: 'bg-success-500/10 text-success-600 dark:bg-success-500/20 dark:text-success-500',
    warning: 'bg-warning-500/10 text-warning-600 dark:bg-warning-500/20 dark:text-warning-500',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };
  
  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;