import React from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({
  size = 'lg',
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 md:px-6',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 