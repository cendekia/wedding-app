import React from 'react';
import { cn } from '@/utils/cn';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ size = 'medium', className, ...props }: LoaderProps) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={cn('flex justify-center items-center', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-primary border-t-transparent',
          sizeClasses[size]
        )}
      />
    </div>
  );
} 