import React from 'react';
import { cn } from '@/utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-base',
    xl: 'h-24 w-24 text-lg',
  };

  const getInitials = () => {
    if (!fallback) return '?';
    return fallback
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || fallback || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
          {getInitials()}
        </div>
      )}
    </div>
  );
} 